import { GraphQLClient } from 'graphql-request';
import { REQUEST_ENRICHERS } from './gqls';
import { makeGraphQLRequest } from './makeGraphQLRequest';

export interface RequestEnricher {
  /** ID of request */
  id: string;
  /** Name of identifier */
  enricher: {
    /** ID of enricher */
    id: string;
    /** Title of enricher */
    title: string;
    /** Typeof of enricher */
    type: string;
  };
  /** The status of the enricher */
  status: string;
}

const PAGE_SIZE = 50;

/**
 * Fetch all request enrichers for a particular request
 *
 * @param client - GraphQL client
 * @param options - Filter options
 * @returns List of request enrichers
 */
export async function fetchAllRequestEnrichers(
  client: GraphQLClient,
  {
    requestId,
  }: {
    /** ID of request to filter on */
    requestId: string;
  },
): Promise<RequestEnricher[]> {
  const requestEnrichers: RequestEnricher[] = [];
  let offset = 0;

  // Paginate
  let shouldContinue = false;
  do {
    const {
      requestEnrichers: { nodes },
      // eslint-disable-next-line no-await-in-loop
    } = await makeGraphQLRequest(client, REQUEST_ENRICHERS, {
      first: PAGE_SIZE,
      offset,
      requestId,
    });
    requestEnrichers.push(...nodes);
    offset += PAGE_SIZE;
    shouldContinue = nodes.length === PAGE_SIZE;
  } while (shouldContinue);

  return requestEnrichers;
}
