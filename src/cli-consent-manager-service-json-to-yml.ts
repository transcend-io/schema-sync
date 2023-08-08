#!/usr/bin/env/node
import * as t from 'io-ts';
import { writeTranscendYaml } from './readTranscendYaml';
import yargs from 'yargs-parser';
import colors from 'colors';
import { logger } from './logger';
import { existsSync, readFileSync } from 'fs';
import { decodeCodec } from '@transcend-io/type-utils';
import {
  ConsentManagerServiceMetadata,
  CookieInput,
  DataFlowInput,
} from './codecs';
import {
  ConsentTrackerStatus,
  DataFlowScope,
} from '@transcend-io/privacy-types';

/**
 * Take the output of (await airgap.getMetadata()).services and format into
 * a yaml file that tr-push can push up
 *
 * yarn ts-node ./src/cli-consent-manager-service-json-to-yml.ts \
 *   --file=./services.json \
 *   --output=./transcend.yml
 *
 * Standard usage:
 * yarn tr-consent-manager-service-json-to-yml \
 *   --file=./services.json \
 *   --output=./transcend.yml
 */
function main(): void {
  // Parse command line arguments
  const { file = './services.json', output = './transcend.yml' } = yargs(
    process.argv.slice(2),
  ) as { [k in string]: string };

  // Ensure files exist
  if (!existsSync(file)) {
    logger.error(colors.red(`File does not exist: --file="${file}"`));
    process.exit(1);
  }

  // Read in each consent manager configuration
  const services = decodeCodec(
    t.array(ConsentManagerServiceMetadata),
    readFileSync(file, 'utf-8'),
  );

  // Create data flows and cookie configurations
  const dataFlows: DataFlowInput[] = [];
  const cookies: CookieInput[] = [];
  services.forEach((service) => {
    service.dataFlows
      .filter(({ type }) => type !== DataFlowScope.CSP)
      .forEach((dataFlow) => {
        dataFlows.push({
          value: dataFlow.value,
          type: dataFlow.type,
          status: ConsentTrackerStatus.Live,
          trackingPurposes: dataFlow.trackingPurposes,
        });
      });

    service.cookies.forEach((cookie) => {
      cookies.push({
        name: cookie.name,
        status: ConsentTrackerStatus.Live,
        trackingPurposes: cookie.trackingPurposes,
      });
    });
  });

  // write to disk
  writeTranscendYaml(output, {
    'data-flows': dataFlows,
    cookies,
  });

  logger.info(
    colors.green(
      `Successfully wrote ${dataFlows.length} data flows and ${cookies.length} cookies to file "${output}"`,
    ),
  );
}

main();
