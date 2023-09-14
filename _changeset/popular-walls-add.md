---
"@refinedev/nestjs-query": patch
---

feat: initialize nestjs-query package.

🎉🎉🎉 This is the initial release of our nestjs-query data provider. https://tripss.github.io/nestjs-query 🎉🎉🎉

Supported features:

-   filters ✅
-   sorters ✅
-   offset pagination ✅
-   offset connections ✅
-   subscriptions ✅

Usage example:

```tsx
import graphqlDataProvider, { GraphQLClient, liveProvider } from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";

const API_URL = `https://api.nestjs-query.refine.dev/graphql`;
const WS_URL = `wss://api.nestjs-query.refine.dev/graphql`;

const client = new GraphQLClient(API_URL);
const wsClient = createClient(WS_URL);

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = liveProdiver(wsClient);

export const App = () => (
    <Refine dataProvider={dataProvider} liveProvider={liveProvider}>
        //...
    </Refine>
);
```
