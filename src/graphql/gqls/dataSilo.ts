import { gql } from 'graphql-request';

export const DATA_SILOS = gql`
  query SchemaSyncDataSilos(
    $title: String
    $ids: [ID!]
    $first: Int!
    $offset: Int!
  ) {
    dataSilos(
      filterBy: { text: $title, ids: $ids }
      first: $first
      offset: $offset
    ) {
      nodes {
        id
        title
        link
        type
      }
    }
  }
`;

export const DATA_SILO = gql`
  query SchemaSyncDataSilo($id: String!) {
    dataSilo(id: $id) {
      id
      title
      description
      type
      url
      notifyEmailAddress
      apiKeys {
        title
      }
      subjectBlocklist {
        type
      }
      identifiers {
        name
        isConnected
      }
      dependentDataSilos {
        title
      }
      owners {
        email
      }
      isLive
    }
  }
`;

export const UPDATE_DATA_SILO = gql`
  mutation SchemaSyncUpdateDataSilo(
    $id: ID!
    $title: String
    $description: String
    $url: String
    $notifyEmailAddress: String
    $identifiers: [String!]
    $isLive: Boolean
    $dataSubjectBlockListIds: [ID!]
    $dependedOnDataSiloTitles: [String!]
    $ownerEmails: [String!]
    $apiKeyId: ID
  ) {
    updateDataSilo(
      input: {
        id: $id
        title: $title
        description: $description
        url: $url
        notifyEmailAddress: $notifyEmailAddress
        identifiers: $identifiers
        isLive: $isLive
        dataSubjectBlockListIds: $dataSubjectBlockListIds
        dependedOnDataSiloTitles: $dependedOnDataSiloTitles
        ownerEmails: $ownerEmails
        apiKeyId: $apiKeyId
      }
    ) {
      clientMutationId
    }
  }
`;

export const CREATE_DATA_SILO = gql`
  mutation SchemaSyncCreateDataSilo(
    $title: String!
    $description: String!
    $url: String
    $type: String!
    $identifiers: [String!]
    $isLive: Boolean!
    $notifyEmailAddress: String
    $dataSubjectBlockListIds: [ID!]
    $dependedOnDataSiloTitles: [String!]
    $ownerEmails: [String!]
    $apiKeyId: ID
  ) {
    connectDataSilo(
      input: {
        name: $type
        title: $title
        description: $description
        url: $url
        notifyEmailAddress: $notifyEmailAddress
        identifiers: $identifiers
        isLive: $isLive
        dataSubjectBlockListIds: $dataSubjectBlockListIds
        dependedOnDataSiloTitles: $dependedOnDataSiloTitles
        ownerEmails: $ownerEmails
        apiKeyId: $apiKeyId
      }
    ) {
      dataSilo {
        id
        title
        type
      }
    }
  }
`;