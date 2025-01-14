import { gql } from 'graphql-request';

export const ASSESSMENT_SECTION_FIELDS = `
  id
  title
  status
  index
  questions {
    id
    title
    index
    type
    subType
    placeholder
    description
    isRequired
    displayLogic
    riskLogic
    requireRiskEvaluation
    requireRiskMatrixEvaluation
    riskCategories {
      id
      title
    }
    riskFramework {
      id
      title
      description
      riskLevels {
        id
        title
      }
      riskCategories {
        id
        title
      }
      riskMatrixColumns {
        id
        title
      }
      riskMatrixRows {
        id
        title
      }
      riskMatrix {
        id
        title
      }
      creator {
        id
        email
        name
      }
      riskMatrixRowTitle
      riskMatrixColumnTitle
    }
    riskLevel {
      id
      title
    }
    reviewerRiskLevel {
      id
      title
    }
    riskLevelFromRiskMatrix {
      id
      title
    }
    answerOptions {
      id
      index
      value
    }
    selectedAnswers {
      ... on AssessmentAnswerInterface {
        id
        index
        value
      }
    }
    respondent {
      id
      email
      name
    }
    attributeKey {
      name
    }
    externalRespondentEmail
    comments {
      id
      content
      createdAt
      updatedAt
      author {
        id
        email
        name
      }
    }
    allowedMimeTypes
    updatedAt
    referenceId
    previousSubmissions {
      id
      updatedAt
      assessmentQuestionId
      answers {
        ... on AssessmentAnswerInterface {
          id
          index
          value
        }
      }
    }
    allowSelectOther
    syncModel
    syncColumn
    syncRowIds
    syncOverride
  }
  assignees {
    id
    email
    name
  }
  externalAssignees {
    id
    email
  }
  isReviewed
`;

// TODO: https://transcend.height.app/T-27909 - enable optimizations
// isExportCsv: true
// useMaster: false
// orderBy: [
//   { field: createdAt, direction: ASC }
//   { field: name, direction: ASC }
// ]
export const ASSESSMENTS = gql`
  query TranscendCliAssessments(
    $first: Int!
    $offset: Int!
    $filterBy: AssessmentFormFiltersInput
  ) {
    assessmentForms(first: $first, offset: $offset, filterBy: $filterBy) {
      nodes {
        id
        creator {
          id
          email
          name
        }
        lastEditor {
          id
          email
          name
        }
        title
        description
        status
        assignees {
          id
          email
          name
        }
        externalAssignees {
          id
          email
        }
        reviewers {
          id
          email
          name
        }
        isLocked
        isArchived
        isExternallyCreated
        dueDate
        createdAt
        updatedAt
        assignedAt
        submittedAt
        approvedAt
        rejectedAt
        titleIsInternal
        retentionSchedule {
          id
          type
          durationDays
          operation
        }
        attributeValues {
          name
          attributeKey {
            name
          }
        }
        sections {
          ${ASSESSMENT_SECTION_FIELDS}
        }
        assessmentGroup {
          id
          title
          description
        }
        resources {
          resourceType
          ... on AttributeBusinessEntityResource {
            id
            title
          }
          ... on AttributeDataSiloResource {
            id
            title
          }
          ... on AttributeDataSubCategoryResource {
            id
            name
            category
          }
          ... on AttributeSubDataPointResource {
            id
            name
          }
          ... on AttributeProcessingPurposeSubCategoryResource {
            id
            name
            purpose
          }
          ... on AttributeRequestResource {
            id
            type
          }
          ... on AttributeVendorResource {
            id
            title
          }
          ... on AttributePromptResource {
            id
            title
          }
          ... on AttributePromptRunResource {
            id
            title
          }
          ... on AttributePromptGroupResource {
            id
            title
          }
        }
        syncedRows {
          resourceType
          ... on AttributeBusinessEntityResource {
            id
            title
          }
          ... on AttributeDataSiloResource {
            id
            title
          }
          ... on AttributeDataSubCategoryResource {
            id
            name
            category
          }
          ... on AttributeSubDataPointResource {
            id
            name
          }
          ... on AttributeProcessingPurposeSubCategoryResource {
            id
            name
            purpose
          }
          ... on AttributeVendorResource {
            id
            title
          }
        }
      }
    }
  }
`;

export const IMPORT_ONE_TRUST_ASSESSMENT_FORMS = gql`
  mutation TranscendCliImportOneTrustAssessmentForms(
    $input: ImportOnetrustAssessmentsInput!
  ) {
    importOneTrustAssessmentForms(input: $input) {
      assessmentForms {
        id
        title
      }
    }
  }
`;
