import { createTranscendConsentGotInstance } from '../graphql';
import colors from 'colors';
import * as t from 'io-ts';
import { DEFAULT_TRANSCEND_CONSENT_API } from '../constants';
import { map } from 'bluebird';
import { createConsentToken } from './createConsentToken';
import { logger } from '../logger';
import cliProgress from 'cli-progress';
import { decodeCodec } from '@transcend-io/type-utils';

export const USP_STRING_REGEX = /^[0-9][Y|N]([Y|N])[Y|N]$/;

export const PurposeMap = t.record(
  t.string,
  t.union([t.boolean, t.literal('Auto')]),
);

export const ManagedConsentDatabaseConsentPreference = t.intersection([
  t.type({
    /** User ID */
    userId: t.string,
    /** Has the consent been updated (including no-change confirmation) since default resolution */
    timestamp: t.string,
  }),
  t.partial({
    /**
     * Purpose map
     * This is a JSON object with keys as purpose names and values as booleans or 'Auto'
     */
    purposes: t.string,
    /** Was tracking consent confirmed by the user? If this is false, the consent was resolved from defaults & is not yet confirmed */
    confirmed: t.union([t.literal('true'), t.literal('false')]),
    /**
     * Has the consent been updated (including no-change confirmation) since default resolution
     */
    updated: t.union([t.literal('true'), t.literal('false')]),
    /**
     * Whether or not the UI has been shown to the end-user (undefined in older versions of airgap.js)
     */
    prompted: t.union([t.literal('true'), t.literal('false')]),
    /** US Privacy (USP) String */
    usp: t.string,
    /** IAB TCF String */
    tcf: t.string,
    /** IAB GPP String */
    gpp: t.string,
  }),
]);

/** Type override */
export type ManagedConsentDatabaseConsentPreference = t.TypeOf<
  typeof ManagedConsentDatabaseConsentPreference
>;

/**
 * Upload a set of consent preferences
 *
 * @param options - Options
 */
export async function uploadConsentPreferences({
  base64EncryptionKey,
  base64SigningKey,
  preferences,
  partition,
  concurrency = 100,
  transcendUrl = DEFAULT_TRANSCEND_CONSENT_API,
}: {
  /** base64 encryption key */
  base64EncryptionKey: string;
  /** base64 signing key */
  base64SigningKey: string;
  /** Partition key */
  partition: string;
  /** Sombra API key authentication */
  preferences: ManagedConsentDatabaseConsentPreference[];
  /** API URL for Transcend backend */
  transcendUrl?: string;
  /** Concurrency limit for approving */
  concurrency?: number;
}): Promise<void> {
  // Create connection to API
  const transcendConsentApi = createTranscendConsentGotInstance(transcendUrl);

  // Ensure usp strings are valid
  const invalidUspStrings = preferences.filter(
    (pref) => pref.usp && !USP_STRING_REGEX.test(pref.usp),
  );
  if (invalidUspStrings.length > 0) {
    throw new Error(
      `Received invalid usp strings: ${JSON.stringify(
        invalidUspStrings,
        null,
        2,
      )}`,
    );
  }

  // Ensure purpose maps are valid
  const invalidPurposeMaps = preferences
    .map(
      (pref, ind) =>
        [pref, ind] as [ManagedConsentDatabaseConsentPreference, number],
    )
    .filter(([pref]) => {
      if (!pref.purposes) {
        return false;
      }
      try {
        decodeCodec(PurposeMap, pref.purposes);
        return false;
      } catch {
        return true;
      }
    });
  if (invalidPurposeMaps.length > 0) {
    throw new Error(
      `Received invalid purpose maps: ${JSON.stringify(
        invalidPurposeMaps,
        null,
        2,
      )}`,
    );
  }

  // Ensure usp or preferences are provided
  const invalidInputs = preferences.filter(
    (pref) => !pref.usp && !pref.purposes,
  );
  if (invalidInputs.length > 0) {
    throw new Error(
      `Received invalid inputs, expected either purposes or usp to be defined: ${JSON.stringify(
        invalidInputs,
        null,
        2,
      )}`,
    );
  }

  logger.info(
    colors.magenta(
      `Uploading ${preferences.length} user preferences to partition ${partition}`,
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
  progressBar.start(preferences.length, 0);
  await map(
    preferences,
    async ({
      userId,
      confirmed = 'true',
      updated,
      prompted,
      purposes,
      ...consent
    }) => {
      const token = createConsentToken(
        userId,
        base64EncryptionKey,
        base64SigningKey,
      );

      // parse usp string
      const [, saleStatus] = consent.usp
        ? USP_STRING_REGEX.exec(consent.usp) || []
        : [];

      const input = {
        token,
        partition,
        consent: {
          confirmed: confirmed === 'true',
          purposes: purposes
            ? decodeCodec(PurposeMap, purposes)
            : consent.usp
            ? { SaleOfInfo: saleStatus === 'Y' }
            : {},
          ...(updated ? { updated: updated === 'true' } : {}),
          ...(prompted ? { prompted: prompted === 'true' } : {}),
          ...consent,
        },
      };

      // Make the request
      try {
        await transcendConsentApi
          .post('sync', {
            json: input,
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
        throw new Error(
          `Received an error from server: ${
            err?.response?.body || err?.message
          }`,
        );
      }

      total += 1;
      progressBar.update(total);
    },
    { concurrency },
  );

  progressBar.stop();
  const t1 = new Date().getTime();
  const totalTime = t1 - t0;

  logger.info(
    colors.green(
      `Successfully uploaded ${
        preferences.length
      } user preferences to partition ${partition} in "${
        totalTime / 1000
      }" seconds!`,
    ),
  );
}
