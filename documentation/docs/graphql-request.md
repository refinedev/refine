---
id: graphql-request
title: graphql-request
sidebar_label: graphql-request
description: How to Fetch GraphQL Data in Next.js with graphql-request?
---

[graphql-request](https://github.com/prisma-labs/graphql-request) is a simple & lightweight GraphQL client.

superplate comes with optional graphql-request feature plugin. We'll show basic usage of graphql-request with [SpaceX-API](https://github.com/r-spacex/SpaceX-API).


We'll define the shape of the query we'll use to fetch `launchesPast` from SpaceX-API.

```jsx title="components/graphQLRequestExample/graphql.ts"
import { gql } from "graphql-request";

export const GET_LAUNCHES = gql`
    query GetLaunches($limit: Int) {
        launchesPast(limit: $limit) {
            mission_name
            links {
                mission_patch_small
            }
            rocket {
                rocket_name
            }
            id
        }
    }
`;
```
<br/>

```jsx title="components/GraphQLRequestExample/index.tsx"
import React from "react";
import { request } from "graphql-request";

import { GET_LAUNCHES } from "./graphql";
import { GetLaunchesQuery } from "__generated__/__types__";

const endpoint = "https://api.spacex.land/graphql/";

export const GraphQLRequestExample: React.FC = () => {
    const [launches, setLaunches] = React.useState<GetLaunchesQuery>();
    const [hasData, setHasData] = React.useState(false);

    if (!hasData) {
        request(endpoint, GET_LAUNCHES, { limit: 1 }).then(
            (data: GetLaunchesQuery) => {
                setLaunches(data);
                setHasData(true);
            },
        );
    }

    if (!hasData) return <div>Loading...</div>;

    const { links, mission_name, rocket } = launches;

    return (
      <>
          <div>Last Space-X Launch</div>
          <div>
              <img src={links.mission_patch_small} />
              <div>
                  <h3>{mission_name}</h3>
                  <div>
                      <h4>Rocket:</h4>
                      <span>{rocket.rocket_name}</span>
                  </div>
              </div>
          </div>
      </>
    );
};
```
<br/>

Since we are using TypeScript in the project, also import the necessary types that are generated from SpaceX-API schema definitions:
```jsx title="components/GraphQLRequestExample/index.tsx"
import { GetLaunchesQuery } from "__generated__/__types__";
```


### Generating schema types

To generate the types automatically we use [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) and need to set configs in `codegen.yaml` file.

[Refer to  documentation for detailed usage  &#8594](https://graphql-code-generator.com/docs/getting-started/codegen-config)

```yaml title="codegen.yaml"
# codegen.yaml
schema: https://api.spacex.land/graphql/
documents: ./src/**/**/graphql.ts
generates:
    ./__generated__/__types__.ts:
        config:
            onlyOperationTypes: true
            preResolveTypes: true
        plugins:
            - typescript
            - typescript-operations
```
<br/>

Then run the following command which is defined in package.json.  

```js title="package.json"
  "scripts": {
    ...
    "codegen:generate": "graphql-codegen"
  },
  "devDependencies": {
      ...
      "@graphql-codegen/cli": "^1.20.0",
      "@graphql-codegen/typescript": "^1.20.0",
      "@graphql-codegen/typescript-operations": "^1.17.13"
  }
```

```bash
npm run codegen:generate
```


Running this command will generate types into `__generated__` folder in project root directory automatically.


```ts title="__generated__/__types__.ts"
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    uuid: any;
    timestamptz: any;
    Date: any;
    ObjectID: any;
};

export type GetLaunchesQueryVariables = Exact<{
    limit?: Maybe<Scalars["Int"]>;
}>;

export type GetLaunchesQuery = {
    __typename?: "Query";
    launchesPast?: Maybe<
        Array<
            Maybe<{
                __typename?: "Launch";
                mission_name?: Maybe<string>;
                launch_year?: Maybe<string>;
                id?: Maybe<string>;
                links?: Maybe<{
                    __typename?: "LaunchLinks";
                    mission_patch_small?: Maybe<string>;
                    mission_patch?: Maybe<string>;
                }>;
                rocket?: Maybe<{
                    __typename?: "LaunchRocket";
                    rocket_name?: Maybe<string>;
                }>;
            }>
        >
    >;
};
```

<br/>

:::tip

All this work will be handled automatically by CLI, so you don’t need to do anything extra as long as you choose **graphql-request** feature plugin during the project creation phase.

:::


## Adding graphql-request to your project later

If you want to add graphql-request to your existing project first install the dependencies


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm i graphql-request graphql
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add graphql-request graphql
```
  </TabItem>
</Tabs>


[Follow here to generate types](#generating-schema-types) 
