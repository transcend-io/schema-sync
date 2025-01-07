import { Got } from 'got';
import { logger } from '../logger';
import {
  OneTrustAssessment,
  OneTrustGetListOfAssessmentsResponse,
} from './types';

/**
 * Fetch a list of all assessments from the OneTrust client.
 *
 * @param param - the information about the OneTrust client
 * @returns a list of OneTrustAssessment
 */
export const getListOfAssessments = async ({
  oneTrust,
}: {
  /** The OneTrust client instance */
  oneTrust: Got;
}): Promise<OneTrustAssessment[]> => {
  let currentPage = 0;
  let totalPages = 1;
  let totalElements = 0;

  const allAssessments: OneTrustAssessment[] = [];

  logger.info('Getting list of OneTrust assessments...');
  while (currentPage < totalPages) {
    // eslint-disable-next-line no-await-in-loop
    const { body } = await oneTrust.get(
      `api/assessment/v2/assessments?page=${currentPage}&size=2000`,
    );
    const parsedBody = JSON.parse(body) as OneTrustGetListOfAssessmentsResponse;
    const assessments = parsedBody.content ?? [];
    allAssessments.push(...assessments);
    const page = parsedBody.page ?? { totalPages: 0, totalElements: 0 };
    if (currentPage === 0) {
      totalPages = page.totalPages;
      totalElements = page.totalElements;
    }
    currentPage += 1;

    // log progress
    logger.info(
      `Fetched ${allAssessments.length} of ${totalElements} assessments.`,
    );
  }

  return allAssessments;
};
