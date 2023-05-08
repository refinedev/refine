# @pankod/refine-medusa

## 2.4.2

### Patch Changes

-   [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 2.4.1

### Patch Changes

-   [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 2.4.0

### Minor Changes

-   [#4281](https://github.com/refinedev/refine/pull/4281) [`ebfb075f07e`](https://github.com/refinedev/refine/commit/ebfb075f07e793e5ff7c5c3f712136fb54d8b0de) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to medusa

## 2.3.0

### Minor Changes

-   [#4281](https://github.com/refinedev/refine/pull/4281) [`ebfb075f07e`](https://github.com/refinedev/refine/commit/ebfb075f07e793e5ff7c5c3f712136fb54d8b0de) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to medusa

## 2.2.0

### Minor Changes

-   [#4281](https://github.com/refinedev/refine/pull/4281) [`ebfb075f07e`](https://github.com/refinedev/refine/commit/ebfb075f07e793e5ff7c5c3f712136fb54d8b0de) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to medusa

## 2.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    `AuthProvider` is renamed to `LegacyAuthProvider` with refine@4. Components and functions are updated to support `LegacyAuthProvider`.

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

## 1.9.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 1.8.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 1.7.2

### Patch Changes

-   Fixed adding `/store` suffix to the end of Medusa API URL

## 1.7.1

### Patch Changes

-   [#2824](https://github.com/refinedev/refine/pull/2824) [`51b01f3891`](https://github.com/refinedev/refine/commit/51b01f3891740e8824527d9584030d9c4cc4fa08) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed adding `/store` suffix to the end of Medusa API URL

## 1.7.0

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

## 1.6.0

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

## 1.5.0

### Minor Changes

-   Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 1.4.0

### Minor Changes

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 1.3.0

### Minor Changes

-   Fixed payload data in delete on nestjsx data provider custom method.

## 1.2.0

### Minor Changes

-   [#2465](https://github.com/refinedev/refine/pull/2465) [`4d07f33993`](https://github.com/refinedev/refine/commit/4d07f33993fa5a6facaf33cd651ef94892d15dae) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed payload data in delete on nestjsx data provider custom method.

## 1.1.0

### Minor Changes

-   Updated `checkError` methods of `authProvider`

### Patch Changes

-   Removed api url `/store` suffix from `authProvider`.

*   Fix Medusa data provider return type

## 1.0.0

### Major Changes

-   [#2142](https://github.com/refinedev/refine/pull/2142) [`dd00de215a`](https://github.com/refinedev/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `checkError` methods of `authProvider`

### Patch Changes

-   [#2142](https://github.com/refinedev/refine/pull/2142) [`dd00de215a`](https://github.com/refinedev/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Removed api url `/store` suffix from `authProvider`.

*   [#2142](https://github.com/refinedev/refine/pull/2142) [`dd00de215a`](https://github.com/refinedev/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Fix Medusa data provider return type

## 0.5.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 0.4.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 0.3.2

### Patch Changes

-   Fixed mismatch in `authProvider.login` for email and username

## 0.3.1

### Patch Changes

-   [#2242](https://github.com/refinedev/refine/pull/2242) [`7ed5b7b05d`](https://github.com/refinedev/refine/commit/7ed5b7b05dffdd4e29412f9a74097b2abdfa0017) Thanks [@ozkalai](https://github.com/ozkalai)! - Fixed mismatch in `authProvider.login` for email and username

## 0.3.0

### Minor Changes

-   Initialized [Medusa](https://medusajs.com/) data provider for Refine. Currently we're supporting Medusa's StoreFront API as a data provider and also auth provider.

## 0.2.0

### Minor Changes

-   [#2235](https://github.com/refinedev/refine/pull/2235) [`488259bd38`](https://github.com/refinedev/refine/commit/488259bd385ec8f659860a03367c2b5bad992912) Thanks [@ozkalai](https://github.com/ozkalai)! - Initialized [Medusa](https://medusajs.com/) data provider for Refine. Currently we're supporting Medusa's StoreFront API as a data provider and also auth provider.
