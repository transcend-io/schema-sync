/* eslint-disable max-lines */
import { expect } from 'chai';

import { checkIfPendingPreferenceUpdatesCauseConflict } from '../index';
import { PreferenceTopicType } from '@transcend-io/privacy-types';
import { PreferenceTopic } from '../../graphql';

const DEFAULT_VALUES = {
  userId: 'test@transcend.io',
  timestamp: '2024-11-30T00:00:15.327Z',
  partition: 'd9c0b9ca-2253-4418-89d2-88776d654223',
  system: {
    decryptionStatus: 'DECRYPTED' as const,
    updatedAt: '2024-11-30T00:00:16.506Z',
  },
  consentManagement: {
    usp: null,
    gpp: null,
    tcf: null,
    airgapVersion: null,
  },
  metadata: [],
};

const PREFERENCE_TOPICS: PreferenceTopic[] = [
  {
    id: '14b3b3b3-4b3b-4b3b-4b3b-4b3b3b3b3b3b',
    slug: 'BooleanPreference1',
    type: PreferenceTopicType.Boolean,
    preferenceOptionValues: [],
    purpose: {
      trackingType: 'Marketing',
    },
  },
  {
    id: '24b3b3b3-4b3b-4b3b-4b3b-4b3b3b3b3b3b',
    slug: 'BooleanPreference2',
    type: PreferenceTopicType.Boolean,
    preferenceOptionValues: [],
    purpose: {
      trackingType: 'Marketing',
    },
  },
  {
    id: '34b3b3b3-4b3b-4b3b-4b3b-4b3b3b3b3b3b',
    slug: 'MultiSelectPreference',
    type: PreferenceTopicType.MultiSelect,
    preferenceOptionValues: [
      {
        slug: 'Value1',
      },
      {
        slug: 'Value2',
      },
    ],
    purpose: {
      trackingType: 'Marketing',
    },
  },
  {
    id: '44b3b3b3-4b3b-4b3b-4b3b-4b3b3b3b3b3b',
    slug: 'SingleSelectPreference',
    type: PreferenceTopicType.Select,
    preferenceOptionValues: [
      {
        slug: 'Value1',
      },
      {
        slug: 'Value2',
      },
    ],
    purpose: {
      trackingType: 'Marketing',
    },
  },
];

describe('checkIfPendingPreferenceUpdatesCauseConflict', () => {
  it('should return false for simple purpose comparison', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'SalesOutreach',
              enabled: false,
              preferences: [],
            },
          ],
        },
        pendingUpdates: {
          SalesOutreach: {
            enabled: false,
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(false);
  });

  it('should return false if purpose missing', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'SalesOutreach',
              enabled: false,
              preferences: [],
            },
          ],
        },
        pendingUpdates: {
          Marketing: {
            enabled: false,
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(false);
  });

  it('should return true for simple purpose comparison', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'SalesOutreach',
              enabled: true,
              preferences: [],
            },
          ],
        },
        pendingUpdates: {
          SalesOutreach: {
            enabled: false,
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(true);
  });

  it('should return true for simple purpose comparison with extra preference', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'SalesOutreach',
              enabled: false,
              preferences: [
                {
                  topic: 'BooleanPreference1',
                  choice: {
                    booleanValue: true,
                  },
                },
              ],
            },
          ],
        },
        pendingUpdates: {
          SalesOutreach: {
            enabled: false,
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(false);
  });

  it('should return false for simple purpose comparison with extra preference in update', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'SalesOutreach',
              enabled: false,
            },
          ],
        },
        pendingUpdates: {
          SalesOutreach: {
            enabled: false,
            preferences: [
              {
                topic: 'BooleanPreference1',
                choice: {
                  booleanValue: true,
                },
              },
            ],
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(false);
  });

  it('should return false for preferences being same', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'Marketing',
              enabled: false,
              preferences: [
                {
                  topic: 'BooleanPreference1',
                  choice: {
                    booleanValue: true,
                  },
                },
                {
                  topic: 'SingleSelectPreference',
                  choice: {
                    selectValue: 'Value1',
                  },
                },
                {
                  topic: 'MultiSelectPreference',
                  choice: {
                    selectValues: ['Value1', 'Value2'],
                  },
                },
              ],
            },
          ],
        },
        pendingUpdates: {
          Marketing: {
            enabled: false,
            preferences: [
              {
                topic: 'BooleanPreference1',
                choice: {
                  booleanValue: true,
                },
              },
              {
                topic: 'SingleSelectPreference',
                choice: {
                  selectValue: 'Value1',
                },
              },
              {
                topic: 'MultiSelectPreference',
                choice: {
                  selectValues: ['Value1', 'Value2'],
                },
              },
            ],
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(false);
  });

  it('should return true for boolean preference changing', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'Marketing',
              enabled: false,
              preferences: [
                {
                  topic: 'BooleanPreference1',
                  choice: {
                    booleanValue: false,
                  },
                },
                {
                  topic: 'SingleSelectPreference',
                  choice: {
                    selectValue: 'Value1',
                  },
                },
                {
                  topic: 'MultiSelectPreference',
                  choice: {
                    selectValues: ['Value1', 'Value2'],
                  },
                },
              ],
            },
          ],
        },
        pendingUpdates: {
          Marketing: {
            enabled: false,
            preferences: [
              {
                topic: 'BooleanPreference1',
                choice: {
                  booleanValue: true,
                },
              },
              {
                topic: 'SingleSelectPreference',
                choice: {
                  selectValue: 'Value1',
                },
              },
              {
                topic: 'MultiSelectPreference',
                choice: {
                  selectValues: ['Value1', 'Value2'],
                },
              },
            ],
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(true);
  });

  it('should return true for single select preference changing', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'Marketing',
              enabled: false,
              preferences: [
                {
                  topic: 'BooleanPreference1',
                  choice: {
                    booleanValue: true,
                  },
                },
                {
                  topic: 'SingleSelectPreference',
                  choice: {
                    selectValue: 'Value2',
                  },
                },
                {
                  topic: 'MultiSelectPreference',
                  choice: {
                    selectValues: ['Value1', 'Value2'],
                  },
                },
              ],
            },
          ],
        },
        pendingUpdates: {
          Marketing: {
            enabled: false,
            preferences: [
              {
                topic: 'BooleanPreference1',
                choice: {
                  booleanValue: true,
                },
              },
              {
                topic: 'SingleSelectPreference',
                choice: {
                  selectValue: 'Value1',
                },
              },
              {
                topic: 'MultiSelectPreference',
                choice: {
                  selectValues: ['Value1', 'Value2'],
                },
              },
            ],
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(true);
  });

  it('should return true for multi select preference changing', () => {
    expect(
      checkIfPendingPreferenceUpdatesCauseConflict({
        currentConsentRecord: {
          ...DEFAULT_VALUES,
          purposes: [
            {
              purpose: 'Marketing',
              enabled: false,
              preferences: [
                {
                  topic: 'BooleanPreference1',
                  choice: {
                    booleanValue: true,
                  },
                },
                {
                  topic: 'SingleSelectPreference',
                  choice: {
                    selectValue: 'Value1',
                  },
                },
                {
                  topic: 'MultiSelectPreference',
                  choice: {
                    selectValues: ['Value2'],
                  },
                },
              ],
            },
          ],
        },
        pendingUpdates: {
          Marketing: {
            enabled: false,
            preferences: [
              {
                topic: 'BooleanPreference1',
                choice: {
                  booleanValue: true,
                },
              },
              {
                topic: 'SingleSelectPreference',
                choice: {
                  selectValue: 'Value1',
                },
              },
              {
                topic: 'MultiSelectPreference',
                choice: {
                  selectValues: ['Value1', 'Value2'],
                },
              },
            ],
          },
        },
        preferenceTopics: PREFERENCE_TOPICS,
      }),
    ).to.equal(true);
  });
});
/* eslint-enable max-lines */
