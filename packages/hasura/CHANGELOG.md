# @pankod/refine-hasura

## 6.4.2

### Patch Changes

-   [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.1

### Patch Changes

-   [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.0

### Minor Changes

-   [#4174](https://github.com/refinedev/refine/pull/4174) [`d040da9a428`](https://github.com/refinedev/refine/commit/d040da9a4282f0b90385035449c38815b2287ffe) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize hasura data provider for your needs.

    feat: tests added for utility functions.

    chore: utility functions have been moved to their own files.

    chore: `genereteUseListSubscription` is deprecated and has been renamed to `generateListSubscriptionHook`.
    chore: `genereteUseManySubscription` is deprecated and has been renamed to `generateUseManySubscription`.
    chore: `genereteUseOneSubscription` is deprecated and has been renamed to `generateUseOneSubscription`.

### Patch Changes

-   [#4179](https://github.com/refinedev/refine/pull/4179) [`fd808368a36`](https://github.com/refinedev/refine/commit/fd808368a363bf9f4f7ec159676b3f69beb43772) Thanks [@austin047](https://github.com/austin047)! - fix: change enum from lowercase to UPPERCASE in api request for hasura camelCase naming convention

    From the hasura documentation [here](https://hasura.io/docs/latest/schema/postgres/naming-convention/), for the graphql-default naming convention, the naming convention for enums is upper-cased. Currently the request are being made with the lowercase enum and not uppercase.

    The change mainly
    affects `sort`, desc gets changed to DESC and asc gets changed to ASC. the request from the refine client interface maintains the underscore and convertion to uppercase is only done at the API request layer.

## 6.3.0

### Minor Changes

-   [#4174](https://github.com/refinedev/refine/pull/4174) [`d040da9a428`](https://github.com/refinedev/refine/commit/d040da9a4282f0b90385035449c38815b2287ffe) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize hasura data provider for your needs.

    feat: tests added for utility functions.

    chore: utility functions have been moved to their own files.

    chore: `genereteUseListSubscription` is deprecated and has been renamed to `generateListSubscriptionHook`.
    chore: `genereteUseManySubscription` is deprecated and has been renamed to `generateUseManySubscription`.
    chore: `genereteUseOneSubscription` is deprecated and has been renamed to `generateUseOneSubscription`.

### Patch Changes

-   [#4179](https://github.com/refinedev/refine/pull/4179) [`fd808368a36`](https://github.com/refinedev/refine/commit/fd808368a363bf9f4f7ec159676b3f69beb43772) Thanks [@austin047](https://github.com/austin047)! - fix: change enum from lowercase to UPPERCASE in api request for hasura camelCase naming convention

    From the hasura documentation [here](https://hasura.io/docs/latest/schema/postgres/naming-convention/), for the graphql-default naming convention, the naming convention for enums is upper-cased. Currently the request are being made with the lowercase enum and not uppercase.

    The change mainly
    affects `sort`, desc gets changed to DESC and asc gets changed to ASC. the request from the refine client interface maintains the underscore and convertion to uppercase is only done at the API request layer.

## 6.2.0

### Minor Changes

-   [#4144](https://github.com/refinedev/refine/pull/4144) [`06bdf9e4837`](https://github.com/refinedev/refine/commit/06bdf9e4837db83870d30461db00297195e4ecc8) Thanks [@mattbho](https://github.com/mattbho)! - feat: support camelCase graphql naming convention for Hasura

    Previously, our Hasura data provider only supported snake-case naming conventions for operations and type names.

    Hasura recently released a setting allowing for camelCase support.

    The following changes do the Hasura data provider now support the new setting.

    All methods for the Hasura Data provider now support the camelCase `graphql-default` naming convention.

    The data provider now accepts a `namingConvention` field in the options payload.

    Ex:

    ```
    const gqlDataProvider = dataProvider(client, {namingConvention: "graphql-default"});
    ```

    If the `graphql-default` naming convention is provided, all field names and variables will be camel cased. Type names will be PascalCased.

## 6.1.0

### Minor Changes

-   [#4144](https://github.com/refinedev/refine/pull/4144) [`06bdf9e4837`](https://github.com/refinedev/refine/commit/06bdf9e4837db83870d30461db00297195e4ecc8) Thanks [@mattbho](https://github.com/mattbho)! - feat: support camelCase graphql naming convention for Hasura

    Previously, our Hasura data provider only supported snake-case naming conventions for operations and type names.

    Hasura recently released a setting allowing for camelCase support.

    The following changes do the Hasura data provider now support the new setting.

    All methods for the Hasura Data provider now support the camelCase `graphql-default` naming convention.

    The data provider now accepts a `namingConvention` field in the options payload.

    Ex:

    ```
    const gqlDataProvider = dataProvider(client, {namingConvention: "graphql-default"});
    ```

    If the `graphql-default` naming convention is provided, all field names and variables will be camel cased. Type names will be PascalCased.

## 6.0.1

### Patch Changes

-   [#4030](https://github.com/refinedev/refine/pull/4030) [`1b019280252`](https://github.com/refinedev/refine/commit/1b019280252140c251bf464426b0b072acd310fe) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Upgraded `graphql-request` dependency `4.x` to [`5.x`](https://github.com/jasonkuhrt/graphql-request/releases/tag/5.0.0).

## 6.0.0

### Major Changes

-   [#4030](https://github.com/refinedev/refine/pull/4030) [`1b019280252`](https://github.com/refinedev/refine/commit/1b019280252140c251bf464426b0b072acd310fe) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Upgraded `graphql-request` dependency `4.x` to [`5.x`](https://github.com/jasonkuhrt/graphql-request/releases/tag/5.0.0).

## 5.1.2

### Patch Changes

-   [#4001](https://github.com/refinedev/refine/pull/4001) [`e9807e60510`](https://github.com/refinedev/refine/commit/e9807e60510aa689cdb5f36ce878c1398c420721) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: add missing possible id types to hasura data provider

## 5.1.1

### Patch Changes

-   [#4001](https://github.com/refinedev/refine/pull/4001) [`e9807e60510`](https://github.com/refinedev/refine/commit/e9807e60510aa689cdb5f36ce878c1398c420721) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: add missing possible id types to hasura data provider

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

## 4.21.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.20.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.19.0

### Minor Changes

-   [#3752](https://github.com/refinedev/refine/pull/3752) [`426386ca250`](https://github.com/refinedev/refine/commit/426386ca2506de14094ccdde767b7bede210e5e4) Thanks [@zulianrizki](https://github.com/zulianrizki)! - Allow custom ID types with `idType` property when initializing the data provider instance. `idType` can either be `Int`, `uuid` or a function returning the type by resource name.

## 4.18.0

### Minor Changes

-   [#3752](https://github.com/refinedev/refine/pull/3752) [`426386ca250`](https://github.com/refinedev/refine/commit/426386ca2506de14094ccdde767b7bede210e5e4) Thanks [@zulianrizki](https://github.com/zulianrizki)! - Allow custom ID types with `idType` property when initializing the data provider instance. `idType` can either be `Int`, `uuid` or a function returning the type by resource name.

## 4.17.3

### Patch Changes

-   [#3275](https://github.com/refinedev/refine/pull/3275) [`aaa499548cd`](https://github.com/refinedev/refine/commit/aaa499548cddc5365f4d7a04cc55350dc88fba7a) Thanks [@aliemir](https://github.com/aliemir)! - `contains`, `ncontains`, `containss` and `ncontainss` filters were passing the value without wrapping it to `%` characters. This caused the filters to not work as expected. Added a case to the filter value handler to wrap the value with `%` characters. (Resolves #3245)

## 4.17.2

### Patch Changes

-   [#3275](https://github.com/refinedev/refine/pull/3275) [`aaa499548cd`](https://github.com/refinedev/refine/commit/aaa499548cddc5365f4d7a04cc55350dc88fba7a) Thanks [@aliemir](https://github.com/aliemir)! - `contains`, `ncontains`, `containss` and `ncontainss` filters were passing the value without wrapping it to `%` characters. This caused the filters to not work as expected. Added a case to the filter value handler to wrap the value with `%` characters. (Resolves #3245)

## 4.17.1

### Patch Changes

-   [#3275](https://github.com/refinedev/refine/pull/3275) [`aaa499548cd`](https://github.com/refinedev/refine/commit/aaa499548cddc5365f4d7a04cc55350dc88fba7a) Thanks [@aliemir](https://github.com/aliemir)! - `contains`, `ncontains`, `containss` and `ncontainss` filters were passing the value without wrapping it to `%` characters. This caused the filters to not work as expected. Added a case to the filter value handler to wrap the value with `%` characters. (Resolves #3245)

## 4.17.0

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

## 4.16.0

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

## 4.15.2

### Patch Changes

-   Added nested property filter support for `or` filters.

## 4.15.1

### Patch Changes

-   [#2743](https://github.com/refinedev/refine/pull/2743) [`8aecb59d7b`](https://github.com/refinedev/refine/commit/8aecb59d7bf68ae8b9e2e256f1995dd9ba3a8e66) Thanks [@aliemir](https://github.com/aliemir)! - Added nested property filter support for `or` filters.

## 4.15.0

### Minor Changes

-   Added missing implementations for `nnull`, `startswith`, `startswiths`, `nstartswith`, `nstartswiths`, `endswith`, `endswiths`, `nendswith` and `nendswiths` filters by `_similar`, `_nsimilar`, `_regex` and `_iregex` filters from Hasura.

## 4.14.0

### Minor Changes

-   [#2728](https://github.com/refinedev/refine/pull/2728) [`585ba350f8`](https://github.com/refinedev/refine/commit/585ba350f831be93055c58c1ff660645f21bdf77) Thanks [@aliemir](https://github.com/aliemir)! - Added missing implementations for `nnull`, `startswith`, `startswiths`, `nstartswith`, `nstartswiths`, `endswith`, `endswiths`, `nendswith` and `nendswiths` filters by `_similar`, `_nsimilar`, `_regex` and `_iregex` filters from Hasura.

## 4.13.0

### Minor Changes

-   Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.12.0

### Minor Changes

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.11.2

### Patch Changes

-   Added nested sorting feature 💥

*   Added new CRUD Filter Operators with undefined

## 4.11.1

### Patch Changes

-   [#2427](https://github.com/refinedev/refine/pull/2427) [`b21908e872`](https://github.com/refinedev/refine/commit/b21908e87209c3a8825991c6ab829f7c45c19e9b) Thanks [@geoffatsource](https://github.com/geoffatsource)! - Added nested sorting feature 💥

*   [#2456](https://github.com/refinedev/refine/pull/2456) [`f20a0ed621`](https://github.com/refinedev/refine/commit/f20a0ed621f9f038dce762e75a0a99058bcb4edb) Thanks [@workatease](https://github.com/workatease)! - Added new CRUD Filter Operators with undefined

## 4.11.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.10.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.9.4

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 4.9.3

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 4.9.2

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 4.9.1

### Patch Changes

-   [#2366](https://github.com/refinedev/refine/pull/2366) [`de87f13dad`](https://github.com/refinedev/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - `lodash` moved to "dependencies" for CommonJS builds

## 4.9.0

### Minor Changes

-   Add nested filter support to `Hasura` data provider.

    Example usage:

    ```
    filters: [
        {
            field: "category.id",
            operator: "eq",
            value: "8332c138-3231-406d-9655-1328ded9d5f2",
        },
    ],
    ```

## 4.8.0

### Minor Changes

-   [#2347](https://github.com/refinedev/refine/pull/2347) [`628324d950`](https://github.com/refinedev/refine/commit/628324d95090172bc5921cce251c79696183079a) Thanks [@ozkalai](https://github.com/ozkalai)! - Add nested filter support to `Hasura` data provider.

    Example usage:

    ```
    filters: [
        {
            field: "category.id",
            operator: "eq",
            value: "8332c138-3231-406d-9655-1328ded9d5f2",
        },
    ],
    ```

## 4.7.0

### Minor Changes

-   Add React@18 support 🚀

## 4.6.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 4.5.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.4.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.3.2

### Patch Changes

-   Add support for multiple operators on the same field - #2154

## 4.3.1

### Patch Changes

-   [#2157](https://github.com/refinedev/refine/pull/2157) [`6f5ec7c32f`](https://github.com/refinedev/refine/commit/6f5ec7c32f0e1f3510774f8d95935fe5288e2c8a) Thanks [@smparekh](https://github.com/smparekh)! - Add support for multiple operators on the same field - #2154

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
