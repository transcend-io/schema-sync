import { GraphQLClient } from 'graphql-request';
import colors from 'colors';
import { REQUESTS } from './gqls';
import * as t from 'io-ts';
import cliProgress from 'cli-progress';
import { valuesOf } from '@transcend-io/type-utils';
import { makeGraphQLRequest } from './makeGraphQLRequest';
import {
  RequestAction,
  RequestOrigin,
  RequestStatus,
  IsoCountryCode,
  IsoCountrySubdivisionCode,
} from '@transcend-io/privacy-types';
import { logger } from '../logger';
import { LanguageKey } from '@transcend-io/internationalization';

export const PrivacyRequest = t.type({
  /** Request ID */
  id: t.string,
  /** Time request was made */
  createdAt: t.string,
  /** Email of request */
  email: t.string,
  /** The type of request */
  type: valuesOf(RequestAction),
  /** Link to request in Transcend dashboard */
  link: t.string,
  /** Whether request is in silent mode */
  isSilent: t.boolean,
  /** Where request was made */
  origin: valuesOf(RequestOrigin),
  /** Whether request is a test request */
  isTest: t.boolean,
  /** The core identifier of the request */
  coreIdentifier: t.string,
  /** Request details */
  details: t.string,
  /** Locale of request */
  locale: valuesOf(LanguageKey),
  /** Status of request */
  status: valuesOf(RequestStatus),
  /** Type of data subject */
  subjectType: t.string,
  /** Country of request */
  country: t.union([t.null, valuesOf(IsoCountryCode)]),
  /** Subdivision of request */
  countrySubDivision: t.union([t.null, valuesOf(IsoCountrySubdivisionCode)]),
  /** Request attributes */
  attributeValues: t.array(
    t.type({
      id: t.string,
      attributeKey: t.type({ name: t.string, id: t.string }),
      name: t.string,
    }),
  ),
});

/** Type override */
export type PrivacyRequest = t.TypeOf<typeof PrivacyRequest>;

const PAGE_SIZE = 50;

/**
 * Fetch all requests matching a set of filters
 *
 * @param client - GraphQL client
 * @param options - Filter options
 * @returns List of requests
 */
export async function fetchAllRequests(
  client: GraphQLClient,
  {
    actions = [],
    statuses = [],
    createdAtBefore,
    createdAtAfter,
    showTests,
  }: {
    /** Actions to filter on */
    actions?: RequestAction[];
    /** Statuses to filter on */
    statuses?: RequestStatus[];
    /** Filter for requests created before this date */
    createdAtBefore?: Date;
    /** Filter for requests created after this date */
    createdAtAfter?: Date;
    /** Return test requests */
    showTests?: boolean;
  } = {},
): Promise<PrivacyRequest[]> {
  // create a new progress bar instance and use shades_classic theme
  const t0 = new Date().getTime();
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
  );

  // read in requests
  const requests: PrivacyRequest[] = [];
  let offset = 0;

  // Paginate
  let shouldContinue = false;
  do {
    const {
      requests: { nodes, totalCount },
      // eslint-disable-next-line no-await-in-loop
    } = await makeGraphQLRequest(client, REQUESTS, {
      first: PAGE_SIZE,
      offset,
      filterBy: {
        type: actions.length > 0 ? actions : undefined,
        status: statuses.length > 0 ? statuses : undefined,
        isTest: showTests,
        createdAtBefore: createdAtBefore
          ? createdAtBefore.toISOString()
          : undefined,
        createdAtAfter: createdAtAfter
          ? createdAtAfter.toISOString()
          : undefined,
      },
    });
    if (offset === 0 && totalCount > PAGE_SIZE) {
      logger.info(colors.magenta(`Fetching ${totalCount} requests`));
      progressBar.start(totalCount, 0);
    }

    requests.push(...nodes);
    offset += PAGE_SIZE;
    progressBar.update(offset);
    shouldContinue = nodes.length === PAGE_SIZE;
  } while (shouldContinue);

  progressBar.stop();
  const t1 = new Date().getTime();
  const totalTime = t1 - t0;

  // Log completion time
  logger.info(
    colors.green(
      `Completed fetching of ${requests.length} request in "${
        totalTime / 1000
      }" seconds.`,
    ),
  );

  return requests;
}
