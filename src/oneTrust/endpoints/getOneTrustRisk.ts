import { Got } from 'got';
import { decodeCodec } from '@transcend-io/type-utils';
import { OneTrustGetRiskResponse } from '@transcend-io/privacy-types';

/**
 * Retrieve details about a particular risk.
 * ref: https://developer.onetrust.com/onetrust/reference/getriskusingget
 *
 * @param param - the information about the OneTrust client and risk to retrieve
 * @returns the OneTrust risk
 */
export const getOneTrustRisk = async ({
  oneTrust,
  riskId,
}: {
  /** The OneTrust client instance */
  oneTrust: Got;
  /** The ID of the OneTrust risk to retrieve */
  riskId: string;
}): Promise<OneTrustGetRiskResponse> => {
  const { body } = await oneTrust.get(`api/risk/v2/risks/${riskId}`);

  return decodeCodec(OneTrustGetRiskResponse, body);
};
