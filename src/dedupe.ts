import { readCsv } from './requests';
import groupBy from 'lodash/groupBy';
import * as t from 'io-ts';
import { logger } from './logger';
import { writeCsv } from './cron';

// yarn ts-node --transpile-only ./src/test.ts

// Variables
const DUPLICATE_FILE =
  '/Users/michaelfarrell/Desktop/deputy/duplicate_requests.csv';
const DUPLICATE_OUT_FILE =
  '/Users/michaelfarrell/Desktop/deputy/duplicate_out_requests.csv';

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
function getDuplicateData(): (DuplicateData & {
  /** MarketingEmails preference */
  MarketingEmails?: boolean;
  /** ProductGuidance preference */
  ProductGuidance?: boolean;
  /** ProductInsider preference */
  ProductInsider?: boolean;
  /** ProductUpdates preference */
  ProductUpdates?: boolean;
})[] {
  // Read in duplicate data, lowercase email addresses
  let duplicateData = readCsv(DUPLICATE_FILE, DuplicateData).map(
    ({ preferences, ...d }) => ({
      ...d,
      ...JSON.parse(preferences),
    }),
  );
  // total rows
  logger.info(`Number of rows: ${duplicateData.length}`);

  // filter out deputy emails
  duplicateData = duplicateData.filter(
    (x) => !x.coreIdentifierValue.includes('@deputy.com'),
  );
  logger.info(
    `Number of rows after filtering out deputy emails: ${duplicateData.length}`,
  );

  return duplicateData;
}

/**
 * Run the file parsing
 */
function runtest(): void {
  // parse data from each
  const duplicateData = getDuplicateData();

  // Group by coreIdentifierValue
  const grouped = groupBy(duplicateData, 'coreIdentifierValue');
  logger.info(`Number of unique users: ${Object.values(grouped).length}`);

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
    `Number of users to opt out: ${
      metadata.filter((x) => x.Marketing === false).length
    }`,
  );

  logger.info(
    `Number of users to opt out of MarketingEmails only: ${
      metadata.filter((x) => x.MarketingEmails === false).length
    }`,
  );

  writeCsv(DUPLICATE_OUT_FILE, metadata);
}
runtest();
