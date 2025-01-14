import { logger } from '../../logger';
import colors from 'colors';
import yargs from 'yargs-parser';
import { OneTrustFileFormat, OneTrustPullResource } from '../../enums';

const VALID_RESOURCES = Object.values(OneTrustPullResource);
const VALID_FILE_FORMATS = Object.values(OneTrustFileFormat);

interface OneTrustCliArguments {
  /** The name of the file to write the resources to */
  file: string;
  /** The OneTrust hostname to send the requests to */
  hostname: string;
  /** The OAuth Bearer token used to authenticate the requests */
  auth: string;
  /** The resource to pull from OneTrust */
  resource: OneTrustPullResource;
  /** Whether to enable debugging while reporting errors */
  debug: boolean;
  /** The export format of the file where to save the resources */
  fileFormat: OneTrustFileFormat;
  /** Whether to export the resource into a file rather than push to transcend */
  dryRun: boolean;
}

/**
 * Parse the command line arguments
 *
 * @returns the parsed arguments
 */
export const parseCliSyncOtArguments = (): OneTrustCliArguments => {
  const { file, hostname, auth, resource, debug, fileFormat, dryRun } = yargs(
    process.argv.slice(2),
    {
      string: ['file', 'hostname', 'auth', 'resource', 'fileFormat', 'dryRun'],
      boolean: ['debug', 'dryRun'],
      default: {
        resource: OneTrustPullResource.Assessments,
        fileFormat: OneTrustFileFormat.Csv,
        debug: false,
        dryRun: false,
      },
    },
  );

  // Can only sync to Transcend via a CSV file format!
  if (!dryRun && fileFormat !== OneTrustFileFormat.Csv) {
    logger.error(
      colors.red(
        `The "fileFormat" parameter must equal ${OneTrustFileFormat.Csv} when "dryRun" is "false".`,
      ),
    );
    return process.exit(1);
  }

  // If trying to sync to disk, must specify a file path
  if (dryRun && !file) {
    logger.error(
      colors.red(
        'Must set a "file" parameter when "dryRun" is "true". e.g. --file=./oneTrustAssessments.json',
      ),
    );
    return process.exit(1);
  }

  // If trying to sync to disk, must specify a file format
  if (dryRun && !fileFormat) {
    logger.error(
      colors.red(
        `Must set a "fileFormat" parameter when "dryRun" is "true". e.g. --fileFormat=${
          OneTrustFileFormat.Json
        }. Supported formats: ${VALID_FILE_FORMATS.join(',')}`,
      ),
    );
    return process.exit(1);
  }

  const splitFile = file.split('.');
  if (splitFile.length < 2) {
    logger.error(
      colors.red(
        'The "file" parameter has an invalid format. Expected a path with extensions. e.g. --file=./pathToFile.json.',
      ),
    );
    return process.exit(1);
  }
  if (splitFile.at(-1) !== fileFormat) {
    logger.error(
      colors.red(
        `The "file" and "fileFormat" parameters must specify the same format! Got file=${file} and fileFormat=${fileFormat}`,
      ),
    );
    return process.exit(1);
  }

  if (!hostname) {
    logger.error(
      colors.red(
        'Missing required parameter "hostname". e.g. --hostname=customer.my.onetrust.com',
      ),
    );
    return process.exit(1);
  }

  if (!auth) {
    logger.error(
      colors.red(
        'Missing required parameter "auth". e.g. --auth=$ONE_TRUST_AUTH_TOKEN',
      ),
    );
    return process.exit(1);
  }
  if (!VALID_RESOURCES.includes(resource)) {
    logger.error(
      colors.red(
        `Received invalid resource value: "${resource}". Allowed: ${VALID_RESOURCES.join(
          ',',
        )}`,
      ),
    );
    return process.exit(1);
  }
  if (!VALID_FILE_FORMATS.includes(fileFormat)) {
    logger.error(
      colors.red(
        `Received invalid fileFormat value: "${fileFormat}". Allowed: ${VALID_FILE_FORMATS.join(
          ',',
        )}`,
      ),
    );
    return process.exit(1);
  }

  return {
    file,
    hostname,
    auth,
    resource,
    debug,
    fileFormat,
    dryRun,
  };
};
