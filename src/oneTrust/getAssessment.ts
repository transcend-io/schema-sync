import { Got } from 'got';
import { OneTrustGetAssessmentResponse } from './types';

/**
 * Retrieve details about a particular assessment.
 *
 * @param param - the information about the OneTrust client and assessment to retrieve
 * @returns details about the assessment
 */
export const getAssessment = async ({
  oneTrust,
  assessmentId,
}: {
  /** The OneTrust client instance */
  oneTrust: Got;
  /** The ID of the assessment to retrieve */
  assessmentId: string;
}): Promise<OneTrustGetAssessmentResponse> => {
  const { body } = await oneTrust.get(
    `api/assessment/v2/assessments/${assessmentId}/export?ExcludeSkippedQuestions=false`,
  );

  return JSON.parse(body) as OneTrustGetAssessmentResponse;
};
