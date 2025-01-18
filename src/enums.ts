import { makeEnum } from '@transcend-io/type-utils';

/** Accepted file formats for exporting resources from OneTrust */
export enum OneTrustFileFormat {
  Json = 'json',
  Csv = 'csv',
}

/**
 * Resources that can be pulled in from OneTrust
 */
export enum OneTrustPullResource {
  Assessments = 'assessments',
}

/**
 * Resources that can be pulled in
 */
export enum TranscendPullResource {
  ApiKeys = 'apiKeys',
  Attributes = 'customFields',
  Templates = 'templates',
  DataSilos = 'dataSilos',
  Enrichers = 'enrichers',
  DataFlows = 'dataFlows',
  BusinessEntities = 'businessEntities',
  Actions = 'actions',
  DataSubjects = 'dataSubjects',
  Identifiers = 'identifiers',
  Cookies = 'cookies',
  ConsentManager = 'consentManager',
  Partitions = 'partitions',
  Prompts = 'prompts',
  PromptPartials = 'promptPartials',
  PromptGroups = 'promptGroups',
  Agents = 'agents',
  AgentFunctions = 'agentFunctions',
  AgentFiles = 'agentFiles',
  Vendors = 'vendors',
  DataCategories = 'dataCategories',
  ProcessingPurposes = 'processingPurposes',
  ActionItems = 'actionItems',
  ActionItemCollections = 'actionItemCollections',
  Teams = 'teams',
  PrivacyCenters = 'privacyCenters',
  Policies = 'policies',
  Messages = 'messages',
  Assessments = 'assessments',
  AssessmentTemplates = 'assessmentTemplates',
  SiloDiscoveryRecommendations = 'siloDiscoveryRecommendations',
}

/**
 * Names of built in policies for pathfinder
 */
export const PathfinderPolicyName = makeEnum({
  RedactEmail: 'redactEmail',
  Log: 'log',
  LogToTranscend: 'logToTranscend',
  ApplyTranscendPolicies: 'applyTranscendPolicies',
});

/**
 * Type override
 */
export type PathfinderPolicyName =
  (typeof PathfinderPolicyName)[keyof typeof PathfinderPolicyName];

/**
 * The names of the OpenAI routes that we support setting policies for
 * reference: https://platform.openai.com/docs/api-reference/introduction
 */
export const OpenAIRouteName = makeEnum({
  ChatCompletion: '/v1/chat/completions',
  Embeddings: '/v1/embeddings',
  Completions: '/v1/completions',
  Agents: '/v1/assistants',
  Agent: '/v1/assistants/:assistantId',
  Threads: '/v1/threads',
  Thread: '/v1/threads/:threadId',
  Messages: '/v1/threads/:threadId/messages',
  Message: '/v1/threads/:threadId/messages/:messageId',
  Runs: '/v1/threads/:threadId/runs',
  Run: '/v1/threads/:threadId/runs/:runId',
  Files: '/v1/files',
  File: '/v1/files/:fileId',
});

/**
 * Type override
 */
export type OpenAIRouteName =
  (typeof OpenAIRouteName)[keyof typeof OpenAIRouteName];
