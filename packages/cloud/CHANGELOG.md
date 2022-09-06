# @pankod/refine-cloud

## 2.4.0

### Minor Changes

-   Added `useCloudQuery` and `useCloudMutation` for refine cloud queries.

    **Usage**

    ```tsx
    import { useCloudQuery, useCloudMutation } from "@pankod/refine-cloud";

    const { data } = useCloudQuery({
        key: "postgres-list-user",
        config: {},
        customParams: {
            name: "John Doe",
        },
    });

    const { mutation } = useCloudMutation();

    mutation({
        key: "postgres-create-user",
        config: {},
        customParams: {
            name: "John Doe",
            email: "johndoe@mail.com",
        },
    });
    ```

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 2.3.0

### Minor Changes

-   Added `useCloudQuery` and `useCloudMutation` for refine cloud queries.

    **Usage**

    ```tsx
    import { useCloudQuery, useCloudMutation } from "@pankod/refine-cloud";

    const { data } = useCloudQuery({
        key: "postgres-list-user",
        config: {},
        customParams: {
            name: "John Doe",
        },
    });

    const { mutation } = useCloudMutation();

    mutation({
        key: "postgres-create-user",
        config: {},
        customParams: {
            name: "John Doe",
            email: "johndoe@mail.com",
        },
    });
    ```

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 2.2.0

### Minor Changes

-   Added `useCloudQuery` and `useCloudMutation` for refine cloud queries.

    **Usage**

    ```tsx
    import { useCloudQuery, useCloudMutation } from "@pankod/refine-cloud";

    const { data } = useCloudQuery({
        key: "postgres-list-user",
        config: {},
        customParams: {
            name: "John Doe",
        },
    });

    const { mutation } = useCloudMutation();

    mutation({
        key: "postgres-create-user",
        config: {},
        customParams: {
            name: "John Doe",
            email: "johndoe@mail.com",
        },
    });
    ```

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 2.1.0

### Minor Changes

-   [#2328](https://github.com/pankod/refine/pull/2328) [`a44cb8cea6`](https://github.com/pankod/refine/commit/a44cb8cea6ff6baf8481ea47688c5707095808ab) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added `useCloudQuery` and `useCloudMutation` for refine cloud queries.

    **Usage**

    ```tsx
    import { useCloudQuery, useCloudMutation } from "@pankod/refine-cloud";

    const { data } = useCloudQuery({
        key: "postgres-list-user",
        config: {},
        customParams: {
            name: "John Doe",
        },
    });

    const { mutation } = useCloudMutation();

    mutation({
        key: "postgres-create-user",
        config: {},
        customParams: {
            name: "John Doe",
            email: "johndoe@mail.com",
        },
    });
    ```

### Patch Changes

-   [#2366](https://github.com/pankod/refine/pull/2366) [`de87f13dad`](https://github.com/pankod/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - `lodash` moved to "dependencies" for CommonJS builds

## 2.0.4

### Patch Changes

-   `lodash` moved to dependencies.

## 2.0.3

### Patch Changes

-   [#2350](https://github.com/pankod/refine/pull/2350) [`f8e5d99598`](https://github.com/pankod/refine/commit/f8e5d99598265af434f25fde104fafc9b7cac792) Thanks [@ozkalai](https://github.com/ozkalai)! - `lodash` moved to dependencies.

## 2.0.2

### Patch Changes

-   Upgraded `react-query` version to 4.

## 2.0.1

### Patch Changes

-   [#2260](https://github.com/pankod/refine/pull/2260) [`a97ec592df`](https://github.com/pankod/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgraded `react-query` version to 4.

## 2.0.0

### Minor Changes

-   Add React@18 support 🚀

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-sdk@0.2.0

## 1.0.0

### Minor Changes

-   [#1718](https://github.com/pankod/refine/pull/1718) [`b38620d842`](https://github.com/pankod/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

### Patch Changes

-   Updated dependencies [[`b38620d842`](https://github.com/pankod/refine/commit/b38620d84237e13212811daada7b49ee654c70eb)]:
    -   @pankod/refine-sdk@0.1.0

## 0.4.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 0.3.0

### Minor Changes

-   [#2217](https://github.com/pankod/refine/pull/2217) [`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 0.2.0

### Minor Changes

-   Add HOC `withCloud` function. This function, your application will communicate with the refine cloud. Check out the `examples/cloud` folder for more.

    ```
    import { Refine } from "@pankod/refine-core";
    import { withCloud } from "@pankod/refine-cloud";

    const RefineWithCloud = withCloud(Refine, {
        baseUrl: process.env.REACT_APP_REFINE_BASE_URL as string,
        clientId: process.env.REACT_APP_REFINE_CLIENT_ID as string,
    });

    const App: React.FC = () => {
        return (
            <RefineWithCloud
                LoginPage={LoginPage}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                        canDelete: true,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
        );
    };

    export default App;
    ```

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.34.0

## 0.1.0

### Minor Changes

-   [#1922](https://github.com/pankod/refine/pull/1922) [`12f08ae6a3`](https://github.com/pankod/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add HOC `withCloud` function. This function, your application will communicate with the refine cloud. Check out the `examples/cloud` folder for more.

    ```
    import { Refine } from "@pankod/refine-core";
    import { withCloud } from "@pankod/refine-cloud";

    const RefineWithCloud = withCloud(Refine, {
        baseUrl: process.env.REACT_APP_REFINE_BASE_URL as string,
        clientId: process.env.REACT_APP_REFINE_CLIENT_ID as string,
    });

    const App: React.FC = () => {
        return (
            <RefineWithCloud
                LoginPage={LoginPage}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                        canDelete: true,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
        );
    };

    export default App;
    ```

### Patch Changes

-   Updated dependencies [[`d96ba1e9c8`](https://github.com/pankod/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d), [`b257d87fef`](https://github.com/pankod/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184), [`12f08ae6a3`](https://github.com/pankod/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58)]:
    -   @pankod/refine-core@3.33.0
