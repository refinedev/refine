# @refinedev/nestjs-query

## 1.1.1

### Patch Changes

-   [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 1.1.0

### Minor Changes

-   [#5409](https://github.com/refinedev/refine/pull/5409) [`0026fe34d0`](https://github.com/refinedev/refine/commit/0026fe34d0e46209f42e40834c6942ade22f242f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: add `gqlQuery` and `gqlMutation` support.

    Previously, `@refinedev/nestjs-query` package only supported GraphQL operations through `meta.fields`.

    Now we've added `gqlQuery` and `gqlMutation` fields in `meta` object.

    You can utilize these fields along with `graphql-tag` package to build your queries/mutations.

    See the updated documentation for more information: https://refine.dev/docs/packages/data-providers/nestjs-query

    Query Example:

    ```tsx
    import { useList } from "@refinedev/core";
    import gql from "graphql-tag";

    const PRODUCTS_QUERY = gql`
        query ProductsList(
            $paging: OffsetPaging!
            $filter: BlogPostFilter
            $sorting: [BlogPostSort!]!
        ) {
            products(paging: $paging, filter: $filter, sorting: $sorting) {
                nodes {
                    id
                    name
                }
                totalCount
            }
        }
    `;

    const { data } = useList({
        resource: "products",
        meta: { gqlQuery: PRODUCTS_QUERY },
    });
    ```

    Mutation Example:

    ```tsx
    import { useForm } from "@refinedev/core";
    import gql from "graphql-tag";

    const CREATE_PRODUCT_MUTATION = gql`
        mutation CreateProduct($input: CreateProductInput!) {
            createOneProduct(input: $input) {
                id
                name
            }
        }
    `;

    const { formProps } = useForm({
        resource: "products",
        meta: { gqlMutation: CREATE_PRODUCT_MUTATION },
    });
    ```

## 1.0.9

### Patch Changes

-   [#5330](https://github.com/refinedev/refine/pull/5330) [`7c8827b43d`](https://github.com/refinedev/refine/commit/7c8827b43d9e378818be6ee23032925c97ce02d5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: upgrade nock library version to ^13.4.0

## 1.0.8

### Patch Changes

-   [#5114](https://github.com/refinedev/refine/pull/5114) [`00a9252c5de`](https://github.com/refinedev/refine/commit/00a9252c5de86aad544b0ca7d087c532c6d561fa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `dataProvider.custom` uses diffrent client istance.
    From now on, `dataProvider.custom` uses the same client istance as other `dataProvider` methods.

## 1.0.7

### Patch Changes

-   [#5114](https://github.com/refinedev/refine/pull/5114) [`00a9252c5de`](https://github.com/refinedev/refine/commit/00a9252c5de86aad544b0ca7d087c532c6d561fa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `dataProvider.custom` uses diffrent client istance.
    From now on, `dataProvider.custom` uses the same client istance as other `dataProvider` methods.

## 1.0.6

### Patch Changes

-   [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

    -   fix grammar errors.
    -   make all README.md files consistent.
    -   add code example code snippets.

## 1.0.5

### Patch Changes

-   [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

    -   fix grammar errors.
    -   make all README.md files consistent.
    -   add code example code snippets.

## 1.0.4

### Patch Changes

-   [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
    -   Fix the lodash replacement plugin to skip redundant files.

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
