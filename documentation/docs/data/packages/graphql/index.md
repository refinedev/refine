---
title: GraphQL
source: https://github.com/refinedev/refine/tree/master/packages/graphql
swizzle: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Refine provides a data provider for GraphQL APIs that has all the features of Refine without giving up the GraphQL features.

:::simple Good to know

- GraphQL Data Provider expects [`@urql/core`](https://github.com/urql-graphql/urql) client instance.
- You are responsible for passing `gqlQuery`, `gqlMutation`. `gql` export of `@urql/core` can be used to write GraphQL Operations.
- To learn more about data fetching in Refine, check out the [Data Fetching](/docs/guides-concepts/data-fetching) guide.

:::

## Installation

<InstallPackagesCommand args="@refinedev/graphql @urql/core graphql-ws"/>

## Usage

We'll create a GraphQL Client with our API url and pass it to the `dataProvider` function to create a data provider.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import { Client, fetchExchange } from "@urql/core";
import createDataProvider from "@refinedev/graphql";

export const API_URL = "https://api.nestjs-query.refine.dev/graphql";

const gqlClient = new Client({ url: API_URL, exchanges: [fetchExchange] });

const dataProvider = createDataProvider(gqlClient);

const App = () => <Refine dataProvider={dataProvider}>{/* ... */}</Refine>;
```

### Options

It's also possible to pass a 2nd parameter to GraphQL data provider. 2nd parameter is an object that consist of builder pieces for each data provider method such as getList, updateMany, etc...
All fields in this options config are optional and fields that are provided will be deep merged into default options. So you can just pass certain methods you want to override, and the rest will fallback to default.

Let's say you have the following query:

```graphql
query PostList($where: JSON, $sort: String) {
  allBlogPosts(where: $where, sort: $sort) {
    nodes {
      id
      title
      content
      category {
        id
      }
    }
  }
}
```

By default, our data provider expects a plural form of the resource in the response, so if you have `allPosts`, you would need to swizzle GraphQL data provider and customize it yourself. With these options, we help you extract data from your response. So you don't need to create custom data provider for such cases.

```ts
import dataProvider, {
  GraphQLClient,
  defaultGetDataFn,
} from "@refinedev/graphql";
import camelCase from "camelcase";

const client = /** client init **/

const dataProvider = createDataProvider(client, {
  getList: {
     dataMapper: (response: OperationResult<any>, params: GetListParams) => {
      // resource: blogPosts
      const operationName = `all${camelcase(resource, {pascal: true})}`
      // operationName: allBlogPosts
      return response.data?.[operationName].nodes;
    },
  }
})
```

```typescript
type ActionMethod = {
  dataMapper: (
    response: OperationResult<any>,
    params: GetOneParams | GetListParams | etc,
  ) => {} | [];
  buildVariables: (params: CreateParams | UpdateParams | etc) => {};
};
```

We have ActionMethod type for each of the data provider actions. Additionally, `getOne` has `convertMutationToQuery` and `getList` has `getTotalCount` methods.

`convertMutationToQuery` method on `getOne` might be needed because `useForm` hook also uses it. `useForm` hook has an optional gqlQuery field, we may only get `gqlMutation`. For this reason, we need to convert mutation to query to get initial data on edit, if needed.

`getTotalCount` can be used to extract total count of the list query from the response.

<details>
<summary>See all options</summary>

```typescript
import type {
  CreateManyParams,
  CreateParams,
  CustomParams,
  DeleteManyParams,
  DeleteOneParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from "@refinedev/core";
import type { OperationResult } from "@urql/core";
import { buildSorters, buildFilters, buildPagination } from "../utils";

export const defaultOptions = {
  create: {
    dataMapper: (response: OperationResult<any>, params: CreateParams<any>) =>
      response,
    buildVariables: (params: CreateParams<any>) => params.variables,
  },
  createMany: {
    dataMapper: (
      response: OperationResult<any>,
      params: CreateManyParams<any>,
    ) => response,
    buildVariables: (params: CreateManyParams<any>) => params.variables,
  },
  getOne: {
    dataMapper: (response: OperationResult<any>, params: GetOneParams) =>
      response,
    buildVariables: (params: GetOneParams) => ({ id: params.id }),
    convertMutationToQuery: (params: GetOneParams) => {},
  },
  getList: {
    dataMapper: (response: OperationResult<any>, params: GetListParams) =>
      response,
    getTotalCount: (response: OperationResult<any>, params: GetListParams) => 0,
    buildSorters: (params: GetListParams) => buildSorters(params.sorters),
    buildFilters: (params: GetListParams) => buildFilters(params.filters),
    buildPagination: (params: GetListParams) =>
      buildPagination(params.pagination),
  },
  getMany: {
    buildFilter: (params: GetManyParams) => ({
      filter: { id: { in: params.ids } },
    }),
    dataMapper: (response: OperationResult<any>, params: GetManyParams) =>
      response,
  },
  update: {
    dataMapper: (response: OperationResult<any>, params: UpdateParams<any>) =>
      response,
    buildVariables: (params: UpdateParams<any>) => params.variables,
  },
  updateMany: {
    dataMapper: (
      response: OperationResult<any>,
      params: UpdateManyParams<any>,
    ) => response,
    buildVariables: (params: UpdateManyParams<any>) => params.variables,
  },
  deleteOne: {
    dataMapper: (
      response: OperationResult<any>,
      params: DeleteOneParams<any>,
    ) => response,
  },
  deleteMany: {
    dataMapper: (
      response: OperationResult<any>,
      params: DeleteManyParams<any>,
    ) => response,
    buildVariables: (params: DeleteManyParams<any>) => params.variables,
    custom: {
      dataMapper: (response: OperationResult<any>, params: CustomParams) =>
        response.data,
      buildVariables: (params: CustomParams) => {},
    },
  },
};
```

</details>

## Realtime

`@refinedev/graphql` also provides a `createLiveProvider` function to enable realtime features of Refine. These features are powered by GraphQL subscriptions and uses [`graphql-ws`](https://the-guild.dev/graphql/ws) to handle the connections.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import { createLiveProvider } from "@refinedev/graphql";
import createClient from "graphql-ws";

const WSS_URL = "wss://api.nestjs-query.refine.dev/graphql";
const wsClient = createClient({ url: WSS_URL });

const liveProvider = createLiveProvider(wsClient);

const App = () => (
  <Refine
    // highlight-next-line
    liveProvider={liveProvider}
    options={{ liveMode: "auto" }}
  >
    {/* ... */}
  </Refine>
);
```

## Queries and Mutations

You can use `gql` export from `@urql/core` to write your queries and mutations.

Refine hooks' `meta` object has `gqlQuery` and `gqlMutation` properties, you can use them to write your queries and mutations.

As a best-practice, we suggest writing your queries/mutations in a separate file, next to the component that uses it.

```tsx title="src/pages/posts/queries.ts"
import gql from "graphql-tag";

const POSTS_LIST_QUERY = gql`
  query PostList($where: JSON, $sort: String) {
    posts(where: $where, sort: $sort) {
      id
      title
      content
      category {
        id
      }
    }
  }
`;

const POST_CREATE_MUTATION = gql`
  mutation createPost($input: createPostInput!) {
    createPost(input: $input) {
      id
      title
      content
      category {
        id
      }
    }
  }
`;
```

```tsx title="src/pages/posts/list.tsx"
import { useList } from "@refinedev/core";
import { POSTS_LIST_QUERY } from "./queries";

export const PostListPage () => {
  const { data } = useList({
    resource: "posts",
    // highlight-next-line
    meta: { gqlQuery: POSTS_LIST_QUERY },
  });

  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

```tsx title="src/pages/posts/create.tsx"
import { useForm } from "@refinedev/core";
import { POST_CREATE_MUTATION } from "./queries";

export const PostCreatePage () => {
  const { formProps } = useForm({
    resource: "posts",
    // highlight-next-line
    meta: { gqlMutation: POST_CREATE_MUTATION },
  });

  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

## Authentication

If your API uses authentication, you can easily provide a custom fetcher for the requests and handle the authentication logic there. When creating a GraphQL Client, you can pass a `fetch` function to the client options. This function will be used to append the authentication headers to the requests.

TBA: https://commerce.nearform.com/open-source/urql/docs/advanced/authentication/

```tsx title="data-provider.tsx"
import graphqlDataProvider, { GraphQLClient } from "@refinedev/graphql";

const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        /**
         * For demo purposes, we're using `localStorage` to access the token.
         * You can use your own authentication logic here.
         * In real world applications, you'll need to handle it in sync with your `authProvider`.
         */
        // highlight-next-line
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
});

/**
 * Create the data provider with the custom client.
 */
const dataProvider = graphqlDataProvider(client);
```

## Usage with Inferencer

You can also use `@refinedev/inferencer` package to generate sample codes for your views. Since the GraphQL data providers rely on `meta` fields, you'll need to provide some `meta` values beforehand and then Inferencer will use these values to infer the fields of the data provider's response, generate a code and a preview.

[Check out Inferencer docs for more information. &#8594](/docs/packages/list-of-packages#usage-with-graphql-backends-and-meta-values)

## Example

<CodeSandboxExample path="data-provider-nestjs-query" />

[data-provider]: /docs/data/data-provider
