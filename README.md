<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Changelog](#changelog)
- [Overview](#overview)
- [Installation](#installation)
- [transcend.yml](#transcendyml)
- [Usage](#usage)
  - [tr-pull](#tr-pull)
    - [Authentication](#authentication)
    - [Arguments](#arguments)
    - [Usage](#usage-1)
  - [tr-pull-ot](#tr-pull-ot)
    - [Authentication](#authentication-1)
    - [Arguments](#arguments-1)
    - [Usage](#usage-2)
  - [tr-push](#tr-push)
    - [Authentication](#authentication-2)
    - [Arguments](#arguments-2)
    - [Usage](#usage-3)
    - [CI Integration](#ci-integration)
    - [Dynamic Variables](#dynamic-variables)
  - [tr-scan-packages](#tr-scan-packages)
    - [Authentication](#authentication-3)
    - [Arguments](#arguments-3)
    - [Usage](#usage-4)
  - [tr-discover-silos](#tr-discover-silos)
    - [Authentication](#authentication-4)
    - [Arguments](#arguments-4)
    - [Usage](#usage-5)
  - [tr-request-approve](#tr-request-approve)
    - [Authentication](#authentication-5)
    - [Arguments](#arguments-5)
    - [Usage](#usage-6)
  - [tr-request-cancel](#tr-request-cancel)
    - [Authentication](#authentication-6)
    - [Arguments](#arguments-6)
    - [Usage](#usage-7)
  - [tr-request-notify-additional-time](#tr-request-notify-additional-time)
    - [Authentication](#authentication-7)
    - [Arguments](#arguments-7)
    - [Usage](#usage-8)
  - [tr-request-mark-silent](#tr-request-mark-silent)
    - [Authentication](#authentication-8)
    - [Arguments](#arguments-8)
    - [Usage](#usage-9)
  - [tr-request-upload](#tr-request-upload)
    - [Authentication](#authentication-9)
    - [Arguments](#arguments-9)
    - [Usage](#usage-10)
  - [tr-request-restart](#tr-request-restart)
    - [Authentication](#authentication-10)
    - [Arguments](#arguments-10)
    - [Usage](#usage-11)
  - [tr-request-enricher-restart](#tr-request-enricher-restart)
    - [Authentication](#authentication-11)
    - [Arguments](#arguments-11)
    - [Usage](#usage-12)
  - [tr-request-reject-unverified-identifiers](#tr-request-reject-unverified-identifiers)
    - [Authentication](#authentication-12)
    - [Arguments](#arguments-12)
    - [Usage](#usage-13)
  - [tr-request-export](#tr-request-export)
    - [Authentication](#authentication-13)
    - [Arguments](#arguments-13)
    - [Usage](#usage-14)
  - [tr-cron-pull-identifiers](#tr-cron-pull-identifiers)
    - [Authentication](#authentication-14)
    - [Arguments](#arguments-14)
    - [Usage](#usage-15)
  - [tr-cron-mark-identifiers-completed](#tr-cron-mark-identifiers-completed)
    - [Authentication](#authentication-15)
    - [Arguments](#arguments-15)
    - [Usage](#usage-16)
  - [tr-manual-enrichment-pull-identifiers](#tr-manual-enrichment-pull-identifiers)
    - [Authentication](#authentication-16)
    - [Arguments](#arguments-16)
    - [Usage](#usage-17)
  - [tr-manual-enrichment-push-identifiers](#tr-manual-enrichment-push-identifiers)
    - [Authentication](#authentication-17)
    - [Arguments](#arguments-17)
    - [Usage](#usage-18)
  - [tr-mark-request-data-silos-completed](#tr-mark-request-data-silos-completed)
    - [Authentication](#authentication-18)
    - [Arguments](#arguments-18)
    - [Usage](#usage-19)
  - [tr-skip-request-data-silos](#tr-skip-request-data-silos)
    - [Authentication](#authentication-19)
    - [Arguments](#arguments-19)
    - [Usage](#usage-20)
  - [tr-retry-request-data-silos](#tr-retry-request-data-silos)
    - [Authentication](#authentication-20)
    - [Arguments](#arguments-20)
    - [Usage](#usage-21)
  - [tr-update-consent-manager](#tr-update-consent-manager)
    - [Authentication](#authentication-21)
    - [Arguments](#arguments-21)
    - [Usage](#usage-22)
  - [tr-consent-managers-to-business-entities](#tr-consent-managers-to-business-entities)
    - [Authentication](#authentication-22)
    - [Arguments](#arguments-22)
    - [Usage](#usage-23)
  - [tr-consent-manager-service-json-to-yml](#tr-consent-manager-service-json-to-yml)
    - [Authentication](#authentication-23)
    - [Arguments](#arguments-23)
    - [Usage](#usage-24)
  - [tr-derive-data-silos-from-data-flows](#tr-derive-data-silos-from-data-flows)
    - [Authentication](#authentication-24)
    - [Arguments](#arguments-24)
    - [Usage](#usage-25)
  - [tr-derive-data-silos-from-data-flows-cross-instance](#tr-derive-data-silos-from-data-flows-cross-instance)
    - [Authentication](#authentication-25)
    - [Arguments](#arguments-25)
    - [Usage](#usage-26)
  - [tr-pull-consent-metrics](#tr-pull-consent-metrics)
    - [Authentication](#authentication-26)
    - [Arguments](#arguments-26)
    - [Usage](#usage-27)
  - [tr-pull-datapoints](#tr-pull-datapoints)
    - [Authentication](#authentication-27)
    - [Arguments](#arguments-27)
    - [Usage](#usage-28)
  - [tr-upload-preferences](#tr-upload-preferences)
    - [Authentication](#authentication-28)
    - [Authentication](#authentication-29)
    - [Arguments](#arguments-28)
    - [Usage](#usage-29)
  - [tr-upload-consent-preferences](#tr-upload-consent-preferences)
    - [Authentication](#authentication-30)
    - [Arguments](#arguments-29)
    - [Usage](#usage-30)
  - [tr-pull-consent-preferences](#tr-pull-consent-preferences)
    - [Authentication](#authentication-31)
    - [Arguments](#arguments-30)
    - [Usage](#usage-31)
  - [tr-upload-data-flows-from-csv](#tr-upload-data-flows-from-csv)
    - [Authentication](#authentication-32)
    - [Arguments](#arguments-31)
    - [Usage](#usage-32)
  - [tr-upload-cookies-from-csv](#tr-upload-cookies-from-csv)
    - [Authentication](#authentication-33)
    - [Arguments](#arguments-32)
    - [Usage](#usage-33)
  - [tr-generate-api-keys](#tr-generate-api-keys)
    - [Authentication](#authentication-34)
    - [Arguments](#arguments-33)
    - [Usage](#usage-34)
  - [tr-build-xdi-sync-endpoint](#tr-build-xdi-sync-endpoint)
    - [Authentication](#authentication-35)
    - [Arguments](#arguments-34)
    - [Usage](#usage-35)
- [Prompt Manager](#prompt-manager)
- [Proxy usage](#proxy-usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Changelog

To stay up to date on breaking changes to the cli between major version updates, please refer to [CHANGELOG.md](CHANGELOG.md).

## Overview

A command line interface that allows you to define your Data Map in code and sync that configuration back to https://app.transcend.io.

## Installation

This package is distributed through npm and github package registries and assumes an installation of [npm and node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

If your codebase is typescript or javascript based, you can add this package as a dev dependency:

```sh
# install locally with yarn
yarn add -D @transcend-io/cli

# cli commands available within package
yarn tr-pull --auth=$TRANSCEND_API_KEY
yarn tr-pull-ot --auth=$ONE_TRUST_OAUTH_TOKEN --hostname=$ONE_TRUST_HOSTNAME --file=$ONE_TRUST_OUTPUT_FILE
yarn tr-push --auth=$TRANSCEND_API_KEY
yarn tr-scan-packages --auth=$TRANSCEND_API_KEY
yarn tr-discover-silos --auth=$TRANSCEND_API_KEY
yarn tr-request-approve --auth=$TRANSCEND_API_KEY
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY
yarn tr-request-mark-silent --auth=$TRANSCEND_API_KEY
yarn tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY
yarn tr-request-upload --auth=$TRANSCEND_API_KEY
yarn tr-request-export --auth=$TRANSCEND_API_KEY
yarn tr-request-restart --auth=$TRANSCEND_API_KEY
yarn tr-request-enricher-restart --auth=$TRANSCEND_API_KEY
yarn tr-request-reject-unverified-identifiers --auth-$TRANSCEND_API_KEY
yarn tr-cron-pull-identifiers --auth=$TRANSCEND_API_KEY
yarn tr-cron-mark-identifiers-completed --auth=$TRANSCEND_API_KEY
yarn tr-manual-enrichment-pull-identifiers --auth=$TRANSCEND_API_KEY
yarn tr-mark-request-data-silos-completed --auth=$TRANSCEND_API_KEY
yarn tr-skip-request-data-silos --auth=$TRANSCEND_API_KEY
yarn tr-retry-request-data-silos --auth=$TRANSCEND_API_KEY
yarn tr-update-consent-manager --auth=$TRANSCEND_API_KEY
yarn tr-consent-managers-to-business-entities
yarn tr-consent-manager-service-json-to-yml
yarn tr-derive-data-silos-from-data-flows --auth=$TRANSCEND_API_KEY
yarn tr-derive-data-silos-from-data-flows-cross-instance --auth=$TRANSCEND_API_KEY
yarn tr-pull-consent-metrics --auth=$TRANSCEND_API_KEY
yarn tr-upload-consent-preferences --auth=$TRANSCEND_API_KEY
yarn tr-pull-consent-preferences --auth=$TRANSCEND_API_KEY
yarn tr-upload-data-flows-from-csv --auth=$TRANSCEND_API_KEY
yarn tr-upload-cookies-from-csv --auth=$TRANSCEND_API_KEY
yarn tr-generate-api-keys --auth=$TRANSCEND_API_KEY
yarn tr-build-xdi-sync-endpoint --auth=$TRANSCEND_API_KEY
```

or

```sh
# install locally with npm
npm i -D @transcend-io/cli

# cli commands available within package
tr-pull --auth=$TRANSCEND_API_KEY
tr-pull-ot --auth=$ONE_TRUST_OAUTH_TOKEN --hostname=$ONE_TRUST_HOSTNAME --file=$ONE_TRUST_OUTPUT_FILE
tr-push --auth=$TRANSCEND_API_KEY
tr-scan-packages --auth=$TRANSCEND_API_KEY
tr-discover-silos --auth=$TRANSCEND_API_KEY
tr-request-approve --auth=$TRANSCEND_API_KEY
tr-request-cancel --auth=$TRANSCEND_API_KEY
tr-request-mark-silent --auth=$TRANSCEND_API_KEY
tr-request-mark-silent --auth=$TRANSCEND_API_KEY
tr-request-upload --auth=$TRANSCEND_API_KEY
tr-request-export --auth=$TRANSCEND_API_KEY
tr-request-restart --auth=$TRANSCEND_API_KEY
tr-request-enricher-restart --auth=$TRANSCEND_API_KEY
tr-request-reject-unverified-identifiers --auth=$TRANSCEND_API_KEY
tr-cron-pull-identifiers --auth=$TRANSCEND_API_KEY
tr-cron-mark-identifiers-completed --auth=$TRANSCEND_API_KEY
tr-manual-enrichment-pull-identifiers --auth=$TRANSCEND_API_KEY
tr-mark-request-data-silos-completed --auth=$TRANSCEND_API_KEY
tr-skip-request-data-silos --auth=$TRANSCEND_API_KEY
tr-retry-request-data-silos --auth=$TRANSCEND_API_KEY
tr-update-consent-manager --auth=$TRANSCEND_API_KEY
tr-pull-consent-metrics --auth=$TRANSCEND_API_KEY
tr-upload-consent-preferences --auth=$TRANSCEND_API_KEY
tr-pull-consent-preferences --auth=$TRANSCEND_API_KEY
tr-consent-managers-to-business-entities
tr-consent-manager-service-json-to-yml
tr-derive-data-silos-from-data-flows --auth=$TRANSCEND_API_KEY
tr-derive-data-silos-from-data-flows-cross-instance --auth=$TRANSCEND_API_KEY
tr-upload-data-flows-from-csv --auth=$TRANSCEND_API_KEY
tr-generate-api-keys --auth=$TRANSCEND_API_KEY
tr-build-xdi-sync-endpoint --auth=$TRANSCEND_API_KEY

```

alternatively, you can install the cli globally on your machine:

```sh
# install locally with npm
npm i -g @transcend-io/cli

# cli commands available everywhere on machine
tr-pull --auth=$TRANSCEND_API_KEY
...
```

Note:

_The cli-commands default to using the EU Transcend backend. To use these commands with the US backend, you will need to use the flag --transcendUrl=https://api.us.transcend.io. You can also set the environment variable `TRANSCEND_API_URL=https://api.us.transcend.io`_

## transcend.yml

Within your git repositories, you can define a file `transcend.yml`. This file allows you define part of your Data Map in code. Using the cli, you can sync that configuration back to the Transcend Admin Dashboard (https://app.transcend.io/privacy-requests/connected-services).

You can find various examples for your `transcend.yml` file in the [examples/](./examples/) folder. If you are looking for a starting point to copy and paste, [simple.yml](./examples/simple.yml) is a good place to start. This file is annotated with links and documentations that new members of your team can use if they come across the file.

The API for this YAML file can be found in [./src/codecs.ts](./src/codecs.ts) under the variable named "TranscendInput". The shape of the YAML file will be type-checked every time a command is run.

By default, your editor or IDE should recognize `transcend.yml` and validate it against our latest published [JSON schema](./transcend-yml-schema-latest.json). This is dependent on whether your editor uses [yaml-language-server](https://github.com/redhat-developer/yaml-language-server), such as through the [VS Code YAML extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml).

Your editor will use the latest version's schema. To pin the `transcend.yml` schema to a previous major version, include this at the top of your file (and change `v4` to your target major version):

```yml
# yaml-language-server: $schema=https://raw.githubusercontent.com/transcend-io/cli/main/transcend-yml-schema-v4.json
```

The structure of `transcend.yml` looks something like the following:

```yaml
# Manage at: https://app.transcend.io/infrastructure/api-keys
# See https://docs.transcend.io/docs/authentication
# Define API keys that may be shared across data silos
# in the data map. When creating new data silos through the YAML
# cli, it is possible to specify which API key should be associated
# with the newly created data silo.
api-keys:
  - title: Webhook Key
  - title: Analytics Key

# Manage at: https://app.transcend.io/privacy-requests/identifiers
# See https://docs.transcend.io/docs/identity-enrichment
# Define enricher or pre-flight check webhooks that will be executed
# prior to privacy request workflows. Some examples may include:
#   - identity enrichment: look up additional identifiers for that user.
#                          i.e. map an email address to a user ID
#   - fraud check: auto-cancel requests if the user is flagged for fraudulent behavior
#   - customer check: auto-cancel request for some custom business criteria
enrichers:
  - title: Basic Identity Enrichment
    description: Enrich an email address to the userId and phone number
    url: https://example.acme.com/transcend-enrichment-webhook
    input-identifier: email
    output-identifiers:
      - userId
      - phone
      - myUniqueIdentifier
  - title: Fraud Check
    description: Ensure the email address is not marked as fraudulent
    url: https://example.acme.com/transcend-fraud-check
    input-identifier: email
    output-identifiers:
      - email
    privacy-actions:
      - ERASURE

# Manage at: https://app.transcend.io/privacy-requests/connected-services
# See https://docs.transcend.io/docs/the-data-map#data-silos
# Define the data silos in your data map. A data silo can be a database,
# or a web service that may use a collection of different data stores under the hood.
data-silos:
  # Note: title is the only required top-level field for a data silo
  - title: Redshift Data Warehouse
    description: The mega-warehouse that contains a copy over all SQL backed databases
    integrationName: server
    url: https://example.acme.com/transcend-webhook
    api-key-title: Webhook Key
    data-subjects:
      - customer
      - employee
      - newsletter-subscriber
      - b2b-contact
    identity-keys:
      - email
      - userId
    deletion-dependencies:
      - Identity Service
    owners:
      - alice@transcend.io
    datapoints:
      - title: Webhook Notification
        key: _global
        privacy-actions:
          - ACCESS
          - ERASURE
          - SALE_OPT_OUT
      - title: User Model
        description: The centralized user model user
        key: users
        privacy-actions:
          - ACCESS
        fields:
          - key: firstName
            title: First Name
            description: The first name of the user, inputted during onboarding
          - key: email
            title: Email
            description: The email address of the user
```

## Usage

### tr-pull

Generate's a transcend.yml by pulling the configuration from your connected services view (https://app.transcend.io/privacy-requests/connected-services).

This command can be helpful if you are looking to:

- Copy parts of your Data Map from one Transcend instance into another instance
- Generate a transcend.yml file as a starting point to maintain parts of your Data Map in code

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key permissions for this command vary based on the value to the `resources` argument. See the table below to understand the necessary permissions for the resources you are attempting to pull.

| Key                   | Description                                                                                                                          | Scope                                            | Is Default | Link                                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiKeys               | API Key definitions assigned to Data Silos. API keys cannot be created through the cli, but you can map API key usage to Data Silos. | View API Keys                                    | true       | [Developer Tools -> API keys](https://app.transcend.io/infrastructure/api-keys)                                                                                                                                               |
| actionItems           | Onboarding related action items                                                                                                      | Read only                                        | false      | [Action Items](https://app.transcend.io/action-items/all)                                                                                                                                                                     |
| actionItemCollections | Onboarding related action item group names                                                                                           | Read only                                        | false      | [Action Items](https://app.transcend.io/action-items/all)                                                                                                                                                                     |
| templates             | Email templates. Only template titles can be created and mapped to other resources.                                                  | View Email Templates                             | true       | [DSR Automation -> Email Templates](https://app.transcend.io/privacy-requests/email-templates)                                                                                                                                |
| dataSilos             | The Data Silo/Integration definitions.                                                                                               | View Data Map,View Data Subject Request Settings | true       | [Data Inventory -> Data Silos](https://app.transcend.io/data-map/data-inventory/) and [Infrastucture -> Integrations](https://app.transcend.io/infrastructure/integrationsdata-silos)                                         |
| enrichers             | The Privacy Request enricher configurations.                                                                                         | View Identity Verification Settings              | true       | [DSR Automation -> Identifiers](https://app.transcend.io/privacy-requests/identifiers)                                                                                                                                        |
| teams                 | Team definitions of users and scope groupings                                                                                        | View Scopes                                      | false      | [Administration -> Teams](https://app.transcend.io/admin/teams)                                                                                                                                                               |
| businessEntities      | The business entities in the data inventory.                                                                                         | View Data Inventory                              | false      | [Data Inventory -> Business Entities](https://app.transcend.io/data-map/data-inventory/business-entities)                                                                                                                     |
| identifiers           | The Privacy Request identifier configurations.                                                                                       | View Identity Verification Settings              | false      | [DSR Automation -> Identifiers](https://app.transcend.io/privacy-requests/identifiers)                                                                                                                                        |
| actions               | The Privacy Request action settings.                                                                                                 | View Data Subject Request Settings               | false      | [DSR Automation -> Request Settings](https://app.transcend.io/privacy-requests/settings)                                                                                                                                      |
| dataSubjects          | The Privacy Request data subject settings.                                                                                           | View Data Subject Request Settings               | false      | [DSR Automation -> Request Settings](https://app.transcend.io/privacy-requests/settings)                                                                                                                                      |
| vendors               | The vendors in the data inventory.                                                                                                   | View Data Inventory                              | false      | [Data Inventory -> Vendors](https://app.transcend.io/data-map/data-inventory/vendors)                                                                                                                                         |
| dataCategories        | The data categories in the data inventory.                                                                                           | View Data Inventory                              | false      | [Data Inventory -> Data Categories](https://app.transcend.io/data-map/data-inventory/data-categories)                                                                                                                         |
| processingPurposes    | The processing purposes in the data inventory.                                                                                       | View Data Inventory                              | false      | [Data Inventory -> Processing Purposes](https://app.transcend.io/data-map/data-inventory/purposes)                                                                                                                            |
| customFields          | Custom field definitions that define extra metadata for each table in the Admin Dashboard.                                           | View Global Attributes                           | false      | [Custom Fields](https://app.transcend.io/infrastructure/attributes)                                                                                                                                                           |
| dataFlows             | Consent Manager Data Flow definitions.                                                                                               | View Data Flows                                  | false      | [Consent Management -> Data Flows](https://app.transcend.io/consent-manager/data-flows/approved)                                                                                                                              |
| cookies               | Consent Manager Cookie definitions.                                                                                                  | View Data Flows                                  | false      | [Consent Management -> Cookies](https://app.transcend.io/consent-manager/cookies/approved)                                                                                                                                    |
| consentManager        | Consent Manager general settings, including domain list.                                                                             | View Consent Manager                             | false      | [Consent Management -> Developer Settings](https://app.transcend.io/consent-manager/developer-settings)                                                                                                                       |
| partitions            | The partitions in the account (often representative of separate data controllers).                                                   | View Consent Manager                             | false      | [Consent Management -> Developer Settings -> Advanced Settings](https://app.transcend.io/consent-manager/developer-settings/advanced-settings)                                                                                |
| prompts               | The Transcend AI prompts                                                                                                             | View Prompts                                     | false      | [Prompt Manager -> Browse](https://app.transcend.io/prompts/browse)                                                                                                                                                           |
| promptPartials        | The Transcend AI prompt partials                                                                                                     | View Prompts                                     | false      | [Prompt Manager -> Partials](https://app.transcend.io/prompts/partialss)                                                                                                                                                      |
| promptGroups          | The Transcend AI prompt groups                                                                                                       | View Prompts                                     | false      | [Prompt Manager -> Groups](https://app.transcend.io/prompts/groups)                                                                                                                                                           |
| agents                | The agents in the prompt manager.                                                                                                    | View Prompts                                     | false      | [Prompt Manager -> Agents](https://app.transcend.io/prompts/agents)                                                                                                                                                           |
| agentFunctions        | The agent functions in the prompt manager.                                                                                           | View Prompts                                     | false      | [Prompt Manager -> Agent Functions](https://app.transcend.io/prompts/agent-functions)                                                                                                                                         |
| agentFiles            | The agent files in the prompt manager.                                                                                               | View Prompts                                     | false      | [Prompt Manager -> Agent Files](https://app.transcend.io/prompts/agent-files)                                                                                                                                                 |
| privacyCenters        | The privacy center configurations.                                                                                                   | View Privacy Center                              | false      | [Privacy Center](https://app.transcend.io/privacy-center/general-settings)                                                                                                                                                    |
| policies              | The privacy center policies.                                                                                                         | View Policies                                    | false      | [Privacy Center -> Policies](https://app.transcend.io/privacy-center/policies)                                                                                                                                                |
| messages              | Message definitions used across consent, privacy center, email templates and more.                                                   | View Internationalization Messages               | false      | [Privacy Center -> Messages](https://app.transcend.io/privacy-center/messages-internationalization), [Consent Management -> Display Settings -> Messages](https://app.transcend.io/consent-manager/display-settings/messages) |
| assessments           | Assessment responses.                                                                                                                | View Assessments                                 | false      | [Assessments -> Assessments](https://app.transcend.io/assessments/groups)                                                                                                                                                     |
| assessmentTemplates   | Assessment template configurations.                                                                                                  | View Assessments                                 | false      | [Assessment -> Templates](https://app.transcend.io/assessments/form-templates)                                                                                                                                                |
| siloDiscoveryRecommendations   | Pending data silos recommended by Silo Discovery                                                                                                  | View Data Map                                 | false      | [Silo Discovery -> Triage](https://app.transcend.io/data-map/data-inventory/silo-discovery/triage)                                                                                                                                                |


_Note: The scopes for tr-push are comprehensive of the scopes for tr-pull_

#### Arguments

| Argument                 | Description                                                                              | Type                                                         | Default                               | Required |
| ------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------- | -------- |
| auth                     | The Transcend API key with the scopes necessary for the command.                         | string (API key or path to tr-generate-api-keys JSON output) | N/A                                   | true     |
| resources                | The different resource types to pull in (see table above for breakdown of each resource) | string                                                       | apiKeys,templates,dataSilos,enrichers | false    |
| file                     | Path to the YAML file to pull into                                                       | string - file-path                                           | ./transcend.yml                       | false    |
| transcendUrl             | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.            | string - URL                                                 | https://api.transcend.io              | false    |
| dataSiloIds              | The UUIDs of the data silos that should be pulled into the YAML file.                    | list(string - UUID)                                          | N/A                                   | false    |
| integrationNames         | The types of integrations to pull down                                                   | string[]                                                     | N/A                                   | false    |
| trackerStatuses          | The statuses of consent manager trackers to pull down. (Triage, Approved or both)        | ConsentTrackerStatus[]                                       | LIVE,NEEDS_REVIEW                     | false    |
| pageSize                 | The page size to use when paginating over the API                                        | number                                                       | 50                                    | false    |
| skipDatapoints           | When true, skip pulling in datapoints alongside data silo resource                       | boolean                                                      | false                                 | false    |
| skipSubDatapoints        | When true, skip pulling in subDatapoints alongside data silo resource                    | boolean                                                      | false                                 | false    |
| includeGuessedCategories | When true, included guessed data categories that came from the content classifier        | boolean                                                      | false                                 | false    |
| debug                    | Set to true to include debug logs while pulling the configuration                        | boolean                                                      | false                                 | false    |

#### Usage

```sh
# Writes out file to ./transcend.yml
tr-pull --auth=$TRANSCEND_API_KEY
```

An alternative file destination can be specified:

```sh
# Writes out file to ./custom/location.yml
tr-pull --auth=$TRANSCEND_API_KEY --file=./custom/location.yml
```

Or a specific data silo(s) can be pulled in:

```sh
tr-pull --auth=$TRANSCEND_API_KEY ---dataSiloIds=710fec3c-7bcc-4c9e-baff-bf39f9bec43e
```

Or a specific types of data silo(s) can be pulled in:

```sh
tr-pull --auth=$TRANSCEND_API_KEY --integrationNames=salesforce,snowflake
```

Specifying the resource types to pull in (the following resources are the default resources):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=apiKeys,templates,dataSilos,enrichers
```

Pull in data flow and cookie resources, filtering for specific tracker statuses (see [this example](./examples/data-flows-cookies.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=dataFlows,cookies --trackerStatuses=NEEDS_REVIEW,LIVE
```

Pull in data silos without any datapoint/table information

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=dataSilos --skipDatapoints=true
```

Pull in data silos and datapoints without any subdatapoint/column information

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=dataSilos --skipSubDatapoints=true
```

Pull in data silos and datapoints with guessed data categories instead of just approved data categories

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=dataSilos --includeGuessedCategories=true
```

Pull in attribute definitions only (see [this example](./examples/attributes.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=attributes
```

Pull in business entities only (see [this example](./examples/business-entities.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=businessEntities
```

Pull in enrichers and identifiers (see [this example](./examples/enrichers.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=enrichers,identifiers
```

Pull in onboarding action items (see [this example](./examples/action-items.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=actionItems,actionItemCollections
```

Pull in consent manager domain list (see [this example](./examples/consent-manager-domains.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=consentManager
```

Pull in identifier configurations (see [this example](./examples/identifiers.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=identifiers
```

Pull in request actions configurations (see [this example](./examples/actions.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=actions
```

Pull in request data subject configurations (see [this example](./examples/data-subjects.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=dataSubjects
```

Pull in prompts, prompt templates, prompt partials and prompt groups (see [this example](./examples/prompts.yml)):

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=prompts,promptPartials,promptGroups
```

Pull in assessments and assessment templates.

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=assessments,assessmentTemplates
```

Pull everything:

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=all
```

Or with a specific page size (max 100)

```sh
tr-pull --auth=$TRANSCEND_API_KEY --integrationNames=salesforce,snowflake --pageSize=30
```

Or with debug logs

```sh
tr-pull --auth=$TRANSCEND_API_KEY --integrationNames=salesforce,snowflake --debug=true
```

Pull in configuration files across multiple instances

```sh
tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD \
   --scopes="View Consent Manager" --apiKeyTitle="CLI Usage Cross Instance Sync" --file=./transcend-api-keys.json
tr-pull --auth=./transcend-api-keys.json --resources=consentManager --file=./transcend/
```

Note: This command will overwrite the existing transcend.yml file that you have locally.

### tr-pull-ot

Pulls resources from a OneTrust instance. For now, it only supports retrieving OneTrust Assessments. It sends a request to the [Get List of Assessments](https://developer.onetrust.com/onetrust/reference/getallassessmentbasicdetailsusingget) endpoint to fetch a list of all Assessments in your account. Then, it queries the [Get Assessment](https://developer.onetrust.com/onetrust/reference/exportassessmentusingget) and [Get Risk](https://developer.onetrust.com/onetrust/reference/getriskusingget) endpoints to enrich these assessments with more details such as respondents, approvers, assessment questions and responses, and assessment risks. Finally, it syncs the enriched resources to disk in the specified file and format.

This command can be helpful if you are looking to:

- Pull resources from your OneTrust account.
- Migrate your resources from your OneTrust account to Transcend.

#### Authentication

In order to use this command, you will need to generate a OneTrust OAuth Token with scope for accessing the following endpoints:

- [GET /v2/assessments](https://developer.onetrust.com/onetrust/reference/getallassessmentbasicdetailsusingget)
- [GET /v2/assessments/{assessmentId}/export](https://developer.onetrust.com/onetrust/reference/exportassessmentusingget)
- [GET /risks/{riskId}](https://developer.onetrust.com/onetrust/reference/getriskusingget)

To learn how to generate the token, see the [OAuth 2.0 Scopes](https://developer.onetrust.com/onetrust/reference/oauth-20-scopes) and [Generate Access Token](https://developer.onetrust.com/onetrust/reference/getoauthtoken) pages.

#### Arguments

| Argument   | Description                                                                                       | Type    | Default     | Required |
| ---------- | ------------------------------------------------------------------------------------------------- | ------- | ----------- | -------- |
| auth       | The OAuth access token with the scopes necessary to access the OneTrust Public APIs.              | string  | N/A         | true     |
| hostname   | The domain of the OneTrust environment from which to pull the resource (e.g. trial.onetrust.com). | string  | N/A         | true     |
| file       | Path to the file to pull the resource into. Its format must match the fileFormat argument.        | string  | N/A         | true     |
| fileFormat | The format of the output file. For now, only json is supported.                                   | string  | json        | false    |
| resource   | The resource to pull from OneTrust. For now, only assessments is supported.                       | string  | assessments | false    |
| debug      | Whether to print detailed logs in case of error.                                                  | boolean | false       | false    |

#### Usage

```sh
# Writes out file to ./oneTrustAssessments.json
tr-pull-ot --auth=$ONE_TRUST_OAUTH_TOKEN --hostname=trial.onetrust.com --file=./oneTrustAssessments.json
```

### tr-push

Given a transcend.yml file, sync the contents up to your connected services view (https://app.transcend.io/privacy-requests/connected-services).

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes when pushing the various resource types:

| Key                   | Description                                                                                                   | Scope                                     | Is Default | Link                                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiKeys               | API Key definitions. API keys cannot be created through the cli, but you can map API key usage to Data Silos. | View API Keys                             | true       | [Developer Tools -> API keys](https://app.transcend.io/infrastructure/api-keys)                                                                                                                                               |
| actionItems           | Onboarding related action items                                                                               | Manage Action Item Collections            | false      | [Action Items](https://app.transcend.io/action-items/all)                                                                                                                                                                     |
| actionItemCollections | Onboarding related action item group names                                                                    | Manage All Action Items                   | false      | [Action Items](https://app.transcend.io/action-items/all)                                                                                                                                                                     |
| templates             | Email templates. Only template titles can be created and mapped to other resources.                           | Manage Email Templates                    | true       | [DSR Automation -> Email Templates](https://app.transcend.io/privacy-requests/email-templates)                                                                                                                                |
| dataSilos             | The Data Silo/Integration definitions.                                                                        | Manage Data Map,Connect Data Silos        | true       | [Data Inventory -> Data Silos](https://app.transcend.io/data-map/data-inventory/) and [Infrastucture -> Integrations](https://app.transcend.io/infrastructure/integrationsdata-silos)                                         |
| enrichers             | The Privacy Request enricher configurations.                                                                  | Manage Request Identity Verification      | true       | [DSR Automation -> Identifiers](https://app.transcend.io/privacy-requests/identifiers)                                                                                                                                        |
| teams                 | The team definitions containing scopes and users                                                              | Manage Access Control                     | false      | [Administration -> Teams](https://app.transcend.io/admin/teams)                                                                                                                                                               |
| businessEntities      | The business entities in the data inventory.                                                                  | Manage Data Inventory                     | false      | [Data Inventory -> Business Entities](https://app.transcend.io/data-map/data-inventory/business-entities)                                                                                                                     |
| identifiers           | The Privacy Request identifier configurations.                                                                | Manage Request Identity Verification      | false      | [DSR Automation -> Identifiers](https://app.transcend.io/privacy-requests/identifiers)                                                                                                                                        |
| actions               | The Privacy Request action settings.                                                                          | Manage Data Subject Request Settings      | false      | [DSR Automation -> Request Settings](https://app.transcend.io/privacy-requests/settings)                                                                                                                                      |
| dataSubjects          | The Privacy Request data subject settings.                                                                    | Manage Data Subject Request Settings      | false      | [DSR Automation -> Request Settings](https://app.transcend.io/privacy-requests/settings)                                                                                                                                      |
| vendors               | The vendors in the data inventory.                                                                            | Manage Data Inventory                     | false      | [Data Inventory -> Vendors](https://app.transcend.io/data-map/data-inventory/vendors)                                                                                                                                         |
| dataCategories        | The data categories in the data inventory.                                                                    | Manage Data Inventory                     | false      | [Data Inventory -> Data Categories](https://app.transcend.io/data-map/data-inventory/data-categories)                                                                                                                         |
| processingPurposes    | The processing purposes in the data inventory.                                                                | Manage Data Inventory                     | false      | [Data Inventory -> Processing Purposes](https://app.transcend.io/data-map/data-inventory/purposes)                                                                                                                            |
| attributes            | Attribute definitions that define extra metadata for each table in the Admin Dashboard.                       | Manage Global Attributes                  | false      | [Infrastructure -> Attributes](https://app.transcend.io/infrastructure/attributes)                                                                                                                                            |
| dataFlows             | Consent Manager Data Flow definitions.                                                                        | Manage Data Flows                         | false      | [Consent Management -> Data Flows](https://app.transcend.io/consent-manager/data-flows/approved)                                                                                                                              |
| cookies               | Consent Manager Cookie definitions.                                                                           | Manage Data Flows                         | false      | [Consent Management -> Cookies](https://app.transcend.io/consent-manager/cookies/approved)                                                                                                                                    |
| consentManager        | Consent Manager general settings, including domain list.                                                      | Manage Consent Manager Developer Settings | false      | [Consent Management -> Developer Settings](https://app.transcend.io/consent-manager/developer-settings)                                                                                                                       |
| partitions            | The partitions in the account (often representative of separate data controllers).                            | Manage Consent Manager Developer Settings | false      | [Consent Management -> Developer Settings -> Advanced Settings](https://app.transcend.io/consent-manager/developer-settings/advanced-settings)                                                                                |
| prompts               | The Transcend AI prompts                                                                                      | View Prompts                              | false      | [Prompt Manager -> Browse](https://app.transcend.io/prompts/browse)                                                                                                                                                           |
| promptPartials        | The Transcend AI prompt partials                                                                              | Manage Prompts                            | false      | [Prompt Manager -> Partials](https://app.transcend.io/prompts/partialss)                                                                                                                                                      |
| promptGroups          | The Transcend AI prompt groups                                                                                | Manage Prompts                            | false      | [Prompt Manager -> Groups](https://app.transcend.io/prompts/groups)                                                                                                                                                           |
| agents                | The agents in the prompt manager.                                                                             | Manage Prompts                            | false      | [Prompt Manager -> Agents](https://app.transcend.io/prompts/agents)                                                                                                                                                           |
| agentFunctions        | The agent functions in the prompt manager.                                                                    | Manage Prompts                            | false      | [Prompt Manager -> Agent Functions](https://app.transcend.io/prompts/agent-functions)                                                                                                                                         |
| agentFiles            | The agent files in the prompt manager.                                                                        | Manage Prompts                            | false      | [Prompt Manager -> Agent Files](https://app.transcend.io/prompts/agent-files)                                                                                                                                                 |
| privacyCenters        | The privacy center configurations.                                                                            | Manage Privacy Center                     | false      | [Privacy Center](https://app.transcend.io/privacy-center/general-settings)                                                                                                                                                    |
| policies              | The privacy center policies.                                                                                  | Manage Policies                           | false      | [Privacy Center -> Policies](https://app.transcend.io/privacy-center/policies)                                                                                                                                                |
| messages              | Message definitions used across consent, privacy center, email templates and more.                            | Manage Internationalization Messages      | false      | [Privacy Center -> Messages](https://app.transcend.io/privacy-center/messages-internationalization), [Consent Management -> Display Settings -> Messages](https://app.transcend.io/consent-manager/display-settings/messages) |

#### Arguments

| Argument                   | Description                                                                                                 | Type                                                         | Default                  | Required |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------ | -------- |
| auth                       | The Transcend API key with the scopes necessary for the command.                                            | string (API key or path to tr-generate-api-keys JSON output) | N/A                      | true     |
| file                       | Path to the YAML file to push from                                                                          | string - file-path                                           | ./transcend.yml          | false    |
| transcendUrl               | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                               | string - URL                                                 | https://api.transcend.io | false    |
| pageSize                   | The page size to use when paginating over the API                                                           | number                                                       | 50                       | false    |
| variables                  | The variables to template into the YAML file when pushing configuration. e.g. domain:acme.com,stage:staging | string                                                       | N/A                      | false    |
| classifyService            | When true, automatically assign the service for a data flow based on the domain that is specified           | boolean                                                      | false                    | false    |
| deleteExtraAttributeValues | When true and syncing attributes, delete any extra attributes instead of just upserting                     | boolean                                                      | false                    | false    |

#### Usage

```sh
# Looks for file at ./transcend.yml
tr-push --auth=$TRANSCEND_API_KEY
```

An alternative file destination can be specified:

```sh
# Looks for file at custom location ./custom/location.yml
tr-push --auth=$TRANSCEND_API_KEY --file=./custom/location.yml
```

Push a single yml file configuration into multiple Transcend instances. This uses the output of [tr-generate-api-keys](#tr-generate-api-keys).

```sh
tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD \
   --scopes="View Email Templates,View Data Map" --apiKeyTitle="CLI Usage Cross Instance Sync" --file=./transcend-api-keys.json
tr-pull --auth=$TRANSCEND_API_KEY
tr-push --auth=./transcend-api-keys.json
```

Push multiple yml file configurations into multiple Transcend instances. This uses the output of [tr-generate-api-keys](#tr-generate-api-keys).

```sh
tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD \
   --scopes="View Email Templates,View Data Map" --apiKeyTitle="CLI Usage Cross Instance Sync" --file=./transcend-api-keys.json
tr-pull --auth=./transcend-api-keys.json --file=./transcend/
# <edit yml files in folder in between these steps>
tr-push --auth=./transcend-api-keys.json --file=./transcend/
```

Apply service classifier to all data flows.

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=dataFlows
tr-push --auth=$TRANSCEND_API_KEY --resources=dataFlows --classifyService=true
```

Push up attributes, deleting any attributes that are not specified in the transcend.yml file

```sh
tr-pull --auth=$TRANSCEND_API_KEY --resources=attributes
tr-push --auth=$TRANSCEND_API_KEY --resources=attributes --deleteExtraAttributeValues=true
```

Some things to note about this sync process:

1. Any field that is defined in your .yml file will be synced up to app.transcend.io. If any change was made on the admin dashboard, it will be overwritten.
2. If you omit a field from the YAML file, this field will not be synced. This gives you the ability to define as much or as little configuration in your transcend.yml file as you would like, and let the remainder of fields be labeled through the Admin Dashboard
3. If you define new data subjects, identifiers, data silos or datapoints that were not previously defined on the Admin Dashboard, the cli will create these new resources automatically.
4. Currently, this cli does not handle deleting or renaming of resources. If you need to delete or rename a data silo, identifier, enricher or API key, you should make the change on the Admin Dashboard.
5. The only resources that this cli will not auto generate are:

- a) Data silo owners: If you assign an email address to a data silo, you must first make sure that user is invited into your Transcend instance (https://app.transcend.io/admin/users).
- b) API keys: This cli will not create new API keys. You will need to first create the new API keys on the Admin Dashboard (https://app.transcend.io/infrastructure/api-keys). You can then list out the titles of the API keys that you generated in your transcend.yml file, after which the cli is capable of updating that API key to be able to respond to different data silos in your Data Map

#### CI Integration

Once you have a workflow for creating your transcend.yml file, you will want to integrate your `tr-push` command on your CI.

Below is an example of how to set this up using a Github action:

```yaml
name: Transcend Data Map Syncing
# See https://app.transcend.io/privacy-requests/connected-services

on:
  push:
    branches:
      - 'main'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install Transcend cli
        run: npm i -D @transcend-io/cli

      # If you have a script that generates your transcend.yml file from
      # an ORM or infrastructure configuration, add that step here
      # Leave this step commented out if you want to manage your transcend.yml manually
      # - name: Generate transcend.yml
      #   run: ./scripts/generate_transcend_yml.py

      - name: Push Transcend config
        run: npx tr-push --auth=${{ secrets.TRANSCEND_API_KEY }}
```

#### Dynamic Variables

If you are using this cli to sync your Data Map between multiple Transcend instances, you may find the need to make minor modifications to your configurations between environments. The most notable difference would be the domain where your webhook URLs are hosted on.

The `tr-push` command takes in a parameter `variables`. This is a CSV of `key:value` pairs.

```sh
tr-push --auth=$TRANSCEND_API_KEY --variables=domain:acme.com,stage:staging
```

This command could fill out multiple parameters in a YAML file like [./examples/multi-instance.yml](./examples/multi-instance.yml), copied below:

```yml
api-keys:
  - title: Webhook Key
enrichers:
  - title: Basic Identity Enrichment
    description: Enrich an email address to the userId and phone number
    # The data silo webhook URL is the same in each environment,
    # except for the base domain in the webhook URL.
    url: https://example.<<parameters.domain>>/transcend-enrichment-webhook
    input-identifier: email
    output-identifiers:
      - userId
      - phone
      - myUniqueIdentifier
  - title: Fraud Check
    description: Ensure the email address is not marked as fraudulent
    url: https://example.<<parameters.domain>>/transcend-fraud-check
    input-identifier: email
    output-identifiers:
      - email
    privacy-actions:
      - ERASURE
data-silos:
  - title: Redshift Data Warehouse
    integrationName: server
    description: The mega-warehouse that contains a copy over all SQL backed databases - <<parameters.stage>>
    url: https://example.<<parameters.domain>>/transcend-webhook
    api-key-title: Webhook Key
```

### tr-scan-packages

Transcend can scan your codebase to inventory your code packages and dependencies. Currently we support scanning for discovering packages and dependencies for the following frameworks:

- package.json
- requirements.txt & setup.py
- Podfile
- build.gradle
- pubspec.yaml
- Gemfile & .gemspec
- composer.json

The command will scan the folder you point at to look for any of these files. Once found, the build file will be parsed in search of dependencies. Those code packages and dependencies will be uploaded to [Transcend](https://app.transcend.io/code-scanning/code-packages). The only information shared with Transcend includes:

- repository name
- package names
- dependency names and versions
- package descriptions

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Manage Code Scanning

#### Arguments

| Argument     | Description                                                                   | Type         | Default                                                   | Required |
| ------------ | ----------------------------------------------------------------------------- | ------------ | --------------------------------------------------------- | -------- |
| auth         | Transcend API key.                                                            | string       | N/A                                                       | true     |
| scanPath     | File path in the project to scan.                                             | string       | ./                                                        | false    |
| ignoreDirs   | List of directories to ignore in scan                                         | string[]     | []                                                        | false    |
| packageName  | Name of the git repository that the package should be tied to                 | string       | $(`cd ${scanPath} && git config --get remote.origin.url`) | false    |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting. | string - URL | https://api.transcend.io                                  | false    |

#### Usage

Scan the current directory

```sh
yarn tr-scan-packages --auth=$TRANSCEND_API_KEY
```

Scan a specific directory

```sh
yarn tr-scan-packages --auth=$TRANSCEND_API_KEY --scanPath=./examples/
```

Ignore certain folders

```sh
yarn tr-scan-packages --auth=$TRANSCEND_API_KEY --ignoreDirs=./test,./build
```

Specify the name of the repository

```sh
yarn tr-scan-packages --auth=$TRANSCEND_API_KEY --repositoryName="transcend-io/test"
```

### tr-discover-silos

Transcend can help scan dependency management files to help detect new data silos where you may be storing user personal data. Currently we support scanning for new data silos in Javascript, Python, Gradle, and CocoaPods projects.

To get started, you'll need to add a data silo for the corresponding project type with "silo discovery" plugin enabled. For example, if you want to scan a JavaScript project, add a JavaScript package.json data silo. You can do this in the Transcend admin-dashboard (or via this CLI tooling).

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Manage Assigned Data Inventory
- [Data Silo for Scanner]

#### Arguments

| Argument   | Description                                                                                                                                                          | Type   | Default | Required |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | -------- |
| scanPath   | File path in the project to scan.                                                                                                                                    | string | N/A     | true     |
| dataSiloID | The UUID of the corresponding data silo.                                                                                                                             | string | N/A     | true     |
| auth       | Transcend API key.                                                                                                                                                   | string | N/A     | true     |
| fileGlobs  | You can pass a [glob syntax pattern(s)](https://github.com/mrmlnc/fast-glob) to specify additional file paths to scan in addition to the default (ex: package.json). | string | N/A     | false    |

#### Usage

Then, you'll need to grab that `dataSiloId` and a Transcend API key and pass it to the CLI. Using JavaScript package.json as an example:

```sh
# Scan a javascript project (package.json files) to look for new data silos
yarn tr-discover-silos --scanPath=./myJavascriptProject --auth={{api_key}} ---dataSiloId=abcdefg
```

Here are some examples of a [Podfile](./examples/Podfile) and [gradle file](./examples/build.gradle). These are scanned like:

```sh
yarn tr-discover-silos --scanPath=./examples/ --auth=$TRANSCEND_API_KEY ---dataSiloId=b6776589-0b7d-466f-8aad-4378ffd3a321
```

This call will look for all the package.json files that in the scan path `./myJavascriptProject`, parse each of the dependencies into their individual package names, and send it to our Transcend backend for classification. These classifications can then be viewed [here](https://app.transcend.io/data-map/data-inventory/silo-discovery/triage). The process is the same for scanning requirements.txt, podfiles and build.gradle files.

You can include additional arguments as well:

### tr-request-approve

Bulk approve a set of privacy requests from the [DSR Automation -> Incoming Requests](https://app.transcend.io/privacy-requests/incoming-requests) tab.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Request Approval and Communication
- View Incoming Requests
- Manage Request Compilation

#### Arguments

| Argument         | Description                                                                                                                                | Type            | Default                  | Required |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- | ------------------------ | -------- |
| auth             | The Transcend API key with the scopes necessary for the command.                                                                           | string          | N/A                      | true     |
| actions          | The [request actions](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to approve. | RequestAction[] | N/A                      | true     |
| origins          | The [request origins](https://github.com/transcend-io/privacy-types/blob/main/src/request.ts) to approve.                                  | RequestOrigin[] | N/A                      | false    |
| silentModeBefore | Any requests made before this date should be marked as silent mode                                                                         | Date            | N/A                      | false    |
| createdAtBefore  | Approve requests that were submitted before this time                                                                                      | Date            | N/A                      | false    |
| createdAtAfter   | Approve requests that were submitted after this time                                                                                       | Date            | N/A                      | false    |
| transcendUrl     | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                              | string - URL    | https://api.transcend.io | false    |
| concurrency      | The concurrency to use when uploading requests in parallel.                                                                                | number          | 50                       | false    |

#### Usage

Bulk approve all SALE_OPT_OUT and ERASURE requests

```sh
yarn tr-request-approve --auth=$TRANSCEND_API_KEY --actions=SALE_OPT_OUT,ERASURE
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-request-approve --auth=$TRANSCEND_API_KEY --actions=ERASURE --transcendUrl=https://api.us.transcend.io
```

Approve all Erasure requests that came through the API

```sh
yarn tr-request-approve --auth=$TRANSCEND_API_KEY --actions=ERASURE --origins=API
```

Approve all requests, but mark any request made before 05/03/2023 as silent mode to prevent emailing those requests. When not provided, the existing silent mode state of that request will be used to determine if emails are sent.

```sh
yarn tr-request-approve --auth=$TRANSCEND_API_KEY --actions=SALE_OPT_OUT --silentModeBefore=05/03/2023
```

Increase the concurrency (defaults to 50)

```sh
yarn tr-request-approve --auth=$TRANSCEND_API_KEY --actions=ERASURE --concurrency=100
```

Approve ERASURE requests created within a specific time frame

```sh
yarn tr-request-approve --auth=$TRANSCEND_API_KEY --actions=SALE_OPT_OUT --createdAtBefore=05/03/2023 --createdAtAfter=04/03/2023
```

### tr-request-cancel

Bulk cancel a set of privacy requests from the [DSR Automation -> Incoming Requests](https://app.transcend.io/privacy-requests/incoming-requests) tab.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Request Approval and Communication
- View Incoming Requests

#### Arguments

| Argument          | Description                                                                                                                                                                                        | Type            | Default                                                                                  | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------- | -------- |
| auth              | The Transcend API key with the scopes necessary for the command.                                                                                                                                   | string          | N/A                                                                                      | true     |
| actions           | The [request actions](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to cancel.                                                          | RequestAction[] | N/A                                                                                      | true     |
| statuses          | The [request statuses](https://docs.transcend.io/docs/privacy-requests/overview#request-statuses) to cancel.                                                                                       | RequestStatus[] | REQUEST_MADE,WAITING,ENRICHING,COMPILING,DELAYED,APPROVING,SECONDARY,SECONDARY_APPROVING | false    |
| requestIds        | Specify the specific request IDs to cancel                                                                                                                                                         | string[]        | []                                                                                       | false    |
| silentModeBefore  | Any requests made before this date should be marked as silent mode for canceling to skip email sending                                                                                             | Date            | N/A                                                                                      | false    |
| createdAtBefore   | Cancel requests that were submitted before this time                                                                                                                                               | Date            | N/A                                                                                      | false    |
| createdAtAfter    | Cancel requests that were submitted after this time                                                                                                                                                | Date            | N/A                                                                                      | false    |
| cancellationTitle | The title of the [email template](https://app.transcend.io/privacy-requests/email-templates) that should be sent to the requests upon cancelation. Any request in silent mode will not be emailed. | string          | Request Canceled                                                                         | false    |
| transcendUrl      | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                                                                                      | string - URL    | https://api.transcend.io                                                                 | false    |
| concurrency       | The concurrency to use when uploading requests in parallel.                                                                                                                                        | number          | 50                                                                                       | false    |

#### Usage

Bulk cancel all open SALE_OPT_OUT and ERASURE requests.

```sh
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY --actions=SALE_OPT_OUT,ERASURE
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY --actions=ERASURE --transcendUrl=https://api.us.transcend.io
```

Bulk cancel all Erasure (request.type=ERASURE) requests that are in an enriching state (request.status=ENRICHING)

```sh
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY --actions=ERASURE --statuses=ENRICHING
```

Bulk cancel requests by ID

```sh
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY --actions=ACCESS,ERASURE,SALE_OPT_OUT,CONTACT_OPT_OUT --statuses=ENRICHING,COMPILING,APPROVING,WAITING,REQUEST_MADE,ON_HOLD,DELAYED,SECONDARY \
  --requestIds=c3ae78c9-2768-4666-991a-d2f729503337,342e4bd1-64ea-4af0-a4ad-704b5a07cfe4
```

Send a specific email template to the request that are being canceled. When not provided, the default cancellation template is used ("Request Canceled").

```sh
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY --actions=ERASURE --cancellationTitle="Custom Email Template"
```

Cancel all open SALE_OPT_OUT, but mark any request made before 05/03/2023 as silent mode to prevent emailing those requests. When not provided, the existing silent mode state of that request will be used to determine if emails are sent.

```sh
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY --actions=SALE_OPT_OUT --silentModeBefore=05/03/2023
```

Cancel all open SALE_OPT_OUT, within a specific time frame

```sh
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY --actions=SALE_OPT_OUT --createdAtBefore=05/03/2023 --createdAtAfter=04/03/2023
```

Increase the concurrency (defaults to 50)

```sh
yarn tr-request-cancel --auth=$TRANSCEND_API_KEY --actions=ERASURE --concurrency=500
```

### tr-request-notify-additional-time

Bulk notify a set of privacy requests from the [DSR Automation -> Incoming Requests](https://app.transcend.io/privacy-requests/incoming-requests) tab that more time is needed to complete the request. Note any request in silent mode will not be emailed.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Request Approval and Communication
- View Incoming Requests

#### Arguments

| Argument        | Description                                                                                                                                                                            | Type            | Default                  | Required |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------ | -------- |
| auth            | The Transcend API key with the scopes necessary for the command.                                                                                                                       | string          | N/A                      | true     |
| createdAtBefore | Notify requests that are open but submitted before this time                                                                                                                           | Date            | N/A                      | true     |
| createdAtAfter  | Notify requests that are open but submitted after this time.                                                                                                                           | Date            | now()                    | false    |
| actions         | The [request actions](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to notify.                                              | RequestAction[] | RequestAction[]          | false    |
| daysLeft        | Only notify requests that have less than this number of days until they are considered expired. This allows for re-running the command without notifying the same users multiple times | number          | 10                       | false    |
| days            | The number of days to adjust the expiration of the request to                                                                                                                          | number          | 45                       | false    |
| requestIds      | Specify the specific request IDs to notify                                                                                                                                             | string[]        | []                       | false    |
| emailTemplate   | The title of the [email template](https://app.transcend.io/privacy-requests/email-templates) that should be sent to the requests.                                                      | string          | Additional Time Needed   | false    |
| transcendUrl    | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                                                                          | string - URL    | https://api.transcend.io | false    |
| concurrency     | The concurrency to use when uploading requests in parallel.                                                                                                                            | number          | 50                       | false    |

#### Usage

Notify all request types that were made before 01/01/2024

```sh
yarn tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024
```

Notify all request types that were made during a date range

```sh
yarn tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024  --createdAtAfter=12/15/2023
```

Notify certain request types

```sh
yarn tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024 --actions=SALE_OPT_OUT,ERASURE
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn  tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024 --transcendUrl=https://api.us.transcend.io
```

Bulk notify requests by ID

```sh
yarn  tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024 \
  --requestIds=c3ae78c9-2768-4666-991a-d2f729503337,342e4bd1-64ea-4af0-a4ad-704b5a07cfe4
```

Only notify requests that are expiring in the next 3 days or less

```sh
yarn tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024 --daysLeft=3
```

Change number of days to extend request by

```sh
yarn tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024 --days=30
```

Send a specific email template to the request that instead of the default

```sh
yarn  tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024 --emailTemplate="Custom Email Template"
```

Increase the concurrency (defaults to 50)

```sh
yarn tr-request-notify-additional-time --auth=$TRANSCEND_API_KEY --createdAtBefore=01/01/2024 --concurrency=500
```

### tr-request-mark-silent

Bulk update a set of privacy requests from the [DSR Automation -> Incoming Requests](https://app.transcend.io/privacy-requests/incoming-requests) tab to be in silent mode.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Manage Request Compilation

#### Arguments

| Argument        | Description                                                                                                                                    | Type            | Default                                                                                  | Required |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------- | -------- |
| auth            | The Transcend API key with the scopes necessary for the command.                                                                               | string          | N/A                                                                                      | true     |
| actions         | The [request actions](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to mark silent. | RequestAction[] | N/A                                                                                      | true     |
| statuses        | The [request statuses](https://docs.transcend.io/docs/privacy-requests/overview#request-statuses) to mark silent.                              | RequestStatus[] | REQUEST_MADE,WAITING.ENRICHING,COMPILING,DELAYED,APPROVING,SECONDARY,SECONDARY_APPROVING | false    |
| requestIds      | Specify the specific request IDs to mark silent                                                                                                | string[]        | []                                                                                       | false    |
| createdAtBefore | Mark silent requests that were submitted before this time                                                                                      | Date            | N/A                                                                                      | false    |
| createdAtAfter  | Mark silent requests that were submitted after this time                                                                                       | Date            | N/A                                                                                      | false    |
| transcendUrl    | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                                  | string - URL    | https://api.transcend.io                                                                 | false    |
| concurrency     | The concurrency to use when uploading requests in parallel.                                                                                    | number          | 50                                                                                       | false    |

#### Usage

Bulk mark silent all open SALE_OPT_OUT and ERASURE requests.

```sh
yarn tr-request-mark-silent --auth=$TRANSCEND_API_KEY --actions=SALE_OPT_OUT,ERASURE
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-request-mark-silent --auth=$TRANSCEND_API_KEY --actions=ERASURE --transcendUrl=https://api.us.transcend.io
```

Bulk mark as silent all Erasure (request.type=ERASURE) requests that are in an enriching state (request.status=ENRICHING)

```sh
yarn tr-request-mark-silent --auth=$TRANSCEND_API_KEY --actions=ERASURE --statuses=ENRICHING
```

Bulk mark as silent requests by ID

```sh
yarn tr-request-mark-silent --auth=$TRANSCEND_API_KEY --actions=ACCESS,ERASURE,SALE_OPT_OUT,CONTACT_OPT_OUT --statuses=ENRICHING,COMPILING,APPROVING,WAITING,REQUEST_MADE,ON_HOLD,DELAYED,SECONDARY \
  --requestIds=c3ae78c9-2768-4666-991a-d2f729503337,342e4bd1-64ea-4af0-a4ad-704b5a07cfe4
```

Mark sale opt out requests as silent within a certain date range

```sh
yarn tr-request-mark-silent --auth=$TRANSCEND_API_KEY --actions=SALE_OPT_OUT --createdAtBefore=05/03/2023 --createdAtAfter=04/03/2023
```

Increase the concurrency (defaults to 50)

```sh
yarn tr-request-mark-silent --auth=$TRANSCEND_API_KEY --actions=ERASURE --concurrency=500
```

### tr-request-upload

If you need to upload a set of requests from a CSV, you can run this command.
This command uses [inquirer](https://github.com/SBoudrias/Inquirer.js/) to prompt the user to
map the shape of the CSV to the shape of the Transcend API. There is no requirement for the
shape of the incoming CSV, as the script will handle the mapping process.

The script will also produce a JSON cache file, that allows for the mappings to be preserved between runs.
This can be useful if you have the same CSV shape that needs to be imported multiple times.
Once the mapping process is done once, it does not need to be done again.

Additionally, the JSON cache file will store the result of any privacy requests that fail to be uploaded.
This allows for the script to continue uploading requests even if some requests error out. The script
user can then inspect the errors, and decide whether it is necessary to re-run those requests.

https://user-images.githubusercontent.com/10264973/205477183-d4762087-668c-43f1-a84c-0fce0ec3e132.mov

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Submit New Data Subject Request
- View Identity Verification Settings
- View Global Attributes

#### Arguments

| Argument                | Description                                                                                                             | Type               | Default                                 | Required |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------------------------------- | -------- |
| auth                    | The Transcend API key with the scopes necessary for the command.                                                        | string             | N/A                                     | true     |
| file                    | Path to the CSV file of requests to tupload.                                                                            | string - file-path | ./requests.csv                          | false    |
| transcendUrl            | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                           | string - URL       | https://api.transcend.io                | false    |
| cacheFilepath           | The path to the JSON file encoding the metadata used to map the CSV shape to Transcend API.                             | string             | ./transcend-privacy-requests-cache.json | false    |
| requestReceiptFolder    | The path to the folder where receipts of each upload are stored. This allows for debugging of errors.                   | string             | ./privacy-request-upload-receipts       | false    |
| sombraAuth              | The sombra internal key, use for additional authentication when self-hosting sombra.                                    | string             | N/A                                     | false    |
| concurrency             | The concurrency to use when uploading requests in parallel.                                                             | number             | 50                                      | false    |
| attributes              | Tag all of the requests with the following attributes. Format: key1:value1;value2,key2:value3;value4                    | string             | Tags:transcend-cli                      | false    |
| isTest                  | Flag whether the requests being uploaded are test requests or regular requests.                                         | boolean            | false                                   | false    |
| isSilent                | Flag whether the requests being uploaded should be submitted in silent mode.                                            | boolean            | true                                    | false    |
| skipSendingReceipt      | Flag whether to skip sending of the receipt email                                                                       | boolean            | false                                   | false    |
| emailIsVerified         | Indicate whether the email address being uploaded is pre-verified. Set to false to send a verification email.           | boolean            | true                                    | false    |
| skipFilterStep          | When true, skip the interactive step to filter down the CSV.                                                            | boolean            | false                                   | false    |
| dryRun                  | When true, perform a dry run of the upload instead of calling the API to submit the requests.                           | boolean            | false                                   | false    |
| debug                   | Debug logging.                                                                                                          | boolean            | false                                   | false    |
| defaultPhoneCountryCode | When uploading phone numbers, if the phone number is missing a country code, assume this country code. Defaults to USA. | string             | 1                                       | false    |

#### Usage

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv
```

For self-hosted sombras that use an internal key:

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --sombraAuth=$SOMBRA_INTERNAL_KEY --file=/Users/transcend/Desktop/test.csv
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --sombraAuth=$SOMBRA_INTERNAL_KEY --file=/Users/transcend/Desktop/test.csv \
 --transcendUrl=https://api.us.transcend.io
```

Run without being prompted to filter requests

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv --skipFilterStep=true
```

Perform a dry run to see what will be uploaded, without calling the Transcend API to upload the request

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv --dryRun=true
```

Mark the uploaded requests as test requests

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv --isTest=true
```

Send email communications to the users throughout the request lifecycle.

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv --isSilent=false
```

Upload requests without sending initial email receipt, but still send later emails

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv --skipSendingReceipt=true
```

Send email verification to user before request continues.

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv \
   --isSilent=false --emailIsVerified=false
```

Increase the concurrency (defaults to 50)

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv --concurrency=100
```

Tag all uploaded requests with an attribute

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv \
  --attributes=Tags:transcend-cli;my-customer-tag,Customer:acme-corp
```

Specify default country code for phone numbers

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv --defaultPhoneCountryCode=44
```

Include debug logs - warning, this logs out personal data.

```sh
yarn tr-request-upload --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv --debug=true
```

### tr-request-restart

Bulk update a set of privacy requests based on a set of request filters.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Submit New Data Subject Request
- View the Request Compilation

#### Arguments

| Argument             | Description                                                                                                                               | Type            | Default                           | Required |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------- | -------- |
| auth                 | The Transcend API key with the scopes necessary for the command.                                                                          | string          | N/A                               | true     |
| actions              | The [request action](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to restart. | RequestAction[] | N/A                               | true     |
| statuses             | The [request statuses](https://docs.transcend.io/docs/privacy-requests/overview#request-statuses) to restart.                             | RequestStatus[] | N/A                               | true     |
| transcendUrl         | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                             | string - URL    | https://api.transcend.io          | false    |
| requestReceiptFolder | The path to the folder where receipts of each upload are stored. This allows for debugging of errors.                                     | string          | ./privacy-request-upload-receipts | false    |
| sombraAuth           | The sombra internal key, use for additional authentication when self-hosting sombra. Only required when `copyIdentifiers` flag used.      | string          | N/A                               | false    |
| concurrency          | The concurrency to use when uploading requests in parallel.                                                                               | number          | 15                                | false    |
| requestIds           | Specify the specific request IDs to restart                                                                                               | string[]        | []                                | false    |
| emailIsVerified      | Indicate whether the primary email address is verified. Set to false to send a verification email.                                        | boolean         | true                              | false    |
| createdAt            | Restart requests that were submitted before a specific date.                                                                              | Date            | Date.now()                        | false    |
| silentModeBefore     | Requests older than this date should be marked as silent mode                                                                             | Date            | N/A                               | false    |
| createdAtBefore      | Restart requests that were submitted before this time                                                                                     | Date            | N/A                               | false    |
| createdAtAfter       | Restart requests that were submitted after this time                                                                                      | Date            | N/A                               | false    |
| sendEmailReceipt     | Send email receipts to the restarted requests                                                                                             | boolean         | false                             | false    |
| copyIdentifiers      | Copy over all enriched identifiers from the initial request. Leave false to restart from scratch with initial identifiers only.           | boolean         | false                             | false    |
| skipWaitingPeriod    | Skip queued state of request and go straight to compiling                                                                                 | boolean         | false                             | false    |

#### Usage

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE
```

For self-hosted sombras that use an internal key:

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --sombraAuth=$SOMBRA_INTERNAL_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --sombraAuth=$SOMBRA_INTERNAL_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE \
 --transcendUrl=https://api.us.transcend.io
```

Increase the concurrency (defaults to 20)

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE --concurrency=100
```

Re-verify emails

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE --emailIsVerified=false
```

Restart specific requests by ID

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE --requestIds=c3ae78c9-2768-4666-991a-d2f729503337,342e4bd1-64ea-4af0-a4ad-704b5a07cfe4
```

Restart requests that were submitted before a specific date.

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE --createdAt=2022-05-11T00:46
```

Restart requests and place everything in silent mode submitted before a certain date

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE --silentModeBefore=2022-12-05T00:46
```

Restart requests within a specific timeframe

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE ---createdAtBefore="04/05/2023" --createdAtAfter="02/21/2023"
```

Send email receipts to the restarted requests

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE --sendEmailReceipt=true
```

Copy over all enriched identifiers from the initial request. Leave false to restart from scratch with initial identifiers only

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE --copyIdentifiers=true
```

Skip queued state of request and go straight to compiling

```sh
yarn tr-request-restart --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE --skipWaitingPeriod=true
```

### tr-request-enricher-restart

Bulk restart a particular enricher across a series of DSRs.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Manage Request Compilation

#### Arguments

| Argument                | Description                                                                                                                               | Type                    | Default                  | Required |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------ | -------- |
| auth                    | The Transcend API key with the scopes necessary for the command.                                                                          | string                  | N/A                      | true     |
| enricherId              | The ID of the enricher to restart                                                                                                         | string                  | N/A                      | true     |
| actions                 | The [request action](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to restart. | RequestAction[]         | N/A                      | false    |
| requestEnricherStatuses | The [request enricher statuses](https://github.com/transcend-io/privacy-types/blob/main/src/request.ts#L157) to restart.                  | RequestEnricherStatus[] | N/A                      | false    |
| transcendUrl            | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                             | string - URL            | https://api.transcend.io | false    |
| concurrency             | The concurrency to use when uploading requests in parallel.                                                                               | number                  | 15                       | false    |
| requestIds              | Specify the specific request IDs to restart                                                                                               | string[]                | []                       | false    |
| createdAtBefore         | Restart requests that were submitted before this time                                                                                     | Date                    | N/A                      | false    |
| createdAtAfter          | Restart requests that were submitted after this time                                                                                      | Date                    | N/A                      | false    |

#### Usage

```sh
yarn tr-request-enricher-restart --auth=$TRANSCEND_API_KEY --enricherId=3be5e898-fea9-4614-84de-88cd5265c557
```

Restart specific request types

```sh
yarn tr-request-enricher-restart --auth=$TRANSCEND_API_KEY ---enricherId=3be5e898-fea9-4614-84de-88cd5265c557 --actions=ACCESS,ERASURE
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-request-enricher-restart --auth=$TRANSCEND_API_KEY ---enricherId=3be5e898-fea9-4614-84de-88cd5265c557 --transcendUrl=https://api.us.transcend.io
```

Increase the concurrency (defaults to 20)

```sh
yarn tr-request-enricher-restart --auth=$TRANSCEND_API_KEY ---enricherId=3be5e898-fea9-4614-84de-88cd5265c557 --concurrency=100
```

Restart requests within a specific timeframe

```sh
yarn tr-request-enricher-restart --auth=$TRANSCEND_API_KEY --enricherId=3be5e898-fea9-4614-84de-88cd5265c557 ---createdAtBefore="04/05/2023" --createdAtAfter="02/21/2023"
```

Restart requests that are in an error state

```sh
yarn tr-request-enricher-restart --auth=$TRANSCEND_API_KEY --enricherId=3be5e898-fea9-4614-84de-88cd5265c557 ---requestEnricherStatuses=ERROR
```

### tr-request-reject-unverified-identifiers

Bulk clear out any request identifiers that are unverified

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Manage Request Compilation

#### Arguments

| Argument        | Description                                                                                                                               | Type            | Default                  | Required |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------ | -------- |
| auth            | The Transcend API key with the scopes necessary for the command.                                                                          | string          | N/A                      | true     |
| identifierNames | The names of identifiers to clear out                                                                                                     | string[]        | N/A                      | true     |
| actions         | The [request action](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to restart. | RequestAction[] | N/A                      | false    |
| transcendUrl    | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                             | string - URL    | https://api.transcend.io | false    |

#### Usage

```sh
yarn tr-request-reject-unverified-identifiers --auth=$TRANSCEND_API_KEY --identifierNames=phone
```

Restart specific request types

```sh
yarn tr-request-reject-unverified-identifiers --auth=$TRANSCEND_API_KEY --identifierNames=phone --actions=ACCESS,ERASURE
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-request-reject-unverified-identifiers --auth=$TRANSCEND_API_KEY --identifierNames=phone --transcendUrl=https://api.us.transcend.io
```

### tr-request-export

Export privacy requests and request identifiers to a CSV file.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- View Incoming Requests
- View the Request Compilation

#### Arguments

| Argument        | Description                                                                                                                               | Type               | Default                        | Required |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------ | -------- |
| auth            | The Transcend API key with the scopes necessary for the command.                                                                          | string             | N/A                            | true     |
| sombraAuth      | The sombra internal key, use for additional authentication when self-hosting sombra.                                                      | string             | N/A                            | false    |
| actions         | The [request action](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to restart. | RequestAction[]    | N/A                            | false    |
| statuses        | The [request statuses](https://docs.transcend.io/docs/privacy-requests/overview#request-statuses) to restart.                             | RequestStatus[]    | N/A                            | false    |
| transcendUrl    | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                             | string - URL       | https://api.transcend.io       | false    |
| file            | Path to the CSV file where identifiers will be written to.                                                                                | string - file-path | ./transcend-request-export.csv | false    |
| concurrency     | The concurrency to use when uploading requests in parallel.                                                                               | number             | 100                            | false    |
| createdAtBefore | Pull requests that were submitted before this time                                                                                        | Date               | N/A                            | false    |
| createdAtAfter  | Pull requests that were submitted after this time                                                                                         | Date               | N/A                            | false    |
| showTests       | Filter for test requests or production requests - when not provided, pulls both                                                           | boolean            | N/A                            | false    |

#### Usage

Pull all requests:

```sh
yarn tr-request-export --auth=$TRANSCEND_API_KEY
```

Filter for specific actions and statuses:

```sh
yarn tr-request-export --auth=$TRANSCEND_API_KEY --statuses=COMPILING,ENRICHING --actions=ACCESS,ERASURE
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-request-export --auth=$TRANSCEND_API_KEY --transcendUrl=https://api.us.transcend.io
```

With Sombra authentication

```sh
yarn tr-request-export --auth=$TRANSCEND_API_KEY --sombraAuth=$SOMBRA_INTERNAL_KEY
```

Increase the concurrency (defaults to 100)

```sh
yarn tr-request-export --auth=$TRANSCEND_API_KEY --concurrency=500
```

Filter for production requests only

```sh
yarn tr-request-export --auth=$TRANSCEND_API_KEY --showTests=false
```

Filter for requests within a date range

```sh
yarn tr-request-export --auth=$TRANSCEND_API_KEY --createdAtBefore="04/05/2023" --createdAtAfter="02/21/2023"
```

Write to a specific file location

```sh
yarn tr-request-export --auth=$TRANSCEND_API_KEY --file=./path/to/file.csv
```

### tr-cron-pull-identifiers

If you are using the cron job integration, you can run this command to pull the outstanding identifiers
for the data silo to a CSV.

Read more at https://docs.transcend.io/docs/integrations/cron-job-integration.

https://user-images.githubusercontent.com/10264973/205483055-f4050645-bdf5-4ea2-8464-3183abd63074.mov

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must be associated to the ID of the integration/data silo that is being operated on.

#### Arguments

| Argument     | Description                                                                                                                               | Type               | Default                  | Required |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------ | -------- |
| auth         | The Transcend API key with the scopes necessary for the command.                                                                          | string             | N/A                      | true     |
| dataSiloId   | The ID of the data silo to pull in.                                                                                                       | string - UUID      | N/A                      | true     |
| actions      | The [request action](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to restart. | RequestAction[]    | N/A                      | true     |
| file         | Path to the CSV file where identifiers will be written to.                                                                                | string - file-path | ./cron-identifiers.csv   | false    |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                             | string - URL       | https://api.transcend.io | false    |
| sombraAuth   | The sombra internal key, use for additional authentication when self-hosting sombra.                                                      | string             | N/A                      | false    |
| pageLimit    | The page limit to use when pulling in pages of identifiers.                                                                               | number             | 100                      | false    |

#### Usage

```sh
yarn tr-cron-pull-identifiers --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --actions=ERASURE
```

Pull to a specific file location

```sh
yarn tr-cron-pull-identifiers --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --actions=ERASURE \
   --file=/Users/transcend/Desktop/test.csv
```

For self-hosted sombras that use an internal key:

```sh
yarn tr-cron-pull-identifiers --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --actions=ERASURE  \
   --sombraAuth=$SOMBRA_INTERNAL_KEY
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-cron-pull-identifiers --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --actions=ERASURE \
 --transcendUrl=https://api.us.transcend.io
```

Specifying the page limit, defaults to 100.

```sh
yarn tr-cron-pull-identifiers --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --actions=ERASURE \
 --pageLimit=300
```

### tr-cron-mark-identifiers-completed

This command takes the output of `tr-cron-pull-identifiers` and notifies Transcend that all of the requests in the CSV have been processed.
This is used in the workflow like:

1. Pull identifiers to CSV:
   `yarn tr-cron-pull-identifiers --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --actions=ERASURE --file=./outstanding-requests.csv`
2. Run your process to operate on that CSV of requests.
3. Notify Transcend of completion
   `yarn tr-cron-mark-identifiers-completed --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --file=./outstanding-requests.csv`

Read more at https://docs.transcend.io/docs/integrations/cron-job-integration.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must be associated to the ID of the integration/data silo that is being operated on.

#### Arguments

| Argument     | Description                                                                          | Type               | Default                  | Required |
| ------------ | ------------------------------------------------------------------------------------ | ------------------ | ------------------------ | -------- |
| auth         | The Transcend API key with the scopes necessary for the command.                     | string             | N/A                      | true     |
| dataSiloId   | The ID of the data silo to pull in.                                                  | string - UUID      | N/A                      | true     |
| file         | Path to the CSV file where identifiers will be written to.                           | string - file-path | ./cron-identifiers.csv   | false    |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.        | string - URL       | https://api.transcend.io | false    |
| sombraAuth   | The sombra internal key, use for additional authentication when self-hosting sombra. | string             | N/A                      | false    |

#### Usage

```sh
yarn tr-cron-mark-identifiers-completed --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f
```

Pull to a specific file location

```sh
yarn tr-cron-mark-identifiers-completed --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f \
   --file=/Users/transcend/Desktop/test.csv
```

For self-hosted sombras that use an internal key:

```sh
yarn tr-cron-mark-identifiers-completed --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f \
   --sombraAuth=$SOMBRA_INTERNAL_KEY
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-cron-mark-identifiers-completed --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f \
 --transcendUrl=https://api.us.transcend.io
```

### tr-manual-enrichment-pull-identifiers

This command pulls down the set of privacy requests that are currently pending manual enrichment.

This is useful for the following workflow:

1. Pull identifiers to CSV:
   `yarn tr-manual-enrichment-pull-identifiers --file=./enrichment-requests.csv`
2. Fill out the CSV with additional identifiers
3. Push updated back to Transcend
   `yarn tr-manual-enrichment-push-identifiers --file=./enrichment-requests.csv`

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- View Incoming Requests
- View the Request Compilation

#### Arguments

| Argument     | Description                                                                                                                                | Type               | Default                             | Required |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----------------------------------- | -------- |
| auth         | The Transcend API key with the scopes necessary for the command.                                                                           | string             | N/A                                 | true     |
| sombraAuth   | The sombra internal key, use for additional authentication when self-hosting sombra.                                                       | string             | N/A                                 | false    |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                              | string - URL       | https://api.transcend.io            | false    |
| file         | Path to the CSV file where requests will be written to.                                                                                    | string - file-path | ./manual-enrichment-identifiers.csv | false    |
| actions      | The [request action](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to pull for. | RequestAction[]    | N/A                                 | false    |

| concurrency | The concurrency to use when uploading requests in parallel. | number | 100 | false |

#### Usage

```sh
yarn tr-manual-enrichment-pull-identifiers --auth=$TRANSCEND_API_KEY
```

Pull to a specific file location

```sh
yarn tr-manual-enrichment-pull-identifiers --auth=$TRANSCEND_API_KEY --file=/Users/transcend/Desktop/test.csv
```

For specific types of requests

```sh
yarn tr-manual-enrichment-pull-identifiers --auth=$TRANSCEND_API_KEY --actions=ACCESS,ERASURE
```

For US hosted infrastructure

```sh
yarn tr-manual-enrichment-pull-identifiers --auth=$TRANSCEND_API_KEY --transcendUrl=https://api.us.transcend.io
```

With Sombra authentication

```sh
yarn tr-manual-enrichment-pull-identifiers --auth=$TRANSCEND_API_KEY --sombraAuth=$SOMBRA_INTERNAL_KEY
```

With specific concurrency

```sh
yarn tr-manual-enrichment-pull-identifiers --auth=$TRANSCEND_API_KEY --concurrency=200
```

### tr-manual-enrichment-push-identifiers

This command push up a set of identifiers for a set of requests pending manual enrichment.

This is useful for the following workflow:

1. Pull identifiers to CSV:
   `yarn tr-manual-enrichment-pull-identifiers --file=./enrichment-requests.csv`
2. Fill out the CSV with additional identifiers
3. Push updated back to Transcend
   `yarn tr-manual-enrichment-push-identifiers --file=./enrichment-requests.csv`

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "Manage Request Identity Verification"
- "Manage Request Compilation" (only when specifying `silentModeBefore`)

#### Arguments

| Argument         | Description                                                                          | Type               | Default                             | Required |
| ---------------- | ------------------------------------------------------------------------------------ | ------------------ | ----------------------------------- | -------- |
| auth             | The Transcend API key with the scopes necessary for the command.                     | string             | N/A                                 | true     |
| enricherId       | The ID of the Request Enricher to upload to                                          | string - UUID      | N/A                                 | true     |
| sombraAuth       | The sombra internal key, use for additional authentication when self-hosting sombra. | string             | N/A                                 | false    |
| transcendUrl     | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.        | string - URL       | https://api.transcend.io            | false    |
| file             | Path to the CSV file where requests will be written to.                              | string - file-path | ./manual-enrichment-identifiers.csv | false    |
| silentModeBefore | When true, set requests into silent mode before enriching                            | boolean            | false                               | false    |
| concurrency      | The concurrency to use when uploading requests in parallel.                          | number             | 100                                 | false    |

#### Usage

```sh
yarn tr-manual-enrichment-push-identifiers --auth=$TRANSCEND_API_KEY --enricherId=27d45a0d-7d03-47fa-9b30-6d697005cfcf
```

Pull to a specific file location

```sh
yarn tr-manual-enrichment-push-identifiers --auth=$TRANSCEND_API_KEY --enricherId=27d45a0d-7d03-47fa-9b30-6d697005cfcf --file=/Users/transcend/Desktop/test.csv
```

For US hosted infrastructure

```sh
yarn tr-manual-enrichment-push-identifiers --auth=$TRANSCEND_API_KEY --enricherId=27d45a0d-7d03-47fa-9b30-6d697005cfcf --transcendUrl=https://api.us.transcend.io
```

With Sombra authentication

```sh
yarn tr-manual-enrichment-push-identifiers --auth=$TRANSCEND_API_KEY --enricherId=27d45a0d-7d03-47fa-9b30-6d697005cfcf --sombraAuth=$SOMBRA_INTERNAL_KEY
```

With specific concurrency

```sh
yarn tr-manual-enrichment-push-identifiers --auth=$TRANSCEND_API_KEY --enricherId=27d45a0d-7d03-47fa-9b30-6d697005cfcf --concurrency=200
```

When enriching requests, mark all requests as silent mode before processing

```sh
yarn tr-manual-enrichment-push-identifiers --auth=$TRANSCEND_API_KEY --enricherId=27d45a0d-7d03-47fa-9b30-6d697005cfcf --silentModeBefore=true
```

### tr-mark-request-data-silos-completed

This command takes in a CSV of Request IDs as well as a Data Silo ID and marks all associated privacy request jobs as completed.
This command is useful with the "Bulk Response" UI. The CSV is expected to have 1 column named "Request Id".

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "Manage Request Compilation"

#### Arguments

| Argument     | Description                                                                   | Type               | Default                   | Required |
| ------------ | ----------------------------------------------------------------------------- | ------------------ | ------------------------- | -------- |
| auth         | The Transcend API key with the scopes necessary for the command.              | string             | N/A                       | true     |
| dataSiloId   | The ID of the data silo to pull in.                                           | string - UUID      | N/A                       | true     |
| file         | Path to the CSV file where identifiers will be written to.                    | string - file-path | ./request-identifiers.csv | false    |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting. | string - URL       | https://api.transcend.io  | false    |

#### Usage

```sh
yarn tr-mark-request-data-silos-completed --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f
```

Pull to a specific file location

```sh
yarn tr-mark-request-data-silos-completed --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f \
   --file=/Users/transcend/Desktop/test.csv
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-mark-request-data-silos-completed --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f \
 --transcendUrl=https://api.us.transcend.io
```

### tr-skip-request-data-silos

This command allows for bulk skipping all open privacy request jobs for a particular data silo. This command is useful if you want to disable a data silo and then clear out any active privacy requests that are still queued up for that data silo.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "Manage Request Compilation"

#### Arguments

| Argument     | Description                                                                                                                 | Type                | Default                  | Required |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------ | -------- |
| auth         | The Transcend API key with the scopes necessary for the command.                                                            | string              | N/A                      | true     |
| dataSiloId   | The ID of the data silo to skip privacy request jobs for.                                                                   | string - UUID       | N/A                      | true     |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                               | string - URL        | https://api.transcend.io | false    |
| statuses     | The [request statuses](https://docs.transcend.io/docs/privacy-requests/overview#request-statuses) to mark as completed for. | RequestStatus[]     | COMPILING,SECONDARY      | false    |
| status       | The status to set the request data silo job to                                                                              | SKIPPED or RESOLVED | SKIPPED                  | false    |

#### Usage

```sh
yarn tr-skip-request-data-silos --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-skip-request-data-silos --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f \
 --transcendUrl=https://api.us.transcend.io
```

Only mark as completed requests in "removing data" phase

```sh
yarn tr-skip-request-data-silos --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --statuses=SECONDARY
```

Set to status "RESOLVED" instead of status "SKIPPED"

```sh
yarn tr-skip-request-data-silos --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --status=RESOLVED
```

### tr-retry-request-data-silos

This command allows for bulk restarting a set of data silos jobs for open privacy requests. This is equivalent to clicking the "Wipe and Retry" button for a particular data silo across a set of privacy requests.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "Manage Request Compilation"

#### Arguments

| Argument     | Description                                                                                                                               | Type            | Default                  | Required |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------ | -------- |
| auth         | The Transcend API key with the scopes necessary for the command.                                                                          | string          | N/A                      | true     |
| dataSiloId   | The ID of the data silo to pull in.                                                                                                       | string - UUID   | N/A                      | true     |
| actions      | The [request action](https://docs.transcend.io/docs/privacy-requests/configuring-requests/data-subject-requests#data-actions) to restart. | RequestAction[] | N/A                      | true     |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                             | string - URL    | https://api.transcend.io | false    |

#### Usage

```sh
yarn tr-retry-request-data-silos --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --actions=ACCESS
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-retry-request-data-silos --auth=$TRANSCEND_API_KEY --dataSiloId=70810f2e-cf90-43f6-9776-901a5950599f --actions=ACCESS \
 --transcendUrl=https://api.us.transcend.io
```

### tr-update-consent-manager

This command allows for updating Consent Manager to latest version. The consent manager bundle can also be deployed using this commannd.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "Manage Consent Manager Developer Settings"

#### Arguments

| Argument     | Description                                                                   | Type         | Default                  | Required |
| ------------ | ----------------------------------------------------------------------------- | ------------ | ------------------------ | -------- |
| auth         | The Transcend API key with the scopes necessary for the command.              | string       | N/A                      | true     |
| bundleTypes  | The bundle types to deploy                                                    | BundleType[] | PRODUCTION,TEST          | false    |
| deploy       | When true, deploy the Consent Manager after updating the version              | boolean      | false                    | false    |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting. | string - URL | https://api.transcend.io | false    |

#### Usage

```sh
yarn tr-update-consent-manager --auth=$TRANSCEND_API_KEY
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-update-consent-manager --auth=$TRANSCEND_API_KEY --transcendUrl=https://api.us.transcend.io
```

Update version and deploy bundles.

```sh
yarn tr-update-consent-manager -auth=$TRANSCEND_API_KEY --deploy=true
```

Update just the TEST bundle

```sh
yarn tr-update-consent-manager --auth=$TRANSCEND_API_KEY --bundleTypes=TEST
```

Update just the PRODUCTION bundle

```sh
yarn tr-update-consent-manager --auth=$TRANSCEND_API_KEY --bundleTypes=PRODUCTION
```

Update multiple organizations at once

```sh
yarn tr-update-consent-manager --auth=$TRANSCEND_API_KEY --bundleTypes=PRODUCTION

tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD --scopes="Manage Consent Manager" --apiKeyTitle="CLI Usage Cross Instance Sync" --file=./transcend-api-keys.json
yarn tr-update-consent-manager  --auth=./transcend-api-keys.json --deploy=true
```

### tr-consent-managers-to-business-entities

This command allows for converting a folder or Consent Manager `transcend.yml` files into a single `transcend.yml` file where each consent manager configuration is a Business Entity in the data inventory.

#### Authentication

No authentication is required to run this command. It reads and writes files from local disk.

#### Arguments

| Argument                | Description                                                            | Type                 | Default                          | Required |
| ----------------------- | ---------------------------------------------------------------------- | -------------------- | -------------------------------- | -------- |
| consentManagerYmlFolder | Path to the folder of Consent Manager `transcend.yml` files to combine | string - folder-path | N/A                              | true     |
| output                  | Path to the output `transcend.yml` with business entity configuration  | string - file-path   | ./combined-business-entities.yml | false    |

#### Usage

Combine files in folder `./working/consent-managers/` to file `./combined-business-entities.yml`

```sh
yarn tr-consent-managers-to-business-entities --consentManagerYmlFolder=./working/consent-managers/
```

Specify custom output file

```sh
yarn tr-consent-managers-to-business-entities --consentManagerYmlFolder=./working/consent-managers/ --output=./custom.yml
```

### tr-consent-manager-service-json-to-yml

Import the services from an airgap.js file into a Transcend instance.

Step 1) Run `await airgap.getMetadata()` on a site with airgap
Step 2) Right click on the printed object, and click `Copy object`
Step 3) Place output of file in a file named `services.json`
Step 4) Run `yarn tr-consent-manager-service-json-to-yml --file=./services.json --output=./transcend.yml`
Step 5) Run `yarn tr-push --auth=$TRANSCEND_API_KEY --file=./transcend.yml --classifyService=true`

#### Authentication

No authentication is required to run this command. It reads and writes files from local disk.

#### Arguments

| Argument | Description                                                              | Type               | Default         | Required |
| -------- | ------------------------------------------------------------------------ | ------------------ | --------------- | -------- |
| file     | Path to the `services.json` file, output of `await airgap.getMetadata()` | string - file-path | ./services.json | false    |
| output   | Path to the output `transcend.yml` to write to                           | string - file-path | ./transcend.yml | false    |

#### Usage

Convert data flow configurations in folder `./services.json` to yml in `./transcend.yml`

```sh
yarn tr-consent-manager-service-json-to-yml
```

With file locations

```sh
yarn tr-consent-manager-service-json-to-yml --file=./folder/services.json --output./folder/transcend.yml
```

### tr-derive-data-silos-from-data-flows

Given a folder of data flow `transcend.yml` configurations, convert those configurations to set of data silo `transcend.yml` configurations.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API does not need any scopes, any API key will work.

#### Arguments

| Argument           | Description                                                                   | Type                 | Default                  | Required |
| ------------------ | ----------------------------------------------------------------------------- | -------------------- | ------------------------ | -------- |
| auth               | The Transcend API key with the scopes necessary for the command.              | string               | N/A                      | true     |
| dataFlowsYmlFolder | The folder that contains data flow yml files                                  | string - folder-path | N/A                      | true     |
| dataSilosYmlFolder | The folder that contains data silo yml files                                  | string - folder-path | N/A                      | true     |
| ignoreYmls         | The set of yml files that should be skipped when uploading                    | string[]             | []                       | false    |
| transcendUrl       | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting. | string - URL         | https://api.transcend.io | false    |

#### Usage

Convert data flow configurations in folder `./working/data-flows/` to data silo configurations in folder `./working/data-silos/`

```sh
yarn tr-derive-data-silos-from-data-flows --auth=$TRANSCEND_API_KEY \
 --dataFlowsYmlFolder=./working/data-flows/ \
 --dataSilosYmlFolder=./working/data-silos/
```

Use with US backend

```sh
yarn tr-derive-data-silos-from-data-flows --auth=$TRANSCEND_API_KEY --transcendUrl=https://api.us.transcend.io \
 --dataFlowsYmlFolder=./working/data-flows/ \
 --dataSilosYmlFolder=./working/data-silos/
```

Skip a set of yml files

```sh
yarn tr-derive-data-silos-from-data-flows --auth=$TRANSCEND_API_KEY --ignoreYmls="Skip.yml,Other.yml" \
 --dataFlowsYmlFolder=./working/data-flows/ \
 --dataSilosYmlFolder=./working/data-silos/
```

### tr-derive-data-silos-from-data-flows-cross-instance

Given a folder of data flow `transcend.yml` configurations, convert those configurations to a single `transcend.yml` configurations of all related data silos.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API does not need any scopes, any API key will work.

#### Arguments

| Argument           | Description                                                                   | Type                 | Default                  | Required |
| ------------------ | ----------------------------------------------------------------------------- | -------------------- | ------------------------ | -------- |
| auth               | The Transcend API key with the scopes necessary for the command.              | string               | N/A                      | true     |
| dataFlowsYmlFolder | The folder that contains data flow yml files                                  | string - folder-path | N/A                      | true     |
| output             | The output transcend.yml file containing the data silo configurations         | string - file-path   | ./transcend.yml          | false    |
| ignoreYmls         | The set of yml files that should be skipped when uploading                    | string[]             | []                       | false    |
| transcendUrl       | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting. | string - URL         | https://api.transcend.io | false    |

#### Usage

Convert data flow configurations in folder `./working/data-flows/` to data silo configurations in file `./transcend.yml`

```sh
yarn tr-derive-data-silos-from-data-flows-cross-instance --auth=$TRANSCEND_API_KEY --dataFlowsYmlFolder=./working/data-flows/
```

Use with US backend

```sh
yarn tr-derive-data-silos-from-data-flows-cross-instance --auth=$TRANSCEND_API_KEY --dataFlowsYmlFolder=./working/data-flows/ \
  --transcendUrl=https://api.us.transcend.io
```

Skip a set of yml files

```sh
yarn tr-derive-data-silos-from-data-flows-cross-instance --auth=$TRANSCEND_API_KEY --dataFlowsYmlFolder=./working/data-flows/ --ignoreYmls="Skip.yml,Other.yml"
```

Convert data flow configurations in folder `./working/data-flows/` to data silo configurations in file `./output.yml`

```sh
yarn tr-derive-data-silos-from-data-flows-cross-instance --auth=$TRANSCEND_API_KEY --dataFlowsYmlFolder=./working/data-flows/ --output=./output.yml
```

### tr-pull-consent-metrics

This command allows for pulling consent manager metrics for a Transcend account, or a set of Transcend accounts.

By default, the consent metrics will be written to a folder named `consent-metrics` within the directory where you run the command. You can override the location that these CSVs are written to using the flag “--folder=./my-folder/”. This folder will contain a set of CSV files:

- CONSENT_CHANGES_TIMESERIES_optIn.csv -> this is a feed containing the number of explicit opt in events that happen - these are calls to airgap.setConsent(event, { SaleOfInfo: true })
- CONSENT_CHANGES_TIMESERIES_optOut.csv -> this is a feed containing the number of explicit opt out events that happen - these are calls to airgap.setConsent(event, { SaleOfInfo: false })
- CONSENT_SESSIONS_BY_REGIME_Default.csv -> this contains the number of sessions detected for the bin period
- PRIVACY_SIGNAL_TIMESERIES_DNT.csv -> the number of DNT signals detected (note you chose not to honor the the DNT signal so this file can be ignored)
- PRIVACY_SIGNAL_TIMESERIES_GPC.csv -> the number of GPC signals detected. When the GPC signal is detected, this results in a user being opted out. This is counted [per session](https://docs.transcend.io/docs/consent/reference/telemetry#faq).

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "View Consent Manager"

#### Arguments

| Argument     | Description                                                                   | Type                    | Default                  | Required |
| ------------ | ----------------------------------------------------------------------------- | ----------------------- | ------------------------ | -------- |
| auth         | The Transcend API key with the scopes necessary for the command.              | string                  | N/A                      | true     |
| start        | The start date to pull metrics from.                                          | string - date           | N/A                      | true     |
| end          | The end date to pull metrics until.                                           | string - date           | now()                    | true     |
| folder       | The folder to save metrics to                                                 | string - path           | ./consent-metrics/       | false    |
| bin          | The bin metric when pulling data (1h or 1d)                                   | ConsentManagerMetricBin | 1d                       | false    |
| transcendUrl | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting. | string - URL            | https://api.transcend.io | false    |

#### Usage

```sh
yarn tr-pull-consent-metrics --auth=$TRANSCEND_API_KEY --start=01/01/2023
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-pull-consent-metrics --auth=$TRANSCEND_API_KEY --start=01/01/2023 --transcendUrl=https://api.us.transcend.io
```

Pull start and end date explicitly

```sh
yarn tr-pull-consent-metrics --auth=$TRANSCEND_API_KEY --start=01/01/2023 --end=03/01/2023
```

Save to an explicit folder

```sh
yarn tr-pull-consent-metrics --auth=$TRANSCEND_API_KEY --start=01/01/2023 --end=03/01/2023 --folder=./my-folder/
```

Bin data hourly vs daily

```sh
yarn tr-pull-consent-metrics --auth=$TRANSCEND_API_KEY --start=01/01/2023 --bin=1h
```

### tr-pull-datapoints

This command allows for pulling your Data Inventory -> Datapoints into a CSV.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "View Data Inventory"

#### Arguments

| Argument                 | Description                                                                   | Type          | Default                  | Required |
| ------------------------ | ----------------------------------------------------------------------------- | ------------- | ------------------------ | -------- |
| auth                     | The Transcend API key with the scopes necessary for the command.              | string        | N/A                      | true     |
| file                     | The file to save datapoints to                                                | string - path | ./datapoints.csv         | false    |
| transcendUrl             | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting. | string - URL  | https://api.transcend.io | false    |
| dataSiloIds              | Comma-separated list of data silo IDs to filter by                            | string        | N/A                      | false    |
| includeAttributes        | Whether to include attributes in the output                                   | boolean       | false                    | false    |
| includeGuessedCategories | Whether to include guessed categories in the output                           | boolean       | false                    | false    |
| parentCategories         | Comma-separated list of parent categories to filter by                        | string        | N/A                      | false    |
| subCategories            | Comma-separated list of subcategories to filter by                            | string        | N/A                      | false    |

#### Usage

All arguments

```sh
yarn tr-pull-datapoints --auth=$TRANSCEND_API_KEY --file=./datapoints.csv --includeGuessedCategories=true --parentCategories=CONTACT,ID,LOCATION --subCategories=79d998b7-45dd-481c-ae3a-856fd93458b2,9ecc213a-cd46-46d6-afd9-46cea713f5d1 --dataSiloIds=f956ccce-5534-4328-a78d-3a924b1fe429
```

Pull datapoints for specific data silos:

```sh
yarn tr-pull-datapoints --auth=$TRANSCEND_API_KEY --file=./datapoints.csv --dataSiloIds=f956ccce-5534-4328-a78d-3a924b1fe429
```

Include attributes in the output:

```sh
yarn tr-pull-datapoints --auth=$TRANSCEND_API_KEY --file=./datapoints.csv --includeAttributes=true
```

Include guessed categories in the output:

```sh
yarn tr-pull-datapoints --auth=$TRANSCEND_API_KEY --file=./datapoints.csv --includeGuessedCategories=true
```

Filter by parent categories:

```sh
yarn tr-pull-datapoints --auth=$TRANSCEND_API_KEY --file=./datapoints.csv --parentCategories=ID,LOCATION
```

Filter by subcategories:

```sh
yarn tr-pull-datapoints --auth=$TRANSCEND_API_KEY --file=./datapoints.csv --subCategories=79d998b7-45dd-481c-ae3a-856fd93458b2,9ecc213a-cd46-46d6-afd9-46cea713f5d1
```

Specify the backend URL, needed for US hosted backend infrastructure:

```sh
yarn tr-pull-datapoints --auth=$TRANSCEND_API_KEY --file=./datapoints.csv --transcendUrl=https://api.us.transcend.io
```

### tr-upload-preferences

This command allows for updating of preference management data to your Transcend Preference Store.

This command uses [inquirer](https://github.com/SBoudrias/Inquirer.js/) to prompt the user to
map the shape of the CSV to the shape of the Transcend API. There is no requirement for the
shape of the incoming CSV, as the script will handle the mapping process.

The script will also produce a JSON cache file, that allows for the mappings to be preserved between runs.
This can be useful if you have the same CSV shape that needs to be imported multiple times.
Once the mapping process is done once, it does not need to be done again.

Additionally, the JSON cache file will store the result of any preferences that fail to be uploaded so that the
script can be run multiple times if an issue happens.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key needs the following scopes:

- Modify User Stored Preferences
- View Managed Consent Database Admin API
- View Preference Store Settings

#### Authentication

In order to use this cli, you will first need to follow [this guide](https://docs.transcend.io/docs/consent/reference/managed-consent-database#authenticate-a-user's-consent) in order

#### Arguments

| Argument             | Description                                                                                       | Type               | Default                                      | Required |
| -------------------- | ------------------------------------------------------------------------------------------------- | ------------------ | -------------------------------------------- | -------- |
| auth                 | The Transcend API key with the scopes necessary for the command.                                  | string             | N/A                                          | true     |
| partition            | The partition key to download consent preferences to                                              | string             | N/A                                          | true     |
| sombraAuth           | The sombra internal key, use for additional authentication when self-hosting sombra.              | string             | N/A                                          | false    |
| transcendUrl         | URL of the Transcend backend. Use https://consent.us.transcend.io for US hosting.                 | string - URL       | https://consent.transcend.io                 | false    |
| file                 | Path to the CSV file to load preferences from                                                     | string - file-path | ./preferences.csv                            | false    |
| dryRun               | Whether to do a dry run only - will write results ti receiptFilepath without updating Transcend   | boolean            | false                                        | false    |
| skipWorkflowTriggers | Whether to skip workflow triggers when uploading to preference store                              | boolean            | false                                        | false    |
| skipConflictUpdates  | Whether to skip uploading of any records where the preference store and file have a hard conflict | boolean            | false                                        | false    |
| isSilent             | Whether to skip sending emails in workflows                                                       | boolean            | true                                         | false    |
| attributes           | Attributes to add to any DSR request if created                                                   | string             | Tags:transcend-cli,Source:transcend-cli      | false    |
| receiptFilepath      | Store resulting, continuing where left off                                                        | string - file-path | ./preference-management-upload-receipts.json | false    |

#### Usage

Upload consent preferences to partition key `4d1c5daa-90b7-4d18-aa40-f86a43d2c726`

```sh
yarn tr-upload-preferences --auth=$TRANSCEND_API_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726
```

Upload consent preferences with additional options

```sh
yarn tr-upload-preferences --auth=$TRANSCEND_API_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726 --file=./preferences.csv --dryRun=true --skipWorkflowTriggers=true --skipConflictUpdates=true --isSilent=false --attributes="Tags:transcend-cli,Source:transcend-cli" --receiptFilepath=./preference-management-upload-receipts.json
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-upload-preferences --auth=$TRANSCEND_API_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726 --transcendUrl=https://consent.us.transcend.io
```

### tr-upload-consent-preferences

This command allows for updating of consent preferences to the [Managed Consent Database](https://docs.transcend.io/docs/consent/reference/managed-consent-database).

Each row in the CSV must include:

| Argument  | Description                                                                                               | Type                      | Default | Required |
| --------- | --------------------------------------------------------------------------------------------------------- | ------------------------- | ------- | -------- |
| userId    | Unique ID identifying the user that the preferences ar efor                                               | string                    | N/A     | true     |
| timestamp | Timestamp for when consent was collected for that user                                                    | string - timestamp        | N/A     | true     |
| purposes  | JSON map from consent purpose name -> boolean indicating whether user has opted in or out of that purpose | {[k in string]: boolean } | {}      | false    |
| confirmed | Whether consent preferences have been explicitly confirmed or inferred                                    | boolean                   | true    | false    |
| updated   | Has the consent been updated (including no-change confirmation) since default resolution                  | boolean                   | N/A     | false    |
| prompted  | Whether or not the UI has been shown to the end-user (undefined in older versions of airgap.js)           | boolean                   | N/A     | false    |
| gpp       | IAB GPP string                                                                                            | string - GPP              | N/A     | false    |

An sample CSV can be found [here](./examples/preference-upload.csv).

#### Authentication

In order to use this cli, you will first need to follow [this guide](https://docs.transcend.io/docs/consent/reference/managed-consent-database#authenticate-a-user's-consent) in order
to grab your encryption and signing keys.

#### Arguments

| Argument            | Description                                                                       | Type          | Default                      | Required |
| ------------------- | --------------------------------------------------------------------------------- | ------------- | ---------------------------- | -------- |
| base64EncryptionKey | The encyption key used to encrypt the userId                                      | string        | N/A                          | true     |
| base64SigningKey    | The signing key used to prove authentication of consent request                   | string        | N/A                          | true     |
| partition           | The partition key to download consent preferences to                              | string        | N/A                          | true     |
| file                | The file to pull consent preferences from                                         | string - path | ./preferences.csv            | false    |
| transcendUrl        | URL of the Transcend backend. Use https://consent.us.transcend.io for US hosting. | string - URL  | https://consent.transcend.io | false    |
| concurrency         | The concurrency to use when uploading requests in parallel.                       | number        | 100                          | false    |

#### Usage

Upload consent preferences to partition key `4d1c5daa-90b7-4d18-aa40-f86a43d2c726`

```sh
yarn tr-upload-consent-preferences --base64EncryptionKey=$TRANSCEND_CONSENT_ENCRYPTION_KEY  --base64SigningKey=$TRANSCEND_CONSENT_SIGNING_KEY             --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726
```

Upload consent preferences to partition key `4d1c5daa-90b7-4d18-aa40-f86a43d2c726` from file `./consent.csv`

```sh
yarn tr-upload-consent-preferences --base64EncryptionKey=$TRANSCEND_CONSENT_ENCRYPTION_KEY --base64SigningKey=$TRANSCEND_CONSENT_SIGNING_KEY             --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726 --file=./consent.csv
```

Upload consent preferences to partition key `4d1c5daa-90b7-4d18-aa40-f86a43d2c726` and set concurrency

```sh
yarn tr-upload-consent-preferences --base64EncryptionKey=$TRANSCEND_CONSENT_ENCRYPTION_KEY --base64SigningKey=$TRANSCEND_CONSENT_SIGNING_KEY             --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726 --concurrency=200
```

### tr-pull-consent-preferences

This command allows for pull of consent preferences from the [Managed Consent Database](https://docs.transcend.io/docs/api-reference/POST/v1/consent-preferences).

Each row in the CSV will include:

| Argument       | Description                                                                                               | Type                      | Default | Required |
| -------------- | --------------------------------------------------------------------------------------------------------- | ------------------------- | ------- | -------- |
| userId         | Unique ID identifying the user that the preferences ar efor                                               | string                    | N/A     | true     |
| timestamp      | Timestamp for when consent was collected for that user                                                    | string - timestamp        | N/A     | true     |
| purposes       | JSON map from consent purpose name -> boolean indicating whether user has opted in or out of that purpose | {[k in string]: boolean } | {}      | true     |
| airgapVersion  | Version of airgap where consent was collected                                                             | string                    | N/A     | false    |
| [purpose name] | Each consent purpose from `purposes` is also included in a column                                         | boolean                   | N/A     | false    |
| tcf            | IAB TCF string                                                                                            | string - TCF              | N/A     | false    |
| gpp            | IAB GPP string                                                                                            | string - GPP              | N/A     | false    |

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "View Managed Consent Database Admin API"

#### Arguments

| Argument        | Description                                                                          | Type               | Default                  | Required |
| --------------- | ------------------------------------------------------------------------------------ | ------------------ | ------------------------ | -------- |
| auth            | The Transcend API key with the scopes necessary for the command.                     | string             | N/A                      | true     |
| partition       | The partition key to download consent preferences to                                 | string             | N/A                      | true     |
| sombraAuth      | The sombra internal key, use for additional authentication when self-hosting sombra. | string             | N/A                      | false    |
| file            | Path to the CSV file to save preferences to                                          | string - file-path | ./preferences.csv        | false    |
| transcendUrl    | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.        | string - URL       | https://api.transcend.io | false    |
| timestampBefore | Filter for consents updated this time                                                | Date               | N/A                      | false    |
| timestampAfter  | Filter for consents updated after this time                                          | Date               | N/A                      | false    |
| identifiers     | Filter for specific identifiers                                                      | string[]           | N/A                      | false    |
| concurrency     | The concurrency to use when downloading consents in parallel.                        | number             | 100                      | false    |

#### Usage

Fetch all consent preferences from partition key `4d1c5daa-90b7-4d18-aa40-f86a43d2c726`

```sh
yarn tr-pull-consent-preferences --auth=$TRANSCEND_API_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726
```

Fetch all consent preferences from partition key `4d1c5daa-90b7-4d18-aa40-f86a43d2c726` and save to ./consent.csv

```sh
yarn tr-pull-consent-preferences --auth=$TRANSCEND_API_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726 --file=./consent.csv
```

Filter on consent updates before a date

```sh
yarn tr-pull-consent-preferences --auth=$TRANSCEND_API_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726 --timestampBefore=04/03/2023
```

Filter on consent updates after a date

```sh
yarn tr-pull-consent-preferences --auth=$TRANSCEND_API_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726 --timestampAfter=04/03/2023
```

For self-hosted sombras that use an internal key:

```sh
yarn tr-pull-consent-preferences --auth=$TRANSCEND_API_KEY --sombraAuth=$SOMBRA_INTERNAL_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-pull-consent-preferences --auth=$TRANSCEND_API_KEY --partition=4d1c5daa-90b7-4d18-aa40-f86a43d2c726 --transcendUrl=https://api.us.transcend.io
```

### tr-upload-data-flows-from-csv

This command allows for uploading of data flows from CSV.

Step 1) Download the CSV of data flows that you want to edit from the Admin Dashboard under [Consent Management -> Data Flows](https://app.transcend.io/consent-manager/data-flows). You can download data flows from both the "Triage" and "Approved" tabs.

<img width="1464" alt="Screenshot 2023-06-22 at 6 05 36 PM" src="https://github.com/transcend-io/cli/assets/10264973/c4b65b31-2cf3-49c9-b543-041567c7aff8">

Step 2) You can edit the contents of the CSV file as needed. You may adjust the "Purpose" column, adjust the "Notes" column, add "Owners" and "Teams" or even add custom columns with additional metadata.

Step 3) Upload the modified CSV file back into the dashboard with the command `yarn tr-upload-data-flows-from-csv --auth=$TRANSCEND_API_KEY --file=./approved-flows.csv --trackerStatus=LIVE`

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "Manage Data Flows"

#### Arguments

| Argument        | Description                                                                                                | Type                 | Default                  | Required |
| --------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------ | -------- |
| auth            | The Transcend API key with the scopes necessary for the command.                                           | string               | N/A                      | true     |
| trackerStatus   | Whether or not to upload the data flows into the "Approved" tab (LIVE) or the "Triage" tab (NEEDS_REVIEW). | ConsentTrackerStatus | N/A                      | true     |
| file            | Path to the CSV file to upload                                                                             | string - file-path   | ./data-flows.csv         | false    |
| classifyService | When true, automatically assign the service for a data flow based on the domain that is specified          | boolean              | false                    | false    |
| transcendUrl    | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                              | string - URL         | https://api.transcend.io | false    |

Note: You `trackerStatus` can be specified on a per data flow basis by adding a column named "Status" to the CSV. The values should be of type `ConsentTrackerStatus` - which is `LIVE` or `NEEDS_REVIEW`.

#### Usage

Upload the file of data flows in `./data-flows.csv` into the ["Approved" tab](https://app.transcend.io/consent-manager/data-flows/approved).

```sh
yarn tr-upload-data-flows-from-csv --auth=$TRANSCEND_API_KEY --trackerStatus=LIVE
```

Upload the file of data flows in `./data-flows.csv` into the ["Triage" tab](https://app.transcend.io/consent-manager/data-flows).

```sh
yarn tr-upload-data-flows-from-csv --auth=$TRANSCEND_API_KEY --trackerStatus=NEEDS_REVIEW
```

Specifying the CSV file to read from:

```sh
yarn tr-upload-data-flows-from-csv --auth=$TRANSCEND_API_KEY --trackerStatus=LIVE --file=./custom/my-data-flows.csv
```

Have Transcend automatically fill in the service names by looking up the data flow host in Transcend's database.

```sh
yarn tr-upload-data-flows-from-csv --auth=$TRANSCEND_API_KEY --trackerStatus=LIVE --classifyService=true
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-upload-data-flows-from-csv --auth=$TRANSCEND_API_KEY --transcendUrl=https://api.us.transcend.io
```

### tr-upload-cookies-from-csv

This command allows for uploading cookies from CSV

Step 1) Download the CSV of cookies that you want to edit from the Admin Dashboard under [Consent Management -> Cookies](https://app.transcend.io/consent-manager/cookies). You can download cookies from both the "Triage" and "Approved" tabs.

Step 2) You can edit the contents of the CSV file as needed. You may adjust the "Purpose" column, adjust the "Notes" column, add "Owners" and "Teams" or even add custom columns with additional metadata.

Step 3) Upload the modified CSV file back into the dashboard with the command `yarn tr-upload-cookies-from-csv --auth=$TRANSCEND_API_KEY --file=./approved-flows.csv --trackerStatus=LIVE`

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys).

The API key must have the following scopes:

- "Manage Cookies"

#### Arguments

| Argument      | Description                                                                                             | Type                 | Default                  | Required |
| ------------- | ------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------ | -------- |
| auth          | The Transcend API key with the scopes necessary for the command.                                        | string               | N/A                      | true     |
| trackerStatus | Whether or not to upload the cookies into the "Approved" tab (LIVE) or the "Triage" tab (NEEDS_REVIEW). | ConsentTrackerStatus | N/A                      | true     |
| file          | Path to the CSV file to upload                                                                          | string - file-path   | ./cookies.csv            | false    |
| transcendUrl  | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                           | string - URL         | https://api.transcend.io | false    |

Note: You `trackerStatus` can be specified on a per cookie basis by adding a column named "Status" to the CSV. The values should be of type `ConsentTrackerStatus` - which is `LIVE` or `NEEDS_REVIEW`.

#### Usage

Upload the file of cookies in `./cookies.csv` into the ["Approved" tab](https://app.transcend.io/consent-manager/cookies/approved).

```sh
yarn tr-upload-cookies-from-csv --auth=$TRANSCEND_API_KEY --trackerStatus=LIVE
```

Upload the file of cookies in `./cookies.csv` into the ["Triage" tab](https://app.transcend.io/consent-manager/cookies).

```sh
yarn tr-upload-cookies-from-csv --auth=$TRANSCEND_API_KEY --trackerStatus=NEEDS_REVIEW
```

Specifying the CSV file to read from:

```sh
yarn tr-upload-cookies-from-csv --auth=$TRANSCEND_API_KEY --trackerStatus=LIVE --file=./custom/my-cookies.csv
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-upload-cookies-from-csv --auth=$TRANSCEND_API_KEY --transcendUrl=https://api.us.transcend.io
```

### tr-generate-api-keys

This command allows for creating API keys across multiple Transcend instances. This is useful for customers that are managing many Transcend instances and need to regularly create, cycle or delete API keys across all of their instances. Unlike the other commands that rely on API key authentication, this command relies upon username/password authentication. This command will spit out the API keys into a [JSON file](./examples/api-keys.json), and that JSON file can be used in subsequent cli commands.

#### Authentication

In order to use this command, you will need to provide your email and password for the Transcend account. This command will only generate API keys for Transcend instances where you have the permission to "Manage API Keys".

#### Arguments

| Argument             | Description                                                                                                                                                  | Type               | Default                  | Required |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ------------------------ | -------- |
| email                | The email address that you use to [log into Transcend](https://app.transcend.io/login).                                                                      | string             | N/A                      | true     |
| password             | The password for your account login.                                                                                                                         | string             | N/A                      | true     |
| apiKeyTitle          | The title of the API key being generated or destroyed.                                                                                                       | string             | N/A                      | true     |
| file                 | The file where API keys should be written to.                                                                                                                | string - file-path | N/A                      | true     |
| scopes               | The list of [scopes](https://docs.transcend.io/docs/security/access-control#scopes) that should be given to the API key.                                     | string[]           | N/A                      | true     |
| deleteExistingApiKey | When true, if an API key exists with the specified "apiKeyTitle", the existing API key is deleted. When false, an error is thrown if API key already exists. | boolean            | true                     | false    |
| createNewApiKey      | When true, new API keys will be created. Set to false if you simply want to delete all API keys with a title.                                                | boolean            | true                     | false    |
| parentOrganizationId | Filter for only a specific organization by ID, returning all child accounts associated with that organization.                                               | string - UUID      | true                     | false    |
| transcendUrl         | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                                                                                | string - URL       | https://api.transcend.io | false    |

#### Usage

```sh
yarn tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD \
   --scopes="View Email Templates,View Data Map" --apiKeyTitle="CLI Usage Cross Instance Sync" -file=./working/auth.json
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD \
   --scopes="View Email Templates,View Data Map" --apiKeyTitle="CLI Usage Cross Instance Sync" -file=./working/auth.json \
   --transcendUrl=https://api.us.transcend.io
```

Filter for only a specific organization by ID, returning all child accounts associated with that organization. Can use the following GQL query on the [EU GraphQL Playground](https://api.us.transcend.io/graphql) or [US GraphQL Playground](https://api.us.transcend.io/graphql).

```gql
query {
  user {
    organization {
      id
      parentOrganizationId
    }
  }
}
```

```sh
yarn tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD \
   --scopes="View Email Templates,View Data Map" --apiKeyTitle="CLI Usage Cross Instance Sync" -file=./working/auth.json \
   --parentOrganizationId=7098bb38-070d-4f26-8fa4-1b61b9cdef77
```

Delete all API keys with a certain title.

```sh
yarn tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD \
   --scopes="View Email Templates,View Data Map" --apiKeyTitle="CLI Usage Cross Instance Sync" -file=./working/auth.json \
   --createNewApiKey=false
```

Throw error if an API key already exists with that title, default behavior is to delete the existing API key and create a new one with that same title.

```sh
yarn tr-generate-api-keys  --email=test@transcend.io --password=$TRANSCEND_PASSWORD \
   --scopes="View Email Templates,View Data Map" --apiKeyTitle="CLI Usage Cross Instance Sync" -file=./working/auth.json \
   --deleteExistingApiKey=false
```

### tr-build-xdi-sync-endpoint

This command allows for building of the [XDI Sync Endpoint](<https://docs.transcend.io/docs/consent/reference/xdi#addxdihostscript(standalone)>) across a set of Transcend accounts.

#### Authentication

In order to use this cli, you will first need to generate an API key on the Transcend Admin Dashboard (https://app.transcend.io/infrastructure/api-keys) or by using the `yarn tr-generate-api-keys` command above.

The API key must have the following scopes:

- "View Consent Manager"

#### Arguments

| Argument           | Description                                                                                               | Type               | Default                  | Required |
| ------------------ | --------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------ | -------- |
| auth               | The Transcend API key with the scopes necessary for the command.                                          | string             | N/A                      | true     |
| xdiLocation        | The location of the XDI that will be loaded by the generated sync endpoint. Typically this ends in xdi.js | string             | N/A                      | true     |
| file               | The HTML file path where the sync endpoint should be written.                                             | string - file-path | ./sync-endpoint.html     | false    |
| removeIpAddresses  | When true, remove IP addresses from the domain list                                                       | boolean            | true                     | false    |
| domainBlockList    | The set of domains that should be excluded from the sync endpoint                                         | string[]           | localhost                | false    |
| xdiAllowedCommands | The allowed set of XDI commands                                                                           | string             | ConsentManager:Sync      | false    |
| transcendUrl       | URL of the Transcend backend. Use https://api.us.transcend.io for US hosting.                             | string - URL       | https://api.transcend.io | false    |

#### Usage

```sh
yarn tr-build-xdi-sync-endpoint --auth=$TRANSCEND_API_KEY --xdiLocation=https://cdn.your-site.com/xdi.js
```

Specifying the backend URL, needed for US hosted backend infrastructure.

```sh
yarn tr-build-xdi-sync-endpoint --auth=$TRANSCEND_API_KEY --xdiLocation=https://cdn.your-site.com/xdi.js --transcendUrl=https://api.us.transcend.io
```

Configuring across multiple Transcend Instances:

```sh
# Pull down API keys across all Transcend instances
yarn tr-generate-api-keys --email=$TRANSCEND_EMAIL --password=$TRANSCEND_PASSWORD --transcendUrl=https://api.us.transcend.io --scopes="View Consent Manager" --apiKeyTitle="[cli][$TRANSCEND_EMAIL] XDI Endpoint Construction" --file=./api-keys.json --parentOrganizationId=1821d872-6114-406e-90c3-73b4d5e246cf

# Path list of API keys as authentication
yarn tr-build-xdi-sync-endpoint --auth=./api-keys.json --xdiLocation=https://cdn.your-site.com/xdi.js --transcendUrl=https://api.us.transcend.io
```

Pull to specific file location

```sh
yarn tr-build-xdi-sync-endpoint --auth=$TRANSCEND_API_KEY --xdiLocation=https://cdn.your-site.com/xdi.js --file=./my-folder/sync-endpoint.html
```

Don't filter out regular expressions

```sh
yarn tr-build-xdi-sync-endpoint --auth=$TRANSCEND_API_KEY --xdiLocation=https://cdn.your-site.com/xdi.js --removeIpAddresses=false
```

Filter out certain domains that should not be included in the sync endpoint definition

```sh
yarn tr-build-xdi-sync-endpoint --auth=$TRANSCEND_API_KEY --xdiLocation=https://cdn.your-site.com/xdi.js --domainBlockList=ignored.com,localhost
```

Override XDI allowed commands

```sh
yarn tr-build-xdi-sync-endpoint --auth=$TRANSCEND_API_KEY --xdiLocation=https://cdn.your-site.com/xdi.js --xdiAllowedCommands="ExtractIdentifiers:Simple"
```

## Prompt Manager

If you are integrating Transcend's Prompt Manager into your code, it may look like:

```ts
import * as t from 'io-ts';
import { TranscendPromptManager } from '@transcend-io/cli';
import {
  ChatCompletionMessage,
  PromptRunProductArea,
} from '@transcend-io/privacy-types';

/**
 * Example prompt integration
 */
export async function main(): Promise<void> {
  // Instantiate the Transcend Prompt Manager instance
  const promptManager = new TranscendPromptManager({
    // API key
    transcendApiKey: process.env.TRANSCEND_API_KEY,
    // Define the prompts that are stored in Transcend
    prompts: {
      test: {
        // identify by ID
        id: '30bcaa79-889a-4af3-842d-2e8ba443d36d',
        // no runtime variables
        paramCodec: t.type({}),
        // response is list of strings
        outputCodec: t.array(t.string),
      },
      json: {
        // identify by title
        title: 'test',
        // one runtime variable "test"
        paramCodec: t.type({ test: t.string }),
        // runtime is json object
        outputCodec: t.record(t.string, t.string),
        // response is stored in <json></json> atg
        extractFromTag: 'json',
      },
      predictProductLine: {
        // identify by title
        title: 'Predict Product Line',
        // runtime parameter for slack channel name
        paramCodec: t.type({
          slackChannelName: t.string,
        }),
        // response is specific JSON shape
        outputCodec: t.type({
          product: t.union([t.string, t.null]),
          clarification: t.union([t.string, t.null]),
        }),
        // response is stored in <json></json> atg
        extractFromTag: 'json',
      },
    },
    // Optional arguments
    //  transcendUrl: 'https://api.us.transcend.io', // defaults to 'https://api.transcend.io'
    //  requireApproval: false, // defaults to true
    //  cacheDuration: 1000 * 60 * 60, // defaults to undefined, no cache
    //  defaultVariables: { myVariable: 'this is custom', other: [{ name: 'custom' }] }, // defaults to {}
    //  handlebarsOptions: { helpers, templates }, // defaults to {}
  });

  // Fetch the prompt from Transcend and template any variables
  // in this case, we template the slack channel name in the LLM prompt
  const systemPrompt = await promptManager.compilePrompt('predictProductLine', {
    slackChannelName: channelName,
  });

  // Parameters to pass to the LLM
  const input: ChatCompletionMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: input,
    },
  ];
  const largeLanguageModel = {
    name: 'gpt-4',
    client: 'openai' as const,
  };
  const temperature = 1;
  const topP = 1;
  const maxTokensToSample = 1000;

  // Run prompt against LLM
  let response: string;
  const t0 = new Date().getTime();
  try {
    response = await openai.createCompletion(input, {
      temperature,
      top_p: topP,
      max_tokens: maxTokensToSample,
    });
  } catch (err) {
    // report error upon failure
    await promptManager.reportPromptRunError('predictProductLine', {
      promptRunMessages: input,
      duration: new Date().getTime() - t0,
      temperature,
      topP,
      error: err.message,
      maxTokensToSample,
      largeLanguageModel,
    });
  }
  const t1 = new Date().getTime();

  // Parsed response as JSON and do not report to Transcend
  //   const parsedResponse = promptManager.parseAiResponse(
  //     'predictProductLine',
  //     response,
  //   );

  // Parsed response as JSON and report output to Transcend
  const parsedResponse = await promptManager.reportAndParsePromptRun(
    'predictProductLine',
    {
      promptRunMessages: [
        ...input,
        {
          role: 'assistant',
          content: response,
        },
      ],
      duration: t1 - t0,
      temperature,
      topP,
      maxTokensToSample,
      largeLanguageModel,
      // Optional parameters
      // name, // unique identifier for this run
      // productArea, // Transcend product area that the prompt relates to
      // runByEmployeeEmail, // Employee email that is executing the request
      // promptGroupId, // The prompt group being reported
    },
  );
}
```

## Proxy usage

If you are trying to use the cli inside a corporate firewall and need to send traffic through a proxy, you can do so via the `http_proxy` environment variable or the `--httpProxy` flag, with a command like `yarn tr-pull --auth=$TRANSCEND_API_KEY --httpProxy="http://localhost:5051"`.
