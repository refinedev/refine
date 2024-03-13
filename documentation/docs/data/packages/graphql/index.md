---
title: GraphQL
source: https://github.com/refinedev/refine/tree/master/packages/graphql
swizzle: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Refine provides a data provider for GraphQL APIs that has all the features of Refine without giving up the GraphQL features.

:::simple Good to know

- This library uses [`graphql-request@5`](https://github.com/jasonkuhrt/graphql-request) to handle the requests.
- To build queries and mutations, [`gql-query-builder`](https://github.com/atulmy/gql-query-builder) is used.
- You can also use [`graphql-tag`](https://www.npmjs.com/package/graphql-tag) to write your queries and mutations.
- To learn more about data fetching in Refine, check out the [Data Fetching](/docs/guides-concepts/data-fetching) guide.

:::

## Installation

<InstallPackagesCommand args="@refinedev/graphql"/>

## Usage

We'll create a GraphQL Client with our API url and pass it to the `dataProvider` function to create a data provider.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider, { GraphQLClient } from "@refinedev/graphql";

// highlight-next-line
const client = new GraphQLClient("https://api.example.com/graphql");

const App = () => (
  <Refine
    // highlight-next-line
    dataProvider={dataProvider(client)}
  >
    {/* ... */}
  </Refine>
);
```

## Realtime

`@refinedev/graphql` also provides a `liveProvider` to enable realtime features of Refine. These features are powered by GraphQL subscriptions and uses [`graphql-ws`](https://the-guild.dev/graphql/ws) to handle the connections.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
// highlight-next-line
import dataProvider, {
  GraphQLClient,
  liveProvider,
  graphqlWS,
} from "@refinedev/graphql";

const client = new GraphQLClient("https://api.example.com/graphql");
// highlight-next-line
const wsClient = graphqlWS.createClient({
  url: "wss://api.example.com/graphql",
});

const App = () => (
  <Refine
    dataProvider={dataProvider(client)}
    // highlight-next-line
    liveProvider={liveProvider(wsClient)}
    options={{ liveMode: "auto" }}
  >
    {/* ... */}
  </Refine>
);
```

## Queries and Mutations

You can use [`graphql-tag`](https://www.npmjs.com/package/graphql-tag) to write your queries and mutations.

Refine hooks' `meta` object has optional `gqlQuery` and `gqlMutation` properties, you can use them to write your queries and mutations.

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

## GraphQL Query Builder

[GraphQL Query Builder](https://github.com/atulmy/gql-query-builder) allows us to build queries and mutations. The `getList`, `getMany`, and, `getOne` methods in our [`dataProvider`][data-provider] generate a query to send a request. On the other hand, the `create`, `createMany`, `update`, `updateMany`, `deleteOne`, and, `deleteMany` methods generate a mutation to send a request.

In order to create a GraphQL query, our [`dataProvider`][data-provider] has to take some options, such as specifying which fields will come in response, we pass these options to our [`dataProvider`][data-provider] methods with `MetaDataQuery`.

[Refer to the `meta` properties for detailed usage. &#8594](https://github.com/atulmy/gql-query-builder#options)

Hooks and components that support `meta`:

| Supported data hooks                                  | Supported other hooks                                                                  | Supported components                                                                         |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`useUpdate` &#8594](/docs/data/hooks/use-update)     | [`useForm` &#8594](/docs/data/hooks/use-form)                                          | [`DeleteButton` &#8594](/docs/ui-integrations/ant-design/components/buttons/delete-button)   |
| [`useUpdateMany` &#8594](/docs/data/hooks/use-update) | [`useModalForm` &#8594](/docs/ui-integrations/ant-design/hooks/use-modal-form)         | [`RefreshButton` &#8594](/docs/ui-integrations/ant-design/components/buttons/refresh-button) |
| [`useDelete` &#8594](/docs/data/hooks/use-delete)     | [`useDrawerForm` &#8594](/docs/ui-integrations/ant-design/hooks/use-drawer-form)       |                                                                                              |
| [`useDeleteMany` &#8594](/docs/data/hooks/use-delete) | [`useStepsForm` &#8594](/docs/ui-integrations/ant-design/hooks/use-steps-form)         |                                                                                              |
| [`useCreate` &#8594](/docs/data/hooks/use-create)     | [`useTable` &#8594](/docs/data/hooks/use-table)                                        |                                                                                              |
| [`useCreateMany` &#8594](/docs/data/hooks/use-create) | [`useEditableTable` &#8594](/docs/ui-integrations/ant-design/hooks/use-editable-table) |                                                                                              |
| [`useList` &#8594](/docs/data/hooks/use-list)         | [`useSimpleList` &#8594](/docs/ui-integrations/ant-design/hooks/use-simple-list)       |                                                                                              |
| [`useOne` &#8594](/docs/data/hooks/use-one)           | [`useShow` &#8594](/docs/data/hooks/use-show)                                          |                                                                                              |
| [`useMany` &#8594](/docs/data/hooks/use-many)         | [`useExport` &#8594](/docs/core/hooks/utilities/use-export)                            |                                                                                              |
| [`useCustom` &#8594](/docs/data/hooks/use-custom)     | [`useCheckboxGroup` &#8594](/docs/ui-integrations/ant-design/hooks/use-checkbox-group) |                                                                                              |
|                                                       | [`useSelect` &#8594](/docs/data/hooks/use-select)                                      |                                                                                              |
|                                                       | [`useRadioGroup` &#8594](/docs/ui-integrations/ant-design/hooks/use-radio-group)       |                                                                                              |

## Usage with Inferencer

You can also use `@refinedev/inferencer` package to generate sample codes for your views. Since the GraphQL data providers rely on `meta` fields, you'll need to provide some `meta` values beforehand and then Inferencer will use these values to infer the fields of the data provider's response, generate a code and a preview.

[Check out Inferencer docs for more information. &#8594](/docs/packages/list-of-packages#usage-with-graphql-backends-and-meta-values)

## Example

<CodeSandboxExample path="data-provider-nestjs-query" />

[data-provider]: /docs/data/data-provider
