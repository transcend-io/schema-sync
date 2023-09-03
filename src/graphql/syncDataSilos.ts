/* eslint-disable max-lines */
import cliProgress from 'cli-progress';
import {
  DataCategoryInput,
  DataSiloInput,
  ProcessingPurposeInput,
} from '../codecs';
import { GraphQLClient } from 'graphql-request';
import { logger } from '../logger';
import colors from 'colors';
import { mapSeries, map } from 'bluebird';
import keyBy from 'lodash/keyBy';
import {
  DATA_SILOS,
  CREATE_DATA_SILOS,
  UPDATE_OR_CREATE_DATA_POINT,
  DATA_SILO,
  DATA_POINTS,
  SUB_DATA_POINTS,
  UPDATE_DATA_SILOS,
} from './gqls';
import {
  convertToDataSubjectBlockList,
  DataSubject,
} from './fetchDataSubjects';
import { ApiKey } from './fetchApiKeys';
import {
  IsoCountryCode,
  IsoCountrySubdivisionCode,
  PromptAVendorEmailCompletionLinkType,
  PromptAVendorEmailSendType,
  RequestActionObjectResolver,
} from '@transcend-io/privacy-types';
import sortBy from 'lodash/sortBy';
import chunk from 'lodash/chunk';
import { makeGraphQLRequest } from './makeGraphQLRequest';
import { apply } from '@transcend-io/type-utils';

export interface DataSiloAttributeValue {
  /** Key associated to value */
  attributeKey: {
    /** Name of key */
    name: string;
  };
  /** Name of value */
  name: string;
}
export interface DataSilo {
  /** ID of dataSilo */
  id: string;
  /** Title of dataSilo */
  title: string;
  /** Type of silo */
  type: string;
  /** The link to the data silo */
  link: string;
  /** Attribute labels */
  attributeValues: DataSiloAttributeValue[];
  /** description */
  description: string;
  /** Metadata for this data silo */
  catalog: {
    /** Whether the data silo supports automated vendor coordination */
    hasAvcFunctionality: boolean;
  };
}

const BATCH_SILOS_LIMIT = 20;

/**
 * Fetch all dataSilos in the organization
 *
 * @param client - GraphQL client
 * @param title - Filter by title
 * @returns All dataSilos in the organization
 */
export async function fetchAllDataSilos(
  client: GraphQLClient,
  {
    title,
    pageSize,
    ids = [],
    integrationNames = [],
  }: {
    /** Page size to fetch datapoints in */
    pageSize: number;
    /** Title */
    title?: string;
    /** IDs */
    ids?: string[];
    /** Set of integration names to fetch */
    integrationNames?: string[];
  },
): Promise<DataSilo[]> {
  logger.info(
    colors.magenta(
      `Fetching ${ids.length === 0 ? 'all' : ids.length} Data Silos...`,
    ),
  );

  const dataSilos: DataSilo[] = [];
  let offset = 0;

  // Try to fetch an enricher with the same title
  let shouldContinue = false;
  do {
    const {
      dataSilos: { nodes },
      // eslint-disable-next-line no-await-in-loop
    } = await makeGraphQLRequest<{
      /** Query response */
      dataSilos: {
        /** List of matches */
        nodes: DataSilo[];
      };
    }>(client, DATA_SILOS, {
      filterBy: {
        ids: ids.length > 0 ? ids : undefined,
        types: integrationNames.length > 0 ? integrationNames : undefined,
        text: title,
      },
      first: pageSize,
      offset,
    });
    dataSilos.push(...nodes);
    offset += pageSize;
    shouldContinue = nodes.length === pageSize;
  } while (shouldContinue);
  logger.info(
    colors.green(
      `Found a total of ${dataSilos.length} data silo${
        ids.length > 0 ? ` matching IDs ${ids.join(',')}` : ''
      }s${
        integrationNames.length > 0
          ? ` matching integrationNames ${integrationNames.join(',')}`
          : ''
      }`,
    ),
  );

  return dataSilos.sort((a, b) => a.title.localeCompare(b.title));
}

interface SubDataPoint {
  /** Name (or key) of the subdatapoint */
  name: string;
  /** The description */
  description?: string;
  /** Personal data category */
  categories: DataCategoryInput[];
  /** The processing purpose for this sub datapoint */
  purposes: ProcessingPurposeInput[];
  /**
   * When true, this subdatapoint should be revealed in a data access request.
   * When false, this field should be redacted
   */
  accessRequestVisibilityEnabled: boolean;
  /**
   * When true, this subdatapoint should be redacted during an erasure request.
   * There normally is a choice of enabling hard deletion or redaction at the
   * datapoint level, but if redaction is enabled, this column can be used
   * to define which fields should be redacted.
   */
  erasureRequestRedactionEnabled: boolean;
  /** Attribute attached to subdatapoint */
  attributeValues: DataSiloAttributeValue[];
}

interface DataPoint {
  /** ID of dataPoint */
  id: string;
  /** Title of dataPoint */
  title: {
    /** Default message */
    defaultMessage: string;
  };
  /** The path to this data point */
  path: string[];
  /** Description */
  description: {
    /** Default message */
    defaultMessage: string;
  };
  /** Name */
  name: string;
  /** Global actions */
  actionSettings: {
    /** Action type */
    type: RequestActionObjectResolver;
    /** Is enabled */
    active: boolean;
  }[];
  /** Data collection tag for privacy request download zip labeling */
  dataCollection?: {
    /** Title of data collection */
    title: {
      /** Default message (since message can be translated) */
      defaultMessage: string;
    };
  };
  /** Metadata for this data silo */
  catalog: {
    /** Whether the data silo supports automated vendor coordination */
    hasAvcFunctionality: boolean;
  };
  /** Database integration queries */
  dbIntegrationQueries: {
    /** Approved query */
    query: string | null;
    /** Suggested query */
    suggestedQuery: string | null;
    /** Request action */
    requestType: RequestActionObjectResolver;
  }[];
}

interface DataPointWithSubDataPoint extends DataPoint {
  /** The associated subdatapoints */
  subDataPoints: SubDataPoint[];
}

/**
 * Helper to fetch all subdatapoints for a given datapoint
 *
 * @param client - The GraphQL client
 * @param dataPointId - The datapoint ID
 * @param options - Options
 * @returns The list of subdatapoints
 */
export async function fetchAllSubDataPoints(
  client: GraphQLClient,
  dataPointId: string,
  {
    debug,
    pageSize,
  }: {
    /** Debug logs */
    debug: boolean;
    /** Page size */
    pageSize: number;
  },
): Promise<SubDataPoint[]> {
  const subDataPoints: SubDataPoint[] = [];

  let offset = 0;

  let shouldContinue = false;
  do {
    try {
      if (debug) {
        logger.log(
          colors.magenta(`Pulling in subdatapoints for offset ${offset}`),
        );
      }

      const {
        subDataPoints: { nodes },
        // eslint-disable-next-line no-await-in-loop
      } = await makeGraphQLRequest<{
        /** Query response */
        subDataPoints: {
          /** List of matches */
          nodes: SubDataPoint[];
        };
      }>(client, SUB_DATA_POINTS, {
        first: pageSize,
        dataPointIds: [dataPointId],
        offset,
      });
      subDataPoints.push(...nodes);
      offset += pageSize;
      shouldContinue = nodes.length === pageSize;

      if (debug) {
        logger.log(
          colors.green(
            `Pulled in subdatapoints for offset ${offset} for dataPointId=${dataPointId}`,
          ),
        );
      }
    } catch (err) {
      logger.error(
        colors.red(
          `An error fetching subdatapoints for offset ${offset} for dataPointId=${dataPointId}`,
        ),
      );
      throw err;
    }
  } while (shouldContinue);
  return sortBy(subDataPoints, 'name');
}

/**
 * Fetch all datapoints for a data silo
 *
 * @param client - GraphQL client
 * @param dataSiloId - Data silo ID
 * @param options - Options
 * @returns List of datapoints
 */
export async function fetchAllDataPoints(
  client: GraphQLClient,
  dataSiloId: string,
  {
    debug,
    pageSize,
  }: {
    /** Debug logs */
    debug: boolean;
    /** Page size */
    pageSize: number;
  },
): Promise<DataPointWithSubDataPoint[]> {
  const dataPoints: DataPointWithSubDataPoint[] = [];
  let offset = 0;

  // Try to fetch an enricher with the same title
  let shouldContinue = false;
  do {
    if (debug) {
      logger.info(colors.magenta(`Fetching datapoints with offset: ${offset}`));
    }

    const {
      dataPoints: { nodes },
      // eslint-disable-next-line no-await-in-loop
    } = await makeGraphQLRequest<{
      /** Query response */
      dataPoints: {
        /** List of matches */
        nodes: DataPoint[];
      };
    }>(client, DATA_POINTS, {
      first: pageSize,
      dataSiloIds: [dataSiloId],
      offset,
    });

    if (debug) {
      logger.info(
        colors.magenta(
          `Fetched ${nodes.length} datapoints at offset: ${offset}`,
        ),
      );
    }

    // eslint-disable-next-line no-await-in-loop
    await map(
      nodes,
      /* eslint-disable no-loop-func */
      async (node) => {
        try {
          if (debug) {
            logger.info(
              colors.magenta(
                `Fetching subdatapoints for ${node.name} for datapoint offset ${offset}`,
              ),
            );
          }

          const subDataPoints = await fetchAllSubDataPoints(client, node.id, {
            pageSize,
            debug,
          });
          dataPoints.push({
            ...node,
            subDataPoints: subDataPoints.sort((a, b) =>
              a.name.localeCompare(b.name),
            ),
          });

          if (debug) {
            logger.info(
              colors.green(
                `Successfully fetched subdatapoints for ${node.name}`,
              ),
            );
          }
        } catch (err) {
          logger.error(
            colors.red(
              `An error fetching subdatapoints for ${node.name} datapoint offset ${offset}`,
            ),
          );
          throw err;
        }
      },
      /* eslint-enable no-loop-func */
      {
        concurrency: 10,
      },
    );

    if (debug) {
      logger.info(
        colors.green(
          `Fetched all subdatapoints for page of datapoints at offset: ${offset}`,
        ),
      );
    }

    offset += pageSize;
    shouldContinue = nodes.length === pageSize;
  } while (shouldContinue);
  return dataPoints.sort((a, b) => a.name.localeCompare(b.name));
}

export interface DataSiloEnriched {
  /** ID of dataSilo */
  id: string;
  /** Title of dataSilo */
  title: string;
  /** Type of silo */
  type: string;
  /** Outer type of silo */
  outerType: string;
  /** Description of data silo */
  description: string;
  /** Webhook URL */
  url?: string;
  /** Email address of user to notify for prompt a person use case */
  notifyEmailAddress?: string;
  /** Associated API keys */
  apiKeys: {
    /** Title */
    title: string;
  }[];
  /** Data subject block list */
  subjectBlocklist: {
    /** Type of data subject */
    type: string;
  }[];
  /** Identifiers */
  identifiers: {
    /** Name of identifier */
    name: string;
    /** True if identifier is wired */
    isConnected: boolean;
  }[];
  /** Dependent data silos */
  dependentDataSilos: {
    /** Title of silo */
    title: string;
  }[];
  /** Silo owners */
  owners: {
    /** Email owners */
    email: string;
  }[];
  /** The teams assigned to this data silo */
  teams: {
    /** Name of the team assigned to this data silo */
    name: string;
  }[];
  /** Metadata for this data silo */
  catalog: {
    /** Whether the data silo supports automated vendor coordination */
    hasAvcFunctionality: boolean;
  };
  /** Silo is live */
  isLive: boolean;
  /** Hosting country of data silo */
  country?: IsoCountryCode;
  /** Hosting subdivision data silo */
  countrySubDivision?: IsoCountrySubdivisionCode;
  /**
   * The frequency with which we should be sending emails for this data silo, in milliseconds.
   */
  promptAVendorEmailSendFrequency: number;
  /**
   * The type of emails to send for this data silo, i.e. send an email for each DSR, across all open DSRs,
   * or per profile in a DSR.
   */
  promptAVendorEmailSendType: PromptAVendorEmailSendType;
  /**
   * Indicates whether prompt-a-vendor emails should include a list of identifiers
   * in addition to a link to the bulk processing UI.
   */
  promptAVendorEmailIncludeIdentifiersAttachment: boolean;
  /**
   * Indicates what kind of link to generate as part of the emails sent out for this Prompt-a-Vendor silo.
   */
  promptAVendorEmailCompletionLinkType: PromptAVendorEmailCompletionLinkType;
  /**
   * The frequency with which we should retry sending emails for this data silo, in milliseconds.
   * Needs to be a string because the number can be larger than the MAX_INT
   */
  manualWorkRetryFrequency: string;
  /** Attribute values tagged to data silo */
  attributeValues: DataSiloAttributeValue[];
}

/**
 * Fetch all dataSilos with additional metadata
 *
 * @param client - GraphQL client
 * @param options - Filter options
 * @returns All dataSilos in the organization
 */
export async function fetchEnrichedDataSilos(
  client: GraphQLClient,
  {
    ids,
    pageSize,
    title,
    debug,
    integrationNames,
  }: {
    /** Page size */
    pageSize: number;
    /** Filter by IDs */
    ids?: string[];
    /** Enable debug logs */
    debug: boolean;
    /** Filter by title */
    title?: string;
    /** Integration names */
    integrationNames?: string[];
  },
): Promise<[DataSiloEnriched, DataPointWithSubDataPoint[]][]> {
  const dataSilos: [DataSiloEnriched, DataPointWithSubDataPoint[]][] = [];

  const silos = await fetchAllDataSilos(client, {
    title,
    ids,
    integrationNames,
    pageSize,
  });
  await mapSeries(silos, async (silo, index) => {
    logger.info(
      colors.magenta(
        `[${index + 1}/${silos.length}] Fetching data silo - ${silo.title}`,
      ),
    );
    const { dataSilo } = await makeGraphQLRequest<{
      /** Query response */
      dataSilo: DataSiloEnriched;
    }>(client, DATA_SILO, {
      id: silo.id,
    });

    if (debug) {
      logger.info(
        colors.magenta(
          `[${index + 1}/${
            silos.length
          }] Successfully fetched data silo metadata for - ${silo.title}`,
        ),
      );
    }

    const dataPoints = await fetchAllDataPoints(client, dataSilo.id, {
      debug,
      pageSize,
    });

    if (debug) {
      logger.info(
        colors.green(
          `[${index + 1}/${
            silos.length
          }] Successfully fetched datapoint for - ${silo.title}`,
        ),
      );
    }

    dataSilos.push([dataSilo, dataPoints]);
  });

  logger.info(
    colors.green(
      `Successfully fetched all ${silos.length} data silo configurations`,
    ),
  );

  return dataSilos;
}

/**
 * Sync a data silo configuration
 *
 * @param dataSilos - Data silos to sync
 * @param client - GraphQL client
 * @param options - Options
 * @returns Data silo info
 */
export async function syncDataSilos(
  dataSilos: DataSiloInput[],
  client: GraphQLClient,
  {
    pageSize,
    dataSubjectsByName,
    apiKeysByTitle,
  }: {
    /** Page size */
    pageSize: number;
    /** The data subjects in the organization */
    dataSubjectsByName: { [type in string]: DataSubject };
    /** API key title to API key */
    apiKeysByTitle: { [title in string]: ApiKey };
  },
): Promise<{
  /** Whether successfully updated */
  success: boolean;
  /** A mapping between data silo title to data silo ID */
  dataSiloTitleToId: { [k in string]: string };
}> {
  let encounteredError = false;

  // Time duration
  const t0 = new Date().getTime();
  logger.info(colors.magenta(`Syncing "${dataSilos.length}" data silos...`));

  // TODO: https://transcend.height.app/T-28707 - search by title instead of over-fetching
  // Determine the set of data silos that already exist
  const allDataSilos = await fetchAllDataSilos(client, {
    // TODO: https://transcend.height.app/T-28707 - search by title instead of over-fetching
    // titles: dataSilos.map(({ title }) => title),
    pageSize,
  });
  const allTitles = dataSilos.map(({ title }) => title);
  const existingDataSilos = allDataSilos.filter((silo) =>
    allTitles.includes(silo.title),
  );

  // Create a mapping of title -> existing silo, if it exists
  const existingDataSiloByTitle = keyBy<Pick<DataSilo, 'id' | 'title'>>(
    existingDataSilos,
    'title',
  );

  // Create new silos that do not exist
  const newDataSiloInputs = dataSilos.filter(
    ({ title }) => !existingDataSiloByTitle[title],
  );
  if (newDataSiloInputs.length > 0) {
    logger.info(
      colors.magenta(
        `Creating "${newDataSiloInputs.length}" data silos that did not exist...`,
      ),
    );

    // Batch the creation
    const chunked = chunk(newDataSiloInputs, BATCH_SILOS_LIMIT);
    await mapSeries(chunked, async (dependencyUpdateChunk) => {
      const {
        createDataSilos: { dataSilos },
      } = await makeGraphQLRequest<{
        /** Mutation result */
        createDataSilos: {
          /** New data silos */
          dataSilos: Pick<DataSilo, 'id' | 'title'>[];
        };
      }>(client, CREATE_DATA_SILOS, {
        input: dependencyUpdateChunk.map((input) => ({
          name: input.integrationName,
          title: input.title,
          country: input.country,
          countrySubDivision: input.countrySubDivision,
        })),
      });

      // save mapping of title and id
      dataSilos.forEach((silo) => {
        existingDataSiloByTitle[silo.title] = silo;
      });
    });

    logger.info(
      colors.green(
        `Successfully created "${newDataSiloInputs.length}" data silos!`,
      ),
    );
  }

  // Batch the updates
  const chunkedUpdates = chunk(dataSilos, BATCH_SILOS_LIMIT);
  await mapSeries(chunkedUpdates, async (dataSiloUpdateChunk, ind) => {
    logger.info(
      colors.magenta(
        `[Batch ${ind}/${chunkedUpdates.length}] Syncing "${dataSiloUpdateChunk.length}" data silos`,
      ),
    );
    await makeGraphQLRequest<{
      /** Mutation result */
      updateDataSilos: {
        /** New data silos */
        dataSilos: Pick<DataSilo, 'id' | 'title'>[];
      };
    }>(client, UPDATE_DATA_SILOS, {
      input: {
        dataSilos: dataSiloUpdateChunk.map((input) => ({
          id: existingDataSiloByTitle[input.title].id,
          country: input.country,
          countrySubDivision: input.countrySubDivision,
          url: input.url,
          headers: input.headers,
          description: input.description,
          identifiers: input['identity-keys'],
          isLive: !input.disabled,
          ownerEmails: input.owners,
          teamNames: input.teams,
          // clear out if not specified, otherwise the update needs to be applied after
          // all data silos are created
          dependedOnDataSiloTitles: input['deletion-dependencies']
            ? undefined
            : [],
          apiKeyId: input['api-key-title']
            ? apiKeysByTitle[input['api-key-title']].id
            : undefined,
          dataSubjectBlockListIds: input['data-subjects']
            ? convertToDataSubjectBlockList(
                input['data-subjects'],
                dataSubjectsByName,
              )
            : undefined,
          attributes: input.attributes,
          // AVC settings
          notifyEmailAddress: input['email-settings']?.['notify-email-address'],
          promptAVendorEmailSendFrequency:
            input['email-settings']?.['send-frequency'],
          promptAVendorEmailSendType: input['email-settings']?.['send-type'],
          promptAVendorEmailIncludeIdentifiersAttachment:
            input['email-settings']?.['include-identifiers-attachment'],
          promptAVendorEmailCompletionLinkType:
            input['email-settings']?.['completion-link-type'],
          manualWorkRetryFrequency:
            input['email-settings']?.['manual-work-retry-frequency'],
        })),
      },
    });
    logger.info(
      colors.green(
        `[Batch ${ind}/${chunkedUpdates.length}] Synced "${dataSiloUpdateChunk.length}" data silos!`,
      ),
    );
  });

  // Sync datapoints

  // create a new progress bar instance and use shades_classic theme
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
  );
  const dataSilosWithDataPoints = dataSilos.filter(
    ({ datapoints = [] }) => datapoints.length > 0,
  );
  const totalDataPoints = dataSilos
    .map(({ datapoints = [] }) => datapoints.length)
    .reduce((acc, count) => acc + count, 0);
  logger.info(
    colors.magenta(
      `Syncing "${totalDataPoints}" datapoints from "${dataSilosWithDataPoints.length}" data silos...`,
    ),
  );
  progressBar.start(totalDataPoints, 0);
  let total = 0;

  await map(
    dataSilosWithDataPoints,
    async ({ datapoints, title }) => {
      if (datapoints) {
        await map(
          datapoints,
          async (datapoint) => {
            const fields = datapoint.fields
              ? datapoint.fields.map(
                  ({
                    key,
                    description,
                    categories,
                    purposes,
                    attributes,
                    ...rest
                  }) =>
                    // TODO: Support setting title separately from the 'key/name'
                    ({
                      name: key,
                      description,
                      categories: !categories
                        ? undefined
                        : categories.map((category) => ({
                            ...category,
                            name: category.name || 'Other',
                          })),
                      purposes: !purposes
                        ? undefined
                        : purposes.map((purpose) => ({
                            ...purpose,
                            name: purpose.name || 'Other',
                          })),
                      attributes,
                      accessRequestVisibilityEnabled:
                        rest['access-request-visibility-enabled'],
                      erasureRequestRedactionEnabled:
                        rest['erasure-request-redaction-enabled'],
                    }),
                )
              : undefined;

            const payload = {
              dataSiloId: existingDataSiloByTitle[title].id,
              path: datapoint.path,
              name: datapoint.key,
              title: datapoint.title,
              description: datapoint.description,
              ...(datapoint['data-collection-tag']
                ? { dataCollectionTag: datapoint['data-collection-tag'] }
                : {}),
              querySuggestions: !datapoint['privacy-action-queries']
                ? undefined
                : Object.entries(datapoint['privacy-action-queries']).map(
                    ([key, value]) => ({
                      requestType: key,
                      suggestedQuery: value,
                    }),
                  ),
              enabledActions: datapoint['privacy-actions'] || [], // clear out when not specified
              subDataPoints: fields,
            };

            try {
              await makeGraphQLRequest(
                client,
                UPDATE_OR_CREATE_DATA_POINT,
                payload,
              );
            } catch (err) {
              logger.info(
                colors.red(
                  `Failed to update "${datapoint.key} for data silo "${title}"! - ${err.message}`,
                ),
              );
              encounteredError = true;
            }
            total += 1;
            progressBar.update(total);
          },
          {
            concurrency: 5,
          },
        );
      }
    },
    {
      concurrency: 5,
    },
  );

  progressBar.stop();
  const t1 = new Date().getTime();
  const totalTime = t1 - t0;

  logger.info(
    colors.green(
      `Synced "${
        dataSilos.length
      }" data silos and "${totalDataPoints}" datapoints in "${
        totalTime / 1000
      }" seconds!`,
    ),
  );
  return {
    success: !encounteredError,
    dataSiloTitleToId: apply(existingDataSiloByTitle, ({ id }) => id),
  };
}

/**
 * Sync data silo dependencies
 *
 * @param client - GraphQL client
 * @param dependencyUpdates - Mapping from [data silo ID, dependency titles]
 * @returns True upon success
 */
export async function syncDataSiloDependencies(
  client: GraphQLClient,
  dependencyUpdates: [string, string[]][],
): Promise<boolean> {
  let encounteredError = false;
  logger.info(
    colors.magenta(
      `Syncing "${dependencyUpdates.length}" data silo dependencies...`,
    ),
  );

  // Batch the updates
  const chunkedUpdates = chunk(dependencyUpdates, BATCH_SILOS_LIMIT);
  await mapSeries(chunkedUpdates, async (dependencyUpdateChunk, ind) => {
    logger.info(
      colors.magenta(
        `[Batch ${ind}/${dependencyUpdateChunk.length}] Updating "${dependencyUpdateChunk.length}" data silos...`,
      ),
    );
    try {
      await makeGraphQLRequest<{
        /** Mutation result */
        updateDataSilos: {
          /** New data silos */
          dataSilos: Pick<DataSilo, 'id' | 'title'>[];
        };
      }>(client, UPDATE_DATA_SILOS, {
        input: {
          dataSilos: dependencyUpdateChunk.map(
            ([id, dependedOnDataSiloTitles]) => ({
              id,
              dependedOnDataSiloTitles,
            }),
          ),
        },
      });
      logger.info(
        colors.green(
          `[Batch ${ind}/${dependencyUpdateChunk.length}] ` +
            `Synced "${dependencyUpdateChunk.length}" data silos!`,
        ),
      );
    } catch (err) {
      encounteredError = true;
      logger.info(
        colors.red(
          `[Batch ${ind}/${dependencyUpdateChunk.length}] ` +
            `Failed to update "${dependencyUpdateChunk.length}" silos! - ${err.message}`,
        ),
      );
    }
  });
  return !encounteredError;
}
/* eslint-enable max-lines */
