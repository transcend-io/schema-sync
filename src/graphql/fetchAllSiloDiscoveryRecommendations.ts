import { GraphQLClient } from 'graphql-request';
import { SILO_DISCOVERY_RECOMMENDATIONS } from './gqls';
import { makeGraphQLRequest } from './makeGraphQLRequest';

export interface SiloDiscoveryRecommendation {
  /** Title of silo discovery recommendation */
  title: string;
  /** Resource ID of silo discovery recommendation */
  resourceId: string;
  /** Last discovered at */
  lastDiscoveredAt: string;
  /** Suggested catalog */
  suggestedCatalog: {
    /** Title */
    title: string;
  };
  /** The plugin that found this recommendation */
  plugin: {
    /** The data silo the plugin belongs to */
    dataSilo: {
      /** The internal display title */
      title: string;
    };
  };
}

const PAGE_SIZE = 30;

/**
 * Fetch all silo discovery recommendations in the organization
 *
 * @param client - GraphQL client
 * @returns All silo discovery recommendations in the organization
 */
export async function fetchAllSiloDiscoveryRecommendations(
  client: GraphQLClient,
): Promise<SiloDiscoveryRecommendation[]> {
  const siloDiscoveryRecommendations: SiloDiscoveryRecommendation[] = [];
  let lastKey = null;

  // Whether to continue looping
  let shouldContinue = false;
  do {
    /**
     * Input for the GraphQL request
     */
    const input: {
      /** whether to list pending or ignored recommendations */
      isPending: boolean;
      /** key for previous page */
      lastKey?: {
        /** ID of plugin that found recommendation */
        pluginId: string;
        /** unique identifier for the resource */
        resourceId: string;
        /** ID of organization resource belongs to */
        organizationId: string;
        /** Status of recommendation, concatenated with latest run time */
        statusLatestRunTime: string;
      } | null;
    } = lastKey
      ? {
          isPending: true,
          lastKey,
        }
      : {
          isPending: true,
        };

    const {
      siloDiscoveryRecommendations: { nodes, lastKey: newLastKey },
      // eslint-disable-next-line no-await-in-loop
    } = await makeGraphQLRequest<{
      /** Silo Discovery Recommendations */
      siloDiscoveryRecommendations: {
        /** List */
        nodes: SiloDiscoveryRecommendation[];
        /**
         * Last key for pagination
         */
        lastKey: {
          /** ID of plugin that found recommendation */
          pluginId: string;
          /** unique identifier for the resource */
          resourceId: string;
          /** ID of organization resource belongs to */
          organizationId: string;
          /** Status of recommendation, concatenated with latest run time */
          statusLatestRunTime: string;
        } | null;
      };
    }>(client, SILO_DISCOVERY_RECOMMENDATIONS, {
      first: PAGE_SIZE,
      input,
      filterBy: {},
    });

    /**
     * TODO: https://transcend.height.app/T-41786
     * This is a temporary fix to ensure that recommendations without titles are given the title of their suggested catalog.
     */
    const titledNodes = nodes.map((node) => {
      if (
        node.title === null &&
        node.suggestedCatalog &&
        node.suggestedCatalog.title
      ) {
        return { ...node, title: node.suggestedCatalog.title };
      }
      return node;
    });

    siloDiscoveryRecommendations.push(...titledNodes);
    lastKey = newLastKey;
    shouldContinue = nodes.length === PAGE_SIZE && lastKey !== null;
  } while (shouldContinue);

  return siloDiscoveryRecommendations;
}
