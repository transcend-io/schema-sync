import { ConsentManagerInput } from '../codecs';
import { GraphQLClient } from 'graphql-request';
import {
  UPDATE_CONSENT_MANAGER_DOMAINS,
  FETCH_PRIVACY_CENTER_ID,
  CREATE_CONSENT_MANAGER,
  DEPLOYED_PRIVACY_CENTER_URL,
} from './gqls';
import { makeGraphQLRequest } from './makeGraphQLRequest';
import { fetchConsentManagerId } from './fetchConsentManagerId';

/**
 * Sync the consent manager
 *
 * @param client - GraphQL client
 * @param consentManager - The consent manager input
 */
export async function syncConsentManager(
  client: GraphQLClient,
  consentManager: ConsentManagerInput,
): Promise<void> {
  let airgapBundleId: string;
  try {
    airgapBundleId = await fetchConsentManagerId(client, 1);
  } catch (err) {
    // FIXME
    if (err.message.includes('AirgapBundle not found')) {
      const { organization } = await makeGraphQLRequest<{
        /** Organization */
        organization: {
          /** URL */
          deployedPrivacyCenterUrl: string;
        };
      }>(client, DEPLOYED_PRIVACY_CENTER_URL);

      const { privacyCenter } = await makeGraphQLRequest<{
        /** Privacy center */
        privacyCenter: {
          /** ID */
          id: string;
        };
      }>(client, FETCH_PRIVACY_CENTER_ID, {
        url: organization.deployedPrivacyCenterUrl,
      });

      const { createConsentManager } = await makeGraphQLRequest<{
        /** Create consent manager */
        createConsentManager: {
          /** Consent manager */
          consentManager: {
            /** ID */
            id: string;
          };
        };
      }>(client, CREATE_CONSENT_MANAGER, {
        domains: consentManager.domains,
        privacyCenterId: privacyCenter.id,
      });
      airgapBundleId = createConsentManager.consentManager.id;
    } else {
      throw err;
    }
  }
  if (consentManager.domains) {
    await makeGraphQLRequest(client, UPDATE_CONSENT_MANAGER_DOMAINS, {
      domains: consentManager.domains,
      airgapBundleId,
    });
  }
}
