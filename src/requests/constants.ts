import { applyEnum, valuesOf } from '@transcend-io/type-utils';
import { LanguageKey } from '@transcend-io/internationalization';
import {
  CompletedRequestStatus,
  RequestAction,
} from '@transcend-io/privacy-types';
import * as t from 'io-ts';

export const NONE = 'NONE';

/**
 * Column names to map
 */
export enum ColumnName {
  /** The title of the email column */
  Email = 'email',
  /** The title of the core identifier column */
  CoreIdentifier = 'coreIdentifier',
  /** The title of the requestType column */
  RequestType = 'requestType',
  /** The title of the subjectType column */
  SubjectType = 'subjectType',
  /** The title of the locale column */
  Locale = 'locale',
  /** The title of the requestStatus column */
  RequestStatus = 'requestStatus',
  /** The title of the createdAt column */
  CreatedAt = 'createdAt',
  /** The title of the dataSiloIds column */
  DataSiloIds = 'dataSiloIds',
}

export const IS_REQUIRED: { [k in ColumnName]: boolean } = {
  [ColumnName.Email]: false,
  [ColumnName.CoreIdentifier]: true,
  [ColumnName.RequestType]: true,
  [ColumnName.SubjectType]: true,
  [ColumnName.RequestStatus]: false,
  [ColumnName.CreatedAt]: false,
  [ColumnName.DataSiloIds]: false,
  [ColumnName.Locale]: false,
};

// Cache state
export const CachedFileState = t.type({
  /** Mapping between the default request input column names and the CSV column name for that input */
  columnNames: t.partial(applyEnum(ColumnName, () => t.string)),
  /** Mapping between the identifier names and the CSV column name for that input */
  identifierNames: t.record(t.string, t.string),
  /** Mapping between the request attribute inputs and the CSV column name for that input */
  attributeNames: t.record(t.string, t.string),
  /** Mapping between CSV request type and Transcend Request Action */
  requestTypeToRequestAction: t.record(t.string, valuesOf(RequestAction)),
  /** Mapping between CSV data subject type and the name of the data subject in Transcend */
  subjectTypeToSubjectName: t.record(t.string, t.string),
  /** Mapping between language imported and Transcend locale code */
  languageToLocale: t.record(t.string, valuesOf(LanguageKey)),
  /** Mapping between request status in import to Transcend request status */
  statusToRequestStatus: t.record(
    t.string,
    valuesOf({ ...CompletedRequestStatus, [NONE]: NONE }),
  ),
  /** Set of privacy requests that failed to upload */
  failingRequests: t.array(t.record(t.string, t.any)),
});

/** Type override */
export type CachedFileState = t.TypeOf<typeof CachedFileState>;

export const CachedState = t.record(t.string, CachedFileState);
