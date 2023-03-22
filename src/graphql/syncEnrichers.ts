import { EnricherInput } from '../codecs';
import { GraphQLClient } from 'graphql-request';
import { ENRICHERS, CREATE_ENRICHER, UPDATE_ENRICHER } from './gqls';
import { EnricherType, RequestAction } from '@transcend-io/privacy-types';
import { Identifier } from './fetchIdentifiers';
import { makeGraphQLRequest } from './makeGraphQLRequest';

export interface Enricher {
  /** ID of enricher */
  id: string;
  /** Title of enricher */
  title: string;
  /** URL of enricher */
  url: string;
  /** Server silo */
  type: EnricherType;
  /** Input identifier */
  inputIdentifier: {
    /** Identifier name */
    name: string;
  };
  /** The selected actions */
  actions: RequestAction[];
  /** Output identifiers */
  identifiers: {
    /** Identifier name */
    name: string;
  }[];
}

const PAGE_SIZE = 20;

/**
 * Fetch all enrichers in the organization
 *
 * @param client - GraphQL client
 * @param title - Filter by title
 * @returns All enrichers in the organization
 */
export async function fetchAllEnrichers(
  client: GraphQLClient,
  title?: string,
): Promise<Enricher[]> {
  const enrichers: Enricher[] = [];
  let offset = 0;

  // Try to fetch an enricher with the same title
  let shouldContinue = false;
  do {
    const {
      enrichers: { nodes },
      // eslint-disable-next-line no-await-in-loop
    } = await makeGraphQLRequest<{
      /** Query response */
      enrichers: {
        /** List of matches */
        nodes: Enricher[];
      };
    }>(client, ENRICHERS, {
      first: PAGE_SIZE,
      offset,
      title,
    });
    enrichers.push(...nodes);
    offset += PAGE_SIZE;
    shouldContinue = nodes.length === PAGE_SIZE;
  } while (shouldContinue);

  return enrichers;
}

/**
 * Sync an enricher configuration
 *
 * @param enricher - The enricher input
 * @param client - GraphQL client
 * @param identifiersByName - Index of identifiers in the organization
 */
export async function syncEnricher(
  enricher: EnricherInput,
  client: GraphQLClient,
  identifiersByName: { [name in string]: Identifier },
): Promise<void> {
  // Try to fetch an enricher with the same title
  const matches = await fetchAllEnrichers(client, enricher.title);
  const existingEnricher = matches.find(
    ({ title }) => title === enricher.title,
  );

  // If enricher exists, update it, else create new
  const inputIdentifier = enricher['input-identifier'];
  const actionUpdates =
    enricher['privacy-actions'] || Object.values(RequestAction);
  if (existingEnricher) {
    await makeGraphQLRequest(client, UPDATE_ENRICHER, {
      id: existingEnricher.id,
      title: enricher.title,
      url: enricher.url,
      headers: enricher.headers,
      description: enricher.description || '',
      inputIdentifier: inputIdentifier
        ? identifiersByName[inputIdentifier].id
        : undefined,
      identifiers: enricher['output-identifiers'].map(
        (id) => identifiersByName[id].id,
      ),
      actions: actionUpdates,
    });
  } else if (inputIdentifier) {
    await makeGraphQLRequest(client, CREATE_ENRICHER, {
      title: enricher.title,
      url: enricher.url,
      headers: enricher.headers,
      description: enricher.description || '',
      inputIdentifier: identifiersByName[inputIdentifier].id,
      identifiers: enricher['output-identifiers'].map(
        (id) => identifiersByName[id].id,
      ),
      actions: actionUpdates,
    });
  }
}
