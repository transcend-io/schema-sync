#!/usr/bin/env node
import { logger } from './logger';

import colors from 'colors';
import { parseCliSyncOtArguments, createOneTrustGotInstance } from './oneTrust';
import { OneTrustPullResource } from './enums';
import { syncOneTrustAssessments } from './oneTrust/helpers/syncOneTrustAssessments';
import { buildTranscendGraphQLClient } from './graphql';

/**
 * Pull configuration from OneTrust down locally to disk
 *
 * Dev Usage:
 * yarn ts-node ./src/cli-sync-ot.ts --hostname=customer.my.onetrust.com --oneTrustAuth=$ONE_TRUST_OAUTH_TOKEN --transcendAuth=$TRANSCEND_API_KEY
 *
 * Standard usage
 * yarn cli-sync-ot --hostname=customer.my.onetrust.com --oneTrustAuth=$ONE_TRUST_OAUTH_TOKEN --transcendAuth=$TRANSCEND_API_KEY
 */
async function main(): Promise<void> {
  const {
    file,
    fileFormat,
    hostname,
    oneTrustAuth,
    transcendAuth,
    transcendUrl,
    resource,
    debug,
    dryRun,
  } = parseCliSyncOtArguments();

  // use the hostname and auth token to instantiate a client to talk to OneTrust
  const oneTrust = createOneTrustGotInstance({ hostname, auth: oneTrustAuth });

  try {
    if (resource === OneTrustPullResource.Assessments) {
      await syncOneTrustAssessments({
        oneTrust,
        file,
        fileFormat,
        dryRun,
        ...(transcendAuth && transcendUrl
          ? {
              transcend: buildTranscendGraphQLClient(
                transcendUrl,
                transcendAuth,
              ),
            }
          : {}),
      });
    }
  } catch (err) {
    logger.error(
      colors.red(
        `An error occurred syncing the resource ${resource} from OneTrust: ${
          debug ? err.stack : err.message
        }`,
      ),
    );
    process.exit(1);
  }

  // Indicate success
  logger.info(
    colors.green(
      `Successfully synced OneTrust ${resource} to ${
        dryRun ? `disk at "${file}"` : 'Transcend'
      }!`,
    ),
  );
}

main();
