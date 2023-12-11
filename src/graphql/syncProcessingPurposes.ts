import { ProcessingPurposeInput } from '../codecs';
import { GraphQLClient } from 'graphql-request';
import { mapSeries } from 'bluebird';
import {
  UPDATE_PROCESSING_PURPOSE_SUB_CATEGORIES,
  CREATE_PROCESSING_PURPOSE_SUB_CATEGORY,
} from './gqls';
import { logger } from '../logger';
import keyBy from 'lodash/keyBy';
import { makeGraphQLRequest } from './makeGraphQLRequest';
import colors from 'colors';
import {
  fetchAllProcessingPurposes,
  ProcessingPurposeSubCategory,
} from './fetchAllProcessingPurposes';

/**
 * Input to create a new processing purpose
 *
 * @param client - GraphQL client
 * @param processingPurpose - Input
 */
export async function createProcessingPurpose(
  client: GraphQLClient,
  processingPurpose: ProcessingPurposeInput,
): Promise<ProcessingPurposeSubCategory> {
  const input = {
    name: processingPurpose.name,
    purpose: processingPurpose.purpose,
    description: processingPurpose.description,
    // TODO: https://transcend.height.app/T-31994 - add attributes, teams, owners
  };

  const { createProcessingPurpose } = await makeGraphQLRequest<{
    /** Create processing purpose mutation */
    createProcessingPurpose: {
      /** Created processing purpose */
      processingPurpose: ProcessingPurposeSubCategory;
    };
  }>(client, CREATE_PROCESSING_PURPOSE_SUB_CATEGORY, {
    input,
  });
  return createProcessingPurpose.processingPurpose;
}

/**
 * Input to update processing purposes
 *
 * @param client - GraphQL client
 * @param processingPurposeIdPairs - [ProcessingPurposeInput, processingPurposeId] list
 */
export async function updateProcessingPurposes(
  client: GraphQLClient,
  processingPurposeIdPairs: [ProcessingPurposeInput, string][],
): Promise<void> {
  await makeGraphQLRequest(client, UPDATE_PROCESSING_PURPOSE_SUB_CATEGORIES, {
    input: processingPurposeIdPairs.map(([processingPurpose, id]) => ({
      id,
      name: processingPurpose.name,
      purpose: processingPurpose.purpose,
      description: processingPurpose.description,
      // TODO: https://transcend.height.app/T-31994 - add  teams, owners
      attributes: processingPurpose.attributes,
    })),
  });
}

/**
 * Sync the data inventory processing purposes
 *
 * @param client - GraphQL client
 * @param inputs - Inputs to create
 * @returns True if run without error, returns false if an error occurred
 */
export async function syncProcessingPurposes(
  client: GraphQLClient,
  inputs: ProcessingPurposeInput[],
): Promise<boolean> {
  // Fetch existing
  logger.info(
    colors.magenta(`Syncing "${inputs.length}" processing purposes...`),
  );

  let encounteredError = false;

  // Fetch existing
  const existingProcessingPurposes = await fetchAllProcessingPurposes(client);

  // Look up by name
  const processingPurposeByName = keyBy(existingProcessingPurposes, 'name');

  // Create new processing purposes
  const newProcessingPurposes = inputs.filter(
    (input) => !processingPurposeByName[input.name],
  );

  // Create new processing purposes
  await mapSeries(newProcessingPurposes, async (processingPurpose) => {
    try {
      const newProcessingPurpose = await createProcessingPurpose(
        client,
        processingPurpose,
      );
      processingPurposeByName[newProcessingPurpose.name] = newProcessingPurpose;
      logger.info(
        colors.green(
          `Successfully synced processing purpose "${processingPurpose.name}"!`,
        ),
      );
    } catch (err) {
      encounteredError = true;
      logger.info(
        colors.red(
          `Failed to sync processing purpose "${processingPurpose.name}"! - ${err.message}`,
        ),
      );
    }
  });

  // Update all processing purposes
  try {
    logger.info(
      colors.magenta(`Updating "${inputs.length}" processing purposes!`),
    );
    await updateProcessingPurposes(
      client,
      inputs.map((input) => [input, processingPurposeByName[input.name].id]),
    );
    logger.info(
      colors.green(
        `Successfully synced "${inputs.length}" processing purposes!`,
      ),
    );
  } catch (err) {
    encounteredError = true;
    logger.info(
      colors.red(
        `Failed to sync "${inputs.length}" processing purposes ! - ${err.message}`,
      ),
    );
  }

  return !encounteredError;
}
