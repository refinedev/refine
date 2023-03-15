# @pankod/refine-react-router-v6

## 4.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    We're releasing a new way to connect your router to **refine**.

    The legacy `routerProvider` and its exports are now deprecated but accessible at `@refinedev/react-router-v6/legacy` path.

    The new `routerBindings` are smaller and more flexible than the previos one.

    ## New `routerBindings` export

    New `routerBindings` contains following properties;

    -   `go`: Which returns a function to handle the navigation in `react-router-v6`. It accepts a config object and navigates to the given path. Uses `useNavigate` hook under the hood.
    -   `back`: Which returns a function to handle the navigation in `react-router-v6`. It navigates back to the previous page. Uses `useNavigate` hook under the hood.
    -   `parse`: Which returns a function to parse the given path and returns the `resource`, `id`, `action` and additional `params`. Uses `useParams` and `useLocation` hooks and `qs` package under the hood.
    -   `Link`: A component that accepts `to` prop and renders a link to the given path. Uses `Link` component from `react-router-dom` under the hood.

    ## Complemetary Components

    -   `RefineRoutes` - A component that renders the routes for the resources when the actions are defined as components. This can be used to achieve the legacy behavior of `routerProvider` prop. `RefineRoutes` component accepts a render function as a child and passed a `JSX.Element` array containing `Route` components for the resource routes. You can wrap it to a `Routes` component and let it handle the route creation process for you. Additionally, If you want to add custom routes, you can place them inside the `Routes` component or you can place an another `Routes` component. Both apporaches are now valid and accepted by **refine**.

    -   `NavigateToResource` - A component that navigates to the first `list` action of the `resources` array of `<Refine>`. Optionally, you can pass a `resource` prop to navigate to `list` action of the resource. This can be placed at the `index` route of your app to redirect to the first resource.

    -   `UnsavedChangesNotifier` - This component handles the prompt when the user tries to leave the page with unsaved changes. It can be placed under the `Refine` component.

    ## Exported values from `react-router-dom`

    In earlier versions, we've re-exported the `react-router-dom` package. This was a bad practice and we've removed it in this version. If you're using `react-router-dom` in your project, you should install it as a dependency and import the values from it.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    **Moving to the `@refinedev` scope 🎉🎉**

    Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

    Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 3.40.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.39.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.38.0

### Minor Changes

-   [#3144](https://github.com/refinedev/refine/pull/3144) [`c0aea17837c`](https://github.com/refinedev/refine/commit/c0aea17837c02a68d6be333925ff21fb24f0e4ec) Thanks [@omeraplak](https://github.com/omeraplak)! - Added react-router-dom's exports

## 3.37.0

### Minor Changes

-   [#3144](https://github.com/refinedev/refine/pull/3144) [`c0aea17837c`](https://github.com/refinedev/refine/commit/c0aea17837c02a68d6be333925ff21fb24f0e4ec) Thanks [@omeraplak](https://github.com/omeraplak)! - Added react-router-dom's exports

## 3.36.6

### Patch Changes

-   [#3126](https://github.com/refinedev/refine/pull/3126) [`ccaf8bde357`](https://github.com/refinedev/refine/commit/ccaf8bde35737558de69953b5b0c7de64df351cd) Thanks [@thaihuynhxyz](https://github.com/thaihuynhxyz)! - fix: react extract incorrect resource from encoded pathname

## 3.36.5

### Patch Changes

-   [#3126](https://github.com/refinedev/refine/pull/3126) [`ccaf8bde357`](https://github.com/refinedev/refine/commit/ccaf8bde35737558de69953b5b0c7de64df351cd) Thanks [@thaihuynhxyz](https://github.com/thaihuynhxyz)! - fix: react extract incorrect resource from encoded pathname

## 3.36.4

### Patch Changes

-   [#3039](https://github.com/refinedev/refine/pull/3039) [`54eee2911a2`](https://github.com/refinedev/refine/commit/54eee2911a2196645914b2181a05d030c528b438) Thanks [@alonp99](https://github.com/alonp99)! - Fixed TypeScript type of `useParams` hook

## 3.36.3

### Patch Changes

-   [#3039](https://github.com/refinedev/refine/pull/3039) [`54eee2911a2`](https://github.com/refinedev/refine/commit/54eee2911a2196645914b2181a05d030c528b438) Thanks [@alonp99](https://github.com/alonp99)! - Fixed TypeScript type of `useParams` hook

## 3.36.2

### Patch Changes

-   Add missing `BrowserRouterComponent` export to `@pankod/refine-react-router-v6` package.

## 3.36.1

### Patch Changes

-   [#2780](https://github.com/refinedev/refine/pull/2780) [`0417b7bf64`](https://github.com/refinedev/refine/commit/0417b7bf64f6a2ee09a025d4dabbc7009e11ba02) Thanks [@aliemir](https://github.com/aliemir)! - Add missing `BrowserRouterComponent` export to `@pankod/refine-react-router-v6` package.

## 3.36.0

### Minor Changes

-   Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RouterComponent` component.

## 3.35.0

### Minor Changes

-   Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RouterComponent` component.

## 3.34.0

### Minor Changes

-   [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RouterComponent` component.

## 3.33.2

### Patch Changes

-   Fixed version of react-router to `6.3.0`

## 3.33.1

### Patch Changes

-   [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 3.33.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.32.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.31.3

### Patch Changes

-   Fixed default login page is `<LoginPage>`.

*   🎉 Added `AuthPage` component to the `refine` app. This page is used to login, register, forgot password and update password. Login page is default page and old `LoginPage` component is deprecated.

    # New Auth Hooks

    📌 Added `useRegister` hook. This hook is used to register new user. `useRegister` falls into register function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useForgotPassword` hook. This hook is used to forgot password. `useForgotPassword` falls into `forgotPassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useUpdatePassword` hook. This hook is used to update password. `useUpdatePassword` falls into `updatePassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    ```diff
    - <LoginPage>
    + <AuthPage>
    ```

    # New `AuthPage` props:

    ```info
    interface IAuthPageProps extends IAuthCommonProps {
        type?: "login" | "register" | "forgotPassword" | "updatePassword";
    }

    interface IAuthCommonProps {
        submitButton?: React.ReactNode;
        registerLink?: React.ReactNode;
        loginLink?: React.ReactNode;
        forgotPasswordLink?: React.ReactNode;
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

## 3.31.2

### Patch Changes

-   [#2415](https://github.com/refinedev/refine/pull/2415) [`f7c98f0ef9`](https://github.com/refinedev/refine/commit/f7c98f0ef9743fbee2cc44206548cf2da3ceb01c) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed default login page is `<LoginPage>`.

## 3.31.1

### Patch Changes

-   [#2299](https://github.com/refinedev/refine/pull/2299) [`a02cb9e8ef`](https://github.com/refinedev/refine/commit/a02cb9e8ef20f14194d772720442208930e3aa40) Thanks [@biskuvit](https://github.com/biskuvit)! - 🎉 Added `AuthPage` to the `refine` app. This page is used to login, register, forgot password and update password. Login page is default page and old `LoginPage` component is deprecated.

    # New Auth Hooks

    📌 Added `useRegister` hook. This hook is used to register new user. `useRegister` falls into register function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useForgotPassword` hook. This hook is used to forgot password. `useForgotPassword` falls into `forgotPassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useUpdatePassword` hook. This hook is used to update password. `useUpdatePassword` falls into `updatePassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    ```diff
    - <LoginPage>
    + <AuthPage>
    ```

    # New `AuthPage` props:

    ```info
    interface IAuthPageProps extends IAuthCommonProps {
        type?: "login" | "register" | "forgotPassword" | "updatePassword";
    }

    interface IAuthCommonProps {
        registerLink?: React.ReactNode;
        loginLink?: React.ReactNode;
        forgotPasswordLink?: React.ReactNode;
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

## 3.31.0

### Minor Changes

-   Add React@18 support 🚀

## 3.30.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 3.29.0

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

## 3.28.0

### Minor Changes

-   [`e78b181b12`](https://github.com/refinedev/refine/commit/e78b181b12adb35e516c19b5382a211e10476add) Thanks [@omeraplak](https://github.com/omeraplak)! - Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

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

## 3.27.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

-   Fix adding the current path to the `to` parameter when redirecting to the login page after `logout` - #2211

## 3.26.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.3

### Patch Changes

-   [#2214](https://github.com/refinedev/refine/pull/2214) [`91db05caf7`](https://github.com/refinedev/refine/commit/91db05caf796025d2ad4f64221541cc1fc5f9c5d) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix adding the current path to the `to` parameter when redirecting to the login page after `logout` - #2211

## 3.25.2

### Patch Changes

-   Fixed a bug that caused `<ErrorComponent/>` to does not appear in the `404` state

## 3.25.1

### Patch Changes

-   [#1918](https://github.com/refinedev/refine/pull/1918) [`b8a4093fda`](https://github.com/refinedev/refine/commit/b8a4093fdabab3d1ff821182ee5b96e2c74a9ecd) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed a bug that caused `<ErrorComponent/>` to does not appear in the `404` state

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
