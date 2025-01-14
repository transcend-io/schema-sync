import { decodeCodec } from '@transcend-io/type-utils';
import { OneTrustEnrichedAssessment } from '../codecs';
import { DEFAULT_ONE_TRUST_ASSESSMENT_CSV_HEADER } from './constants';
import { flattenOneTrustAssessment } from './flattenOneTrustAssessment';
import { OneTrustAssessmentCsvRecord } from '@transcend-io/privacy-types';

/**
 * Converts the assessment into a csv record (i.e. a map from the csv header
 * to values). It always returns a record with every key in the same order.
 *
 * @param assessment - the assessment to convert to a csv record
 * @returns a stringified csv entry ready to be appended to a file
 */
export const oneTrustAssessmentToCsvRecord = (
  /** The assessment to convert */
  assessment: OneTrustEnrichedAssessment,
): OneTrustAssessmentCsvRecord => {
  // flatten the assessment object so it does not have nested properties
  const flatAssessment = flattenOneTrustAssessment(assessment);

  // transform the flat assessment to have all CSV keys in the expected order
  const flatAssessmentFull = Object.fromEntries(
    DEFAULT_ONE_TRUST_ASSESSMENT_CSV_HEADER.map((header) => {
      const value = flatAssessment[header] ?? '';
      const escapedValue =
        typeof value === 'string' &&
        (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      return [header, escapedValue];
    }),
  );

  // ensure the record has the expected type!
  return decodeCodec(OneTrustAssessmentCsvRecord, flatAssessmentFull);
};
