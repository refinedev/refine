# @pankod/refine-appwrite

## 6.4.2

### Patch Changes

-   [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.1

### Patch Changes

-   [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.0

### Minor Changes

-   [#4269](https://github.com/refinedev/refine/pull/4269) [`396bf067e3c`](https://github.com/refinedev/refine/commit/396bf067e3c78aaf533e368a68b3e07e0ca64d82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to appwrite

## 6.3.0

### Minor Changes

-   [#4269](https://github.com/refinedev/refine/pull/4269) [`396bf067e3c`](https://github.com/refinedev/refine/commit/396bf067e3c78aaf533e368a68b3e07e0ca64d82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to appwrite

## 6.2.0

### Minor Changes

-   [#4269](https://github.com/refinedev/refine/pull/4269) [`396bf067e3c`](https://github.com/refinedev/refine/commit/396bf067e3c78aaf533e368a68b3e07e0ca64d82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to appwrite

## 6.1.0

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

## 5.7.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 5.6.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 5.5.0

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

## 5.4.0

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

## 5.3.0

### Minor Changes

-   Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 5.2.0

### Minor Changes

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 5.1.0

### Minor Changes

-   We've added [Appwrite 1.0](https://appwrite.io/1.0) support!

## 5.0.0

### Major Changes

-   [#2528](https://github.com/refinedev/refine/pull/2528) [`97574b512e`](https://github.com/refinedev/refine/commit/97574b512ef458a52716d1f9b61c639622097db5) Thanks [@omeraplak](https://github.com/omeraplak)! - We've added [Appwrite 1.0](https://appwrite.io/1.0) support!

## 4.3.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.2.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.1.0

### Minor Changes

-   -   Added `databaseId` support. The Default value is `default` for backward compability
    -   Upgraded Appwrite SDK to version 9

    ## Usage

    ```tsx
    import { Refine } from "@pankod/refine-core";
    import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

    const APPWRITE_URL = "https://YOUR_COOL_APPWRITE_URL";
    const APPWRITE_PROJECT = "YOUR_PROJECT_ID";

    const appwriteClient = new Appwrite();

    appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

    <Refine
        dataProvider={dataProvider(appwriteClient, {
            databaseId: "default",
        })}
        liveProvider={liveProvider(appwriteClient, {
            databaseId: "default",
        })}
        ...
        ...
    />
    ```

    ## Breaking changes of Appwrite SDK

    ### Usage of Storage

    ```tsx
    //old way
    import { Appwrite } from "@pankod/refine-appwrite";
    const appwriteClient = new Appwrite();

    appwriteClient.storage.createFile("BUCKET_NAME", rcFile.name, rcFile);

    //new way
    const appwriteClient = new Appwrite();
    const storage = new Storage(appwriteClient);
    const { $id } = await storage.createFile(
        "BUCKET_NAME",
        rcFile.name,
        rcFile,
    );
    ```

## 4.0.0

### Major Changes

-   [#2270](https://github.com/refinedev/refine/pull/2270) [`d05e4bdde7`](https://github.com/refinedev/refine/commit/d05e4bdde7b558fb055759efe2fde9dba25f2600) Thanks [@omeraplak](https://github.com/omeraplak)! - - Added `databaseId` support. The Default value is `default` for backward compability

    -   Upgraded Appwrite SDK to version 9

    ## Usage

    ```tsx
    import { Refine } from "@pankod/refine-core";
    import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

    const APPWRITE_URL = "https://YOUR_COOL_APPWRITE_URL";
    const APPWRITE_PROJECT = "YOUR_PROJECT_ID";

    const appwriteClient = new Appwrite();

    appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

    <Refine
        dataProvider={dataProvider(appwriteClient, {
            databaseId: "default",
        })}
        liveProvider={liveProvider(appwriteClient, {
            databaseId: "default",
        })}
        ...
        ...
    />
    ```

    ## Breaking changes of Appwrite SDK

    ### Usage of Storage

    ```tsx
    //old way
    import { Appwrite } from "@pankod/refine-appwrite";
    const appwriteClient = new Appwrite();

    appwriteClient.storage.createFile("BUCKET_NAME", rcFile.name, rcFile);

    //new way
    const appwriteClient = new Appwrite();
    const storage = new Storage(appwriteClient);
    const { $id } = await storage.createFile(
        "BUCKET_NAME",
        rcFile.name,
        rcFile,
    );
    ```

## 3.27.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.26.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.2

### Patch Changes

-   Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.25.1

### Patch Changes

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
