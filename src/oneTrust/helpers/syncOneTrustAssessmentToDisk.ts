import { logger } from '../../logger';
import colors from 'colors';
import { OneTrustFileFormat } from '../../enums';
import fs from 'fs';
import { OneTrustEnrichedAssessment } from '../codecs';
import { oneTrustAssessmentToJson } from './oneTrustAssessmentToJson';
import { oneTrustAssessmentToCsv } from './oneTrustAssessmentToCsv';

/**
 * Write the assessment to disk at the specified file path.
 *
 *
 * @param param - information about the assessment to write
 */
export const syncOneTrustAssessmentToDisk = ({
  file,
  fileFormat,
  assessment,
  index,
  total,
}: {
  /** The file path to write the assessment to */
  file: string;
  /** The format of the output file */
  fileFormat: OneTrustFileFormat;
  /** The basic assessment */
  assessment: OneTrustEnrichedAssessment;
  /** The index of the assessment being written to the file */
  index: number;
  /** The total amount of assessments that we will write */
  total: number;
}): void => {
  logger.info(
    colors.magenta(
      `Writing enriched assessment ${
        index + 1
      } of ${total} to file "${file}"...`,
    ),
  );

  if (fileFormat === OneTrustFileFormat.Json) {
    fs.appendFileSync(
      file,
      oneTrustAssessmentToJson({
        assessment,
        index,
        total,
      }),
    );
  } else if (fileFormat === OneTrustFileFormat.Csv) {
    fs.appendFileSync(file, oneTrustAssessmentToCsv({ assessment, index }));
  }
};
