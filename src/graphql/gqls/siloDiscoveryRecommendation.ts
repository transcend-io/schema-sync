import { gql } from 'graphql-request';

export const SILO_DISCOVERY_RECOMMENDATIONS = gql`
  query TranscendCliSiloDiscoveryRecommendations(
    $first: Int
    $input: SiloDiscoveryRecommendationsInput!
  ) {
    siloDiscoveryRecommendations(first: $first, input: $input) {
      nodes {
        title
        resourceId
        lastDiscoveredAt
        suggestedCatalog {
          title
        }
        plugin {
          dataSilo {
            title
          }
        }
      }
      lastKey {
        pluginId
        resourceId
        organizationId
        statusLatestRunTime
      }
    }
  }
`;
