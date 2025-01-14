import {
  OneTrustAssessment,
  OneTrustAssessmentNestedQuestion,
  OneTrustAssessmentQuestion,
  OneTrustAssessmentQuestionRisk,
  OneTrustAssessmentSection,
  OneTrustAssessmentSectionHeader,
  OneTrustGetAssessmentResponse,
  OneTrustGetRiskResponse,
} from '@transcend-io/privacy-types';
import * as t from 'io-ts';

/**  OneTrustAssessmentNestedQuestion without nested options */
export const OneTrustAssessmentNestedQuestionFlat = t.type({
  id: OneTrustAssessmentNestedQuestion.props.id,
  rootVersionId: OneTrustAssessmentNestedQuestion.props.rootVersionId,
  sequence: OneTrustAssessmentNestedQuestion.props.sequence,
  questionType: OneTrustAssessmentNestedQuestion.props.questionType,
  required: OneTrustAssessmentNestedQuestion.props.required,
  attributes: OneTrustAssessmentNestedQuestion.props.attributes,
  friendlyName: OneTrustAssessmentNestedQuestion.props.friendlyName,
  description: OneTrustAssessmentNestedQuestion.props.description,
  hint: OneTrustAssessmentNestedQuestion.props.hint,
  parentQuestionId: OneTrustAssessmentNestedQuestion.props.parentQuestionId,
  prePopulateResponse:
    OneTrustAssessmentNestedQuestion.props.prePopulateResponse,
  linkAssessmentToInventory:
    OneTrustAssessmentNestedQuestion.props.linkAssessmentToInventory,
  valid: OneTrustAssessmentNestedQuestion.props.valid,
  type: OneTrustAssessmentNestedQuestion.props.type,
  allowMultiSelect: OneTrustAssessmentNestedQuestion.props.allowMultiSelect,
  content: OneTrustAssessmentNestedQuestion.props.content,
  requireJustification:
    OneTrustAssessmentNestedQuestion.props.requireJustification,
});

/** Type override */
export type OneTrustAssessmentNestedQuestionFlat = t.TypeOf<
  typeof OneTrustAssessmentNestedQuestionFlat
>;

// The OneTrustAssessmentQuestion without nested properties
export const OneTrustAssessmentQuestionFlat = t.type({
  hidden: OneTrustAssessmentQuestion.types[0].props.hidden,
  lockReason: OneTrustAssessmentQuestion.types[0].props.lockReason,
  copyErrors: OneTrustAssessmentQuestion.types[0].props.copyErrors,
  hasNavigationRules:
    OneTrustAssessmentQuestion.types[0].props.hasNavigationRules,
  rootRequestInformationIds:
    OneTrustAssessmentQuestion.types[0].props.rootRequestInformationIds,
  totalAttachments: OneTrustAssessmentQuestion.types[0].props.totalAttachments,
  attachmentIds: OneTrustAssessmentQuestion.types[0].props.attachmentIds,
});

/** Type override */
export type OneTrustAssessmentQuestionFlat = t.TypeOf<
  typeof OneTrustAssessmentQuestionFlat
>;

/** The OneTrustAssessmentSectionHeader without nested riskStatistics  */
export const OneTrustAssessmentSectionFlatHeader = t.type({
  sectionId: OneTrustAssessmentSectionHeader.types[0].props.sectionId,
  name: OneTrustAssessmentSectionHeader.types[0].props.name,
  description: OneTrustAssessmentSectionHeader.types[0].props.description,
  sequence: OneTrustAssessmentSectionHeader.types[0].props.sequence,
  hidden: OneTrustAssessmentSectionHeader.types[0].props.hidden,
  invalidQuestionIds:
    OneTrustAssessmentSectionHeader.types[0].props.invalidQuestionIds,
  requiredUnansweredQuestionIds:
    OneTrustAssessmentSectionHeader.types[0].props
      .requiredUnansweredQuestionIds,
  requiredQuestionIds:
    OneTrustAssessmentSectionHeader.types[0].props.requiredQuestionIds,
  unansweredQuestionIds:
    OneTrustAssessmentSectionHeader.types[0].props.unansweredQuestionIds,
  effectivenessQuestionIds:
    OneTrustAssessmentSectionHeader.types[0].props.effectivenessQuestionIds,
  submitted: OneTrustAssessmentSectionHeader.types[0].props.submitted,
});
/** Type override */
export type OneTrustAssessmentSectionFlatHeader = t.TypeOf<
  typeof OneTrustAssessmentSectionFlatHeader
>;

/** The OneTrustAssessmentSection type without header or questions */
export const OneTrustFlatAssessmentSection = t.type({
  hasNavigationRules: OneTrustAssessmentSection.props.hasNavigationRules,
  submittedBy: OneTrustAssessmentSection.props.submittedBy,
  submittedDt: OneTrustAssessmentSection.props.submittedDt,
  name: OneTrustAssessmentSection.props.name,
  hidden: OneTrustAssessmentSection.props.hidden,
  valid: OneTrustAssessmentSection.props.valid,
  sectionId: OneTrustAssessmentSection.props.sectionId,
  sequence: OneTrustAssessmentSection.props.sequence,
  submitted: OneTrustAssessmentSection.props.submitted,
  description: OneTrustAssessmentSection.props.description,
});

/** Type override */
export type OneTrustFlatAssessmentSection = t.TypeOf<
  typeof OneTrustFlatAssessmentSection
>;

export const OneTrustEnrichedRisk = t.intersection([
  OneTrustAssessmentQuestionRisk,
  t.type({
    description: OneTrustGetRiskResponse.props.description,
    name: OneTrustGetRiskResponse.props.name,
    treatment: OneTrustGetRiskResponse.props.treatment,
    treatmentStatus: OneTrustGetRiskResponse.props.treatmentStatus,
    type: OneTrustGetRiskResponse.props.type,
    stage: OneTrustGetRiskResponse.props.stage,
    state: OneTrustGetRiskResponse.props.state,
    result: OneTrustGetRiskResponse.props.result,
    categories: OneTrustGetRiskResponse.props.categories,
  }),
]);

/** Type override */
export type OneTrustEnrichedRisk = t.TypeOf<typeof OneTrustEnrichedRisk>;

export const OneTrustEnrichedRisks = t.union([
  t.array(OneTrustEnrichedRisk),
  t.null,
]);
/** Type override */
export type OneTrustEnrichedRisks = t.TypeOf<typeof OneTrustEnrichedRisks>;

export const OneTrustEnrichedAssessmentQuestion = t.intersection([
  t.type({
    ...OneTrustAssessmentQuestion.types[0].props,
    risks: OneTrustEnrichedRisks,
  }),
  t.partial({ ...OneTrustAssessmentQuestion.types[1].props }),
]);

/** Type override */
export type OneTrustEnrichedAssessmentQuestion = t.TypeOf<
  typeof OneTrustEnrichedAssessmentQuestion
>;

export const OneTrustEnrichedAssessmentSection = t.type({
  ...OneTrustAssessmentSection.props,
  questions: t.array(OneTrustEnrichedAssessmentQuestion),
});
/** Type override */
export type OneTrustEnrichedAssessmentSection = t.TypeOf<
  typeof OneTrustEnrichedAssessmentSection
>;

export const OneTrustEnrichedAssessmentResponse = t.type({
  ...OneTrustGetAssessmentResponse.props,
  sections: t.array(OneTrustEnrichedAssessmentSection),
});
/** Type override */
export type OneTrustEnrichedAssessmentResponse = t.TypeOf<
  typeof OneTrustEnrichedAssessmentResponse
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { status, ...OneTrustAssessmentWithoutStatus } = OneTrustAssessment.props;
export const OneTrustEnrichedAssessment = t.intersection([
  t.type(OneTrustAssessmentWithoutStatus),
  OneTrustEnrichedAssessmentResponse,
]);

/** Type override */
export type OneTrustEnrichedAssessment = t.TypeOf<
  typeof OneTrustEnrichedAssessment
>;
