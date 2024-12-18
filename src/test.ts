/* eslint-disable max-lines */
import { readCsv } from './requests';
// import groupBy from 'lodash/groupBy';
import * as t from 'io-ts';
import { writeCsv } from './cron';
import { uniq, groupBy, keyBy } from 'lodash';
import { logger } from './logger';

// yarn ts-node --transpile-only ./src/test.ts

// Variables
const MARKETO_FILE = '/Users/michaelfarrell/Desktop/deputy/marketo.csv';
const CUSTOMER_IO_FILE = '/Users/michaelfarrell/Desktop/deputy/customer_io.csv';
const OUTPUT_FILE_WORKFLOWS =
  '/Users/michaelfarrell/Desktop/deputy/output_workflows.csv';
const OUTPUT_FILE_NO_WORKFLOWS =
  '/Users/michaelfarrell/Desktop/deputy/output_no_workflows.csv';
const DUPLICATE_FILE =
  '/Users/michaelfarrell/Desktop/deputy/duplicate_requests.csv';

const MarketoData = t.type({
  Id: t.string,
  'Email Address': t.string,
  'Updated At': t.string,
  Unsubscribed: t.string,
});

/** Override type */
type MarketoData = t.TypeOf<typeof MarketoData>;

const CustomerIoData = t.type({
  id: t.string,
  cio_subscription_preferences: t.string,
  email: t.string,
  last_login: t.string,
  unsubscribed: t.string,
});

/**
 * Override type
 */
type CustomerIoData = t.TypeOf<typeof CustomerIoData>;

const DuplicateData = t.type({
  id: t.string,
  createdAt: t.string,
  coreIdentifierValue: t.string,
  type: t.string,
  name: t.union([t.string, t.null]),
  trackingType: t.string,
  preferences: t.string,
});

/** Override type */
type DuplicateData = t.TypeOf<typeof DuplicateData>;

/**
 * Get duplicate data
 *
 * @returns The data
 */
function getDuplicateData(): {
  /** Core ID */
  coreIdentifierValue: string;
  /** Timestamp */
  timestamp: string;
  /** Marketing purpose */
  Marketing: boolean;
  /** MarketingEmails preference */
  MarketingEmails: boolean;
  /** ProductGuidance preference */
  ProductGuidance: boolean;
  /** ProductInsider preference */
  ProductInsider: boolean;
  /** ProductUpdates preference */
  ProductUpdates: boolean;
}[] {
  // Read in duplicate data, lowercase email addresses
  let duplicateData = readCsv(DUPLICATE_FILE, DuplicateData).map(
    ({ preferences, ...d }) => ({
      ...d,
      ...JSON.parse(preferences),
    }),
  );
  // total rows
  logger.info(`[Duplicates] Number of rows: ${duplicateData.length}`);

  // filter out deputy emails
  duplicateData = duplicateData.filter(
    (x) => !x.coreIdentifierValue.includes('@deputy.com'),
  );
  logger.info(
    `[Duplicates]Number of rows after filtering out deputy emails: ${duplicateData.length}`,
  );

  // Group by coreIdentifierValue
  const grouped = groupBy(duplicateData, 'coreIdentifierValue');
  logger.info(
    `[Duplicates]Number of unique users: ${Object.values(grouped).length}`,
  );

  const metadata = Object.entries(grouped)
    .map(([key, value]) => ({
      key,
      sorted: value.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
      count: value.length,
      countByType: Object.entries(
        groupBy(
          value,
          ({
            type,
            MarketingEmails,
            ProductGuidance,
            ProductInsider,
            name,
            ProductUpdates,
          }) =>
            JSON.stringify({
              type,
              name,
              ProductGuidance,
              ProductInsider,
              ProductUpdates,
              MarketingEmails,
            }),
        ),
      ).map(([type, typeValue]) => ({
        ...JSON.parse(type),
        count: typeValue.length,
      })),
    }))
    .map((x) => ({
      ...x,
      numLoop: x.sorted.reduce(
        (acc, curr, i) =>
          i === 0 ? acc : x.sorted[i - 1].type !== curr.type ? acc + 1 : acc,
        0,
      ),
      numMarketo: x.sorted.reduce(
        (acc, curr, i) =>
          i === 0
            ? acc
            : x.sorted[i - 1].MarketingEmails !== curr.MarketingEmails
            ? acc + 1
            : acc,
        0,
      ),
      lastIsOptedOut:
        x.sorted[0].type.includes('OPT_OUT') ||
        (x.sorted[0].ProductGuidance === false &&
          x.sorted[0].ProductInsider === false &&
          x.sorted[0].ProductUpdates === false &&
          x.sorted[0].MarketingEmails === false),
    }))
    .filter((x) => x.lastIsOptedOut || x.numLoop > 2 || x.numMarketo > 4)
    .map((x) => ({
      coreIdentifierValue: x.key,
      timestamp: new Date().toISOString(),
      ...(x.lastIsOptedOut || x.numLoop > 2
        ? {
            Marketing: false,
            ProductGuidance: false,
            ProductInsider: false,
            ProductUpdates: false,
            MarketingEmails: false,
          }
        : {
            Marketing:
              x.sorted[0].ProductGuidance ||
              x.sorted[0].ProductInsider ||
              x.sorted[0].ProductUpdates,
            ProductGuidance: x.sorted[0].ProductGuidance,
            ProductInsider: x.sorted[0].ProductInsider,
            ProductUpdates: x.sorted[0].ProductUpdates,
            MarketingEmails: false,
          }),
    }));

  logger.info(
    `[Duplicates] Number of users to opt out: ${
      metadata.filter((x) => x.Marketing === false).length
    }`,
  );

  logger.info(
    `[Duplicates] Number of users to opt out of MarketingEmails only: ${
      metadata.filter((x) => x.MarketingEmails === false).length
    }`,
  );

  return metadata;
}

/**
 * Get marketo data, de-duplicate leads by most recent updated at date
 *
 * @returns The data
 */
function getMarketoData(): (MarketoData & {
  /** IS out of sync */
  'Has Duplicate Leads Out-of-Sync': boolean;
})[] {
  // Read in marketo data, lowercase email addresses
  let marketoData = readCsv(MARKETO_FILE, MarketoData).map((d) => ({
    ...d,
    'Email Address': d['Email Address'].toLowerCase(),
    'Has Duplicate Leads Out-of-Sync': false,
  }));

  logger.info(`[Marketo] Number of leads: ${marketoData.length}`);
  const previousLeadCount = marketoData.length;

  marketoData = marketoData.filter((d) => !!d['Email Address']);
  logger.info(
    `[Marketo] Removed ${
      previousLeadCount - marketoData.length
    } leads missing an email address`,
  );

  // De-duplicate marketo leads by most recent updated at date
  const rowsByUserId = groupBy(marketoData, 'Email Address');
  const duplicateIdentifiers = Object.entries(rowsByUserId).filter(
    ([, rows]) => rows.length > 1,
  );
  if (duplicateIdentifiers.length > 0) {
    const previous = marketoData.length;
    marketoData = Object.entries(rowsByUserId).map(([, rows]) => {
      const sorted = rows.sort(
        (a, b) =>
          new Date(b['Updated At']).getTime() -
          new Date(a['Updated At']).getTime(),
      );
      return {
        ...sorted[0],
        'Has Duplicate Leads Out-of-Sync':
          uniq(sorted.map((val) => val.Unsubscribed)).length > 1,
      };
    });
    logger.info(
      `[Marketo] Removed ${
        previous - marketoData.length
      } leads that had duplicate emails (accepted most recent timestamp)`,
    );
  }

  logger.info(`[Marketo] Number of filtered leads: ${marketoData.length}`);
  logger.info(
    `[Marketo] Number of out of sync leads: ${
      marketoData.filter((x) => x['Has Duplicate Leads Out-of-Sync'] === true)
        .length
    }`,
  );

  return marketoData;
}

/**
 * Get customer.io data
 *
 * @returns The data
 */
function getCustomerIoData(): {
  /** User ID */
  userId: string;
  /** Timestamp */
  timestamp: Date;
  /** Marketing emails true/false */
  MarketingEmails: boolean;
  /** Product guidance true/false */
  ProductGuidance: boolean;
  /** Product insider true/false */
  ProductInsider: boolean;
  /** Product updates true/false */
  ProductUpdates: boolean;
  /** Keep track of whether data is in sync with marketo */
  RequiresWorkflowTrigger: boolean;
  /** Keep track of whether data is in customer.io */
  IsInCustomerIo: boolean;
  /** Keep track of whether data is in marketo */
  isInMarketo: boolean;
}[] {
  let customerIoData = readCsv(CUSTOMER_IO_FILE, CustomerIoData).map(
    ({
      email,
      last_login,
      cio_subscription_preferences: preferences,
      unsubscribed,
    }) => {
      const prefs = preferences ? JSON.parse(preferences).topics : {};
      const marketingEmails =
        unsubscribed === 'true'
          ? false
          : typeof prefs.topic_1 === 'boolean'
          ? prefs.topic_1
          : true;
      return {
        userId: email.toLowerCase(),
        timestamp: new Date(
          last_login ? parseInt(last_login, 10) * 1000 : '01/01/2000',
        ),
        MarketingEmails: marketingEmails,
        ProductGuidance:
          unsubscribed === 'true'
            ? false
            : typeof prefs.topic_3 === 'boolean'
            ? prefs.topic_3
            : true,
        ProductInsider:
          unsubscribed === 'true'
            ? false
            : typeof prefs.topic_4 === 'boolean'
            ? prefs.topic_4
            : true,
        ProductUpdates:
          unsubscribed === 'true'
            ? false
            : typeof prefs.topic_2 === 'boolean'
            ? prefs.topic_2
            : true,
        // default to false, will be updated later
        RequiresWorkflowTrigger: !marketingEmails,
        IsInCustomerIo: true,
        isInMarketo: false,
      };
    },
  );
  logger.info(`[Customer.io] Number of people: ${customerIoData.length}`);

  const previousLeadCount = customerIoData.length;
  customerIoData = customerIoData.filter((d) => !!d.userId);
  logger.info(
    `[Customer.io] Removed ${
      previousLeadCount - customerIoData.length
    } rows missing an identifier`,
  );

  const uniqueEmails = uniq(customerIoData.map((d) => d.userId));
  if (uniqueEmails.length !== customerIoData.length) {
    throw new Error(
      `Duplicate email addresses found in file "${CUSTOMER_IO_FILE}"`,
    );
  }

  logger.info(
    `[Customer.io] Number of filtered people: ${customerIoData.length}`,
  );

  return customerIoData;
}

/**
 * Run the file parsing
 */
function runtest(): void {
  // parse data from each
  const marketoData = getMarketoData();
  const customerIoData = getCustomerIoData();
  const duplicateData = getDuplicateData();

  // create output
  let all = [...customerIoData];

  // lookup customer.io data by email address
  const byEmail = keyBy(customerIoData, 'userId');
  const duplicateByEmail = keyBy(duplicateData, 'coreIdentifierValue');

  // count conflicts
  let conflictCount = 0;

  // loop over each marketo data to merge
  marketoData.forEach((d) => {
    // Check if marketo data exists in customer.io
    const existing = byEmail[d['Email Address']];

    // Determine if user is unsubscribed in marketo
    const isSubscribedInMarketo = d.Unsubscribed !== '1';

    // Merge rows together
    if (existing) {
      // Merge timestamps
      const updateDate = d['Updated At'] ? new Date(d['Updated At']) : null;
      if (updateDate && updateDate > existing.timestamp) {
        existing.timestamp = updateDate;
      }

      existing.isInMarketo = true;

      // If two systems are out of sync, unsubscribe the user to be safe
      if (existing.MarketingEmails !== isSubscribedInMarketo) {
        conflictCount += 1;
        existing.MarketingEmails = false;
        existing.RequiresWorkflowTrigger = true;
      } else {
        // In this situation, user already exists in both systems and is fully in sync
        existing.RequiresWorkflowTrigger =
          !!d['Has Duplicate Leads Out-of-Sync'];
      }
    } else {
      // user only exists in marketo
      all.push({
        userId: d['Email Address'],
        timestamp: d['Updated At']
          ? new Date(d['Updated At'])
          : new Date('01/01/2000'),
        MarketingEmails: isSubscribedInMarketo,
        ProductGuidance: true,
        ProductInsider: true,
        ProductUpdates: true,
        RequiresWorkflowTrigger: !isSubscribedInMarketo,
        IsInCustomerIo: false,
        isInMarketo: true,
      });
    }
  });

  let conflictResolutionCount = 0;
  all = all.map((x) => {
    const dupe = duplicateByEmail[x.userId];
    if (!dupe) {
      return x;
    }

    const requiresResolution =
      dupe.MarketingEmails !== x.MarketingEmails ||
      dupe.ProductGuidance !== x.ProductGuidance ||
      dupe.ProductInsider !== x.ProductInsider ||
      dupe.ProductUpdates !== x.ProductUpdates;
    if (!requiresResolution) {
      return x;
    }

    conflictResolutionCount += 1;
    return {
      ...x,
      MarketingEmails: dupe.Marketing,
      ProductGuidance: dupe.ProductGuidance,
      ProductInsider: dupe.ProductInsider,
      ProductUpdates: dupe.ProductUpdates,
      RequiresWorkflowTrigger: true,
    };
  });
  logger.info(
    `Total number of people that need conflict resolution: ${conflictResolutionCount}`,
  );

  const { workflows = [], noworkflows = [] } = groupBy(all, (x) =>
    x.RequiresWorkflowTrigger === true ? 'workflows' : 'noworkflows',
  );
  logger.log(`Total number of rows to insert: ${all.length}`);
  logger.log('Total number of rows with conflicts:', conflictCount);
  logger.log(
    'Total number of rows that require a workflow trigger:',
    workflows.length,
  );
  logger.log(
    'Total number of rows that require just an insert:',
    noworkflows.length,
  );
  logger.info(
    `Total number of people to create in customer.io: ${
      all.filter(
        (x) => x.IsInCustomerIo === false && x.RequiresWorkflowTrigger === true,
      ).length
    }`,
  );
  logger.info(
    `Total number of people to create in marketo: ${
      all.filter(
        (x) => x.isInMarketo === false && x.RequiresWorkflowTrigger === true,
      ).length
    }`,
  );
  const fullOptInCount = all.filter(
    (x) =>
      x.MarketingEmails === true &&
      x.ProductGuidance === true &&
      x.ProductInsider === true &&
      x.ProductUpdates === true,
  ).length;
  const fullOptOutCount = all.filter(
    (x) =>
      x.MarketingEmails === false &&
      x.ProductGuidance === false &&
      x.ProductInsider === false &&
      x.ProductUpdates === false,
  ).length;
  logger.info(
    `Total number of people opted into everything: ${fullOptInCount}`,
  );
  logger.info(
    `Total number of people opted out of everything: ${fullOptOutCount}`,
  );
  logger.info(
    `Total number of people with a mix of opt outs and opt ins: ${
      all.length - fullOptOutCount - fullOptInCount
    }`,
  );

  writeCsv(
    OUTPUT_FILE_WORKFLOWS,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    workflows.map(
      ({ RequiresWorkflowTrigger, IsInCustomerIo, isInMarketo, ...rest }) => ({
        ...rest,
        timestamp: rest.timestamp.toISOString(),
        Marketing:
          rest.MarketingEmails ||
          rest.ProductGuidance ||
          rest.ProductInsider ||
          rest.ProductUpdates,
      }),
    ),
  );
  writeCsv(
    OUTPUT_FILE_NO_WORKFLOWS,
    noworkflows.map(
      ({ RequiresWorkflowTrigger, IsInCustomerIo, isInMarketo, ...rest }) => {
        if (RequiresWorkflowTrigger === true) {
          throw new Error(
            'Should not have any rows with MarketoAndCustomerIoAreInSync true',
          );
        }
        return {
          ...rest,
          timestamp: rest.timestamp.toISOString(),
          Marketing:
            rest.MarketingEmails ||
            rest.ProductGuidance ||
            rest.ProductInsider ||
            rest.ProductUpdates,
        };
      },
    ),
  );
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
runtest();
/* eslint-enable max-lines */
