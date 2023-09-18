# @refinedev/nestjs-query

## 1.0.3

### Patch Changes

-   [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
    -   Fix the lodash replacement plugin to skip redundant files.

## 1.0.2

### Patch Changes

-   [#4824](https://github.com/refinedev/refine/pull/4824) [`0206dcb8828`](https://github.com/refinedev/refine/commit/0206dcb8828338ae5e4eef6ed74907e20dbc65ee) Thanks [@aliemir](https://github.com/aliemir)! - feat: initialize nestjs-query package.

    🎉🎉🎉 This is the initial release of our nestjs-query data provider. https://tripss.github.io/nestjs-query 🎉🎉🎉

    Supported features:

    -   filters ✅
    -   sorters ✅
    -   offset pagination ✅
    -   offset connections ✅
    -   subscriptions ✅

    Usage example:

    ```tsx
    import graphqlDataProvider, {
        GraphQLClient,
        liveProvider,
    } from "@refinedev/nestjs-query";
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

## 1.0.1

### Patch Changes

-   [#4824](https://github.com/refinedev/refine/pull/4824) [`0206dcb8828`](https://github.com/refinedev/refine/commit/0206dcb8828338ae5e4eef6ed74907e20dbc65ee) Thanks [@aliemir](https://github.com/aliemir)! - feat: initialize nestjs-query package.

    🎉🎉🎉 This is the initial release of our nestjs-query data provider. https://tripss.github.io/nestjs-query 🎉🎉🎉

    Supported features:

    -   filters ✅
    -   sorters ✅
    -   offset pagination ✅
    -   offset connections ✅
    -   subscriptions ✅

    Usage example:

    ```tsx
    import graphqlDataProvider, {
        GraphQLClient,
        liveProvider,
    } from "@refinedev/nestjs-query";
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
