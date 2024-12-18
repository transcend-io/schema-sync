import {
  buildTranscendGraphQLClient,
  createSombraGotInstance,
  fetchAllPurposes,
} from '../graphql';
import colors from 'colors';
import { map } from 'bluebird';
import chunk from 'lodash/chunk';
import { DEFAULT_TRANSCEND_CONSENT_API } from '../constants';
import { logger } from '../logger';
import cliProgress from 'cli-progress';
import { parseAttributesFromString } from '../requests';
import { PersistedState } from '@transcend-io/persisted-state';
import { parsePreferenceManagementCsvWithCache } from './parsePreferenceManagementCsv';
import { PreferenceState } from './codecs';
import { fetchAllPreferenceTopics } from '../graphql/fetchAllPreferenceTopics';
import { PreferenceUpdateItem } from '@transcend-io/privacy-types';
import { apply } from '@transcend-io/type-utils';
import { NONE_PREFERENCE_MAP } from './parsePreferenceTimestampsFromCsv';
import { getPreferenceUpdatesFromRow } from './getPreferenceUpdatesFromRow';

/**
 * Upload a set of consent preferences
 *
 * @param options - Options
 */
export async function uploadPreferenceManagementPreferencesInteractive({
  auth,
  sombraAuth,
  receiptFilepath,
  file,
  partition,
  isSilent = true,
  dryRun = false,
  skipWorkflowTriggers = false,
  skipConflictUpdates = false,
  attributes = [],
  transcendUrl = DEFAULT_TRANSCEND_CONSENT_API,
}: {
  /** The Transcend API key */
  auth: string;
  /** Sombra API key authentication */
  sombraAuth?: string;
  /** Partition key */
  partition: string;
  /** File where to store receipt and continue from where left off */
  receiptFilepath: string;
  /** The file to process */
  file: string;
  /** API URL for Transcend backend */
  transcendUrl?: string;
  /** Whether to do a dry run */
  dryRun?: boolean;
  /** Whether to upload as isSilent */
  isSilent?: boolean;
  /** Attributes string pre-parse. In format Key:Value */
  attributes?: string[];
  /** Skip workflow triggers */
  skipWorkflowTriggers?: boolean;
  /**
   * When true, only update preferences that do not conflict with existing
   * preferences. When false, update all preferences in CSV based on timestamp.
   */
  skipConflictUpdates?: boolean;
}): Promise<void> {
  // Parse out the extra attributes to apply to all requests uploaded
  const parsedAttributes = parseAttributesFromString(attributes);

  // Create a new state file to store the requests from this run
  const preferenceState = new PersistedState(receiptFilepath, PreferenceState, {
    fileMetadata: {},
    failingUpdates: {},
    pendingUpdates: {},
  });
  const failingRequests = preferenceState.getValue('failingUpdates');
  const pendingRequests = preferenceState.getValue('pendingUpdates');
  let fileMetadata = preferenceState.getValue('fileMetadata');

  logger.info(
    colors.magenta(
      'Restored cache, there are: \n' +
        `${
          Object.values(failingRequests).length
        } failing requests to be retried\n` +
        `${
          Object.values(pendingRequests).length
        } pending requests to be processed\n` +
        `The following files are stored in cache and will be used:\n${Object.keys(
          fileMetadata,
        )
          .map((x) => x)
          .join('\n')}\n` +
        `The following file will be processed: ${file}\n`,
    ),
  );

  // Create GraphQL client to connect to Transcend backend
  const client = buildTranscendGraphQLClient(transcendUrl, auth);

  const [sombra, purposes, preferenceTopics] = await Promise.all([
    // Create sombra instance to communicate with
    createSombraGotInstance(transcendUrl, auth, sombraAuth),
    // get all purposes and topics
    fetchAllPurposes(client),
    fetchAllPreferenceTopics(client),
  ]);

  // Process the file
  await parsePreferenceManagementCsvWithCache(
    {
      file,
      purposeSlugs: purposes.map((x) => x.trackingType),
      preferenceTopics,
      sombra,
      partitionKey: partition,
    },
    preferenceState,
  );

  // Construct the pending updates
  const pendingUpdates: Record<string, PreferenceUpdateItem> = {};
  fileMetadata = preferenceState.getValue('fileMetadata');
  const metadata = fileMetadata[file];

  logger.info(
    colors.magenta(
      `Found ${
        Object.entries(metadata.pendingSafeUpdates).length
      } safe updates in ${file}`,
    ),
  );
  logger.info(
    colors.magenta(
      `Found ${
        Object.entries(metadata.pendingConflictUpdates).length
      } conflict updates in ${file}`,
    ),
  );
  logger.info(
    colors.magenta(
      `Found ${
        Object.entries(metadata.skippedUpdates).length
      } skipped updates in ${file}`,
    ),
  );

  // Update either safe updates only or safe + conflict
  Object.entries({
    ...metadata.pendingSafeUpdates,
    ...(skipConflictUpdates
      ? {}
      : apply(metadata.pendingConflictUpdates, ({ row }) => row)),
  }).forEach(([userId, update]) => {
    // Determine timestamp
    const timestamp =
      metadata.timestampColum === NONE_PREFERENCE_MAP
        ? new Date()
        : new Date(
            new Date(update[metadata.timestampColum!]).getTime(),
            // / -
            //   11 * 60 * 60 * 1000, // FIXME
          );

    // Determine updates
    const updates = getPreferenceUpdatesFromRow({
      row: update,
      columnToPurposeName: metadata.columnToPurposeName,
      preferenceTopics,
      purposeSlugs: purposes.map((x) => x.trackingType),
    });
    pendingUpdates[userId] = {
      userId,
      partition,
      timestamp: timestamp.toISOString(),
      purposes: Object.entries(updates).map(([purpose, value]) => ({
        ...value,
        purpose,
        workflowSettings: {
          attributes: parsedAttributes,
          isSilent,
          skipWorkflowTrigger: skipWorkflowTriggers,
        },
      })),
    };
  });
  // FIXME out of memoru
  // await preferenceState.setValue(pendingUpdates, 'pendingUpdates');
  // await preferenceState.setValue({}, 'failingUpdates');

  // Exist early if dry run
  if (dryRun) {
    logger.info(
      colors.green(
        `Dry run complete, exiting. ${
          Object.values(pendingUpdates).length
        } pending updates. Check file: ${receiptFilepath}`,
      ),
    );
    return;
  }

  logger.info(
    colors.magenta(
      `Uploading ${
        Object.values(pendingUpdates).length
      } preferences to partition: ${partition}`,
    ),
  );

  // Time duration
  const t0 = new Date().getTime();

  // create a new progress bar instance and use shades_classic theme
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
  );

  // Build a GraphQL client
  let total = 0;
  const updatesToRun = Object.entries(pendingUpdates);
  const chunkedUpdates = chunk(updatesToRun, skipWorkflowTriggers ? 100 : 10);
  progressBar.start(updatesToRun.length, 0);
  await map(
    chunkedUpdates,
    async (currentChunk) => {
      // Make the request
      try {
        await sombra
          .put('v1/preferences', {
            json: {
              records: currentChunk.map(([, update]) => update),
              skipWorkflowTriggers,
            },
          })
          .json();
      } catch (err) {
        try {
          const parsed = JSON.parse(err?.response?.body || '{}');
          if (parsed.error) {
            logger.error(colors.red(`Error: ${parsed.error}`));
          }
        } catch (e) {
          // continue
        }
        logger.error(
          colors.red(
            `Failed to upload ${
              currentChunk.length
            } user preferences to partition ${partition}: ${
              err?.response?.body || err?.message
            }`,
          ),
        );
        const failingUpdates = preferenceState.getValue('failingUpdates');
        currentChunk.forEach(([userId, update]) => {
          failingUpdates[userId] = {
            uploadedAt: new Date().toISOString(),
            update,
            error: err?.response?.body || err?.message || 'Unknown error',
          };
        });
        // await preferenceState.setValue(failingUpdates, 'failingUpdates'); FIXME
      }

      total += currentChunk.length;
      progressBar.update(total);
    },
    {
      concurrency: 40,
    },
  );

  progressBar.stop();
  const t1 = new Date().getTime();
  const totalTime = t1 - t0;
  logger.info(
    colors.green(
      `Successfully uploaded ${
        updatesToRun.length
      } user preferences to partition ${partition} in "${
        totalTime / 1000
      }" seconds!`,
    ),
  );
}
