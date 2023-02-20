import colors from 'colors';
import { map } from 'bluebird';
import { logger } from '../logger';
import { createSombraGotInstance } from '../graphql';
import {
  enrichPrivacyRequest,
  EnrichPrivacyRequest,
} from './enrichPrivacyRequest';
import { readCsv } from '../requests';

/**
 * Push a CSV of enriched requests back into Transcend
 *
 * @param options - Options
 * @returns Number of items processed
 */
export async function pushManualEnrichmentIdentifiersFromCsv({
  file,
  auth,
  sombraAuth,
  concurrency = 100,
  transcendUrl = 'https://api.transcend.io',
}: {
  /** CSV file path */
  file: string;
  /** Transcend API key authentication */
  auth: string;
  /** Sombra API key authentication */
  sombraAuth?: string;
  /** Concurrency */
  concurrency?: number;
  /** API URL for Transcend backend */
  transcendUrl?: string;
}): Promise<number> {
  // Create sombra instance to communicate with
  const sombra = await createSombraGotInstance(transcendUrl, auth, sombraAuth);

  // Read from CSV
  logger.info(colors.magenta(`Reading "${file}" from disk`));
  const activeResults = readCsv(file, EnrichPrivacyRequest);
  console.log(Object.keys(activeResults[0])[0]);
  console.log(activeResults[0].id);
  console.log(activeResults[0]);

  // Notify Transcend
  logger.info(
    colors.magenta(`Enriching "${activeResults.length}" privacy requests.`),
  );
  await map(
    activeResults,
    async (request) => {
      await enrichPrivacyRequest(sombra, request);
    },
    { concurrency },
  );

  logger.info(colors.green('Successfully notified Transcend!'));
  return activeResults.length;
}
