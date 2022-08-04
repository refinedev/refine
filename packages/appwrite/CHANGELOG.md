# @pankod/refine-appwrite

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

-   [#2270](https://github.com/pankod/refine/pull/2270) [`d05e4bdde7`](https://github.com/pankod/refine/commit/d05e4bdde7b558fb055759efe2fde9dba25f2600) Thanks [@omeraplak](https://github.com/omeraplak)! - - Added `databaseId` support. The Default value is `default` for backward compability

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

-   [#2217](https://github.com/pankod/refine/pull/2217) [`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

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

-   [#2050](https://github.com/pankod/refine/pull/2050) [`635cfe9fdb`](https://github.com/pankod/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/pankod/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/pankod/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
