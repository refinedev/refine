# @pankod/refine-core

## 3.65.0

### Minor Changes

-   🎉 Added `AuthPage` component to the `refine` app. This page is used to login, register, reset password and update password. Login page is default page and old `LoginPage` component is deprecated.

    # New Auth Hooks

    📌 Added `useRegister` hook. This hook is used to register new user. `useRegister` falls into register function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useResetPassword` hook. This hook is used to reset password. `useResetPassword` falls into `resetPassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useUpdatePassword` hook. This hook is used to update password. `useUpdatePassword` falls into `updatePassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    ```diff
    - <LoginPage>
    + <AuthPage>
    ```

    # New `AuthPage` props:

    ```info
    interface IAuthPageProps extends IAuthCommonProps {
        type?: "login" | "register" | "resetPassword" | "updatePassword";
    }

    interface IAuthCommonProps {
        submitButton?: React.ReactNode;
        registerLink?: React.ReactNode;
        loginLink?: React.ReactNode;
        resetPasswordLink?: React.ReactNode;
        updatePasswordLink?: React.ReactNode;
        backLink?: React.ReactNode;
        providers?: IProvider[];
    }

    interface IProvider {
        name: string;
        icon?: React.ReactNode;
        label?: string;
    }
    ```

### Patch Changes

-   Fixed `<AuthPage>` by adding missing props to "login" and "register" pages.

    Fixed `<Refine>` component `LoginPage` property.

## 3.64.2

### Patch Changes

-   [#2415](https://github.com/pankod/refine/pull/2415) [`f7c98f0ef9`](https://github.com/pankod/refine/commit/f7c98f0ef9743fbee2cc44206548cf2da3ceb01c) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed `<AuthPage>` by adding missing props to "login" and "register" pages.

    Fixed `<Refine>` component `LoginPage` property.

## 3.64.1

### Patch Changes

-   [#2299](https://github.com/pankod/refine/pull/2299) [`a02cb9e8ef`](https://github.com/pankod/refine/commit/a02cb9e8ef20f14194d772720442208930e3aa40) Thanks [@biskuvit](https://github.com/biskuvit)! - 🎉 Added `AuthPage` to the `refine` app. This page is used to login, register, reset password and update password. Login page is default page and old `LoginPage` component is deprecated.

    # New Auth Hooks

    📌 Added `useRegister` hook. This hook is used to register new user. `useRegister` falls into register function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useResetPassword` hook. This hook is used to reset password. `useResetPassword` falls into `resetPassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useUpdatePassword` hook. This hook is used to update password. `useUpdatePassword` falls into `updatePassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    ```diff
    - <LoginPage>
    + <AuthPage>
    ```

    # New `AuthPage` props:

    ```info
    interface IAuthPageProps extends IAuthCommonProps {
        type?: "login" | "register" | "resetPassword" | "updatePassword";
    }

    interface IAuthCommonProps {
        registerLink?: React.ReactNode;
        loginLink?: React.ReactNode;
        resetPasswordLink?: React.ReactNode;
        updatePasswordLink?: React.ReactNode;
        backLink?: React.ReactNode;
        providers?: IProvider[];
    }

    interface IProvider {
        name: string;
        icon?: React.ReactNode;
        label?: string;
    }
    ```

    # Add `AuthPage` as a default page to Routers

    📌 Added `AuthPage` to the `refine-nextjs-router`. Default page is `AuthPage`.

    📌 Added `AuthPage` to the `refine-react-location`. Default page is `AuthPage`.

    📌 Added `AuthPage` to the `refine-react-router-v6`. Default page is `AuthPage`.

    📌 Added `AuthPage` to the `refine-remix-router`. Default page is `AuthPage`.

## 3.64.0

### Minor Changes

-   Add an option to hide `resources` from the `Sider` menu

    ```tsx
    <Refine
        ...
        ...
        resources={[
            {
                name: "posts",
                list: PostList,
                options: {
                    hide: true,
                },
            },
        ]}
    />
    ```

*   Add object path syntax support for the useSelect hook

    ```tsx
    useSelect({
        resource: "posts",
        optionLabel: "nested.title",
        optionLabel: "nested.id",
    });
    ```

## 3.63.0

### Minor Changes

-   [#2391](https://github.com/pankod/refine/pull/2391) [`e530670c2d`](https://github.com/pankod/refine/commit/e530670c2d5f6e8a734a37770d1f1c89fb0b81b5) Thanks [@omeraplak](https://github.com/omeraplak)! - Add an option to hide `resources` from the `Sider` menu

    ```tsx
    <Refine
        ...
        ...
        resources={[
            {
                name: "posts",
                list: PostList,
                options: {
                    hide: true,
                },
            },
        ]}
    />
    ```

*   [#2395](https://github.com/pankod/refine/pull/2395) [`3019fae7a0`](https://github.com/pankod/refine/commit/3019fae7a00c4fe9d3f17639e0129bd336e42aef) Thanks [@omeraplak](https://github.com/omeraplak)! - Add object path syntax support for the useSelect hook

    ```tsx
    useSelect({
        resource: "posts",
        optionLabel: "nested.title",
        optionLabel: "nested.id",
    });
    ```

## 3.62.1

### Patch Changes

-   fix redirectPage return value #2377

## 3.62.0

### Minor Changes

-   Added a new `<Refine>` component property: `options`.

    Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

    ```diff
        <Refine
    -       mutationMode="undoable"
    -       undoableTimeout={5000}
    -       warnWhenUnsavedChanges
    -       syncWithLocation
    -       liveMode="off"
    -       disableTelemetry={false}
    +       options={{
    +           mutationMode: "undoable",
    +           undoableTimeout: 5000,
    +           warnWhenUnsavedChanges: true,
    +           syncWithLocation: true,
    +           liveMode: "off",
    +           disableTelemetry: false,
    +       }}
        />
    ```

*   Added a new redirect feature. It is now possible to set default redirects.

    By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

    ```tsx
    <Refine
        ...
        options={{ redirect: { afterCreate: "show", afterClone: "edit", afterEdit: false }, }}
    />
    ```

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

*   -   Fixed `lodash-es` usage for ESM builds

## 3.61.1

### Patch Changes

-   [#2377](https://github.com/pankod/refine/pull/2377) [`c62fb114b1`](https://github.com/pankod/refine/commit/c62fb114b1e0ea3e246e33809bbb64ada1db25b2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix redirectPage return value #2377

## 3.61.0

### Minor Changes

-   Added a new `<Refine>` component property: `options`.

    Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

    ```diff
        <Refine
    -       mutationMode="undoable"
    -       undoableTimeout={5000}
    -       warnWhenUnsavedChanges
    -       syncWithLocation
    -       liveMode="off"
    -       disableTelemetry={false}
    +       options={{
    +           mutationMode: "undoable",
    +           undoableTimeout: 5000,
    +           warnWhenUnsavedChanges: true,
    +           syncWithLocation: true,
    +           liveMode: "off",
    +           disableTelemetry: false,
    +       }}
        />
    ```

*   Added a new redirect feature. It is now possible to set default redirects.

    By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

    ```tsx
    <Refine
        ...
        options={{ redirect: { afterCreate: "show", afterClone: "edit", afterEdit: false }, }}
    />
    ```

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

*   -   Fixed `lodash-es` usage for ESM builds

## 3.60.0

### Minor Changes

-   Added a new `<Refine>` component property: `options`.

    Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

    ```diff
        <Refine
    -       mutationMode="undoable"
    -       undoableTimeout={5000}
    -       warnWhenUnsavedChanges
    -       syncWithLocation
    -       liveMode="off"
    -       disableTelemetry={false}
    +       options={{
    +           mutationMode: "undoable",
    +           undoableTimeout: 5000,
    +           warnWhenUnsavedChanges: true,
    +           syncWithLocation: true,
    +           liveMode: "off",
    +           disableTelemetry: false,
    +       }}
        />
    ```

*   Added a new redirect feature. It is now possible to set default redirects.

    By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

    ```tsx
    <Refine
        ...
        options={{ redirect: { afterCreate: "show", afterClone: "edit", afterEdit: false }, }}
    />
    ```

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

*   -   Fixed `lodash-es` usage for ESM builds

## 3.59.0

### Minor Changes

-   [#2352](https://github.com/pankod/refine/pull/2352) [`e4d39eff33`](https://github.com/pankod/refine/commit/e4d39eff339d1c0ac391947843ebaa78d93830d6) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added a new `<Refine>` component property: `options`.

    Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

    ```diff
        <Refine
    -       mutationMode="undoable"
    -       undoableTimeout={5000}
    -       warnWhenUnsavedChanges
    -       syncWithLocation
    -       liveMode="off"
    -       disableTelemetry={false}
    +       options={{
    +           mutationMode: "undoable",
    +           undoableTimeout: 5000,
    +           warnWhenUnsavedChanges: true,
    +           syncWithLocation: true,
    +           liveMode: "off",
    +           disableTelemetry: false,
    +       }}
        />
    ```

*   [#2361](https://github.com/pankod/refine/pull/2361) [`95e1a17cd1`](https://github.com/pankod/refine/commit/95e1a17cd1e10d126ce38954d0f01c0e5a39ad6a) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added a new redirect feature. It is now possible to set default redirects.

    By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

    ```tsx
    <Refine
        ...
        options={{ redirect: { afterCreate: "show", afterClone: "edit", afterEdit: false }, }}
    />
    ```

### Patch Changes

-   [#2366](https://github.com/pankod/refine/pull/2366) [`de87f13dad`](https://github.com/pankod/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - `lodash` moved to "dependencies" for CommonJS builds

*   [#2366](https://github.com/pankod/refine/pull/2366) [`de87f13dad`](https://github.com/pankod/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - Fixed `lodash-es` usage for ESM builds

## 3.58.5

### Patch Changes

-   `lodash` moved to dependencies.

## 3.58.4

### Patch Changes

-   [#2350](https://github.com/pankod/refine/pull/2350) [`f8e5d99598`](https://github.com/pankod/refine/commit/f8e5d99598265af434f25fde104fafc9b7cac792) Thanks [@ozkalai](https://github.com/ozkalai)! - `lodash` moved to dependencies.

## 3.58.3

### Patch Changes

-   Fixed react-query devtools was consuming high CPU

## 3.58.2

### Patch Changes

-   [#2333](https://github.com/pankod/refine/pull/2333) [`2f0255ec95`](https://github.com/pankod/refine/commit/2f0255ec95b1a1fafedaa05143e02f17d86ddc81) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed react-query devtools was consuming high CPU

## 3.58.1

### Patch Changes

-   `AuthProvider`'s `login` method can now return a value for `Remix`'s authentication flow

## 3.58.0

### Minor Changes

-   Updated `reactQueryDevtoolConfig` prop type and added `false` option to disable the React Query Devtools.

## 3.57.0

### Minor Changes

-   [#2311](https://github.com/pankod/refine/pull/2311) [`645391a3d9`](https://github.com/pankod/refine/commit/645391a3d985ab02c5a3d91813f1b4ec48e3a09b) Thanks [@aliemir](https://github.com/aliemir)! - Updated `reactQueryDevtoolConfig` prop type and added `false` option to disable the React Query Devtools.

## 3.56.11

### Patch Changes

-   Fixed user-defined URL query parameters being deleted when using `syncWithLocation`

## 3.56.10

### Patch Changes

-   Added [QueryFunctionContext](https://tanstack.com/query/v4/docs/guides/query-functions#queryfunctioncontext)'s values to `queryContext` in `metaData`.

## 3.56.9

### Patch Changes

-   [#2294](https://github.com/pankod/refine/pull/2294) [`c67a232861`](https://github.com/pankod/refine/commit/c67a232861f5946920be18c0e57eee799bc77e23) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added [QueryFunctionContext](https://tanstack.com/query/v4/docs/guides/query-functions#queryfunctioncontext)'s values to `queryContext` in `metaData`.

## 3.56.8

### Patch Changes

-   Fixed `@tanstack/react-query-devtools` dependency

## 3.56.7

### Patch Changes

-   [`754da29b34`](https://github.com/pankod/refine/commit/754da29b34558dd51c266c1d9b7e68bf3a954697) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `@tanstack/react-query-devtools` dependency

## 3.56.6

### Patch Changes

-   Upgraded `react-query` version to 4.

*   Updated the return value of `useGetIdentity`. When the `getUserIdentity` function is not defined, it returns `{}` instead of `undefined`.

## 3.56.5

### Patch Changes

-   [#2260](https://github.com/pankod/refine/pull/2260) [`a97ec592df`](https://github.com/pankod/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgraded `react-query` version to 4.

*   [#2260](https://github.com/pankod/refine/pull/2260) [`a97ec592df`](https://github.com/pankod/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the return value of `useGetIdentity`. When the `getUserIdentity` function is not defined, it returns `{}` instead of `undefined`.

## 3.56.4

### Patch Changes

-   Fix **useCan** hook params keys.

    Since `react-query` stringifies the query keys, it will throw an error for a circular dependency if we include `React.ReactNode` elements inside the keys.
    The feature in #2220(https://github.com/pankod/refine/issues/2220) includes such change and to fix this, we need to remove `icon` property in the `resource`

*   Updated `<Refine/>` component with memoization to prevent unwanted effects.

    -   Fixed the issue: `react-query`'s `queryClient` was re-initializing on every render which was causing it to reset the query cache.
    -   Memoized the `notificationProvider` prop to prevent unnecessary re-renders.
    -   Memoized the `resources` prop to prevent unnecessary transform calls on every render.

-   -   Fixed Browser back navigation is broken with `syncWithLocation` and paginated `useTable` - #2276
    -   Updated `push` and `replace` args of `useNavigation`

## 3.56.3

### Patch Changes

-   [#2278](https://github.com/pankod/refine/pull/2278) [`8b11f8a267`](https://github.com/pankod/refine/commit/8b11f8a2679b403bfea75c448d31de7b6a90f3a9) Thanks [@biskuvit](https://github.com/biskuvit)! - Fix **useCan** hook params keys.

    Since `react-query` stringifies the query keys, it will throw an error for a circular dependency if we include `React.ReactNode` elements inside the keys.
    The feature in #2220(https://github.com/pankod/refine/issues/2220) includes such change and to fix this, we need to remove `icon` property in the `resource`

*   [#2280](https://github.com/pankod/refine/pull/2280) [`e22cac6d8b`](https://github.com/pankod/refine/commit/e22cac6d8b3da3188545d9c0a614bb0f01f11f70) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<Refine/>` component with memoization to prevent unwanted effects.

    -   Fixed the issue: `react-query`'s `queryClient` was re-initializing on every render which was causing it to reset the query cache.
    -   Memoized the `notificationProvider` prop to prevent unnecessary re-renders.
    -   Memoized the `resources` prop to prevent unnecessary transform calls on every render.

-   [#2279](https://github.com/pankod/refine/pull/2279) [`786fb08b8b`](https://github.com/pankod/refine/commit/786fb08b8be18153043f62e5f2cc1fd8ef76e728) Thanks [@omeraplak](https://github.com/omeraplak)! - - Fixed Browser back navigation is broken with `syncWithLocation` and paginated `useTable` - #2276
    -   Updated `push` and `replace` args of `useNavigation`

## 3.56.2

### Patch Changes

-   Fixed invalidation of authentication caches every time `checkAuth` is run

## 3.56.1

### Patch Changes

-   [#2271](https://github.com/pankod/refine/pull/2271) [`40b84d35a3`](https://github.com/pankod/refine/commit/40b84d35a37fa2bf7fcb0f59de9745985b21fa6a) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed invalidation of authentication caches every time `checkAuth` is run

## 3.56.0

### Minor Changes

-   Add React@18 support 🚀

## 3.55.0

### Minor Changes

-   [#1718](https://github.com/pankod/refine/pull/1718) [`b38620d842`](https://github.com/pankod/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 3.54.0

### Minor Changes

-   Added config parameter to useCustomMutationHook to send headers.

    ```
    const apiUrl = useApiUrl();

    const { mutate } = useCustomMutation<ICategory>();

    mutate({
        url: `${API_URL}/categories`,
        method: "post",
        values: {
          title: "New Category",
        },
        config: {
          headers: {
              Authorization: "Bearer ****",
          },
        },
    });
    ```

## 3.53.0

### Minor Changes

-   [#2245](https://github.com/pankod/refine/pull/2245) [`e949df7f1c`](https://github.com/pankod/refine/commit/e949df7f1cd8476c647b6511e0334156097408a0) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added config parameter to useCustomMutationHook to send headers.

    ```
    const apiUrl = useApiUrl();

    const { mutate } = useCustomMutation<ICategory>();

    mutate({
        url: `${API_URL}/categories`,
        method: "post",
        values: {
          title: "New Category",
        },
        config: {
          headers: {
              Authorization: "Bearer ****",
          },
        },
    });
    ```

## 3.52.0

### Minor Changes

-   Added `useCustomMutation`hook for custom mutation requests.

    ```tsx
    import { useCustomMutation } from "@pankod/refine-core";
    const { mutation } = useCustomMutation();

    mutation({
        url: "https://api.example.com/users",
        method: "POST",
        values: {
            name: "John Doe",
            email: "johndoe@mail.com",
        },
    });
    ```

## 3.51.0

### Minor Changes

-   [#2229](https://github.com/pankod/refine/pull/2229) [`878e9a105e`](https://github.com/pankod/refine/commit/878e9a105e582db0a2b0cbcddf4e6e196e94f632) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added `useCustomMutation`hook for custom mutation requests.

    ```tsx
    import { useCustomMutation } from "@pankod/refine-core";
    const { mutation } = useCustomMutation();

    mutation({
        url: "https://api.example.com/users",
        method: "POST",
        values: {
            name: "John Doe",
            email: "johndoe@mail.com",
        },
    });
    ```

## 3.50.0

### Minor Changes

-   Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

    ```ts
    const App: React.FC = () => {
        <Refine
            // other providers and props
            accessControlProvider={{
                can: async ({ resource, action, params }) => {
                    if (resource === "posts" && action === "edit") {
                        return Promise.resolve({
                            can: false,
                            reason: "Unauthorized",
                        });
                    }

                    // or you can access directly *resource object
                    // const resourceName = params?.resource?.name;
                    // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
                    // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
                    //     return Promise.resolve({
                    //         can: false,
                    //         reason: "Unauthorized",
                    //     });
                    // }

                    return Promise.resolve({ can: true });
                },
            }}
        />;
    };
    ```

## 3.49.0

### Minor Changes

-   [#2222](https://github.com/pankod/refine/pull/2222) [`43e92b9785`](https://github.com/pankod/refine/commit/43e92b97854a1aea703ba2c04f95dcd5c6f4044d) Thanks [@omeraplak](https://github.com/omeraplak)! - Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

    ```ts
    const App: React.FC = () => {
        <Refine
            // other providers and props
            accessControlProvider={{
                can: async ({ resource, action, params }) => {
                    if (resource === "posts" && action === "edit") {
                        return Promise.resolve({
                            can: false,
                            reason: "Unauthorized",
                        });
                    }

                    // or you can access directly *resource object
                    // const resourceName = params?.resource?.name;
                    // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
                    // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
                    //     return Promise.resolve({
                    //         can: false,
                    //         reason: "Unauthorized",
                    //     });
                    // }

                    return Promise.resolve({ can: true });
                },
            }}
        />;
    };
    ```

## 3.48.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

-   Fix adding the current path to the `to` parameter when redirecting to the login page after `logout` - #2211

## 3.47.0

### Minor Changes

-   [#2217](https://github.com/pankod/refine/pull/2217) [`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.46.0

### Minor Changes

-   Update notification props in data hooks of `@pankod/refine-core` to cover dynamic notifications.

    Now users will be able to show notifications according to the API response by assigning a function which returns `OpenNotificationParams` instead of an `OpenNotificationParams` object.

    **Example**

    ```tsx
    {
        const { mutate } = useCreate({
            /* ... */
            successNotification: (data, values, resource) => ({
                message: data?.message ?? "Success!",
                type: "success",
                description: data?.description;
            }),
            errorNotification: (error, values, resource) => ({
                message: error?.message ?? error?.code ?? "Error!",
                type: "error",
                description: error?.reason;
            })
            /* ... */
        });
    }
    ```

## 3.45.0

### Minor Changes

-   [#2177](https://github.com/pankod/refine/pull/2177) [`5a805c789a`](https://github.com/pankod/refine/commit/5a805c789a167ca3bde34aebacad93bd92510611) Thanks [@aliemir](https://github.com/aliemir)! - Update notification props in data hooks of `@pankod/refine-core` to cover dynamic notifications.

    Now users will be able to show notifications according to the API response by assigning a function which returns `OpenNotificationParams` instead of an `OpenNotificationParams` object.

    **Example**

    ```tsx
    {
        const { mutate } = useCreate({
            /* ... */
            successNotification: (data, values, resource) => ({
                message: data?.message ?? "Success!",
                type: "success",
                description: data?.description;
            }),
            errorNotification: (error, values, resource) => ({
                message: error?.message ?? error?.code ?? "Error!",
                type: "error",
                description: error?.reason;
            })
            /* ... */
        });
    }
    ```

## 3.44.0

### Minor Changes

-   Added ability to compare `or` filters. This was a missing feature on filters in `useTable` hook. With this feature, we will prevent `or` filter bugs (Resolves #2124) such as re-adding the same filters and being unable to modify `or` filter. To remove `or` filter with `merge` behavior, you should pass an empty object as `value`.

### Patch Changes

-   Fix redirection after submit in `useForm`. Both `edit` and `create` will redirect to `list` (it was `edit` previously)

    Resolves #2123

## 3.43.1

### Patch Changes

-   [#2172](https://github.com/pankod/refine/pull/2172) [`c33d13eb15`](https://github.com/pankod/refine/commit/c33d13eb15b986429d92e4e0e5f2bccd91fd1140) Thanks [@aliemir](https://github.com/aliemir)! - Fix redirection after submit in `useForm`. Both `edit` and `create` will redirect to `list` (it was `edit` previously)

    Resolves #2123

## 3.43.0

### Minor Changes

-   [#2164](https://github.com/pankod/refine/pull/2164) [`4d5f6b25e5`](https://github.com/pankod/refine/commit/4d5f6b25e51cf773e08a0ce0b93a3680e692564a) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to compare `or` filters. This was a missing feature on filters in `useTable` hook. With this feature, we will prevent `or` filter bugs (Resolves #2124) such as re-adding the same filters and being unable to modify `or` filter. To remove `or` filter with `merge` behavior, you should pass an empty object as `value`.

## 3.42.0

### Minor Changes

-   ### `@pankod/refine-core`

    -   Added extra params to `useSubscription` and `useResourceSubscription`
    -   `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

    ### `@pankod/refine-hasura`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/pankod/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

    ### `@pankod/refine-nhost`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/pankod/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

    ### `@pankod/refine-graphql`

    -   Added `liveProvider`.

### Patch Changes

-   Fixed it to appear in menu items even if `List` is not given in resources #2147

## 3.41.1

### Patch Changes

-   [#2151](https://github.com/pankod/refine/pull/2151) [`d4c7377361`](https://github.com/pankod/refine/commit/d4c7377361ba347ecfdf4d5a438eb495398c2fab) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed it to appear in menu items even if `List` is not given in resources #2147

## 3.41.0

### Minor Changes

-   [#2120](https://github.com/pankod/refine/pull/2120) [`2aa7aace52`](https://github.com/pankod/refine/commit/2aa7aace52b3f232327db2b0f41f793a2885e788) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ### `@pankod/refine-core`

    -   Added extra params to `useSubscription` and `useResourceSubscription`
    -   `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

    ### `@pankod/refine-hasura`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/pankod/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

    ### `@pankod/refine-nhost`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/pankod/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

    ### `@pankod/refine-graphql`

    -   Added `liveProvider`.

## 3.40.0

### Minor Changes

-   Add a simple and transparent telemetry module to collect usage statistics defined within a very limited scope.

    Tracking is completely safe and anonymous. It does not contain any personally identifiable information and does not use cookies. Participation is optional and users can opt out easily.

    For more information, you can check the [documentation](https://refine.dev/docs/guides-and-concepts/telemetry/telemetry/).

## 3.39.0

### Minor Changes

-   [#2078](https://github.com/pankod/refine/pull/2078) [`868bb943ad`](https://github.com/pankod/refine/commit/868bb943adc42d80a7904e2acbd6397d097ad4e2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add a simple and transparent telemetry module to collect usage statistics defined within a very limited scope.

    Tracking is completely safe and anonymous. It does not contain any personally identifiable information and does not use cookies. Participation is optional and users can opt out easily.

    For more information, you can check the [documentation](https://refine.dev/docs/guides-and-concepts/telemetry/telemetry/).

## 3.38.2

### Patch Changes

-   -   The redirect method that return from `useForm` updated to be avaiable for passing `id`.

    ```
    const { redirect } = useForm();

    redirect("edit", id);
    ```

    -   Returning API response to `onFinish` function for successful mutations

## 3.38.1

### Patch Changes

-   [#2089](https://github.com/pankod/refine/pull/2089) [`ee8e8bbd6c`](https://github.com/pankod/refine/commit/ee8e8bbd6cf6ff2ab1a87883e4030205dedb16ea) Thanks [@ozkalai](https://github.com/ozkalai)! - - The redirect method that return from `useForm` updated to be avaiable for passing `id`.

    ```
    const { redirect } = useForm();

    redirect("edit", id);
    ```

    -   Returning API response to `onFinish` function for successful mutations

## 3.38.0

### Minor Changes

-   `useLog` is converted to useQuery mutation.

    ```
    // before
    const { log } = useLog();
    log({
      resource: 'posts',
      action: 'create',
      data: {
          id: 1
      }
    });
    ```

    ```
    // after
    const { log } = useLog();
    const { mutation } = log;
    mutation({
      resource: 'posts',
      action: 'create',
      data: {
          id: 1
      }
    });
    ```

### Patch Changes

-   Fixed `useBreadcrumb` hook throws `console.warn` even if i18nProvider is not used - #2103

## 3.37.0

### Minor Changes

-   [#2049](https://github.com/pankod/refine/pull/2049) [`98966b586f`](https://github.com/pankod/refine/commit/98966b586f6febd8669065b5b453a8e441f76bc1) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - `useLog` is converted to useQuery mutation.

    ```
    // before
    const { log } = useLog();
    log({
      resource: 'posts',
      action: 'create',
      data: {
          id: 1
      }
    });
    ```

    ```
    // after
    const { log } = useLog();
    const { mutation } = log;
    mutation({
      resource: 'posts',
      action: 'create',
      data: {
          id: 1
      }
    });
    ```

### Patch Changes

-   [#2104](https://github.com/pankod/refine/pull/2104) [`9d77c63a92`](https://github.com/pankod/refine/commit/9d77c63a925dca0133b3e83974dff486a2233017) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `useBreadcrumb` hook throws `console.warn` even if i18nProvider is not used - #2103

## 3.36.0

### Minor Changes

-   Ability to disable server-side pagination on `useTable` and `useList` hooks.

    **Implementation**

    Added `hasPagination` property to `useTable` to enable/disable pagination. Updated `useList` config with no pagination option. Set `hasPagination` to `false` to disable pagination. `useTable` hook uses the `useList` hook under the hood and propagates the `hasPagination` property to it. Also setting pagination related return values to `undefined` for better type check on the user side.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   Added `actions` translate support for CRUD operations (`list`,`create`,`edit`,`show`) in the `useBreadcrumb` [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support) hook.

    #️⃣ First, We need to add the `actions` key to the translation file.

    ```json
        "actions": {
            "list": "List",
            "create": "Create",
            "edit": "Edit",
            "show": "Show"
        },
    ```

    #️⃣ If you don't provide the `actions` key, `useBreadcrumb` will try to find the `buttons` key in the `translation` file for backward compatibility.

    ```json
        "buttons": {
            "list": "List",
            "create": "Create",
            "edit": "Edit",
            "show": "Show"
        },
    ```

    🎉 You can check the code part of this pull request to see how it works [here👇🏼](https://github.com/pankod/refine/pull/2069)

    ```tsx
    const key = `actions.${action}`;
    const actionLabel = translate(key);
    if (actionLabel === key) {
        console.warn(
            `Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file. For more information, see https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support`,
        );
        breadcrumbs.push({
            label: translate(`buttons.${action}`, humanizeString(action)),
        });
    } else {
        breadcrumbs.push({
            label: translate(key, humanizeString(action)),
        });
    }
    ```

## 3.35.0

### Minor Changes

-   [#2050](https://github.com/pankod/refine/pull/2050) [`635cfe9fdb`](https://github.com/pankod/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Ability to disable server-side pagination on `useTable` and `useList` hooks.

    **Implementation**

    Added `hasPagination` property to `useTable` to enable/disable pagination. Updated `useList` config with no pagination option. Set `hasPagination` to `false` to disable pagination. `useTable` hook uses the `useList` hook under the hood and propagates the `hasPagination` property to it. Also setting pagination related return values to `undefined` for better type check on the user side.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   [#2069](https://github.com/pankod/refine/pull/2069) [`ecde34a9b3`](https://github.com/pankod/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651) Thanks [@biskuvit](https://github.com/biskuvit)! - Added `actions` translate support for CRUD operations (`list`,`create`,`edit`,`show`) in the `useBreadcrumb` [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support) hook.

    #️⃣ First, We need to add the `actions` key to the translation file.

    ```json
        "actions": {
            "list": "List",
            "create": "Create",
            "edit": "Edit",
            "show": "Show"
        },
    ```

    #️⃣ If you don't provide the `actions` key, `useBreadcrumb` will try to find the `buttons` key in the `translation` file for backward compatibility.

    ```json
        "buttons": {
            "list": "List",
            "create": "Create",
            "edit": "Edit",
            "show": "Show"
        },
    ```

    🎉 You can check the code part of this pull request to see how it works [here👇🏼](https://github.com/pankod/refine/pull/2069)

    ```tsx
    const key = `actions.${action}`;
    const actionLabel = translate(key);
    if (actionLabel === key) {
        console.warn(
            `Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file. For more information, see https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support`,
        );
        breadcrumbs.push({
            label: translate(`buttons.${action}`, humanizeString(action)),
        });
    } else {
        breadcrumbs.push({
            label: translate(key, humanizeString(action)),
        });
    }
    ```

## 3.34.2

### Patch Changes

-   Fixed `useImport` `onFinish` twice call bug.

## 3.34.1

### Patch Changes

-   [#2047](https://github.com/pankod/refine/pull/2047) [`0338ce9d6b`](https://github.com/pankod/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `useImport` `onFinish` twice call bug.

## 3.34.0

### Minor Changes

-   Added i18n support for resource names on [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/) hook.

*   Export `RefineProps` and `ResourceProps` type.

### Patch Changes

-   We have fixed texts with translations of default login pages in Material UI and Headless.

## 3.33.0

### Minor Changes

-   [#2030](https://github.com/pankod/refine/pull/2030) [`d96ba1e9c8`](https://github.com/pankod/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d) Thanks [@biskuvit](https://github.com/biskuvit)! - Added i18n support for resource names on [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/) hook.

*   [#1922](https://github.com/pankod/refine/pull/1922) [`12f08ae6a3`](https://github.com/pankod/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export `RefineProps` and `ResourceProps` type.

### Patch Changes

-   [#2029](https://github.com/pankod/refine/pull/2029) [`b257d87fef`](https://github.com/pankod/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184) Thanks [@ozkalai](https://github.com/ozkalai)! - We have fixed texts with translations of default login pages in Material UI and Headless.

## 3.32.0

### Minor Changes

-   Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

-   Add custom route support to `defaultOpenKeys` in `useMenu`

*   Handle the `undefined` case at audit-log logger in data hooks.

-   Remove dashboard item in `useMenu` hook

## 3.31.0

### Minor Changes

-   [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

-   [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Add custom route support to `defaultOpenKeys` in `useMenu`

*   [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Handle the `undefined` case at audit-log logger in data hooks.

-   [#2009](https://github.com/pankod/refine/pull/2009) [`5b893a9bff`](https://github.com/pankod/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Remove dashboard item in `useMenu` hook

## 3.30.0

### Minor Changes

-   Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

-   Add custom route support to `defaultOpenKeys` in `useMenu`

*   Handle the `undefined` case at audit-log logger in data hooks.

## 3.29.2

### Patch Changes

-   Fix hook-inside-hook call in `notificationProvider` setup at `<Refine/>`

## 3.29.1

### Patch Changes

-   [#1973](https://github.com/pankod/refine/pull/1973) [`206540971b`](https://github.com/pankod/refine/commit/206540971b12f3c63765aecb8aec6d506733a569) Thanks [@aliemir](https://github.com/aliemir)! - Fix hook-inside-hook call in `notificationProvider` setup at `<Refine/>`

## 3.29.0

### Minor Changes

-   Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.28.0

### Minor Changes

-   Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.27.0

### Minor Changes

-   Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.26.0

### Minor Changes

-   [#1896](https://github.com/pankod/refine/pull/1896) [`2ba2a96fd2`](https://github.com/pankod/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746) Thanks [@aliemir](https://github.com/aliemir)! - Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.23.2

### Patch Changes

-   [#1873](https://github.com/pankod/refine/pull/1873) [`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc) Thanks [@aliemir](https://github.com/aliemir)! - Removed dummy default values from internal contexts.
    Updated contexts:

    -   Auth
    -   Access Control
    -   Notification
    -   Translation (i18n)
    -   unsavedWarn

    **BREAKING:** `useGetLocale` hook now can return `undefined` instead of a fallback value of `en` in cases of `i18nProvider` being `undefined`.

## 3.23.1

### Patch Changes

-   [`3281378b11`](https://github.com/pankod/refine/commit/3281378b119c698be3ae4ecb3866b40b883494d8) Thanks [@rassie](https://github.com/rassie)! - Fix: Don't "humanize" labels in breadcrumbs

## 3.23.0

### Minor Changes

-   [#1843](https://github.com/pankod/refine/pull/1843) [`31850119e0`](https://github.com/pankod/refine/commit/31850119e069b93f0b5146b039a86e736164383e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add `useBreadcrumb` hook and `Breadrumb` component for `@pankod/refine-antd` package
