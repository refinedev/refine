---
title: Nest.js Query
source: https://github.com/refinedev/refine/tree/master/packages/nestjs-query
---

Refine provides a data provider for APIs powered with [Nest.js Query](https://doug-martin.github.io/nestjs-query/), a module for Nest.js that provides easier ways to build CRUD graphql APIs.

:::simple Good to know

- This library uses [`graphql-request@5`](https://github.com/jasonkuhrt/graphql-request) to handle the requests.
- To learn more about data fetching in Refine, check out the [Data Fetching](/docs/guides-concepts/data-fetching) guide.
- To learn more about realtime features of Refine, check out the [Realtime](/docs/guides-concepts/realtime) guide.

:::

## Installation

```bash
npm i @refinedev/nestjs-query
```

If you're going to use realtime features, you'll also need to install the `graphql-ws` package to handle graphql subscriptions.

```bash
npm i graphql-ws
```

## Usage

We'll create a GraphQL Client with our API url and pass it to the `dataProvider` function to create a data provider.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider, { GraphQLClient } from "@refinedev/nestjs-query";

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

### Realtime

`@refinedev/nestjs-query` also provides a `liveProvider` to enable realtime features of Refine. These features are powered by GraphQL subscriptions and uses [`graphql-ws`](https://the-guild.dev/graphql/ws) to handle the connections.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
// highlight-next-line
import dataProvider, { GraphQLClient, liveProvider } from "@refinedev/nestjs-query";
// highlight-next-line
import { createClient } from "graphql-ws";

const client = new GraphQLClient("https://api.example.com/graphql");
// highlight-next-line
const wsClient = createClient({ url: "wss://api.example.com/graphql" });

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

## Authentication

If your API uses authentication, you can easily provide a custom fetcher for the requests and handle the authentication logic there. When creating a GraphQL Client, you can pass a `fetch` function to the client options. This function will be used to append the authentication headers to the requests.

```tsx title="data-provider.tsx"
import graphqlDataProvider, { GraphQLClient } from "@refinedev/nestjs-query";

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

## Example

<CodeSandboxExample path="data-provider-nestjs-query" />
