# @pankod/refine-nextjs-router

## 5.1.6

### Patch Changes

-   [#4160](https://github.com/refinedev/refine/pull/4160) [`9dc8ba1dd81`](https://github.com/refinedev/refine/commit/9dc8ba1dd81c1fa21e8d9339d21d8398887deb91) Thanks [@joshbaumann](https://github.com/joshbaumann)! - fix: unsaved changes prompt not showing when the browser is refreshed.

## 5.1.5

### Patch Changes

-   [#4160](https://github.com/refinedev/refine/pull/4160) [`9dc8ba1dd81`](https://github.com/refinedev/refine/commit/9dc8ba1dd81c1fa21e8d9339d21d8398887deb91) Thanks [@joshbaumann](https://github.com/joshbaumann)! - fix: unsaved changes prompt not showing when the browser is refreshed.

## 5.1.4

### Patch Changes

-   [#3987](https://github.com/refinedev/refine/pull/3987) [`d7d68e3ff68`](https://github.com/refinedev/refine/commit/d7d68e3ff686dece9f58e53e02076f0ecbd91010) Thanks [@aliemir](https://github.com/aliemir)! - Add `isReady` check to `parse` method for `/pages` to wait until the correct values are returned from the `router`.

## 5.1.3

### Patch Changes

-   [#3987](https://github.com/refinedev/refine/pull/3987) [`d7d68e3ff68`](https://github.com/refinedev/refine/commit/d7d68e3ff686dece9f58e53e02076f0ecbd91010) Thanks [@aliemir](https://github.com/aliemir)! - Add `isReady` check to `parse` method for `/pages` to wait until the correct values are returned from the `router`.

## 5.1.2

### Patch Changes

-   [#3893](https://github.com/refinedev/refine/pull/3893) [`d8c0a2f1cd1`](https://github.com/refinedev/refine/commit/d8c0a2f1cd16831552cdaebd0907f297192d64ef) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the export of `RefineRoutes` at `/app` path. (Thanks to [@thomas-advantitge](https://github.com/thomas-advantitge) for the [#3863](https://github.com/refinedev/refine/pull/3863))

## 5.1.1

### Patch Changes

-   [#3893](https://github.com/refinedev/refine/pull/3893) [`d8c0a2f1cd1`](https://github.com/refinedev/refine/commit/d8c0a2f1cd16831552cdaebd0907f297192d64ef) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the export of `RefineRoutes` at `/app` path. (Thanks to [@thomas-advantitge](https://github.com/thomas-advantitge) for the [#3863](https://github.com/refinedev/refine/pull/3863))

## 5.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    We're releasing a new way to connect your router to **refine**.

    The legacy `routerProvider` and its exports are now deprecated but accessible at `@refinedev/nextjs-router/legacy-app` and `@refinedev/nextjs-router/legacy-pages`.

    The new `routerBindings` are smaller and more flexible than the previos one.

    ## New `routerBindings` export

    New `routerBindings` contains following properties;

    -   `go`: Which returns a function to handle the navigation in `next`. It accepts a config object and navigates to the given path. Uses `useRouter` hook under the hood.
    -   `back`: Which returns a function to handle the navigation in `next`. It navigates back to the previous page. Uses `useRouter` hook under the hood.
    -   `parse`: Which returns a function to parse the given path and returns the `resource`, `id`, `action` and additional `params`. Uses `useRouter` for `/pages` dir and `usePathname` and `useSearchParams` for `/app` dir.
    -   `Link`: A component that accepts `to` prop and renders a link to the given path. Uses `Link` component from `next/link` under the hood.

    ## Complemetary Components

    -   `RefineRoutes` - A component that renders the routes for the resources when the actions are defined as components. This can be used to achieve the legacy behavior of `routerProvider` prop. `RefineRoutes` component accepts a render function as a child and passes `JSX.Element` if there's a match for the given path, `undefined` is passed otherwise. You can use this in `[[...refine]]` route to render the matching action component for a resource. We're encouraging our users to use file based routing instead of `[[...refine]]` route which provides more flexibility and a better development experience with its performance benefits.

    -   `NavigateToResource` - A component that navigates to the first `list` action of the `resources` array of `<Refine>`. Optionally, you can pass a `resource` prop to navigate to `list` action of the resource. This can be placed at the `index` route of your app to redirect to the first resource.

    -   `UnsavedChangesNotifier` - This component handles the prompt when the user tries to leave the page with unsaved changes. It can be placed under the `Refine` component.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    `AuthProvider` is renamed to `LegacyAuthProvider` with refine@4. Components and functions are updated to support `LegacyAuthProvider`.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    `parseTableParams` helper is added to let users parse the query params in SSR methods to persist `syncWithLocation` feature in tables.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    **Moving to the `@refinedev` scope 🎉🎉**

    Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

    Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 4.5.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.4.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.3.0

### Minor Changes

-   [#3387](https://github.com/refinedev/refine/pull/3387) [`a4731bd8fb4`](https://github.com/refinedev/refine/commit/a4731bd8fb43c96b38e1712981067c2d8cfea5e3) Thanks [@vanflux](https://github.com/vanflux)! - Forwarding ref on RefineLink component

## 4.2.0

### Minor Changes

-   [#3387](https://github.com/refinedev/refine/pull/3387) [`a4731bd8fb4`](https://github.com/refinedev/refine/commit/a4731bd8fb43c96b38e1712981067c2d8cfea5e3) Thanks [@vanflux](https://github.com/vanflux)! - Forwarding ref on RefineLink component

## 4.1.0

### Minor Changes

-   [#3140](https://github.com/refinedev/refine/pull/3140) [`102bfbf3283`](https://github.com/refinedev/refine/commit/102bfbf32830febe10b99655723863ebd277aadb) Thanks [@aliemir](https://github.com/aliemir)! - - Bumped Next.js to 13

    -   Added support for experimental `appDir` option in `next.config.js` to allow for the latest Next.js features.

    ## `pages` directory

    Current support for `pages` directory has not changed and will continue to work as before. It will be supported as long as `Next.js` continues to support and prompts it as the stable way of working with `Next.js`.

    ## `appDir` option

    `appDir` option is a new experimental feature in `Next.js` that introduces a bunch of new features. It is currently in beta and is not stable. It is not recommended to use it in production. But can be used alongside the current `pages` directory support.

    To use `appDir` option, you need to add it to your `next.config.js` file.

    ```js
    // next.config.js
    module.exports = {
        /* ... */
        experimental: {
            appDir: true,
        },
    };
    ```

    ## Using `appDir` with **refine**

    We've needed to make some changes to the `@pankod/refine-nextjs-router` to make it work with the current structure of the `app` directory feature. To make sure these do not break the current support for `pages` directory, we've added a new exports at the sub path `@pankod/refine-nextjs-router/app` that can be used with the `appDir` option.

    **Note**

    To make optional catch-all routes to work with the `app` directory, you need to define them as directories unlike the option of defining them as files with `pages` directory.

    You need to use `NextRouteComponent` from `@pankod/refine-nextjs-router/app` instead of `NextRouteComponent` from `@pankod/refine-nextjs-router` when using `appDir` option.

    Inside your `layout` file, you need to bind `params` to `routerProvider` to make sure `@pankod/refine-nextjs-router` can work properly with the new structure.

    ```tsx
    // app/[[...refine]]/layout.tsx
    "use client";

    import routerProvider from "@pankod/refine-nextjs-router/app";

    const Layout = ({ children, params }) => {
        return (
            <Refine
                routerProvider={routerProvider.apply({ params })}
                /* ... */
            >
                {children}
            </Refine>
        );
    };
    ```

    **Warning**

    Please note that, unlike the `routerProvider` from the `@pankod/refine-nextjs-router`, `routerProvider` from `@pankod/refine-nextjs-router/app` is a function and you need to bind `params` to make it work properly.

    ```tsx
    // app/[[...refine]]/page.tsx

    "use client";

    import { NextRouteComponent } from "@pankod/refine-nextjs-router/app";

    export default NextRouteComponent;
    ```

    **Warning**

    You need to add `"use client";` directive to both `layout.tsx` and `page.tsx` inside `app/[[...refine]]` directory.

    **Warning**

    `checkAuthentication` does not work with `appDir`. We're aiming to release a substitute for it using middleware but for now its not included in this release.

## 4.0.0

### Major Changes

-   [#3140](https://github.com/refinedev/refine/pull/3140) [`102bfbf3283`](https://github.com/refinedev/refine/commit/102bfbf32830febe10b99655723863ebd277aadb) Thanks [@aliemir](https://github.com/aliemir)! - - Bumped Next.js to 13

    -   Added support for experimental `appDir` option in `next.config.js` to allow for the latest Next.js features.

    ## `pages` directory

    Current support for `pages` directory has not changed and will continue to work as before. It will be supported as long as `Next.js` continues to support and prompts it as the stable way of working with `Next.js`.

    ## `appDir` option

    `appDir` option is a new experimental feature in `Next.js` that introduces a bunch of new features. It is currently in beta and is not stable. It is not recommended to use it in production. But can be used alongside the current `pages` directory support.

    To use `appDir` option, you need to add it to your `next.config.js` file.

    ```js
    // next.config.js
    module.exports = {
        /* ... */
        experimental: {
            appDir: true,
        },
    };
    ```

    ## Using `appDir` with **refine**

    We've needed to make some changes to the `@pankod/refine-nextjs-router` to make it work with the current structure of the `app` directory feature. To make sure these do not break the current support for `pages` directory, we've added a new exports at the sub path `@pankod/refine-nextjs-router/app` that can be used with the `appDir` option.

    **Note**

    To make optional catch-all routes to work with the `app` directory, you need to define them as directories unlike the option of defining them as files with `pages` directory.

    You need to use `NextRouteComponent` from `@pankod/refine-nextjs-router/app` instead of `NextRouteComponent` from `@pankod/refine-nextjs-router` when using `appDir` option.

    Inside your `layout` file, you need to bind `params` to `routerProvider` to make sure `@pankod/refine-nextjs-router` can work properly with the new structure.

    ```tsx
    // app/[[...refine]]/layout.tsx
    "use client";

    import routerProvider from "@pankod/refine-nextjs-router/app";

    const Layout = ({ children, params }) => {
        return (
            <Refine
                routerProvider={routerProvider.apply({ params })}
                /* ... */
            >
                {children}
            </Refine>
        );
    };
    ```

    **Warning**

    Please note that, unlike the `routerProvider` from the `@pankod/refine-nextjs-router`, `routerProvider` from `@pankod/refine-nextjs-router/app` is a function and you need to bind `params` to make it work properly.

    ```tsx
    // app/[[...refine]]/page.tsx

    "use client";

    import { NextRouteComponent } from "@pankod/refine-nextjs-router/app";

    export default NextRouteComponent;
    ```

    **Warning**

    You need to add `"use client";` directive to both `layout.tsx` and `page.tsx` inside `app/[[...refine]]` directory.

    **Warning**

    `checkAuthentication` does not work with `appDir`. We're aiming to release a substitute for it using middleware but for now its not included in this release.

## 3.38.0

### Minor Changes

-   Added `handleRefineParams` helper function to handle catch-all refine params.

-   Added ability to parse catch-all refine route in Next.js router. This way, instead of creating multiple pages, users can only create one page at the root `[[...refine]].tsx` and handle all params for the app.

-   Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `NextRouteComponent` component.

## 3.37.0

### Minor Changes

-   Added `handleRefineParams` helper function to handle catch-all refine params.

-   Added ability to parse catch-all refine route in Next.js router. This way, instead of creating multiple pages, users can only create one page at the root `[[...refine]].tsx` and handle all params for the app.

-   Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `NextRouteComponent` component.

## 3.36.0

### Minor Changes

-   [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added `handleRefineParams` helper function to handle catch-all refine params.

-   [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to parse catch-all refine route in Next.js router. This way, instead of creating multiple pages, users can only create one page at the root `[[...refine]].tsx` and handle all params for the app.

-   [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `NextRouteComponent` component.

## 3.35.0

### Minor Changes

-   Add `initialData` support to `DashboardPage` for `@pankod/refine-nextjs-router`.

## 3.34.0

### Minor Changes

-   [#2142](https://github.com/refinedev/refine/pull/2142) [`dd00de215a`](https://github.com/refinedev/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Add `initialData` support to `DashboardPage` for `@pankod/refine-nextjs-router`.

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

## 3.26.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.6

### Patch Changes

-   Created a wrapper `<Link>` component for handling `href` and `to` props. When using `to` the wrapper will pass it to the `href` prop.

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.25.5

### Patch Changes

-   [#2061](https://github.com/refinedev/refine/pull/2061) [`0237725cf3`](https://github.com/refinedev/refine/commit/0237725cf32923f7d24d3f0c9a2994de30baa921) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Created a wrapper `<Link>` component for handling `href` and `to` props. When using `to` the wrapper will pass it to the `href` prop.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.25.4

### Patch Changes

-   Add `legacyBehavior: false` to `<Link/>` component to migrate to the new Next.js Link behavior. [next.js#36436](https://github.com/vercel/next.js/pull/36436)

-   Updated dependencies []:
    -   @pankod/refine-core@3.34.0

## 3.25.3

### Patch Changes

-   [#2021](https://github.com/refinedev/refine/pull/2021) [`a0a895cae4`](https://github.com/refinedev/refine/commit/a0a895cae42161cca0b78831f30bcc95ead0740a) Thanks [@aliemir](https://github.com/aliemir)! - Add `legacyBehavior: false` to `<Link/>` component to migrate to the new Next.js Link behavior. [next.js#36436](https://github.com/vercel/next.js/pull/36436)

-   Updated dependencies [[`d96ba1e9c8`](https://github.com/refinedev/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d), [`b257d87fef`](https://github.com/refinedev/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184), [`12f08ae6a3`](https://github.com/refinedev/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58)]:
    -   @pankod/refine-core@3.33.0

## 3.25.2

### Patch Changes

-   We've updated Next.js version to `12.1.6`

## 3.25.1

### Patch Changes

-   [#1951](https://github.com/refinedev/refine/pull/1951) [`cc5f9ae78a`](https://github.com/refinedev/refine/commit/cc5f9ae78a13e5fd89f226bf38290678cc73e422) Thanks [@omeraplak](https://github.com/omeraplak)! - We've updated Next.js version to `12.1.6`

## 3.22.2

### Patch Changes

-   [#1873](https://github.com/refinedev/refine/pull/1873) [`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc) Thanks [@aliemir](https://github.com/aliemir)! - Removed dummy default values from internal contexts.
    Updated contexts:

    -   Auth
    -   Access Control
    -   Notification
    -   Translation (i18n)
    -   unsavedWarn

    **BREAKING:** `useGetLocale` hook now can return `undefined` instead of a fallback value of `en` in cases of `i18nProvider` being `undefined`.

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
