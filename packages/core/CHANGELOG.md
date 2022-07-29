# @pankod/refine-core

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
