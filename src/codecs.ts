// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable max-lines */
import * as t from 'io-ts';
import { applyEnum, valuesOf } from '@transcend-io/type-utils';
import {
  DataCategoryType,
  ConsentBundleType,
  EnricherType,
  ProcessingPurpose,
  RequestAction,
  ComparisonOperator,
  RequestActionObjectResolver,
  AssessmentSyncColumn,
  RetentionScheduleType,
  AssessmentQuestionType,
  UspapiOption,
  DataFlowScope,
  PromptAVendorEmailSendType,
  RetentionScheduleOperation,
  AssessmentsDisplayLogicAction,
  LogicOperator,
  ConsentPrecedenceOption,
  AssessmentSyncModel,
  AssessmentQuestionSubType,
  IsoCountryCode,
  BrowserTimeZone,
  IsoCountrySubdivisionCode,
  ConsentTrackerStatus,
  AttributeKeyType,
  PromptAVendorEmailCompletionLinkType,
  RegionsOperator,
  UnknownRequestPolicy,
  TelemetryPartitionStrategy,
  SignedIabAgreementOption,
  RegionDetectionMethod,
  PreflightRequestStatus,
  AttributeSupportedResourceType,
  ConfidenceLabel,
  SubDataPointDataSubCategoryGuessStatus,
  LargeLanguageModelClient,
  PromptFilePurpose,
  CodePackageType,
  ActionItemPriorityOverride,
  ActionItemCode,
  ScopeName,
  TranscendProduct,
  PrivacyCenterComponentStyles,
  PrivacyCenterTextStyles,
  ConfigurableColorPaletteColor,
  AssessmentFormTemplateStatus,
  AssessmentFormStatus,
  AssessmentFormTemplateSource,
} from '@transcend-io/privacy-types';
import {
  InitialViewState,
  BrowserLanguage,
  OnConsentExpiry,
} from '@transcend-io/airgap.js-types';
import { buildEnabledRouteType } from './helpers/buildEnabledRouteType';
import { buildAIIntegrationType } from './helpers/buildAIIntegrationType';
import { OpenAIRouteName, PathfinderPolicyName } from './enums';
import { LanguageKey } from '@transcend-io/internationalization';

/**
 * Input to define email templates that can be used to communicate to end-users
 * about the status of their requests
 *
 * @see https://docs.transcend.io/docs/privacy-requests/configuring-requests/email-templates
 */
export const TemplateInput = t.type({
  /** The title of the template */
  title: t.string,
});

/** Type override */
export type TemplateInput = t.TypeOf<typeof TemplateInput>;

export const WebhookHeader = t.intersection([
  t.type({
    /** The name of the header to set. */
    name: t.string,
    /** The value of the header. */
    value: t.string,
  }),
  t.partial({
    /** The header contains a secret */
    isSecret: t.boolean,
  }),
]);

/** Type override */
export type WebhookHeader = t.TypeOf<typeof WebhookHeader>;

/**
 * Input to define API keys that may be shared across data silos
 * in the data map. When creating new data silos through the yaml
 * cli, it is possible to specify which API key should be associated
 * with the newly created data silo.
 *
 * @see https://docs.transcend.io/docs/authentication
 */
export const ApiKeyInput = t.type({
  /** The display title of the enricher */
  title: t.string,
});

/** Type override */
export type ApiKeyInput = t.TypeOf<typeof ApiKeyInput>;

/**
 * Input to define teams in Transcend
 * Users belong to teams and teams can be assigned to various resources
 *
 * @see https://docs.transcend.io/docs/security/access-control
 */
export const TeamInput = t.intersection([
  t.type({
    /** The display name of the team */
    name: t.string,
    /** Team description */
    description: t.string,
  }),
  t.partial({
    /** SSO department for automated provisioning */
    'sso-department': t.string,
    /** SSO group name for automated provisioning */
    'sso-group': t.string,
    /** SSO title mapping for automated provisioning */
    'sso-title': t.string,
    /** List of user emails on the team */
    users: t.array(t.string),
    /** List of scopes that the team should have */
    scopes: t.array(valuesOf(ScopeName)),
  }),
]);

/** Type override */
export type TeamInput = t.TypeOf<typeof TeamInput>;

/**
 * Input to define an enricher
 *
 * Define enricher or pre-flight check webhooks that will be executed
 * prior to privacy request workflows. Some examples may include:
 *  - identity enrichment: look up additional identifiers for that user.
 *                         i.e. map an email address to a user ID
 *  - fraud check: auto-cancel requests if the user is flagged for fraudulent behavior
 *  - customer check: auto-cancel request for some custom business criteria
 *
 * @see https://docs.transcend.io/docs/identity-enrichment
 */
export const EnricherInput = t.intersection([
  t.type({
    /** The display title of the enricher */
    title: t.string,

    /**
     * The names of the identifiers that can be resolved by this enricher.
     * i.e. email -> [userId, phone, advertisingId]
     */
    'output-identifiers': t.array(t.string),
  }),
  t.partial({
    /** Internal description for why the enricher is needed */
    description: t.string,
    /** The URL of the enricher */
    url: t.string,
    /** The type of enricher */
    type: valuesOf(EnricherType),
    /**
     * The name of the identifier that will be the input to this enricher.
     * Whenever a privacy request contains this identifier, the webhook will
     * be called with the value of that identifier as input
     */
    'input-identifier': t.string,
    /**
     * A regular expression that can be used to match on for cancellation
     */
    testRegex: t.string,
    /**
     * For looker integration - the title of the looker query to run
     */
    lookerQueryTitle: t.string,
    /**
     * The duration (in ms) that the enricher should take to execute.
     */
    expirationDuration: t.number,
    /**
     * The status that the enricher should transfer to when condition is met.
     */
    transitionRequestStatus: valuesOf(PreflightRequestStatus),
    /**
     * For twilio integration - the phone numbers that can be used to send text codes
     */
    phoneNumbers: t.array(t.string),
    /** The list of regions that should trigger the preflight check */
    regionList: t.array(
      valuesOf({ ...IsoCountryCode, ...IsoCountrySubdivisionCode }),
    ),
    /**
     * Specify which data subjects the enricher should run for
     */
    'data-subjects': t.array(t.string),
    /** Headers to include in the webhook */
    headers: t.array(WebhookHeader),
    /** The privacy actions that the enricher should run against */
    'privacy-actions': t.array(valuesOf(RequestAction)),
  }),
]);

/** Type override */
export type EnricherInput = t.TypeOf<typeof EnricherInput>;

/**
 * The processing purpose for a field
 */
export const ProcessingPurposePreviewInput = t.type({
  /** The parent purpose */
  purpose: valuesOf(ProcessingPurpose),
  /** User-defined name for this processing purpose sub category */
  name: t.string,
});

/** Type override */
export type ProcessingPurposePreviewInput = t.TypeOf<
  typeof ProcessingPurposePreviewInput
>;

/**
 * The data category for a field
 */
export const DataCategoryPreviewInput = t.intersection([
  t.type({
    /** The parent category */
    category: valuesOf(DataCategoryType),
  }),
  t.partial({
    /** User-defined name for this sub category */
    name: t.string,
  }),
]);

/** Type override */
export type DataCategoryPreviewInput = t.TypeOf<
  typeof DataCategoryPreviewInput
>;

/**
 * A guessed data category from the content classifier
 */
export const DataCategoryGuessInput = t.intersection([
  t.type({
    /** The parent category */
    category: DataCategoryPreviewInput,
    /** Status of guess */
    status: valuesOf(SubDataPointDataSubCategoryGuessStatus),
    /** Confidence label */
    confidenceLabel: valuesOf(ConfidenceLabel),
    /** Confidence level of guess */
    confidence: t.number,
  }),
  t.partial({
    /** classifier version that produced the guess */
    classifierVersion: t.number,
  }),
]);

/** Type override */
export type DataCategoryGuessInput = t.TypeOf<typeof DataCategoryGuessInput>;

export const AttributeValueInput = t.intersection([
  t.type({
    /** Name of attribute value */
    name: t.string,
  }),
  t.partial({
    /** Description */
    description: t.string,
    /** Color */
    color: t.string,
  }),
]);

/** Type override */
export type AttributeValueInput = t.TypeOf<typeof AttributeValueInput>;

export const AttributeInput = t.intersection([
  t.type({
    /** Name of attribute */
    name: t.string,
    /** Type of attribute */
    type: valuesOf(AttributeKeyType),
  }),
  t.partial({
    /** Description of attribute */
    description: t.string,
    /** Resource types that the attribute is enabled on */
    resources: t.array(valuesOf(AttributeSupportedResourceType)),
    /** Values of attribute */
    values: t.array(AttributeValueInput),
  }),
]);

/** Type override */
export type AttributeInput = t.TypeOf<typeof AttributeInput>;

export const AttributePreview = t.type({
  /** Attribute key */
  key: t.string,
  /** Attribute values */
  values: t.array(t.string),
});

/** Type override */
export type AttributePreview = t.TypeOf<typeof AttributePreview>;

/**
 * Agent type definition.
 */
export const AgentInput = t.intersection([
  t.type({
    /** The name of the agent. */
    name: t.string,
    /** The instructions of the agent. */
    instructions: t.string,
    /** The ID of the agent */
    agentId: t.string,
    /** Whether the agent has code interpreter enabled */
    codeInterpreterEnabled: t.boolean,
    /** Whether the agent has retrieval enabled */
    retrievalEnabled: t.boolean,
    /** Large language model powering the agent */
    'large-language-model': t.type({
      /** Name of the model */
      name: t.string,
      /** Client of the model */
      client: valuesOf(LargeLanguageModelClient),
    }),
  }),
  t.partial({
    /** The description of the agent. */
    description: t.string,
    /** The title of the prompt that the agent is based on */
    prompt: t.string,
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this agent
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this agent
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
    /**
     * The names of the functions that the agent has access to
     */
    'agent-functions': t.array(t.string),
    /**
     * The names of the files that the agent has access to for retrieval
     */
    'agent-files': t.array(t.string),
  }),
]);

/**
 * Type override
 */
export type AgentInput = t.TypeOf<typeof AgentInput>;

/**
 * AgentFunction type definition.
 */
export const AgentFunctionInput = t.type({
  /** Name of the agentFunction */
  name: t.string,
  /** Description of the agentFunction */
  description: t.string,
  /** The JSON schema */
  parameters: t.string,
});

/**
 * Type override
 */
export type AgentFunctionInput = t.TypeOf<typeof AgentFunctionInput>;

/**
 * AgentFile type definition.
 */
export const AgentFileInput = t.intersection([
  t.type({
    /** Name of the agentFile */
    name: t.string,
    /** File ID */
    fileId: t.string,
    /** File size */
    size: t.number,
    /** File purpose */
    purpose: valuesOf(PromptFilePurpose),
  }),
  t.partial({
    /** Description of the agentFile */
    description: t.string,
  }),
]);

/**
 * Type override
 */
export type AgentFileInput = t.TypeOf<typeof AgentFileInput>;

/**
 * Vendor type definition.
 */
export const VendorInput = t.intersection([
  t.type({
    /** Title of vendor */
    title: t.string,
  }),
  t.partial({
    /** Description of vendor */
    description: t.string,
    /** DPA link */
    dataProcessingAgreementLink: t.string,
    /** Contract email */
    contactName: t.string,
    /** Contract phone */
    contactPhone: t.string,
    /** Address */
    address: t.string,
    /** Headquarters country */
    headquarterCountry: valuesOf(IsoCountryCode),
    /** Headquarters subdivision */
    headquarterSubDivision: valuesOf(IsoCountrySubdivisionCode),
    /** Website URL */
    websiteUrl: t.string,
    /** Business entity */
    businessEntity: t.string,
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this vendor
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this vendor
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
    /**
     * Attribute value and its corresponding attribute key
     */
    attributes: t.array(AttributePreview),
  }),
]);

/**
 * Type override
 */
export type VendorInput = t.TypeOf<typeof VendorInput>;

/**
 * DataCategory type definition.
 */
export const DataCategoryInput = t.intersection([
  t.type({
    /** Name of data category */
    name: t.string,
    /** Type of data category */
    category: valuesOf(DataCategoryType),
  }),
  t.partial({
    /** Description of data category */
    description: t.string,
    /** Regex for data category */
    regex: t.string,
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this data category
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this data category.
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
    /**
     * Attribute value and its corresponding attribute key
     */
    attributes: t.array(AttributePreview),
  }),
]);

/**
 * Type override
 */
export type DataCategoryInput = t.TypeOf<typeof DataCategoryInput>;

/**
 * ProcessingPurpose type definition.
 */
export const ProcessingPurposeInput = t.intersection([
  t.type({
    /** Name of processing purpose */
    name: t.string,
    /** Type of processing purpose */
    purpose: valuesOf(ProcessingPurpose),
  }),
  t.partial({
    /** Description of processing purpose */
    description: t.string,
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this processing purpose
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this processing purpose.
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
    /**
     * Attribute value and its corresponding attribute key
     */
    attributes: t.array(AttributePreview),
  }),
]);

/**
 * Type override
 */
export type ProcessingPurposeInput = t.TypeOf<typeof ProcessingPurposeInput>;

/**
 * Prompt definition inputs
 */
export const PromptInput = t.type({
  /** The title of the prompt. */
  title: t.string,
  /** The content of the prompt. */
  content: t.string,
});

/**
 * Type override
 */
export type PromptInput = t.TypeOf<typeof PromptInput>;

/**
 * Prompt partial definition inputs
 */
export const PromptPartialInput = t.type({
  /** The title of the prompt partial. */
  title: t.string,
  /** The content of the prompt partial. */
  content: t.string,
});

/**
 * Type override
 */
export type PromptPartialInput = t.TypeOf<typeof PromptPartialInput>;

/**
 * Prompt partial definition inputs
 */
export const PromptGroupInput = t.type({
  /** The title of the prompt group. */
  title: t.string,
  /** The description of the prompt group. */
  description: t.string,
  /** The titles of the prompts included. */
  prompts: t.array(t.string),
});

/**
 * Type override
 */
export type PromptGroupInput = t.TypeOf<typeof PromptGroupInput>;

/**
 * Annotate specific fields within a datapoint. These are often database table columns.
 * Fields can also be a JSON object or separate file.
 */
export const FieldInput = t.intersection([
  t.type({
    /** The unique key of the field. When a database, this is the column name. */
    key: t.string,
  }),
  t.partial({
    /** The display title of the field */
    title: t.string,
    /** Description of the field */
    description: t.union([t.string, t.null]),
    /**
     * What is the purpose of processing for this datapoint/table?
     *
     * @see https://github.com/transcend-io/privacy-types/blob/main/src/objects.ts
     */
    purposes: t.array(ProcessingPurposePreviewInput),
    /**
     * The category of personal data for this datapoint
     *
     * @see https://github.com/transcend-io/privacy-types/blob/main/src/objects.ts
     */
    categories: t.array(DataCategoryPreviewInput),
    /**
     * The category of personal data that have been guessed by the classifier this datapoint
     *
     * @see https://github.com/transcend-io/privacy-types/blob/main/src/objects.ts
     */
    'guessed-categories': t.array(DataCategoryGuessInput),
    /**
     * When true, this subdatapoint should be revealed in a data access request.
     * When false, this field should be redacted
     */
    'access-request-visibility-enabled': t.boolean,
    /**
     * When true, this subdatapoint should be redacted during an erasure request.
     * There normally is a choice of enabling hard deletion or redaction at the
     * datapoint level, but if redaction is enabled, this column can be used
     * to define which fields should be redacted.
     */
    'erasure-request-redaction-enabled': t.boolean,
    /** Attributes tagged to subdatapoint */
    attributes: t.array(AttributePreview),
  }),
]);

/** Type override */
export type FieldInput = t.TypeOf<typeof FieldInput>;

/**
 * Datapoints are the different types of data models that existing within your data silo.
 * If the data silo is a database, these would be your tables.
 * Note: These are currently called "datapoints" in the Transcend UI and documentation.
 *
 * @see https://docs.transcend.io/docs/the-data-map#datapoints
 */
export const DatapointInput = t.intersection([
  t.type({
    /** The unique key of the datapoint. For a database, this is the table name. */
    key: t.string,
  }),
  t.partial({
    /**
     * Usually only relevant for databases,
     * this field should include any schema information for a given datapoint.
     *
     * Examples:
     * - In postgres, it's possible to have multiple tables with the same name under
     * different schemas. e.g., "public", "test". So here you'd specify ["public"] or ["test"]
     * - In Snowflake, it's possible to have different databases with different schemas,
     * so you can specify ["ANALYTICS", "public"] to indicate that the datapoint belongs to
     * the "public" schema of the "ANALYTICS" database.
     */
    path: t.array(t.string),
    /** The display title of the enricher */
    title: t.string,
    /** Internal description for why the enricher is needed */
    description: t.string,
    /**
     * Configure the category of data that this datapoint should be grouped by in a data access request.
     *
     * @see https://docs.transcend.io/docs/privacy-requests/connecting-data-silos/saas-tools#configuring-an-integration
     */
    'data-collection-tag': t.string,
    /**
     * The SQL queries that should be run for that datapoint in a privacy request.
     *
     * @see https://github.com/transcend-io/privacy-types/blob/main/src/actions.ts
     */
    'privacy-action-queries': t.partial(
      applyEnum(RequestActionObjectResolver, () => t.string),
    ),
    /**
     * The types of privacy actions that this datapoint can implement
     *
     * @see https://github.com/transcend-io/privacy-types/blob/main/src/actions.ts
     */
    'privacy-actions': t.array(valuesOf(RequestActionObjectResolver)),
    /**
     * Provide field-level metadata for this datapoint.
     * This is often the column metadata
     */
    fields: t.array(FieldInput),
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this datapoint
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this datapoint
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
  }),
]);

/** Type override */
export type DatapointInput = t.TypeOf<typeof DatapointInput>;

export const PromptAVendorEmailSettings = t.partial({
  /** The email address of the user to notify when a promptAPerson integration */
  'notify-email-address': t.string,
  /**
   * The frequency with which we should be sending emails for this data silo, in milliseconds.
   */
  'send-frequency': t.number,
  /**
   * The type of emails to send for this data silo, i.e. send an email for each DSR, across all open DSRs,
   * or per profile in a DSR.
   */
  'send-type': valuesOf(PromptAVendorEmailSendType),
  /**
   * Indicates whether prompt-a-vendor emails should include a list of identifiers
   * in addition to a link to the bulk processing UI.
   */
  'include-identifiers-attachment': t.boolean,
  /**
   * Indicates what kind of link to generate as part of the emails sent out for this Prompt-a-Vendor silo.
   */
  'completion-link-type': valuesOf(PromptAVendorEmailCompletionLinkType),
  /**
   * The frequency with which we should retry sending emails for this data silo, in milliseconds.
   * Needs to be a string because the number can be larger than the MAX_INT
   */
  'manual-work-retry-frequency': t.string,
});

/** Type override */
export type PromptAVendorEmailSettings = t.TypeOf<
  typeof PromptAVendorEmailSettings
>;

/**
 * Input to define a business entity
 *
 * @see https://app.transcend.io/data-map/data-inventory/business-entities
 */
export const BusinessEntityInput = t.intersection([
  t.type({
    /** The title of the business entity */
    title: t.string,
  }),
  t.partial({
    /** Description of the business entity */
    description: t.string,
    /** Address of the business entity */
    address: t.string,
    /** Country of headquarters */
    headquarterCountry: valuesOf(IsoCountryCode),
    /** Subdivision of headquarters */
    headquarterSubDivision: valuesOf(IsoCountrySubdivisionCode),
    /** Data protection officer name for the business entity */
    dataProtectionOfficerName: t.string,
    /** Data protection officer email for the business entity */
    dataProtectionOfficerEmail: t.string,
    /**
     * Attribute value and its corresponding attribute key
     */
    attributes: t.array(AttributePreview),
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this data silo
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this data silo.
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
  }),
]);

/** Type override */
export type BusinessEntityInput = t.TypeOf<typeof BusinessEntityInput>;

/**
 * Software development kit inputs
 *
 * @see https://app.transcend.io/code-scanning/sdks
 */
export const SoftwareDevelopmentKitInput = t.intersection([
  t.type({
    /** Title of software development kit */
    name: t.string,
    /** Code package type */
    codePackageType: valuesOf(CodePackageType),
  }),
  t.partial({
    /** Description of the SDK */
    description: t.string,
    /** Github repository */
    repositoryUrl: t.string,
    /** Integration name */
    catalogIntegrationName: t.string,
    /** Doc links */
    documentationLinks: t.array(t.string),
    /** Emails of owners */
    ownerEmails: t.array(t.string),
    /** Team names */
    teamNames: t.array(t.string),
  }),
]);

/** Type override */
export type SoftwareDevelopmentKitInput = t.TypeOf<
  typeof SoftwareDevelopmentKitInput
>;

/**
 * SDK defined for a code package
 */
export const CodePackageSdk = t.intersection([
  t.type({
    /** Name of SDK */
    name: t.string,
  }),
  t.partial({
    /** Version of SDK */
    version: t.string,
    /** Indicate if dependency is a dev dependency */
    isDevDependency: t.boolean,
  }),
]);

/** Type override */
export type CodePackageSdk = t.TypeOf<typeof CodePackageSdk>;

/**
 * Input to define a code package
 *
 * @see https://app.transcend.io/code-scanning/code-packages
 */
export const CodePackageInput = t.intersection([
  t.type({
    /** The name of the package */
    name: t.string,
    /** Type of code package */
    type: valuesOf(CodePackageType),
    /** Relative path to code package within the repository */
    relativePath: t.string,
    /** Name of repository that the code packages are being uploaded to */
    repositoryName: t.string,
  }),
  t.partial({
    /** Description of the code package */
    description: t.string,
    /** Software development kits in the repository */
    softwareDevelopmentKits: t.array(CodePackageSdk),
    /** Names of the teams that manage the code package */
    teamNames: t.array(t.string),
    /** Names of the owner emails that manage the code package */
    ownerEmails: t.array(t.string),
  }),
]);

/** Type override */
export type CodePackageInput = t.TypeOf<typeof CodePackageInput>;

/**
 * Input to define a repository
 *
 * @see https://app.transcend.io/code-scanning/repositories
 */
export const RepositoryInput = t.intersection([
  t.type({
    /** The name of the repo */
    name: t.string,
    /** URL of repository */
    url: t.string,
  }),
  t.partial({
    /** Description of the repository */
    description: t.string,
    /** Names of the teams that manage the repository */
    teamNames: t.array(t.string),
    /** Names of the owner emails that manage the repository */
    ownerEmails: t.array(t.string),
  }),
]);

/** Type override */
export type RepositoryInput = t.TypeOf<typeof RepositoryInput>;

/**
 * Input to define a data subject
 *
 * @see https://app.transcend.io/privacy-requests/settings
 */
export const DataSubjectInput = t.intersection([
  t.type({
    /** The type of the data subject */
    type: t.string,
  }),
  t.partial({
    /** Whether the data subject is active on the Privacy Center & DSR API */
    active: t.boolean,
    /** The title of the data subject */
    title: t.string,
    /** Whether or not to default new requests made in the admin dashboard to silent mode */
    adminDashboardDefaultSilentMode: t.boolean,
    /** Enabled request actions for the data subject */
    actions: t.array(valuesOf(RequestAction)),
  }),
]);

/** Type override */
export type DataSubjectInput = t.TypeOf<typeof DataSubjectInput>;

/**
 * Input to define an action
 *
 * @see https://app.transcend.io/privacy-requests/settings
 */
export const ActionInput = t.intersection([
  t.type({
    /** The type of the data subject */
    type: valuesOf(RequestAction),
  }),
  t.partial({
    /** Whether or not to skip deletion phase when no data is found */
    skipSecondaryIfNoFiles: t.boolean,
    /** Whether to skip the downloadable step */
    skipDownloadableStep: t.boolean,
    /** Whether the request action requires review */
    requiresReview: t.boolean,
    /** The wait period for the action */
    waitingPeriod: t.number,
    /** The method in which the data subject's region is detected */
    regionDetectionMethod: valuesOf(RegionDetectionMethod),
    /** The list of regions to show in the form */
    regionList: t.array(
      valuesOf({ ...IsoCountryCode, ...IsoCountrySubdivisionCode }),
    ),
    /** The list of regions NOT to show in the form */
    regionBlockList: t.array(
      valuesOf({ ...IsoCountryCode, ...IsoCountrySubdivisionCode }),
    ),
  }),
]);

/** Type override */
export type ActionInput = t.TypeOf<typeof ActionInput>;

/**
 * Input to define an identifier
 *
 * @see https://app.transcend.io/privacy-requests/identifiers
 */
export const IdentifierInput = t.intersection([
  t.type({
    /** The name of the identifier */
    name: t.string,
    /** The type of the identifier */
    type: t.string,
  }),
  t.partial({
    /** Regular expression to verify the identifier */
    regex: t.string,
    /** The fixed set of options that an identifier can take on */
    selectOptions: t.array(t.string),
    /** Whether or not the identifier is shown in the privacy center form */
    privacyCenterVisibility: t.array(valuesOf(RequestAction)),
    /** The set of data subjects that this identifier is enabled for */
    dataSubjects: t.array(t.string),
    /** When true, the identifier is a required field on the privacy center form */
    isRequiredInForm: t.boolean,
    /** Placeholder message for identifier */
    placeholder: t.string,
    /** Display title for identifier */
    displayTitle: t.string,
    /** Display description for identifier */
    displayDescription: t.string,
    /** The display order for the identifier */
    displayOrder: t.number,
  }),
]);

/** Type override */
export type IdentifierInput = t.TypeOf<typeof IdentifierInput>;

/**
 * Input to define a data flow
 *
 * @see https://app.transcend.io/consent-manager/data-flows/approved
 */
export const DataFlowInput = t.intersection([
  t.type({
    /** Value of data flow */
    value: t.string,
    /** Type of data flow */
    type: valuesOf(DataFlowScope),
  }),
  t.partial({
    /** Description of data flow */
    description: t.string,
    /** The tracking purposes that are required to be opted in for this data flow */
    trackingPurposes: t.array(t.string),
    /**
     * Name of the consent service attached
     */
    service: t.string,
    /**
     * Status of the tracker (approved vs triage)
     */
    status: valuesOf(ConsentTrackerStatus),
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this data silo
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this data silo.
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
    /**
     * Attribute value and its corresponding attribute key
     */
    attributes: t.array(AttributePreview),
  }),
]);

/** Type override */
export type DataFlowInput = t.TypeOf<typeof DataFlowInput>;

export const CookieInput = t.intersection([
  t.type({
    /** Name of data flow */
    name: t.string,
  }),
  t.partial({
    /** Whether or not the cookie is a regular expression */
    isRegex: t.boolean,
    /** Description of data flow */
    description: t.string,
    /** The tracking purposes that are required to be opted in for this data flow */
    trackingPurposes: t.array(t.string),
    /**
     * Name of the consent service attached
     */
    service: t.string,
    /**
     * Status of the tracker (approved vs triage)
     */
    status: valuesOf(ConsentTrackerStatus),
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this data silo
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this data silo.
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
    /**
     * Attribute value and its corresponding attribute key
     */
    attributes: t.array(AttributePreview),
  }),
]);

/** Type override */
export type CookieInput = t.TypeOf<typeof CookieInput>;

export const ConsentManageExperienceInput = t.intersection([
  t.type({
    /** Name of experience */
    name: t.string,
  }),
  t.partial({
    /** Name of experience */
    displayName: t.string,
    /** Region that define this regional experience */
    regions: t.array(
      t.partial({
        countrySubDivision: valuesOf(IsoCountrySubdivisionCode),
        country: valuesOf(IsoCountryCode),
      }),
    ),
    /** How to handle consent expiry */
    onConsentExpiry: valuesOf(OnConsentExpiry),
    /** Consent expiration lever */
    consentExpiry: t.number,
    /** In vs not in operator */
    operator: valuesOf(RegionsOperator),
    /** Priority of experience */
    displayPriority: t.number,
    /** View state to prompt when auto prompting is enabled */
    viewState: valuesOf(InitialViewState),
    /** Purposes that can be opted out of in a particular experience */
    purposes: t.array(
      t.type({
        /** Slug of purpose */
        trackingType: t.string,
      }),
    ),
    /** Purposes that are opted out by default in a particular experience */
    optedOutPurposes: t.array(
      t.type({
        /** Slug of purpose */
        trackingType: t.string,
      }),
    ),
    /**
     * Browser languages that define this regional experience
     */
    browserLanguages: t.array(valuesOf(BrowserLanguage)),
    /** Browser time zones that define this regional experience */
    browserTimeZones: t.array(valuesOf(BrowserTimeZone)),
  }),
]);

/** Type override */
export type ConsentManageExperienceInput = t.TypeOf<
  typeof ConsentManageExperienceInput
>;

export const PartitionInput = t.intersection([
  t.type({
    /** Name of partition */
    name: t.string,
  }),
  t.partial({
    /** Value of partition, cannot be pushed, can only be pulled */
    partition: t.string,
  }),
]);

/** Type override */
export type PartitionInput = t.TypeOf<typeof PartitionInput>;

export const ConsentManagerInput = t.partial({
  /** Airgap version */
  version: t.string,
  /** The consent manager domains in the instance */
  bundleUrls: t.record(valuesOf(ConsentBundleType), t.string),
  /** The consent manager domains in the instance */
  domains: t.array(t.string),
  /** Key used to partition consent records */
  partition: t.string,
  /** Precedence of signals vs user input */
  consentPrecedence: valuesOf(ConsentPrecedenceOption),
  /** The consent manager unknown request policy */
  unknownRequestPolicy: valuesOf(UnknownRequestPolicy),
  /** The consent manager unknown cookie policy */
  unknownCookiePolicy: valuesOf(UnknownRequestPolicy),
  /** The XDI sync endpoint for this airgap bundle */
  syncEndpoint: t.string,
  /** The telemetry partitioning strategy */
  telemetryPartitioning: valuesOf(TelemetryPartitionStrategy),
  /** Whether the site owner has signed the IAB agreement */
  signedIabAgreement: valuesOf(SignedIabAgreementOption),
  /** Whether or not to use the US Privacy API */
  uspapi: valuesOf(UspapiOption),
  /** Regional experience configurations */
  experiences: t.array(ConsentManageExperienceInput),
  /** Theme config */
  theme: t.partial({
    /** Primary color */
    primaryColor: t.string,
    /** Font color */
    fontColor: t.string,
    /** Privacy policy URL */
    privacyPolicy: t.string,
    /** Auto-prompt setting */
    prompt: t.number,
  }),
  // TODO: https://transcend.height.app/T-23919 - reconsider simpler yml shape
  /** The Shared XDI host sync groups config (JSON) for this airgap bundle */
  syncGroups: t.string,
});

/** Type override */
export type ConsentManagerInput = t.TypeOf<typeof ConsentManagerInput>;

/**
 * Input to define a privacy center
 */
export const PrivacyCenterInput = t.partial({
  /** Whether or not the entire privacy center is enabled or disabled */
  isDisabled: t.boolean,
  /** Whether or not to show the privacy requests button */
  showPrivacyRequestButton: t.boolean,
  /** Whether or not to show the data practices page */
  showDataPractices: t.boolean,
  /** Whether or not to show the policies page */
  showPolicies: t.boolean,
  /** Whether or not to show the tracking technologies page */
  showTrackingTechnologies: t.boolean,
  /** Whether or not to show the cookies on the tracking technologies page */
  showCookies: t.boolean,
  /** Whether or not to show the data flows on the tracking technologies page */
  showDataFlows: t.boolean,
  /** Whether or not to show the consent manager opt out options on the tracking technologies page */
  showConsentManager: t.boolean,
  /** Whether or not to show the manage your privacy page */
  showManageYourPrivacy: t.boolean,
  /** Whether or not to show the privacy preferences page */
  showPrivacyPreferences: t.boolean,
  /** Whether or not to show the marketing preferences page */
  showMarketingPreferences: t.boolean,
  /** What languages are supported for the privacy center */
  locales: t.array(valuesOf(LanguageKey)),
  /** The default locale for the privacy center */
  defaultLocale: valuesOf(LanguageKey),
  /** Whether or not to prefer the browser default locale */
  preferBrowserDefaultLocale: t.boolean,
  /** The email addresses of the employees within your company that are the go-to individuals for managing this privacy center */
  supportEmail: t.string,
  /** The email addresses of the employees within your company that are the go-to individuals for managing this privacy center */
  replyToEmail: t.string,
  /** Whether or not to send emails from a no reply email */
  useNoReplyEmailAddress: t.boolean,
  /** Whether or not to use a custom email domain */
  useCustomEmailDomain: t.boolean,
  /** Whether or not to transcend access requests from JSON to CSV */
  transformAccessReportJsonToCsv: t.boolean,
  /** The theme object of colors to display on the privacy center */
  theme: t.partial({
    /** The theme colors */
    colors: t.partial(applyEnum(ConfigurableColorPaletteColor, () => t.string)),
    /** Styles to apply to components */
    componentStyles: PrivacyCenterComponentStyles,
    /** Override styles */
    textStyles: PrivacyCenterTextStyles,
  }),
});

/** Type override */
export type PrivacyCenterInput = t.TypeOf<typeof PrivacyCenterInput>;

/**
 * Input to define a policy
 */
export const PolicyInput = t.intersection([
  t.type({
    /** The title of the policy */
    title: t.string,
  }),
  t.partial({
    /** Effective date of policy */
    effectiveOn: t.string,
    /** Whether or not to disable the effective date */
    disableEffectiveOn: t.boolean,
    /** Content of the policy */
    content: t.string,
    /** The languages for which the policy is disabled for */
    disabledLocales: t.array(valuesOf(LanguageKey)),
  }),
]);

/** Type override */
export type PolicyInput = t.TypeOf<typeof PolicyInput>;

/**
 * Input to define an internationalized message defined in Transcend
 */
export const IntlMessageInput = t.intersection([
  t.type({
    /** The ID of the message */
    id: t.string,
  }),
  t.partial({
    /** The hard-coded ID that the message refers to in the Privacy Center or Consent Manager UI, null if message is dynamic */
    targetReactIntlId: t.string,
    /** The default message to use */
    defaultMessage: t.string,
    /** The translations */
    translations: t.partial(applyEnum(LanguageKey, () => t.string)),
  }),
]);

/** Type override */
export type IntlMessageInput = t.TypeOf<typeof IntlMessageInput>;

/**
 * Input to define a data silo
 *
 * Define the data silos in your data map. A data silo can be a database,
 * or a web service that may use a collection of different data stores under the hood.
 *
 * @see https://docs.transcend.io/docs/the-data-map#data-silos
 */
export const DataSiloInput = t.intersection([
  t.type({
    /** The display title of the data silo */
    title: t.string,
    /**
     * The type of integration. Common internal system types:
     * server | database | cron  | promptAPerson
     */
    integrationName: t.string,
  }),
  t.partial({
    /** For prompt a person or database integrations, the underlying integration name */
    'outer-type': t.string,
    /** A description for that data silo */
    description: t.string,
    /** The webhook URL to notify for data privacy requests */
    url: t.string,
    /** The title of the API key that will be used to respond to privacy requests */
    'api-key-title': t.string,
    /** Custom headers to include in outbound webhook */
    headers: t.array(WebhookHeader),
    /**
     * Specify which data subjects may have personally-identifiable-information (PII) within this system
     * This field can be omitted, and the default assumption will be that the system may potentially
     * contain PII for any potential data subject type.
     */
    'data-subjects': t.array(t.string),
    /**
     * When this data silo implements a privacy request, these are the identifiers
     * that should be looked up within this system.
     */
    'identity-keys': t.array(t.string),
    /**
     * When a data erasure request is being performed, this data silo should not be deleted from
     * until all of the following data silos were deleted first. This list can contain other internal
     * systems defined in this file, as well as any of the SaaS tools connected in your Transcend instance.
     */
    'deletion-dependencies': t.array(t.string),
    /**
     * The email addresses of the employees within your company that are the go-to individuals
     * for managing this data silo
     */
    owners: t.array(t.string),
    /**
     * The names of teams within your Transcend instance that should be responsible
     * for managing this data silo.
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
    /**
     * Specify this flag if the data silo is under development and should not be included
     * in production privacy request workflows. Will still sync metadata to app.transcend.io.
     */
    disabled: t.boolean,
    /**
     * Datapoints defined within this data silo, see comment of `DatapointInput`
     * for further details.
     */
    datapoints: t.array(DatapointInput),
    /**
     * Configure email notification settings for privacy requests
     */
    'email-settings': PromptAVendorEmailSettings,
    /** Country of data silo hosting */
    country: valuesOf(IsoCountryCode),
    /** Sub-division of data silo hosting */
    countrySubDivision: valuesOf(IsoCountrySubdivisionCode),
    /**
     * Attribute value and its corresponding attribute key
     */
    attributes: t.array(AttributePreview),
  }),
]);

/** Type override */
export type DataSiloInput = t.TypeOf<typeof DataSiloInput>;

export const ActionItemCollectionInput = t.intersection([
  t.type({
    /** The display title of the enricher */
    title: t.string,
    /** Locations where collection is shown */
    productLine: valuesOf(TranscendProduct),
  }),
  t.partial({
    /** Description of collection */
    description: t.string,
    /** Whether hidden */
    hidden: t.boolean,
  }),
]);

/** Type override */
export type ActionItemCollectionInput = t.TypeOf<
  typeof ActionItemCollectionInput
>;

/**
 * Input to define an action item
 */
export const ActionItemInput = t.intersection([
  t.type({
    /** The display title of the enricher */
    title: t.string,
    /** Action item type */
    type: valuesOf(ActionItemCode),
    /** The titles of the collections that the action item is grouped within */
    collections: t.array(t.string),
  }),
  t.partial({
    /** Priority of the action item */
    priority: valuesOf(ActionItemPriorityOverride),
    /** Customer experience action item key */
    customerExperienceActionItemId: t.string,
    /** Due date of the action item */
    dueDate: t.string,
    /** Whether action item has been resolved */
    resolved: t.boolean,
    /** Notes */
    notes: t.string,
    /** Links to action items */
    link: t.string,
    /**
     * The email addresses of the employees assigned to the action item
     */
    users: t.array(t.string),
    /**
     * The names of teams assigned to the action item
     *
     * @see https://docs.transcend.io/docs/security/access-control#teams
     * for more information about how to create and manage teams
     */
    teams: t.array(t.string),
    /**
     * Attribute value and its corresponding attribute key
     */
    attributes: t.array(AttributePreview),
  }),
]);

/** Type override */
export type ActionItemInput = t.TypeOf<typeof ActionItemInput>;

export const AssessmentRuleInput = t.intersection([
  t.type({
    /** The reference id of the question whose answer is compared by this rule */
    'depends-on-question-reference-id': t.string,
    /** The operator to use when comparing the question answer to the operands */
    'comparison-operator': valuesOf(ComparisonOperator),
  }),
  t.partial({
    /** The values to compare the question answer to */
    'comparison-operands': t.array(t.string),
  }),
]);

/** Type override */
export type AssessmentRuleInput = t.TypeOf<typeof AssessmentRuleInput>;

export interface AssessmentNestedRuleInput {
  /** The operator to use when comparing the nested rules */
  'logic-operator': LogicOperator;
  /** The rules to evaluate and be compared with to other using the LogicOperator */
  rules?: AssessmentRuleInput[];
  /** The nested rules to add one more level of nesting to the rules. They are also compared to each other. */
  'nested-rules'?: AssessmentNestedRuleInput[];
}

export const AssessmentNestedRuleInput: t.RecursiveType<
  t.Type<AssessmentNestedRuleInput>
> = t.recursion('AssessmentNestedRuleInput', (self) =>
  t.intersection([
    t.type({
      /** The operator to use when comparing the nested rules */
      'logic-operator': valuesOf(LogicOperator),
    }),
    t.partial({
      /** The rules to evaluate and be compared with to other using the LogicOperator */
      rules: t.array(AssessmentRuleInput),
      /** The nested rules to add one more level of nesting to the rules. They are also compared to each other. */
      'nested-rules': t.array(self),
    }),
  ]),
);

export const AssessmentDisplayLogicInput = t.intersection([
  t.type({
    /** The display logic type */
    action: valuesOf(AssessmentsDisplayLogicAction),
  }),
  t.partial({
    /** The rule to evaluate */
    rule: AssessmentRuleInput,
    /** The nested rule to evaluate */
    'nested-rule': AssessmentNestedRuleInput,
  }),
]);

/** Type override */
export type AssessmentDisplayLogicInput = t.TypeOf<
  typeof AssessmentDisplayLogicInput
>;

export const RiskAssignmentInput = t.partial({
  /** The risk level to assign to the question */
  'risk-level': t.string,
  /** The risk matrix column to assign to a question. */
  'risk-matrix-column': t.string,
  /** The risk matrix row to assign to a question. */
  'risk-matrix-row': t.string,
});

/** Type override */
export type RiskAssignmentInput = t.TypeOf<typeof RiskAssignmentInput>;

export const RiskLogicInput = t.intersection([
  t.type({
    /** The values to compare */
    'comparison-operands': t.array(t.string),
    /** The operator */
    'comparison-operator': valuesOf(ComparisonOperator),
  }),
  t.partial({
    /** The risk level to assign to the question */
    'risk-level': t.string,
  }),
]);

/** Type override */
export type RiskLogicInput = t.TypeOf<typeof RiskLogicInput>;

export const AssessmentAnswerOptionInput = t.type({
  /** Value of answer */
  value: t.string,
});

/** Type override */
export type AssessmentAnswerOptionInput = t.TypeOf<
  typeof AssessmentAnswerOptionInput
>;

export const AssessmentSectionQuestionInput = t.intersection([
  t.type({
    /** The title of the assessment section question */
    title: t.string,
    /** The question type */
    type: valuesOf(AssessmentQuestionType),
  }),
  t.partial({
    /** The sub-type of the assessment question */
    'sub-type': valuesOf(AssessmentQuestionSubType),
    /** The question placeholder */
    placeholder: t.string,
    /** The question description */
    description: t.string,
    /** Whether an answer is required */
    'is-required': t.boolean,
    /** Used to identify the question within a form or template so it can be referenced in conditional logic. */
    'reference-id': t.string,
    /** Display logic for the question */
    'display-logic': AssessmentDisplayLogicInput,
    /** Risk logic for the question */
    'risk-logic': t.array(RiskLogicInput),
    /** Risk category titles for the question */
    'risk-categories': t.array(t.string),
    /** Risk framework titles for the question */
    'risk-framework': t.string,
    /** Answer options for the question */
    'answer-options': t.array(AssessmentAnswerOptionInput),
    /** The selected answers to the assessments */
    'selected-answers': t.array(t.string),
    /** Allowed MIME types for the question */
    'allowed-mime-types': t.array(t.string),
    /** Allow selecting other options */
    'allow-select-other': t.boolean,
    /** Sync model for the question */
    'sync-model': valuesOf(AssessmentSyncModel),
    /** Sync column for the question */
    'sync-column': valuesOf(AssessmentSyncColumn),
    /** Attribute key / custom field name for the question */
    'attribute-key': t.string,
    /** Require risk evaluation for the question */
    'require-risk-evaluation': t.boolean,
    /** Require risk matrix evaluation for the question */
    'require-risk-matrix-evaluation': t.boolean,
  }),
]);

/** Type override */
export type AssessmentSectionQuestionInput = t.TypeOf<
  typeof AssessmentSectionQuestionInput
>;

export const AssessmentSectionInput = t.intersection([
  t.type({
    /** The title of the assessment section */
    title: t.string,
    /** The questions in the assessment section */
    questions: t.array(AssessmentSectionQuestionInput),
  }),
  t.partial({
    /** Email address of those assigned */
    assignees: t.array(t.string),
    /** Email address of those externally assigned */
    'external-assignees': t.array(t.string),
    /** Status of section */
    status: t.string,
    /** Whether assessment is reviewed */
    'is-reviewed': t.boolean,
  }),
]);

/** Type override */
export type AssessmentSectionInput = t.TypeOf<typeof AssessmentSectionInput>;

export const AssessmentRetentionScheduleInput = t.type({
  /** The retention schedule type */
  type: valuesOf(RetentionScheduleType),
  /** The duration of the retention schedule in days */
  'duration-days': t.number,
  /** The operation to perform on the retention schedule */
  operand: valuesOf(RetentionScheduleOperation),
});

/** Type override */
export type AssessmentRetentionScheduleInput = t.TypeOf<
  typeof AssessmentRetentionScheduleInput
>;

export const AssessmentTemplateInput = t.intersection([
  t.type({
    /** The title of the assessment template */
    title: t.string,
  }),
  t.partial({
    /** The Assessment sections under this assessment template */
    sections: t.array(AssessmentSectionInput),
    /** Description of assessment template */
    description: t.string,
    /** The status of the assessment */
    status: valuesOf(AssessmentFormTemplateStatus),
    /** The source of the assessment */
    source: valuesOf(AssessmentFormTemplateSource),
    /** The email of the user that created the assessment */
    creator: t.string,
    /** Whether the template is in a locked status */
    locked: t.boolean,
    /** ID of parent template this was cloned from */
    'parent-id': t.string,
    /** Whether the template is archived */
    archived: t.boolean,
    /** The date that the assessment was created */
    'created-at': t.string,
    /** The names of the custom fields associated to this assessment template */
    'attribute-keys': t.array(t.string),
    /** The retention schedule configuration */
    'retention-schedule': AssessmentRetentionScheduleInput,
    /** The titles of the email templates used in the assessment template */
    templates: t.array(t.string),
  }),
]);

/** Type override */
export type AssessmentTemplateInput = t.TypeOf<typeof AssessmentTemplateInput>;

export const AssessmentResourceInput = t.type({
  /** The title of the resource */
  title: t.string,
  /** The type of the resource */
  type: valuesOf(AttributeSupportedResourceType),
});

/** Type override */
export type AssessmentResourceInput = t.TypeOf<typeof AssessmentResourceInput>;

export const AssessmentInput = t.intersection([
  t.type({
    /** The title of the assessment */
    title: t.string,
    /** The title of the assessment group */
    group: t.string,
  }),
  t.partial({
    /** The assessment sections */
    sections: t.array(AssessmentSectionInput),
    /** The email of the user that created the assessment */
    creator: t.string,
    /** The description of the assessment */
    description: t.string,
    /** The status of the assessment */
    status: valuesOf(AssessmentFormStatus),
    /** The emails of the transcend users assigned to the assessment */
    assignees: t.array(t.string),
    /** The emails of the external emails assigned to the assessment */
    'external-assignees': t.array(t.string),
    /** The emails of the assessment reviewers */
    reviewers: t.array(t.string),
    /** Whether the assessment is in a locked status */
    locked: t.boolean,
    /** Whether the assessment is archived */
    archived: t.boolean,
    /** Whether the form is created by an external user */
    external: t.boolean,
    /**
     * Whether the form title is an internal label only, and the group title should be used in communications with assignees
     */
    'title-is-internal': t.boolean,
    /** The date that the assessment is due */
    'due-date': t.string,
    /** The date that the assessment was created */
    'created-at': t.string,
    /** The date that the assessment was assigned at */
    'assigned-at': t.string,
    /** The date that the assessment was submitted at */
    'submitted-at': t.string,
    /** The date that the assessment was approved at */
    'approved-at': t.string,
    /** The date that the assessment was rejected at */
    'rejected-at': t.string,
    /** The linked data inventory resources */
    resources: t.array(AssessmentResourceInput),
    /** The linked data inventory synced rows */
    rows: t.array(AssessmentResourceInput),
    /** The assessment retention schedule */
    'retention-schedule': AssessmentRetentionScheduleInput,
    /** The assessment custom fields */
    attributes: t.array(AttributePreview),
  }),
]);

/** Type override */
export type AssessmentInput = t.TypeOf<typeof AssessmentInput>;

/**
 * Input to define a silo discovery recommendation
 *
 * @see https://docs.transcend.io/docs/silo-discovery
 */
export const SiloDiscoveryRecommendationInput = t.intersection([
  t.type({
    /** The unique identifier for the resource */
    resourceId: t.string,
    /** Timestamp of the plugin run that found this silo recommendation */
    lastDiscoveredAt: t.string,
    /** The plugin that found this recommendation */
    plugin: t.string, // Assuming Plugin is a string, replace with appropriate type if necessary
    /** The suggested catalog for this recommendation */
    suggestedCatalog: t.string,
  }),
  /**
   * TODO: Allow for these to be pulled
   */
  t.partial({
    /** The ISO country code for the AWS Region if applicable */
    country: t.string,
    /** The ISO country subdivision code for the AWS Region if applicable */
    countrySubDivision: t.string,
    /** The plaintext that we will pass into recommendation */
    plaintextContext: t.string,
    /** The plugin configurations for the recommendation */
    pluginConfigurations: t.string, // Assuming DataSiloPluginConfigurations is a string
    /** The AWS Region for data silo if applicable */
    region: t.string,
    /** The custom title of the data silo recommendation */
    title: t.string,
    /** The URL for more information about the recommendation */
    url: t.string,
    /** The list of tags associated with the recommendation */
    tags: t.array(t.string),
    /** The date the recommendation was created */
    createdAt: t.string,
    /** The date the recommendation was last updated */
    updatedAt: t.string,
  }),
]);

/** Type override */
export type SiloDiscoveryRecommendationInput = t.TypeOf<
  typeof SiloDiscoveryRecommendationInput
>;

export const TranscendInput = t.partial({
  /**
   * Action items
   */
  'action-items': t.array(ActionItemInput),
  /**
   * Action item collections
   */
  'action-item-collections': t.array(ActionItemCollectionInput),
  /**
   * API key definitions
   */
  'api-keys': t.array(ApiKeyInput),
  /** Team definitions */
  teams: t.array(TeamInput),
  /**
   * Email template definitions
   */
  templates: t.array(TemplateInput),
  /**
   * Enricher definitions
   */
  enrichers: t.array(EnricherInput),
  /**
   * Attribute definitions
   */
  attributes: t.array(AttributeInput),
  /**
   * Business entity definitions
   */
  'business-entities': t.array(BusinessEntityInput),
  /**
   * Vendor definitions
   */
  vendors: t.array(VendorInput),
  /**
   * Data categories definitions
   */
  'data-categories': t.array(DataCategoryInput),
  /**
   * Vendor definitions
   */
  'processing-purposes': t.array(ProcessingPurposeInput),
  /**
   * Data subject definitions
   */
  'data-subjects': t.array(DataSubjectInput),
  /**
   * Action definitions
   */
  actions: t.array(ActionInput),
  /**
   * Identifier definitions
   */
  identifiers: t.array(IdentifierInput),
  /**
   * Data silo definitions
   */
  'data-silos': t.array(DataSiloInput),
  /**
   * Data flow definitions
   */
  'data-flows': t.array(DataFlowInput),
  /**
   * Cookie definitions
   */
  cookies: t.array(CookieInput),
  /**
   * Consent manager definition
   */
  'consent-manager': ConsentManagerInput,
  /**
   * Prompt definitions
   */
  prompts: t.array(PromptInput),
  /**
   * Prompt partial definitions
   */
  'prompt-partials': t.array(PromptPartialInput),
  /**
   * Prompt group definitions
   */
  'prompt-groups': t.array(PromptGroupInput),
  /**
   * Agent definitions
   */
  agents: t.array(AgentInput),
  /**
   * Agent function definitions
   */
  'agent-functions': t.array(AgentFunctionInput),
  /**
   * Agent file definitions
   */
  'agent-files': t.array(AgentFileInput),
  /**
   * The privacy center configuration
   */
  'privacy-center': PrivacyCenterInput,
  /**
   * The policies configuration
   */
  policies: t.array(PolicyInput),
  /**
   * The internationalized messages configuration
   */
  messages: t.array(IntlMessageInput),
  /** The full list of consent manager partitions (e.g. dev vs staging vs prod) */
  partitions: t.array(PartitionInput),
  /**
   * The full list of assessment templates
   */
  'assessment-templates': t.array(AssessmentTemplateInput),
  /**
   * The full list of assessment results
   */
  assessments: t.array(AssessmentInput),
  /**
   * The full list of silo discovery recommendations
   */
  siloDiscoveryRecommendations: t.array(SiloDiscoveryRecommendationInput),
});

/** Type override */
export type TranscendInput = t.TypeOf<typeof TranscendInput>;

/**
 * The output of `tr-generate-api-keys` that can be provided to `tr-push`
 */
export const StoredApiKey = t.type({
  /** Name of instance */
  organizationName: t.string,
  /** API key */
  apiKey: t.string,
  /** Organization ID API key is for */
  organizationId: t.string,
});

/** Type override */
export type StoredApiKey = t.TypeOf<typeof StoredApiKey>;

/**
 * Minimal set required to mark as completed
 */
export const DataFlowCsvInput = t.intersection([
  t.type({
    /** The value of the data flow (host or regex) */
    'Connections Made To': t.string,
    /** The type of the data flow */
    Type: valuesOf(DataFlowScope),
    /** The CSV of purposes mapped to that data flow */
    Purpose: t.string,
  }),
  t.partial({
    /** The service that the data flow relates to */
    Service: t.string,
    /** Notes and descriptions for the data flow */
    Notes: t.string,
    /** Set of data flow owners */
    Owners: t.string,
    /** Set of data flow team owners */
    Teams: t.string,
    /** LIVE vs NEEDS_REVIEW aka Approved vs Triage  */
    Status: valuesOf(ConsentTrackerStatus),
  }),
  // Custom attributes
  t.record(t.string, t.string),
]);

/** Type override */
export type DataFlowCsvInput = t.TypeOf<typeof DataFlowCsvInput>;

export const CookieCsvInput = t.intersection([
  t.type({
    /** The value of the cookie */
    Name: t.string,
    /** The CSV of purposes mapped to that cookie */
    Purpose: t.string,
  }),
  t.partial({
    /** The service that the cookie relates to */
    Service: t.string,
    /** Notes and descriptions for the cookie */
    Notes: t.string,
    /** Set of cookie owners */
    Owners: t.string,
    /** Set of cookie team owners */
    Teams: t.string,
    /** LIVE vs NEEDS_REVIEW aka Approved vs Triage  */
    Status: valuesOf(ConsentTrackerStatus),
  }),
  // Custom attributes
  t.record(t.string, t.string),
]);

/** Type override */
export type CookieCsvInput = t.TypeOf<typeof CookieCsvInput>;

/**
 * Export of (await airgap.getMetadata()).services
 */
export const ConsentManagerServiceMetadata = t.type({
  /** The title of the service */
  title: t.string,
  /** The description */
  description: t.string,
  /** Cookies */
  cookies: t.array(
    t.type({
      /** Name of cookie */
      name: t.string,
      /** Allowed purposes */
      trackingPurposes: t.array(t.string),
    }),
  ),
  /** Data Flows */
  dataFlows: t.array(
    t.type({
      /** Value of data flow */
      value: t.string,
      /** Type of data flow */
      type: valuesOf(DataFlowScope),
      /** Allowed purposes */
      trackingPurposes: t.array(t.string),
    }),
  ),
});

/** Type override */
export type ConsentManagerServiceMetadata = t.TypeOf<
  typeof ConsentManagerServiceMetadata
>;
/// //////////////////////////////////////
// Pathfinder policies                  //
/// //////////////////////////////////////

export const PathfinderPolicyNameC = valuesOf(PathfinderPolicyName);

/** the codec of a route enabled in an AI integration */
export type EnabledRouteC<T extends t.Mixed> = t.TypeC<{
  /** the name of the enabled route */
  routeName: T;
  /** the enabled policies */
  enabledPolicies: t.ArrayC<typeof PathfinderPolicyNameC>;
}>;

/** the codec of routes enabled in an AI integration */
export type EnabledRoutesC<T extends t.Mixed> = t.ArrayC<EnabledRouteC<T>>;

/** the codec of an AI Integration */
export type AIIntegrationC<T extends t.Mixed> = t.TypeC<{
  /** the routes enabled in the AI integration */
  enabledRoutes: EnabledRoutesC<T>;
}>;

export const OpenAIEnabledRoute = buildEnabledRouteType({
  TRouteName: valuesOf(OpenAIRouteName),
});

/** Type override */
export type OpenAIEnabledRoute = t.TypeOf<typeof OpenAIEnabledRoute>;

const OpenAIRouteNameC = valuesOf(OpenAIRouteName);

/** The enabled routes for OpenAI */
export const OpenAIEnabledRoutes: EnabledRoutesC<typeof OpenAIRouteNameC> =
  t.array(OpenAIEnabledRoute);

/** Type override */
export type OpenAIEnabledRoutes = t.TypeOf<typeof OpenAIEnabledRoutes>;

export const OpenAIIntegration = buildAIIntegrationType<
  typeof OpenAIRouteNameC,
  EnabledRoutesC<typeof OpenAIRouteNameC>
>({
  TEnabledRoutes: OpenAIEnabledRoutes,
});

/** Type override */
export type OpenAIIntegration = t.TypeOf<typeof OpenAIIntegration>;

export const PathfinderPolicy = t.partial({
  enabledIntegrations: t.partial({
    openAI: OpenAIIntegration,
  }),
});

/** Type override */
export type PathfinderPolicy = t.TypeOf<typeof PathfinderPolicy>;

/**
 * Interface of metadata that can be passed for logging purposes
 * via the Transcend Pathfinder
 */
export const PathfinderPromptRunMetadata = t.partial({
  /** Unique name for the current prompt run */
  promptRunName: t.string,
  /** ID of the Transcend prompt being reported */
  promptId: t.string,
  /** Title of the prompt being reported on */
  promptTitle: t.string,
  /** The ID of the prompt group being reported */
  promptGroupId: t.string,
  /** The title of the prompt group being reported */
  promptGroupTitle: t.string,
  /** Employee email that is executing the request */
  runByEmployeeEmail: t.string,
  /** ID of the application calling pathfinder  */
  applicationId: t.string,
  /** Name of the application calling pathfinder  */
  applicationName: t.string,
  /** Name of the code package calling pathfinder  */
  codePackageName: t.string,
  /** Name of the repository calling pathfinder  */
  repositoryName: t.string,
  /** Core identifier of the application user being reported on  */
  applicationUserCoreIdentifier: t.string,
  /** Name of the application user being reported on  */
  applicationUserName: t.string,
  /** Slack message ts that is in context of the API call */
  slackMessageTs: t.string,
  /** Slack team ID in context of the API call */
  slackTeamId: t.string,
  /** Slack channel ID in context of the API call */
  slackChannelId: t.string,
  /** Slack channel name in context of the API call */
  slackChannelName: t.string,
});

/** Type override */
export type PathfinderPromptRunMetadata = t.TypeOf<
  typeof PathfinderPromptRunMetadata
>;
