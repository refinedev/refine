# @pankod/refine-simple-rest

## 4.5.0

### Minor Changes

-   [#4177](https://github.com/refinedev/refine/pull/4177) [`623691b10f0`](https://github.com/refinedev/refine/commit/623691b10f07f13af11ed56c24161cc0dc9dd3f1) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: add the abilities to pass custom headers and custom http method to the request

    Example of changing the http method:

    ```tsx
    import { useUpdate } from "@refinedev/core";

    const { mutate } = useUpdate();

    mutate({
        resource: "posts",
        id: 1,
        variables: {
            title: "New title",
        },
        //highlight-start
        meta: {
            method: "put",
        },
        //highlight-end
    });
    ```

    Example of passing custom headers:

    ```tsx
    import { useOne } from "@refinedev/core";

    useOne({
        resource: "posts",
        id: 1,
        //highlight-start
        meta: {
            headers: {
                "X-Custom-Header": "Custom header value",
            },
        },
        //highlight-end
    });
    ```

## 4.4.0

### Minor Changes

-   [#4177](https://github.com/refinedev/refine/pull/4177) [`623691b10f0`](https://github.com/refinedev/refine/commit/623691b10f07f13af11ed56c24161cc0dc9dd3f1) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: add the abilities to pass custom headers and custom http method to the request

    Example of changing the http method:

    ```tsx
    import { useUpdate } from "@refinedev/core";

    const { mutate } = useUpdate();

    mutate({
        resource: "posts",
        id: 1,
        variables: {
            title: "New title",
        },
        //highlight-start
        meta: {
            method: "put",
        },
        //highlight-end
    });
    ```

    Example of passing custom headers:

    ```tsx
    import { useOne } from "@refinedev/core";

    useOne({
        resource: "posts",
        id: 1,
        //highlight-start
        meta: {
            headers: {
                "X-Custom-Header": "Custom header value",
            },
        },
        //highlight-end
    });
    ```

## 4.3.0

### Minor Changes

-   [#4162](https://github.com/refinedev/refine/pull/4162) [`4ebd298fa8a`](https://github.com/refinedev/refine/commit/4ebd298fa8a9245a17fb724ae5817908cbb13926) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `requiredPackages` added to refine.config.js for CLI to automatically install required packages for the project.

## 4.2.0

### Minor Changes

-   [#4162](https://github.com/refinedev/refine/pull/4162) [`4ebd298fa8a`](https://github.com/refinedev/refine/commit/4ebd298fa8a9245a17fb724ae5817908cbb13926) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `requiredPackages` added to refine.config.js for CLI to automatically install required packages for the project.

## 4.1.0

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

## 3.39.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.38.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.37.4

### Patch Changes

-   [#3115](https://github.com/refinedev/refine/pull/3115) [`836f7091c13`](https://github.com/refinedev/refine/commit/836f7091c130ee0220105646869b484253525a7d) Thanks [@aliemir](https://github.com/aliemir)! - Add `refine.config.js` to included package files.

## 3.37.3

### Patch Changes

-   [#3115](https://github.com/refinedev/refine/pull/3115) [`836f7091c13`](https://github.com/refinedev/refine/commit/836f7091c130ee0220105646869b484253525a7d) Thanks [@aliemir](https://github.com/aliemir)! - Add `refine.config.js` to included package files.

## 3.37.2

### Patch Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` message to include extra information and usage example.

## 3.37.1

### Patch Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` message to include extra information and usage example.

## 3.37.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Moved helpers to separate files and updated the exports to make it compatible with `swizzle` feature.
    -   Added `refine.config.js` to configure the `swizzle` feature.
    -   `stringify` helper is now exported from `@pankod/refine-simple-rest` package.
    -   `axios` instance is now exported from `@pankod/refine-simple-rest` package to allow users to configure the data provider without adding `axios` dependency.

## 3.36.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Moved helpers to separate files and updated the exports to make it compatible with `swizzle` feature.
    -   Added `refine.config.js` to configure the `swizzle` feature.
    -   `stringify` helper is now exported from `@pankod/refine-simple-rest` package.
    -   `axios` instance is now exported from `@pankod/refine-simple-rest` package to allow users to configure the data provider without adding `axios` dependency.

## 3.35.2

### Patch Changes

-   [#2980](https://github.com/refinedev/refine/pull/2980) [`b8f8b0eab9`](https://github.com/refinedev/refine/commit/b8f8b0eab98e94ac243bd5aed98fe0e55e7e6762) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added warning on unsupported filters

## 3.35.1

### Patch Changes

-   [#2980](https://github.com/refinedev/refine/pull/2980) [`b8f8b0eab9`](https://github.com/refinedev/refine/commit/b8f8b0eab98e94ac243bd5aed98fe0e55e7e6762) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added warning on unsupported filters

## 3.35.0

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

### Patch Changes

-   Fixed using `data` in `axios'` `delete` function

## 3.34.0

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

### Patch Changes

-   [#2790](https://github.com/refinedev/refine/pull/2790) [`8144e10156`](https://github.com/refinedev/refine/commit/8144e10156c2691f4f298e27720eea183241e971) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed using `data` in `axios'` `delete` function

## 3.33.0

### Minor Changes

-   Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

-   Remove unimplemented `createMany`, `updateMany` and `deleteMany` functions.

## 3.32.0

### Minor Changes

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Remove unimplemented `createMany`, `updateMany` and `deleteMany` functions.

## 3.31.0

### Minor Changes

-   Fixed payload data in delete on nestjsx data provider custom method.

## 3.30.0

### Minor Changes

-   [#2465](https://github.com/refinedev/refine/pull/2465) [`4d07f33993`](https://github.com/refinedev/refine/commit/4d07f33993fa5a6facaf33cd651ef94892d15dae) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed payload data in delete on nestjsx data provider custom method.

## 3.29.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.28.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.27.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.26.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.6

### Patch Changes

-   Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.25.5

### Patch Changes

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.25.4

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

-   Updated dependencies []:
    -   @pankod/refine-core@3.29.0

## 3.25.3

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

-   Updated dependencies []:
    -   @pankod/refine-core@3.28.0

## 3.25.2

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

-   Updated dependencies []:
    -   @pankod/refine-core@3.27.0

## 3.25.1

### Patch Changes

-   [#1899](https://github.com/refinedev/refine/pull/1899) [`fbfea418a0`](https://github.com/refinedev/refine/commit/fbfea418a024a527a2b432c634f46a96d4f70d88) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

-   Updated dependencies [[`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746)]:
    -   @pankod/refine-core@3.26.0

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
