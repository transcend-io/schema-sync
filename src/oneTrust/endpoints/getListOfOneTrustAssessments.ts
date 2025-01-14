import { Got } from 'got';
import { logger } from '../../logger';
import { decodeCodec } from '@transcend-io/type-utils';
import {
  OneTrustAssessment,
  OneTrustGetListOfAssessmentsResponse,
} from '@transcend-io/privacy-types';

/**
 * Fetch a list of all assessments from the OneTrust client.
 * ref: https://developer.onetrust.com/onetrust/reference/getallassessmentbasicdetailsusingget
 *
 * @param param - the information about the OneTrust client
 * @returns a list of OneTrustAssessment
 */
export const getListOfOneTrustAssessments = async ({
  oneTrust,
}: {
  /** The OneTrust client instance */
  oneTrust: Got;
}): Promise<OneTrustAssessment[]> => {
  let currentPage = 0;
  let totalPages = 1;
  let totalElements = 0;

  const allAssessments: OneTrustAssessment[] = [];

  while (currentPage < totalPages) {
    // eslint-disable-next-line no-await-in-loop
    const { body } = await oneTrust.get(
      `api/assessment/v2/assessments?page=${currentPage}&size=2000`,
    );

    const { page, content } = decodeCodec(
      OneTrustGetListOfAssessmentsResponse,
      body,
    );
    allAssessments.push(...(content ?? []));
    if (currentPage === 0) {
      totalPages = page?.totalPages ?? 0;
      totalElements = page?.totalElements ?? 0;
    }
    currentPage += 1;

    // log progress
    logger.info(
      `Fetched ${allAssessments.length} of ${totalElements} assessments.`,
    );
  }

  return allAssessments;
};
