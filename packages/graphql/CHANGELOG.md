# @pankod/refine-graphql

## 6.4.2

### Patch Changes

-   [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.1

### Patch Changes

-   [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.0

### Minor Changes

-   [#4211](https://github.com/refinedev/refine/pull/4211) [`dca1d8b7ca8`](https://github.com/refinedev/refine/commit/dca1d8b7ca8b84184d00180af7e265c6bd12d708) Thanks [@mattbho](https://github.com/mattbho)! - Custom GraphQL data provider now allow users to provide a custom InputType via the meta field.

## 6.3.0

### Minor Changes

-   [#4211](https://github.com/refinedev/refine/pull/4211) [`dca1d8b7ca8`](https://github.com/refinedev/refine/commit/dca1d8b7ca8b84184d00180af7e265c6bd12d708) Thanks [@mattbho](https://github.com/mattbho)! - Custom GraphQL data provider now allow users to provide a custom InputType via the meta field.

## 6.2.0

### Minor Changes

-   [#4168](https://github.com/refinedev/refine/pull/4168) [`51ab614f75b`](https://github.com/refinedev/refine/commit/51ab614f75bb96d55ff08061e7cb63bdda5f1c8f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize graphql data provider for your needs.

    feat: tests added for utility functions.

    chore: utility functions have been moved to their own files.

## 6.1.0

### Minor Changes

-   [#4168](https://github.com/refinedev/refine/pull/4168) [`51ab614f75b`](https://github.com/refinedev/refine/commit/51ab614f75bb96d55ff08061e7cb63bdda5f1c8f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize graphql data provider for your needs.

    feat: tests added for utility functions.

    chore: utility functions have been moved to their own files.

## 6.0.1

### Patch Changes

-   [#4030](https://github.com/refinedev/refine/pull/4030) [`1b019280252`](https://github.com/refinedev/refine/commit/1b019280252140c251bf464426b0b072acd310fe) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Upgraded `graphql-request` dependency `4.x` to [`5.x`](https://github.com/jasonkuhrt/graphql-request/releases/tag/5.0.0).

## 6.0.0

### Major Changes

-   [#4030](https://github.com/refinedev/refine/pull/4030) [`1b019280252`](https://github.com/refinedev/refine/commit/1b019280252140c251bf464426b0b072acd310fe) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Upgraded `graphql-request` dependency `4.x` to [`5.x`](https://github.com/jasonkuhrt/graphql-request/releases/tag/5.0.0).

## 5.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

    -   `metaData` prop is now deprecated for all data provider methods. Use `meta` prop instead.

        > For backward compatibility, we still support `metaData` prop with refine v4.

        ```diff
        create: async ({
        -    metaData
        +    meta
        }) => {
            ...
        },
        ```

    -   `sort`, `hasPagination`, and `metaData` parameters of `getList` method are now deprecated. Use `sorters`, `pagination`, and `meta` parameters instead.

        > For backward compatibility, we still support `sort`, `hasPagination` and `metaData` props with refine v4.

        ```diff
        getList: async ({
        -    sort
        +    sorters
        -    hasPagination
        +    pagination: { mode: "off" | "server | "client" }
        -    metaData
        +    meta
        }) => {
            ...
        },
        ```

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    **Moving to the `@refinedev` scope 🎉🎉**

    Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

    Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 4.15.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.14.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.13.0

### Minor Changes

-   [#3597](https://github.com/refinedev/refine/pull/3597) [`69140d996ed`](https://github.com/refinedev/refine/commit/69140d996ed20a4afbed34e791082b8dd61450b1) Thanks [@aliemir](https://github.com/aliemir)! - Fix typo in variable names. Exported helper `genereteSort` is renamed to `generateSort` but the old name is still exported for backward compatibility.

## 4.12.0

### Minor Changes

-   [#3597](https://github.com/refinedev/refine/pull/3597) [`69140d996ed`](https://github.com/refinedev/refine/commit/69140d996ed20a4afbed34e791082b8dd61450b1) Thanks [@aliemir](https://github.com/aliemir)! - Fix typo in variable names. Exported helper `genereteSort` is renamed to `generateSort` but the old name is still exported for backward compatibility.

## 4.11.0

### Minor Changes

-   Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

    ```
    {
      operator: "or",
      value: [
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "John Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 30,
            },
          ],
        },
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "JR Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 1,
            },
          ],
        },
      ],
    }
    ```

## 4.10.0

### Minor Changes

-   [#2751](https://github.com/refinedev/refine/pull/2751) [`addff64c77`](https://github.com/refinedev/refine/commit/addff64c777e4c9f044a1a109cb05453e6e9f762) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

    ```
    {
      operator: "or",
      value: [
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "John Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 30,
            },
          ],
        },
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "JR Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 1,
            },
          ],
        },
      ],
    }
    ```

## 4.9.0

### Minor Changes

-   Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.8.0

### Minor Changes

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.7.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.6.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.5.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.4.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.3.0

### Minor Changes

-   ### `@pankod/refine-core`

    -   Added extra params to `useSubscription` and `useResourceSubscription`
    -   `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

    ### `@pankod/refine-hasura`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

    ### `@pankod/refine-nhost`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

    ### `@pankod/refine-graphql`

    -   Added `liveProvider`.

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.42.0

## 4.2.0

### Minor Changes

-   [#2120](https://github.com/refinedev/refine/pull/2120) [`2aa7aace52`](https://github.com/refinedev/refine/commit/2aa7aace52b3f232327db2b0f41f793a2885e788) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ### `@pankod/refine-core`

    -   Added extra params to `useSubscription` and `useResourceSubscription`
    -   `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

    ### `@pankod/refine-hasura`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

    ### `@pankod/refine-nhost`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

    ### `@pankod/refine-graphql`

    -   Added `liveProvider`.

### Patch Changes

-   Updated dependencies [[`2aa7aace52`](https://github.com/refinedev/refine/commit/2aa7aace52b3f232327db2b0f41f793a2885e788)]:
    -   @pankod/refine-core@3.41.0

## 4.1.0

### Minor Changes

-   Upgraded `grapql-request` version in graphql data provider packages.

    Now the `graphql-request` and `qql-query-builder` packages are exported in these packages.

    ```diff
    - import dataProvider from "@pankod/refine-strapi-graphql";
    - import { GraphQLClient } from "graphql-request";
    - import * as qqlQueryBuilder from "gql-query-builder";
    + import dataProvider, { GraphQLClient, qqlQueryBuilder } from "@pankod/refine-strapi-graphql";
    ```

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.38.2

## 4.0.0

### Major Changes

-   [#2113](https://github.com/refinedev/refine/pull/2113) [`c2fb7ac0e9`](https://github.com/refinedev/refine/commit/c2fb7ac0e9b5871de76aa975b2a196ab39fa7a6b) Thanks [@omeraplak](https://github.com/omeraplak)! - Upgraded `grapql-request` version in graphql data provider packages.

    Now the `graphql-request` and `qql-query-builder` packages are exported in these packages.

    ```diff
    - import dataProvider from "@pankod/refine-strapi-graphql";
    - import { GraphQLClient } from "graphql-request";
    - import * as qqlQueryBuilder from "gql-query-builder";
    + import dataProvider, { GraphQLClient, qqlQueryBuilder } from "@pankod/refine-strapi-graphql";
    ```

### Patch Changes

-   Updated dependencies [[`ee8e8bbd6c`](https://github.com/refinedev/refine/commit/ee8e8bbd6cf6ff2ab1a87883e4030205dedb16ea)]:
    -   @pankod/refine-core@3.38.1

## 3.25.4

### Patch Changes

-   Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.25.3

### Patch Changes

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.25.2

### Patch Changes

-   Added `graphql-request` dependency to peerDependencies

## 3.25.1

### Patch Changes

-   [#1930](https://github.com/refinedev/refine/pull/1930) [`04572f5085`](https://github.com/refinedev/refine/commit/04572f5085f024218bd011c388c0dd06e4c4fd55) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `graphql-request` dependency to peerDependencies

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
