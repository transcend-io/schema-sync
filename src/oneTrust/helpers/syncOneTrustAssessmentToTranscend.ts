import { logger } from '../../logger';
import { oneTrustAssessmentToCsvRecord } from './oneTrustAssessmentToCsvRecord';
import { GraphQLClient } from 'graphql-request';
import {
  IMPORT_ONE_TRUST_ASSESSMENT_FORMS,
  makeGraphQLRequest,
} from '../../graphql';
import { ImportOnetrustAssessmentsInput } from '../../codecs';
import { OneTrustEnrichedAssessment } from '../codecs';

export interface AssessmentForm {
  /** ID of Assessment Form */
  id: string;
  /** Title of Assessment Form */
  name: string;
}

/**
 * Write the assessment to a Transcend instance.
 *
 *
 * @param param - information about the assessment and Transcend instance to write to
 */
export const syncOneTrustAssessmentToTranscend = async ({
  transcend,
  assessment,
}: {
  /** the Transcend client instance */
  transcend: GraphQLClient;
  /** the assessment to sync to Transcend */
  assessment: OneTrustEnrichedAssessment;
}): Promise<AssessmentForm | undefined> => {
  logger.info();

  // convert the OneTrust assessment object into a CSV Record (a map from the csv header to values)
  const csvRecord = oneTrustAssessmentToCsvRecord(assessment);

  // transform the csv record into a valid input to the mutation
  const input: ImportOnetrustAssessmentsInput = {
    rows: [
      {
        columns: Object.entries(csvRecord).map(([key, value]) => ({
          title: key,
          value: value.toString(),
        })),
      },
    ],
  };

  const {
    importOneTrustAssessmentForms: { assessmentForms },
  } = await makeGraphQLRequest<{
    /** the importOneTrustAssessmentForms mutation */
    importOneTrustAssessmentForms: {
      /** Created Assessment Forms */
      assessmentForms: AssessmentForm[];
    };
  }>(transcend, IMPORT_ONE_TRUST_ASSESSMENT_FORMS, {
    input,
  });

  return assessmentForms[0];
};
