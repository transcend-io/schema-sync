import { OneTrustEnrichedAssessment } from '../codecs';
import { oneTrustAssessmentToCsvRecord } from './oneTrustAssessmentToCsvRecord';

/**
 * Converts the assessment into a csv entry.
 *
 * @param param - information about the assessment and amount of entries
 * @returns a stringified csv entry ready to be appended to a file
 */
export const oneTrustAssessmentToCsv = ({
  assessment,
  index,
}: {
  /** The assessment to convert */
  assessment: OneTrustEnrichedAssessment;
  /** The position of the assessment in the final Json object */
  index: number;
}): string => {
  const assessmentCsvRecord = oneTrustAssessmentToCsvRecord(assessment);

  // write csv header at the beginning of the file
  const csvRows = [];
  if (index === 0) {
    const header = Object.keys(assessmentCsvRecord).join(',');
    csvRows.push(header);
  }

  // append the row
  const row = `${Object.values(assessmentCsvRecord).join(',')}\n`;
  csvRows.push(row);

  return csvRows.join('\n');
};
