/* eslint-disable max-lines */
import {
  TranscendInput,
  ApiKeyInput,
  DataSiloInput,
  AttributeInput,
  ActionInput,
  IdentifierInput,
  BusinessEntityInput,
  EnricherInput,
  PromptGroupInput,
  DataFlowInput,
  PromptPartialInput,
  DataSubjectInput,
  CookieInput,
  AssessmentTemplateInput,
  AssessmentInput,
  PromptInput,
  DatapointInput,
  FieldInput,
  ProcessingPurposeInput,
  DataCategoryInput,
  VendorInput,
  AgentFileInput,
  AgentFunctionInput,
  AgentInput,
} from '../codecs';
import {
  RequestAction,
  ConsentTrackerStatus,
} from '@transcend-io/privacy-types';
import { GraphQLClient } from 'graphql-request';
import flatten from 'lodash/flatten';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { fetchEnrichedDataSilos } from './syncDataSilos';
import {
  convertToDataSubjectAllowlist,
  fetchAllDataSubjects,
} from './fetchDataSubjects';
import { fetchApiKeys } from './fetchApiKeys';
import { fetchAllAssessments } from './fetchAssessments';
import { fetchAllAssessmentTemplates } from './fetchAssessmentTemplates';
import {
  fetchConsentManager,
  fetchConsentManagerExperiences,
  fetchConsentManagerTheme,
} from './fetchConsentManagerId';
import { fetchAllEnrichers } from './syncEnrichers';
import { fetchAllDataFlows } from './fetchAllDataFlows';
import { fetchAllBusinessEntities } from './fetchAllBusinessEntities';
import { fetchAllActions } from './fetchAllActions';
import { fetchAllAgents } from './fetchAllAgents';
import { fetchAllAgentFunctions } from './fetchAllAgentFunctions';
import { fetchAllAgentFiles } from './fetchAllAgentFiles';
import { fetchAllVendors } from './fetchAllVendors';
import { fetchAllDataCategories } from './fetchAllDataCategories';
import { fetchAllProcessingPurposes } from './fetchAllProcessingPurposes';
import { fetchAllIdentifiers } from './fetchIdentifiers';
import { fetchAllPrompts } from './fetchPrompts';
import { fetchAllPromptPartials } from './fetchPromptPartials';
import { fetchAllPromptGroups } from './fetchPromptGroups';
import { fetchAllCookies } from './fetchAllCookies';
import { fetchAllTemplates } from './syncTemplates';
import { fetchAllAttributes } from './fetchAllAttributes';
import { formatAttributeValues } from './formatAttributeValues';
import { logger } from '../logger';
import colors from 'colors';
import { TranscendPullResource } from '../enums';

export const DEFAULT_TRANSCEND_PULL_RESOURCES = [
  TranscendPullResource.DataSilos,
  TranscendPullResource.Enrichers,
  TranscendPullResource.Templates,
  TranscendPullResource.ApiKeys,
];

export interface TranscendPullConfigurationInput {
  /** Page size */
  pageSize: number;
  /** Enable debug logs */
  debug: boolean;
  /** The data silo IDs to sync. If empty list, pull all. */
  dataSiloIds: string[];
  /** Resources to pull in */
  resources?: TranscendPullResource[];
  /** The data silo types to sync.If empty list, pull all.  */
  integrationNames: string[];
  /** The tracker statuses to pull */
  trackerStatuses?: ConsentTrackerStatus[];
  /** Skip fetching of datapoints */
  skipDatapoints?: boolean;
  /** Skip fetching of subdatapoints */
  skipSubDatapoints?: boolean;
  /** When true, metadata around guessed data categories should be included */
  includeGuessedCategories?: boolean;
}

/**
 * Pull a yaml configuration from Transcend
 *
 * @param client - GraphQL client
 * @param dataSiloIds - The data silos to sync. If empty list, pull all.
 * @returns The configuration
 */
export async function pullTranscendConfiguration(
  client: GraphQLClient,
  {
    dataSiloIds,
    integrationNames,
    debug,
    resources = DEFAULT_TRANSCEND_PULL_RESOURCES,
    pageSize,
    skipDatapoints,
    includeGuessedCategories,
    skipSubDatapoints,
    trackerStatuses = Object.values(ConsentTrackerStatus),
  }: TranscendPullConfigurationInput,
): Promise<TranscendInput> {
  if (dataSiloIds.length > 0 && integrationNames.length > 0) {
    throw new Error(
      'Only 1 of integrationNames OR dataSiloIds can be provided',
    );
  }

  logger.info(colors.magenta(`Fetching data with page size ${pageSize}...`));

  // Fetch all data, but only conditional fetch data that is requested
  const [
    dataSubjects,
    apiKeyTitleMap,
    assessments,
    assessmentTemplate,
    dataSilos,
    enrichers,
    dataFlows,
    cookies,
    attributes,
    templates,
    identifiers,
    actions,
    businessEntities,
    consentManager,
    consentManagerExperiences,
    prompts,
    promptPartials,
    promptGroups,
    agents,
    agentFunctions,
    agentFiles,
    vendors,
    dataCategories,
    processingPurposes,
  ] = await Promise.all([
    // Grab all data subjects in the organization
    resources.includes(TranscendPullResource.DataSilos) ||
    resources.includes(TranscendPullResource.DataSubjects)
      ? fetchAllDataSubjects(client)
      : [],
    // Grab API keys
    resources.includes(TranscendPullResource.ApiKeys)
      ? fetchApiKeys({}, client, true)
      : [],
    // Grab Assessments
    resources.includes(TranscendPullResource.Assessment)
      ? fetchAllAssessments(client)
      : [],
    // Grab Assessment Templates
    resources.includes(TranscendPullResource.AssessmentTemplate)
      ? fetchAllAssessmentTemplates(client)
      : [],
    // Fetch the data silos
    resources.includes(TranscendPullResource.DataSilos)
      ? fetchEnrichedDataSilos(client, {
          ids: dataSiloIds,
          integrationNames,
          pageSize,
          debug,
          includeGuessedCategories,
          skipDatapoints,
          skipSubDatapoints,
        })
      : [],
    // Fetch enrichers
    resources.includes(TranscendPullResource.Enrichers)
      ? fetchAllEnrichers(client)
      : [],
    // Fetch data flows
    resources.includes(TranscendPullResource.DataFlows)
      ? [
          ...(trackerStatuses.includes(ConsentTrackerStatus.Live)
            ? await fetchAllDataFlows(client, ConsentTrackerStatus.Live)
            : []),
          ...(trackerStatuses.includes(ConsentTrackerStatus.NeedsReview)
            ? await fetchAllDataFlows(client, ConsentTrackerStatus.NeedsReview)
            : []),
        ]
      : [],
    // Fetch data flows
    resources.includes(TranscendPullResource.Cookies)
      ? [
          ...(trackerStatuses.includes(ConsentTrackerStatus.Live)
            ? await fetchAllCookies(client, ConsentTrackerStatus.Live)
            : []),
          ...(trackerStatuses.includes(ConsentTrackerStatus.NeedsReview)
            ? await fetchAllCookies(client, ConsentTrackerStatus.NeedsReview)
            : []),
        ]
      : [],
    // Fetch attributes
    resources.includes(TranscendPullResource.Attributes)
      ? fetchAllAttributes(client)
      : [],
    // Fetch email templates
    resources.includes(TranscendPullResource.Templates)
      ? fetchAllTemplates(client)
      : [],
    // Fetch identifiers
    resources.includes(TranscendPullResource.Identifiers)
      ? fetchAllIdentifiers(client)
      : [],
    // Fetch actions
    resources.includes(TranscendPullResource.Actions)
      ? fetchAllActions(client)
      : [],
    // Fetch business entities
    resources.includes(TranscendPullResource.BusinessEntities)
      ? fetchAllBusinessEntities(client)
      : [],
    // Fetch consent manager
    resources.includes(TranscendPullResource.ConsentManager)
      ? fetchConsentManager(client)
      : undefined,
    // Fetch consent manager experiences
    resources.includes(TranscendPullResource.ConsentManager)
      ? fetchConsentManagerExperiences(client)
      : [],
    // Fetch prompts
    resources.includes(TranscendPullResource.Prompts)
      ? fetchAllPrompts(client)
      : [],
    // Fetch promptPartials
    resources.includes(TranscendPullResource.PromptPartials)
      ? fetchAllPromptPartials(client)
      : [],
    // Fetch promptGroups
    resources.includes(TranscendPullResource.PromptGroups)
      ? fetchAllPromptGroups(client)
      : [],
    // Fetch agents
    resources.includes(TranscendPullResource.Agents)
      ? fetchAllAgents(client)
      : [],
    // Fetch agentFunctions
    resources.includes(TranscendPullResource.AgentFunctions)
      ? fetchAllAgentFunctions(client)
      : [],
    // Fetch agentFiles
    resources.includes(TranscendPullResource.AgentFiles)
      ? fetchAllAgentFiles(client)
      : [],
    // Fetch vendors
    resources.includes(TranscendPullResource.Vendors)
      ? fetchAllVendors(client)
      : [],
    // Fetch dataCategories
    resources.includes(TranscendPullResource.DataCategories)
      ? fetchAllDataCategories(client)
      : [],
    // Fetch dataCategories
    resources.includes(TranscendPullResource.ProcessingPurposes)
      ? fetchAllProcessingPurposes(client)
      : [],
  ]);

  const consentManagerTheme =
    resources.includes(TranscendPullResource.ConsentManager) && consentManager
      ? await fetchConsentManagerTheme(client, consentManager.id)
      : undefined;

  const result: TranscendInput = {};

  // Save API keys
  const apiKeyTitles = flatten(
    dataSilos.map(([{ apiKeys }]) => apiKeys.map(({ title }) => title)),
  );
  const relevantApiKeys = Object.values(apiKeyTitleMap).filter(({ title }) =>
    resources.includes(TranscendPullResource.ApiKeys)
      ? true
      : apiKeyTitles.includes(title),
  );
  if (relevantApiKeys.length > 0) {
    result['api-keys'] = relevantApiKeys.map(
      ({ title }): ApiKeyInput => ({
        title,
      }),
    );
  }

  // Save Consent Manager
  if (consentManager) {
    result['consent-manager'] = {
      bundleUrls: {
        TEST: consentManager.testBundleURL,
        PRODUCTION: consentManager.bundleURL,
      },
      domains: consentManager.configuration.domains || undefined,
      partition: consentManager.configuration.partition || undefined,
      consentPrecedence:
        consentManager.configuration.consentPrecedence || undefined,
      unknownRequestPolicy:
        consentManager.configuration.unknownRequestPolicy || undefined,
      unknownCookiePolicy:
        consentManager.configuration.unknownCookiePolicy || undefined,
      syncEndpoint: consentManager.configuration.syncEndpoint || undefined,
      telemetryPartitioning:
        consentManager.configuration.telemetryPartitioning || undefined,
      signedIabAgreement:
        consentManager.configuration.signedIabAgreement || undefined,
      uspapi: consentManager.configuration.uspapi || undefined,
      // TODO: https://transcend.height.app/T-23919 - reconsider simpler yml shape
      syncGroups: consentManager.configuration.syncGroups || undefined,
      theme: !consentManagerTheme
        ? undefined
        : {
            primaryColor: consentManagerTheme.primaryColor || undefined,
            fontColor: consentManagerTheme.fontColor || undefined,
            privacyPolicy: consentManagerTheme.privacyPolicy || undefined,
            prompt: consentManagerTheme.prompt,
          },
      experiences: consentManagerExperiences.map((experience) => ({
        name: experience.name,
        displayName: experience.displayName || undefined,
        regions: experience.regions.map((region) => ({
          countrySubDivision: region.countrySubDivision || undefined,
          country: region.country || undefined,
        })),
        onConsentExpiry: experience.onConsentExpiry,
        consentExpiry: experience.consentExpiry,
        operator: experience.operator,
        displayPriority: experience.displayPriority,
        viewState: experience.viewState,
        purposes: experience.purposes.map((purpose) => ({
          name: purpose.name,
        })),
        optedOutPurposes: experience.optedOutPurposes.map((purpose) => ({
          name: purpose.name,
        })),
        browserLanguages: experience.browserLanguages,
        browserTimeZones: experience.browserTimeZones,
      })),
    };
  }

  // Save assessment templates
  if (assessmentTemplate.length > 0) {
    result['assessment-templates'] = assessmentTemplate.map(
      ({ title, content, attributeKeys }): AssessmentTemplateInput => ({
        title,
        content,
        attributeKeys: attributeKeys.map(({ name }) => name),
      }),
    );
  }

  // Save assessments
  if (assessments.length > 0) {
    result.assessments = assessments.map(
      ({ title, assessmentTemplate, content }): AssessmentInput => ({
        title,
        content,
        'assessment-template': assessmentTemplate.title,
      }),
    );
  }

  // Save prompts
  if (prompts.length > 0) {
    result.prompts = prompts.map(
      ({ title, content }): PromptInput => ({
        title,
        content,
      }),
    );
  }

  // Save promptPartials
  if (promptPartials.length > 0) {
    result['prompt-partials'] = promptPartials.map(
      ({ title, content }): PromptPartialInput => ({
        title,
        content,
      }),
    );
  }

  // Save promptGroups
  if (promptGroups.length > 0) {
    result['prompt-groups'] = promptGroups.map(
      ({ title, description, prompts }): PromptGroupInput => ({
        title,
        description,
        prompts: prompts.map(({ title }) => title),
      }),
    );
  }

  // Save Data Subjects
  if (dataSubjects.length > 0) {
    result['data-subjects'] = dataSubjects.map(
      ({
        type,
        title,
        active,
        adminDashboardDefaultSilentMode,
        actions,
      }): DataSubjectInput => ({
        type,
        title: title?.defaultMessage,
        active,
        adminDashboardDefaultSilentMode,
        actions: actions.map(({ type }) => type),
      }),
    );
  }

  // Save business entities
  if (businessEntities.length > 0) {
    result['business-entities'] = businessEntities.map(
      ({
        title,
        description,
        address,
        headquarterCountry,
        headquarterSubDivision,
        dataProtectionOfficerName,
        dataProtectionOfficerEmail,
        attributeValues,
      }): BusinessEntityInput => ({
        title,
        description: description || undefined,
        address: address || undefined,
        headquarterCountry: headquarterCountry || undefined,
        headquarterSubDivision: headquarterSubDivision || undefined,
        dataProtectionOfficerName: dataProtectionOfficerName || undefined,
        dataProtectionOfficerEmail: dataProtectionOfficerEmail || undefined,
        attributes:
          attributeValues !== undefined && attributeValues.length > 0
            ? formatAttributeValues(attributeValues)
            : undefined,
      }),
    );
  }

  // Save Actions
  if (actions.length > 0) {
    result.actions = actions.map(
      ({
        type,
        skipSecondaryIfNoFiles,
        skipDownloadableStep,
        requiresReview,
        regionList,
        regionDetectionMethod,
        waitingPeriod,
      }): ActionInput => ({
        type,
        ...(type === RequestAction.Erasure
          ? {
              skipSecondaryIfNoFiles,
              skipDownloadableStep,
            }
          : {}),
        requiresReview,
        waitingPeriod,
        regionDetectionMethod,
        regionList: regionList.length > 0 ? regionList : undefined,
      }),
    );
  }

  // Save identifiers
  if (identifiers.length > 0) {
    result.identifiers = identifiers.map(
      ({
        name,
        type,
        regex,
        selectOptions,
        privacyCenterVisibility,
        isRequiredInForm,
        placeholder,
        displayTitle,
        dataSubjects,
        displayDescription,
      }): IdentifierInput => ({
        name,
        type,
        regex,
        selectOptions: selectOptions.length > 0 ? selectOptions : undefined,
        privacyCenterVisibility:
          privacyCenterVisibility.length > 0
            ? privacyCenterVisibility
            : undefined,
        isRequiredInForm,
        placeholder: placeholder || undefined,
        dataSubjects:
          dataSubjects.length > 0
            ? dataSubjects.map(({ type }) => type)
            : undefined,
        displayTitle: displayTitle?.defaultMessage,
        displayDescription: displayDescription?.defaultMessage,
      }),
    );
  }

  // Save agents
  if (agents.length > 0) {
    result.agents = agents.map(
      ({
        name,
        agentId,
        description,
        codeInterpreterEnabled,
        retrievalEnabled,
        prompt,
        largeLanguageModel,
        teams,
        owners,
        agentFunctions,
        agentFiles,
      }): AgentInput => ({
        name,
        agentId,
        description: description || undefined,
        codeInterpreterEnabled,
        retrievalEnabled,
        prompt: prompt.title,
        'large-language-model': {
          name: largeLanguageModel.name,
          client: largeLanguageModel.client,
        },
        teams:
          teams && teams.length > 0 ? teams.map(({ name }) => name) : undefined,
        owners:
          owners && owners.length > 0
            ? owners.map(({ email }) => email)
            : undefined,
        'agent-functions':
          agentFunctions && agentFunctions.length > 0
            ? agentFunctions.map(({ name }) => name)
            : undefined,
        'agent-files':
          agentFiles && agentFiles.length > 0
            ? agentFiles.map(({ name }) => name)
            : undefined,
      }),
    );
  }

  // Save agent functions
  if (agentFunctions.length > 0) {
    result['agent-functions'] = agentFunctions.map(
      ({ name, description, parameters }): AgentFunctionInput => ({
        name,
        description,
        parameters: JSON.stringify(parameters),
      }),
    );
  }

  // Save agent files
  if (agentFiles.length > 0) {
    result['agent-files'] = agentFiles.map(
      ({ name, description, fileId, size, purpose }): AgentFileInput => ({
        name,
        description,
        fileId,
        size,
        purpose,
      }),
    );
  }

  // Save vendors
  if (vendors.length > 0) {
    result.vendors = vendors.map(
      ({
        title,
        description,
        dataProcessingAgreementLink,
        contactName,
        contactPhone,
        address,
        headquarterCountry,
        headquarterSubDivision,
        websiteUrl,
        businessEntity,
        teams,
        owners,
        attributeValues,
      }): VendorInput => ({
        title,
        description: description || undefined,
        dataProcessingAgreementLink: dataProcessingAgreementLink || undefined,
        contactName: contactName || undefined,
        contactPhone: contactPhone || undefined,
        address: address || undefined,
        headquarterCountry: headquarterCountry || undefined,
        headquarterSubDivision: headquarterSubDivision || undefined,
        websiteUrl: websiteUrl || undefined,
        businessEntity: businessEntity?.title,
        teams:
          teams && teams.length > 0 ? teams.map(({ name }) => name) : undefined,
        owners:
          owners && owners.length > 0
            ? owners.map(({ email }) => email)
            : undefined,
        attributes:
          attributeValues !== undefined && attributeValues.length > 0
            ? formatAttributeValues(attributeValues)
            : undefined,
      }),
    );
  }

  // Save data categories
  if (dataCategories.length > 0) {
    result['data-categories'] = dataCategories.map(
      ({
        name,
        category,
        description,
        regex,
        owners,
        teams,
        attributeValues,
      }): DataCategoryInput => ({
        name,
        category,
        description: description || undefined,
        regex: regex || undefined,
        owners:
          owners && owners.length > 0
            ? owners.map(({ email }) => email)
            : undefined,
        teams:
          teams && teams.length > 0 ? teams.map(({ name }) => name) : undefined,
        attributes:
          attributeValues !== undefined && attributeValues.length > 0
            ? formatAttributeValues(attributeValues)
            : undefined,
      }),
    );
  }

  // Save processing purposes
  if (processingPurposes.length > 0) {
    result['processing-purposes'] = processingPurposes.map(
      ({
        name,
        purpose,
        description,
        owners,
        teams,
        attributeValues,
      }): ProcessingPurposeInput => ({
        name,
        purpose,
        description: description || undefined,
        owners:
          owners && owners.length > 0
            ? owners.map(({ email }) => email)
            : undefined,
        teams:
          teams && teams.length > 0 ? teams.map(({ name }) => name) : undefined,
        attributes:
          attributeValues !== undefined && attributeValues.length > 0
            ? formatAttributeValues(attributeValues)
            : undefined,
      }),
    );
  }

  // Save data flows
  if (dataFlows.length > 0) {
    result['data-flows'] = dataFlows.map(
      ({
        value,
        type,
        description,
        trackingType,
        service,
        status,
        owners,
        teams,
        attributeValues,
      }): DataFlowInput => ({
        value,
        type,
        description: description || undefined,
        trackingPurposes: trackingType,
        status,
        service: service?.integrationName,
        owners: owners.map(({ email }) => email),
        teams: teams.map(({ name }) => name),
        attributes:
          attributeValues !== undefined && attributeValues.length > 0
            ? formatAttributeValues(attributeValues)
            : undefined,
      }),
    );
  }

  // Save cookies
  if (cookies.length > 0) {
    result.cookies = cookies.map(
      ({
        name,
        isRegex,
        description,
        trackingPurposes,
        service,
        status,
        owners,
        teams,
        attributeValues,
      }): CookieInput => ({
        name,
        isRegex,
        description: description || undefined,
        trackingPurposes,
        status,
        service: service?.integrationName,
        owners: owners.map(({ email }) => email),
        teams: teams.map(({ name }) => name),
        attributes:
          attributeValues !== undefined && attributeValues.length > 0
            ? formatAttributeValues(attributeValues)
            : undefined,
      }),
    );
  }

  // Save attributes
  if (attributes.length > 0) {
    result.attributes = attributes.map(
      ({
        description,
        name,
        type,
        values,
        enabledOn = [],
      }): AttributeInput => ({
        description: description || undefined,
        resources: enabledOn,
        name,
        type,
        values: values.map(({ name, color, description }) => ({
          name,
          color: color || undefined,
          description,
        })),
      }),
    );
  }

  // save email templates
  if (dataSiloIds.length === 0 && templates.length > 0) {
    result.templates = templates.map(({ title }) => ({ title }));
  }

  // Save enrichers
  if (enrichers.length > 0) {
    result.enrichers = enrichers.map(
      ({
        title,
        url,
        type,
        inputIdentifier,
        identifiers,
        actions,
        testRegex,
        dataSubjects,
        expirationDuration,
        lookerQueryTitle,
        transitionRequestStatus,
        phoneNumbers,
        regionList,
      }): EnricherInput => ({
        title,
        url: url || undefined,
        type,
        'input-identifier': inputIdentifier?.name,
        'output-identifiers': identifiers.map(({ name }) => name),
        'privacy-actions':
          Object.values(RequestAction).length === actions.length
            ? undefined
            : actions,
        testRegex: testRegex || undefined,
        lookerQueryTitle: lookerQueryTitle || undefined,
        expirationDuration: parseInt(expirationDuration, 10),
        transitionRequestStatus: transitionRequestStatus || undefined,
        phoneNumbers:
          phoneNumbers && phoneNumbers.length > 0 ? phoneNumbers : undefined,
        regionList:
          regionList && regionList.length > 0 ? regionList : undefined,
        'data-subjects': dataSubjects.map(({ type }) => type),
      }),
    );
  }

  // Save data silos
  if (dataSilos.length > 0) {
    const indexedDataSubjects = keyBy(dataSubjects, 'type');
    result['data-silos'] = dataSilos.map(
      ([
        {
          title,
          description,
          url,
          type,
          outerType,
          apiKeys,
          notifyEmailAddress,
          identifiers,
          dependentDataSilos,
          owners,
          country,
          countrySubDivision,
          teams,
          subjectBlocklist,
          isLive,
          promptAVendorEmailSendFrequency,
          promptAVendorEmailSendType,
          promptAVendorEmailIncludeIdentifiersAttachment,
          promptAVendorEmailCompletionLinkType,
          manualWorkRetryFrequency,
          catalog,
          attributeValues,
        },
        dataPoints,
      ]): DataSiloInput => ({
        title,
        description,
        integrationName: type,
        'outer-type': outerType || undefined,
        url: url || undefined,
        'api-key-title': apiKeys[0]?.title,
        'identity-keys': identifiers
          .filter(({ isConnected }) => isConnected)
          .map(({ name }) => name),
        ...(dependentDataSilos.length > 0
          ? {
              'deletion-dependencies': dependentDataSilos.map(
                ({ title }) => title,
              ),
            }
          : {}),
        ...(owners.length > 0
          ? { owners: owners.map(({ email }) => email) }
          : {}),
        ...(teams.length > 0 ? { teams: teams.map(({ name }) => name) } : {}),
        country: country || undefined,
        countrySubDivision: countrySubDivision || undefined,
        disabled: !isLive,
        'data-subjects':
          subjectBlocklist.length > 0
            ? convertToDataSubjectAllowlist(
                subjectBlocklist.map(({ type }) => type),
                indexedDataSubjects,
              )
            : undefined,
        ...(catalog.hasAvcFunctionality
          ? {
              'email-settings': {
                'notify-email-address': notifyEmailAddress || undefined,
                'send-frequency': promptAVendorEmailSendFrequency,
                'send-type': promptAVendorEmailSendType,
                'include-identifiers-attachment':
                  promptAVendorEmailIncludeIdentifiersAttachment,
                'completion-link-type': promptAVendorEmailCompletionLinkType,
                'manual-work-retry-frequency': manualWorkRetryFrequency,
              },
            }
          : {}),
        attributes:
          attributeValues !== undefined && attributeValues.length > 0
            ? formatAttributeValues(attributeValues)
            : undefined,

        datapoints: dataPoints
          .map(
            (dataPoint): DatapointInput => ({
              key: dataPoint.name,
              title: dataPoint.title?.defaultMessage,
              description: dataPoint.description?.defaultMessage,
              owners: dataPoint.owners.map(({ email }) => email),
              teams: dataPoint.teams.map(({ name }) => name),
              ...(dataPoint.path.length > 0 ? { path: dataPoint.path } : {}),
              ...(dataPoint.dataCollection?.title
                ? {
                    'data-collection-tag':
                      dataPoint.dataCollection.title.defaultMessage,
                  }
                : {}),
              ...(dataPoint.dbIntegrationQueries.length > 0
                ? {
                    'privacy-action-queries': mapValues(
                      keyBy(dataPoint.dbIntegrationQueries, 'requestType'),
                      (databaseIntegrationQuery) =>
                        databaseIntegrationQuery.suggestedQuery ||
                        databaseIntegrationQuery.query ||
                        undefined,
                    ),
                  }
                : {}),
              ...(dataPoint.subDataPoints.length > 0
                ? {
                    fields: dataPoint.subDataPoints
                      .map(
                        (field): FieldInput => ({
                          key: field.name,
                          description: field.description,
                          purposes: field.purposes,
                          categories: field.categories,
                          ...(includeGuessedCategories &&
                          field.pendingCategoryGuesses
                            ? {
                                'guessed-categories':
                                  field.pendingCategoryGuesses
                                    .filter(
                                      (guess) => guess.status === 'PENDING',
                                    )
                                    .map((guess) => ({
                                      category: {
                                        name: guess.category.name,
                                        category: guess.category.category,
                                      },
                                      status: guess.status,
                                      confidenceLabel: guess.confidenceLabel,
                                      confidence: guess.confidence,
                                      classifierVersion:
                                        guess.classifierVersion,
                                    })),
                              }
                            : {}),
                          'access-request-visibility-enabled':
                            field.accessRequestVisibilityEnabled,
                          'erasure-request-redaction-enabled':
                            field.erasureRequestRedactionEnabled,
                          attributes:
                            field.attributeValues !== undefined &&
                            field.attributeValues.length > 0
                              ? formatAttributeValues(field.attributeValues)
                              : undefined,
                        }),
                      )
                      .sort((a, b) => a.key.localeCompare(b.key)),
                  }
                : {}),
              'privacy-actions': dataPoint.actionSettings
                .filter(({ active }) => active)
                .map(({ type }) => type),
            }),
          )
          .sort((a, b) =>
            [...(a.path ?? []), a.key]
              .join('.')
              .localeCompare([...(b.path ?? []), b.key].join('.')),
          ),
      }),
    );
  }
  return result;
}
/* eslint-enable max-lines */
