---
title: Hasura
source: https://github.com/refinedev/refine/tree/master/packages/hasura
swizzle: true
---

Refine provides a data provider for APIs powered with [Hasura](https://hasura.io), a platform to build and deploy GraphQL APIs.

:::simple Good to know

- Hasura data provider doesn't support `meta.gqlQuery` and `meta.gqlMutation` fields yet. We'll add support in the future.

- This library uses [`graphql-request@5`](https://github.com/jasonkuhrt/graphql-request) to handle the requests.
- The [`graphql-ws@5`](https://the-guild.dev/graphql/ws) package, used to handle the realtime subscriptions is included in the package.
- To learn more about data fetching in Refine, check out the [Data Fetching](/docs/guides-concepts/data-fetching) guide.
- To learn more about realtime features of Refine, check out the [Realtime](/docs/guides-concepts/realtime) guide.

:::

## Installation

<InstallPackagesCommand args="@refinedev/hasura"/>

## Usage

We'll create a GraphQL Client with our API url and pass it to the `dataProvider` function to create a data provider.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider, { GraphQLClient } from "@refinedev/hasura";

// highlight-start
const client = new GraphQLClient("<API_URL>", {
  headers: {
    "x-hasura-role": "public",
  },
});
// highlight-end

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

`@refinedev/hasura` also provides a `liveProvider` to enable realtime features of Refine. These features are powered by GraphQL subscriptions and uses [`graphql-ws`](https://the-guild.dev/graphql/ws) to handle the connections.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
// highlight-next-line
import dataProvider, { GraphQLClient, liveProvider, graphqlWS } from "@refinedev/hasura";

const client = new GraphQLClient("<API_URL>", {
  headers: {
    "x-hasura-role": "public",
  },
});
// highlight-next-line
const wsClient = graphqlWS.createClient({
  url: "<WS_URL>",
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

## Example

<CodeSandboxExample path="data-provider-hasura" />
