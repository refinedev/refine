---
id: migration-guide
title: Migration Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

## **3.0.XX to 4.0.XX**

### Motivation behind breaking changes

TODO

## 🪄 Migrating your project automatically with refine-codemod ✨ (recommended)

[`@refinedev/codemod`][refine-codemod] package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @refinedev/codemod refine3-to-refine4
```

And it's done. Now your project uses `refine@4.x.x`.

## Migrating your project manually

## Updating the packages

Our npm organization has been changed from `@pankod` to `@refinedev`. So you must update your packages to `@refinedev` organization.

```bash
npm uninstall @pankod/refine-core @pankod/refine-antd @pankod/..

npm i @refinedev/core @refinedev/antd @refinedev/..
```

:::caution
You must make this change for all packages that start with `@pankod`.
:::

## **`@pankod/refine-core` changes**

### `routerProvider`

### `authProvider`

<h3>Motivation behind the changes</h3>

Our motivation behind the changes in `authProvider` prop in **refine**'s v4 is to make it flexible and customizable enough to cover much more cases than before without going down the rabbit hole.

We wanted to create a common interface for the properties of `authProvider` to make them flexible for many cases and complement the features of refine without requiring our users to write complex code blocks and conditions.

Previously, the `authProvider` methods returned a resolved or rejected promise rather than a resolved promise with consistent return types. This behavior is not ideal since a rejected promise is typically associated with an error or exceptional case, which is not the case for an authentication failure. This caused confusion for developers and made it harder to debug unexpected behaviors.

`authProvider` methods now returns a resolved promise in all cases, but with an object that contains a `success` property that indicates whether the operation was successful or not, and an optional `error` property that contains an `Error` object in case of failure. With consistent return types makes it easier to debug and understand the authentication process.

Additionally, the auth hooks no longer have default redirection, which could be confusing for developers who were not aware of this behavior. By adding a `redirectTo` property to the `authProvider` method's return object, developers can have more control over where the user is redirected after a successful operation.

<h3>Naming changes</h3>

-   `AuthPovider` interface changed to `AuthBindings`.

    ```diff
    - import { AuthProvider } from "@refinedev/core";
    + import { AuthBindings } from "@refinedev/core";

    - const authProvider: AuthProvider = {/* ... */}
    + const authProvider: AuthBindings = {/* ... */}
    ```

-   `getUserIdentity` method of the `authProvider` changed to `getIdentity`.
-   `checkError` method of the `authProvider` changed to `onError`.
-   `checkAuth` method of the `authProvider` changed to `check`.

    ```diff
    const authProvider = {
    -     getUserIdentity,
    +     getIdentity,
    -     useCheckError,
    +     useOnError,
    -     checkAuth,
    +     check,
    }
    ```

-   `useAuthenticated` hook changed to `useIsAuthenticated`.

    ```diff
    - import { useAuthenticated } from "@refinedev/core";
    + import { useIsAuthenticated } from "@refinedev/core";
    ```

<h3>Methods</h3>

#### `login`

-   `login` method now requires that a promise be resolved instead of rejected, with a return type of `AuthActionResponse`
-   `login` method no longer rejects promises, you should resolve the promise with a `success` and an `error` value in case of login failure or success.
-   `useLogin` no longer has default redirection. You will need to add `redirectTo` property to the `login` method's return object.

```diff
const authProvider = {
    login: ({ email, password }) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
-           return Promise.resolve();
+           return Promise.resolve({
+               success: true,
+               redirectTo: "/",
+           });
        }

-       return Promise.reject();
+       return Promise.resolve({
+           success: false,
+           error: new Error("Invalid email or password"),
+       });
    },
}
```

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

#### `logout`

-   `logout` method now requires that a promise be resolved instead of rejected, with a return type of `AuthActionResponse`
-   `logout` method no longer rejects promises, you should resolve the promise with a `success` and an `error` value in case of logout failure or success.
-   `useLogout` no longer has default redirection. You will need to add `redirectTo` property to the `logout` method's return object.

```diff
const authProvider = {
    logout: ({ email, password }) => {
        localStorage.removeItem("auth");
-       return Promise.resolve();
+       return Promise.resolve({
+       success: true,
+       redirectTo: "/login",
+       });
    },
}
```

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

#### `register`

-   `register` method now requires that a promise be resolved instead of rejected, with a return type of `AuthActionResponse`
-   `register` method no longer rejects promises, you should resolve the promise with a `success` and an `error` value in case of register failure or success.
-   `useRegister` no longer has default redirection. You will need to add `redirectTo` property to the `register` method's return object.

```diff
const authProvider = {
    register: ({ email, password }) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
-           return Promise.reject();
+           return Promise.resolve({
+               success: false,
+               error: {
+                   name: "Register Error"",
+                   message: "User already exists",
+               },
+           });
        }

        mockUsers.push({ email });

-       return Promise.resolve();
+       return Promise.resolve({
+           success: true,
+           redirectTo: "/",
+       });
    },
}
```

#### `forgotPassword`

-   `forgotPassword` method now requires that a promise be resolved instead of rejected, with a return type of `AuthActionResponse`
-   `forgotPassword` method no longer rejects promises, you should resolve the promise with a `success` and an `error` value in case of register failure or success.
-   `useForgotPassword` no longer has default redirection. You will need to add `redirectTo` property to the `forgotPassword` method's return object.

```diff
const authProvider = {
    // ---
    forgotPassword: ({ password }) => {
        // send password reset link to the user's email address here

        // if request is successful
-       return Promise.resolve();
+       return Promise.resolve({
+           success: true,
+           redirectTo: "/login",
+       });

        // if request is not successful
-       return Promise.reject();
+       return Promise.resolve({
+           success: false,
+           error: {
+               name: "Forgot Password Error",
+               message: "Email address does not exist",
+           },
+       });
    },
    // ---
};
```

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

#### `updatePassword`

-   `updatePassword` method now requires that a promise be resolved instead of rejected, with a return type of `AuthActionResponse`
-   `updatePassword` method no longer rejects promises, you should resolve the promise with a `success` and an `error` value in case of register failure or success.
-   `useUpdatePassword` no longer has default redirection. You will need to add `redirectTo` property to the `updatePassword` method's return object.

```diff
const authProvider = {
    // ---
    updatePassword: ({ password }) => {
        // update the user's password here

        // if request is successful
-       return Promise.resolve();
+       return Promise.resolve({
+           success: true,
+           redirectTo: "/login",
+       });

        // if request is not successful
-       return Promise.reject();
+       return Promise.resolve({
+           success: false,
+           error: {
+               name: "Forgot Password Error",
+               message: "Email address does not exist",
+           },
+       });
    },
    // ---
};
```

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

### `check`

-   `checkAuth` method of the authProvider changed to `check`.
-   `check` method now requires that a promise be resolved instead of rejected, with a return type of `CheckResponse`
-   `check` method no longer rejects promises, you should resolve the promise with a `success` and an `error` value in case of register failure or success.
-   `<Authenticated/>` component no longer has default redirection. You will need to add `redirectTo` property to the `check` method's return object.
-   `<Authenticated/>` component no longer call `logout` method by default. You will need to add `logout` property to `true` to the `check` method's return object.

```diff
const authProvider = {
-   checkAuth: () => {
+   check: () => {
        const user = localStorage.getItem("auth");

        if (user) {
-           return Promise.resolve();
+           return Promise.resolve({
+               authenticated: true,
+           });
        }

-       return Promise.reject();
+       return Promise.resolve({
+           authenticated: false,
+           redirectTo: "/login",
+           logout: true,
+           error: new Error("User not found"),
+       });
    },
};
```

```ts
type CheckResponse = {
    authenticated: boolean;
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

### `onError`

-   `checkError` method of the authProvider changed to `onError`.
-   `onError` method now requires that a promise be resolved instead of rejected, with a return type of `OnErrorResponse`
-   `onError` method no longer rejects promises, you should resolve the promise with a `success` and an `onError` value in case of register failure or success.
-   `useOnError` no longer has default redirection. You will need to add `redirectTo` property to the `onError` method's return object.
-   `useOnError` component no longer call `logout` method by default. You will need to add `logout` property to `true` to the `check` method's return object.

```diff
const authProvider = {
-   checkError: (error) => {
+   onError: (error) => {
        if (error.status === 401 || error.status === 403) {
-           return Promise.reject();
+           return Promise.resolve({
+               redirectTo: "/login",
+               logout: true,
+               error: error,
+           });
        }

-       return Promise.reject();
+       return Promise.resolve({});
    },
};
```

```ts
type OnErrorResponse = {
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

## `getPermissions`

-   `getPermissions` method now requires that a promise be resolved instead of rejected, with a return type of `PermissionResponse`

```diff
const authProvider = {
    getPermissions: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { roles } = JSON.parse(user);

            return Promise.resolve(roles);
        }

-        return Promise.reject();
+        return Promise.resolve();
    },
};
```

```ts
type PermissionResponse = unknown;
```

## `getIdentity`

-   `getUserIdentity` method of the authProvider changed to `getIdentity`.
-   `getIdentity` method now requires that a promise be resolved instead of rejected, with a return type of `IdentityResponse`

```diff
const authProvider: AuthProvider = {
-   getUserIdentity: () => {
+   getIdentity: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return Promise.resolve({ email, roles });
        }

-        return Promise.reject();
+        return Promise.resolve();
    },
};
```

```ts
type IdentityResponse = unknown;
```

:::note

> These changes can be done automatically with `codemod`

**refine** still supports the `authProvider@v3` for backward compatibility. We changed name to `legacyAuthProvider` and it will be removed in the next major version. If you want to continue using the `authProvider@v3` you can use it as `legacyAuthProvider` in your project.

```diff
- import { AuthProvider } from "@refinedev/core";
+ import { LegacyAuthProvider } from "@refinedev/core";

- const authProvider: AuthProvider = {/* ... */}
+ const authProvider: LegacyAuthProvider = {/* ... */}

const App = () => {
    return (
        <Refine
-           authProvider={authProvider}
+           legacyAuthProvider={authProvider}
        >
            <AppLayout />
        </Refine>
    );
};

```

Also you need to add `v3LegacyAuthProviderCompatible: true` to your auth hooks to continue using the `authProvider@v3` in your project.

```ts
import { useLogin } from "@refinedev/core";

// ---

const login = useLogin({
    // highlight-next-line
    v3LegacyAuthProviderCompatible: true,
});
```

:::

### Update `getList` parameters of `dataProvider`

`getList` parameters of `dataProvider` have been updated.

-   `hasPagination` is deprecated. Use `pagination.mode` instead.
-   `sort` is deprecated. Use `sorters` instead.
-   `metaData` is deprecated. Use `meta` instead.

```diff
 export const dataProvider = {
     getList: ({
         resource,
         pagination: {
+            mode: "off" | "server" | "client",
         },
-        hasPagination,
+        sorters,
-        sort,
         filters,
+        meta,
-        metaData,
     }) => {
         ...
     },
 };
```

:::note
`getList` parameters still have `hasPagination`, `sort`, and `metaData` props. But they are deprecated. You can use them for now. But we recommend you to use `pagination.mode`, `sorters`, and `meta` props instead.
:::

### Update `custom` parameters of `dataProvider`

`custom` parameters of `dataProvider` has been updated. `sort` is deprecated. Use `sorters` instead.

```diff
 export const dataProvider = {
     custom: ({
         ...
+        sorters,
-        sort,
     }) => {
         ...
     },
 };
```

:::note
`custom` parameters still have `sort` prop. But it is deprecated. You can use it for now. But we recommend you to use `sorters` prop instead.
:::

### `useList` and `useInfiniteList` hooks

`config` prop are deprecated. Use `sorters`, `filters`, and `pagination` props instead.

```diff
useList({
-    config: {
-        sort,
-        filters,
-        pagination,
-        hasPagination,
-    },
+    sorters,
+    filters,
+    pagination: {
+        mode: "off" | "server" | "client",
+    },
})

useInfiniteList({
-    config: {
-        sort,
-        filters,
-        pagination,
-        hasPagination,
-    },
+    sorters,
+    filters,
+    pagination: {
+        mode: "off" | "server" | "client",
+    },
})
```

### `useTable` hook

`useTable` return values and properties are updated.

-   `initialCurrent` and `initialPageSize` props are deprecated. Use `pagination` prop instead.

    ```diff
    useTable({
    -    initialCurrent,
    -    initialPageSize,
    +    pagination: {
    +        current,
    +        pageSize,
    +    },
    })
    ```

-   `hasPagination` prop is deprecated. Use `pagination.mode` instead.

    ```diff
    useTable({
    -   hasPagination,
        pagination: {
    +        mode: "off" | "server" | "client",
        },
    })
    ```

-   `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

    ```diff
    useTable({
    -    initialSorter,
    -    permanentSorter,
    +    sorters: {
    +        initial,
    +        permanent,
    +    },
    })
    ```

-   `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

    ```diff
    useTable({
    -    initialFilter,
    -    permanentFilter,
    -    defaultSetFilterBehavior,
    +    filters: {
    +        initial,
    +        permanent,
    +        defaultBehavior,
    +    },
    })
    ```

-   `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

    ```diff
    const {
    -   sorter,
    +   sorters,
    -   setSorter,
    +   setSorters,
    } = useTable();
    ```

### `useImport` hook

`resourceName` prop is deprecated. Use `resource` prop instead.

```diff
useImport({
-    resourceName,
+    resource,
})
```

### `useExport` hook

`resourceName` and `sorter` props are deprecated. Use `resource` and `sorters` props instead.

```diff
useExport({
-    resourceName,
+    resource,
-    sorter,
+    sorters,
})
```

### `useSelect` hook

-   By default, pagination was disabled. If you want to enable pagination, you should set `pagination.mode` prop to `"server"`.

    ```diff
    useSelect({
    -    hasPagination: false,
    +    pagination: {
    +        mode: "server",
    +    },
    })
    ```

-   `sort` prop is deprecated. Use `sorters` prop instead.

    ```diff
    useSelect({
    -    sort,
    +    sorters,
    })
    ```

### `useCustom` hook

`config.sort` prop is deprecated. Use `config.sorters` prop instead.

```diff
useCustom({
    config: {
-       sort,
+       sorters,
    },
})
```

### `metaData` to `meta`

`metaData` is deprecated in all hooks and components. Use `meta` instead.

```diff
useList({
-    metaData,
+    meta,
})

<RefreshButton
-    metaData
+    meta
/>
```

### Resource `options`'s to `meta`

`options` prop of resource is deprecated. Use `meta` prop instead.

```diff
<Refine
    resources={[
        {
            name: "posts",
-           options: {},
+           meta: {},
        },
    ]}
/>
```

### `<ReadyPage>` component is deprecated

## **`@pankod/refine-antd` changes**

### Import changes

All **Ant Design** components re-exported from `@pankod/refine-antd` have been removed. You should import them from `antd` package directly.

```diff
-import { useTable, SaveButton, Button, Form, Input, Select } from "@pankod/refine-antd";

+import { useTable, SaveButton } from "@refinedev/antd";
+import { Button, Form, Input, Select } from "antd";
```

`Icons` are also removed from `@pankod/refine-antd`. You should import them from `@ant-design/icons` directly.

```diff
-import { Icons } from "@pankod/refine-antd";
-const { EditOutlined } = Icons;

+ import { EditOutlined } from "@ant-design/icons";
```

So, you should install `antd` and `@ant-design/icons` packages to access all components and icons.

```bash
npm install antd @ant-design/icons
```

### `useTable` hook

`useTable` return values and properties are updated.

-   `initialCurrent` and `initialPageSize` props are deprecated. Use `pagination` prop instead.

    ```diff
    useTable({
    -    initialCurrent,
    -    initialPageSize,
    +    pagination: {
    +        current,
    +        pageSize,
    +    },
    })
    ```

-   `hasPagination` prop is deprecated. Use `pagination.mode` instead.

    ```diff
    useTable({
    -   hasPagination,
        pagination: {
    +        mode: "off" | "server" | "client",
        },
    })
    ```

-   `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

    ```diff
    useTable({
    -    initialSorter,
    -    permanentSorter,
    +    sorters: {
    +        initial,
    +        permanent,
    +    },
    })
    ```

-   `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

    ```diff
    useTable({
    -    initialFilter,
    -    permanentFilter,
    -    defaultSetFilterBehavior,
    +    filters: {
    +        initial,
    +        permanent,
    +        defaultBehavior,
    +    },
    })
    ```

-   `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

    ```diff
    const {
    -   sorter,
    +   sorters,
    -   setSorter,
    +   setSorters,
    } = useTable();
    ```

### `useSimpleList` hook

-   Now `useSimpleList` hook will not accept all of `<List>` component properties So, you can give their props to `<List>` component directly.

    ```diff
    import { useSimpleList } from "@refinedev/antd";
    import { List } from "antd";

    const { listProps } = useSimpleList({
        resource: "orders",
        pagination: {
            pageSize: 6,
    -       simple: true,
        },
    });

    <List
        {...listProps}
    +   pagination={{
    +     ...listProps.pagination,
    +     simple: true,
    +   }}
        ... // other props
    />
    ```

-   `initialCurrent` and `initialPageSize` props are deprecated. Use `pagination` prop instead.

    ```diff
    useSimpleList({
    -    initialCurrent,
    -    initialPageSize,
    +    pagination: {
    +        current,
    +        pageSize,
    +    },
    })
    ```

-   `hasPagination` prop is deprecated. Use `pagination.mode` instead.

    ```diff
    useSimpleList({
    -   hasPagination,
        pagination: {
    +        mode: "off" | "server" | "client",
        },
    })
    ```

-   `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

    ```diff
    useSimpleList({
    -    initialSorter,
    -    permanentSorter,
    +    sorters: {
    +        initial,
    +        permanent,
    +    },
    })
    ```

-   `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

    ```diff
    useSimpleList({
    -    initialFilter,
    -    permanentFilter,
    -    defaultSetFilterBehavior,
    +    filters: {
    +        initial,
    +        permanent,
    +        defaultBehavior,
    +    },
    })
    ```

-   `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

    ```diff
    const {
    -   sorter,
    +   sorters,
    -   setSorter,
    +   setSorters,
    } = useSimpleList();
    ```

### `useSelect` hook

-   By default, pagination was disabled. If you want to enable pagination, you should set `pagination.mode` prop to `"server"`.

    ```diff
    useSelect({
    -    hasPagination: false,
    +    pagination: {
    +        mode: "server",
    +    },
    })
    ```

-   `sort` prop is deprecated. Use `sorters` prop instead.

    ```diff
    useSelect({
    -    sort,
    +    sorters,
    })
    ```

### `useCheckboxGroup` and `useRadioGroup` hooks

`sort` prop is deprecated. Use `sorters` prop instead.

```diff
useCheckboxGroup({
-    sort,
+    sorters,
})

useRadioGroup({
-    sort,
+    sorters,
})
```

### `useImport` hook

`resourceName` prop is deprecated. Use `resource` prop instead.

```diff
useImport({
-    resourceName,
+    resource,
})
```

### `useMenu` hook is remove

`useMenu` hook is removed. It will be exported from `@refinedev/core` package.

```diff
-import { useMenu } from "@pankod/refine-antd";
+import { useMenu } from "@refinedev/core";
```

### Buttons

Deprecated `ignoreAccessControlProvider` prop is removed from all buttons exported from `@refinedev/antd` package. Use `accessControl.enabled` prop instead.

```diff
<CreateButton
-   ignoreAccessControlProvider
+   accessControl={{
+       enabled: false,
+   }}
/>
```

### `<ReadyPage>` component is deprecated

## **`@pankod/refine-mui` changes**

### Import changes

All **Material UI** components re-exported from `@pankod/refine-mui` have been removed. You should import them from Material UI packages directly.

```diff
- import {
-    Box,
-    NumberField,
-    Stack,
-    Typography,
-    ThemeProvider,
-    DataGrid
-    LoadingButton,
- } from "@pankod/refine-mui";

+ import { NumberField } from "@refinedev/mui";
+ import { ThemeProvider } from "@mui/material/styles";
+ import { Box, Stack, Typography } from "@mui/material";
+ import { DataGrid } from "@mui/x-data-grid";
+ import { LoadingButton } from "@mui/lab";
```

So, you may need to install `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/lab`, and `@mui/x-data-grid` packages.

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
```

### Theme

TODO

### `useDataGrid` hook

`useDataGrid` return values and properties are updated.

-   `initialCurrent` and `initialPageSize` props are deprecated. Use `pagination` prop instead.

    ```diff
    useDataGrid({
    -    initialCurrent,
    -    initialPageSize,
    +    pagination: {
    +        current,
    +        pageSize,
    +    },
    })
    ```

-   `hasPagination` prop is deprecated. Use `pagination.mode` instead.

    ```diff
    useDataGrid({
    -   hasPagination,
        pagination: {
    +        mode: "off" | "server" | "client",
        },
    })
    ```

-   `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

    ```diff
    useDataGrid({
    -    initialSorter,
    -    permanentSorter,
    +    sorters: {
    +        initial,
    +        permanent,
    +    },
    })
    ```

-   `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

    ```diff
    useDataGrid({
    -    initialFilter,
    -    permanentFilter,
    -    defaultSetFilterBehavior,
    +    filters: {
    +        initial,
    +        permanent,
    +        defaultBehavior,
    +    },
    })
    ```

-   `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

    ```diff
    const {
    -   sorter,
    +   sorters,
    -   setSorter,
    +   setSorters,
    } = useDataGrid();
    ```

### `useAutocomplete` hook

-   By default, pagination was disabled. If you want to enable pagination, you should set `pagination.mode` prop to `"server"`.

    ```diff
    useAutocomplete({
    -    hasPagination: false,
    +    pagination: {
    +        mode: "server",
    +    },
    })
    ```

-   `sort` prop is deprecated. Use `sorters` prop instead.

    ```diff
    useAutocomplete({
    -    sort,
    +    sorters,
    })
    ```

### `useMenu` hook is removed

`useMenu` hook is removed. It will be exported from `@refinedev/core` package.

```diff
-import { useMenu } from "@pankod/refine-mui";
+import { useMenu } from "@refinedev/core";
```

### Buttons

Deprecated `ignoreAccessControlProvider` prop is removed from all buttons exported from `@refinedev/mui` package. Use `accessControl.enabled` prop instead.

```diff
<CreateButton
-   ignoreAccessControlProvider
+   accessControl={{
+       enabled: false,
+   }}
/>
```

### Basic Views

Deprecated `cardProps`, `cardHeaderProps`, `cardContentProps`, `actionButtons`, and `cardActionsProps` props are removed from all basic views components exported from `@refinedev/mui` package. Use `wrapperProps`, `headerProps`, `contentProps`, `footerButtons`, and `footerButtonProps` props instead.

### `<ReadyPage>` component is deprecated

## **`@pankod/refine-mantine` changes**

### Import changes

All **Mantine** components re-exported from `@pankod/refine-mantine` have been removed. You should import them from Mantine packages directly.

```diff
- import {
-    MantineProvider,
-    NotificationsProvider,
-    TextInput,
-    Select,
-    List,
-    useSelect,
- } from "@pankod/refine-mui";

+ import { useSelect, List } from "@refinedev/mantine";
+ import { MantineProvider, TextInput, Select } from "@mantine/core";
+ import { NotificationsProvider } from "@mantine/notifications";
```

So, you may need to install `@mantine/core`, `@emotion/react`, `@mantine/hooks`, `@mantine/notifications`, and `@mantine/form` packages.

```bash
npm install @mantine/core @emotion/react @mantine/hooks @mantine/notifications @mantine/form
```

### `useSelect` hook

-   By default, pagination was disabled. If you want to enable pagination, you should set `pagination.mode` prop to `"server"`.

    ```diff
    useSelect({
    -    hasPagination: false,
    +    pagination: {
    +        mode: "server",
    +    },
    })
    ```

-   `sort` prop is deprecated. Use `sorters` prop instead.

    ```diff
    useSelect({
    -    sort,
    +    sorters,
    })
    ```

### Buttons

Deprecated `ignoreAccessControlProvider` prop is removed from all buttons exported from `@refinedev/mui` package. Use `accessControl.enabled` prop instead.

```diff
<CreateButton
-   ignoreAccessControlProvider
+   accessControl={{
+       enabled: false,
+   }}
/>
```

### `<ReadyPage>` component is deprecated

## **`@pankod/refine-chakra-ui` changes**

### Import changes

All **Chakra UI** components re-exported from `@pankod/refine-chakra-ui` have been removed. You should import them from `@chakra-ui/react` package directly.

```diff
- import {
-    ChakraProvider,
-    Input,
-    Select,
-    ShowButton,
-    usePagination,
- } from "@pankod/refine-mui";

+ import { usePagination, ShowButton } from "@refinedev/chakra-ui";
+ import { ChakraProvider, Input, Select } from "@chakra-ui/react";
```

So, you may need to install `@chakra-ui/react`, `@emotion/react`, `@emotion/styled`, and `framer-motion` packages.

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Buttons

Deprecated `ignoreAccessControlProvider` prop is removed from all buttons exported from `@refinedev/mui` package. Use `accessControl.enabled` prop instead.

```diff
<CreateButton
-   ignoreAccessControlProvider
+   accessControl={{
+       enabled: false,
+   }}
/>
```

### `<ReadyPage>` component is deprecated

## **`@pankod/refine-react-table` changes**

### Import changes

All `@tanstack/react-table` imports re-exported from `@pankod/refine-react-table` have been removed. You should import them from the `@tanstack/react-table` package directly.

```diff
- import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

+ import { useTable } from "@refinedev/";
+ import { ColumnDef, flexRender } from "@tanstack/react-table";
```

### `useTable` hook

`useTable` return values and properties are updated.

-   `initialCurrent` and `initialPageSize` props are deprecated. Use `pagination` prop instead.

    ```diff
    useTable({
        refineCoreProps: {
    -      initialCurrent,
    -      initialPageSize,
    +      pagination: {
    +          current,
    +          pageSize,
    +      },
        },
    })
    ```

-   `hasPagination` prop is deprecated. Use `pagination.mode` instead.

    ```diff
    useTable({
        refineCoreProps: {
    -      hasPagination,
           pagination: {
    +           mode: "off" | "server" | "client",
           },
        },
    })
    ```

-   `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

    ```diff
    useTable({
        refineCoreProps: {
    -      initialSorter,
    -      permanentSorter,
    +      sorters: {
    +          initial,
    +          permanent,
    +      },
        },
    })
    ```

-   `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

    ```diff
    useTable({
        refineCoreProps: {
    -      initialFilter,
    -      permanentFilter,
    -      defaultSetFilterBehavior,
    +      filters: {
    +          initial,
    +          permanent,
    +          defaultBehavior,
    +      },
        },
    })
    ```

-   `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

    ```diff
    const {
        refineCore: {
    -        sorter,
    -        setSorter,
    +        sorters,
    +        setSorters,
        },
    } = useTable();
    ```

## **`@pankod/refine-react-hook-form` changes**

### Import changes

All `react-hook-form` imports re-exported from `@pankod/refine-react-hook-form` have been removed. You should import them from the `react-hook-form` package directly.

```diff
- import { useForm, Controller } from "@pankod/refine-react-hook-form";

+ import { useForm } from "@refinedev/react-hook-form";
+ import { Controller } from "react-hook-form";
```

## **2.0.XX to 3.0.XX**

### Motivation behind breaking changes

One of the big requests we received from the Community after we released the first version of **refine** was that **refine** could be used with different UI frameworks other than Ant Design.
We are happy to announce that you can use it as **refine** `Headless` on top of these requests. Now **refine** is a framework and works in harmony with the any UI framework you choose. At the same time, all projects made with Refine@2 are also Refine@3 compatible.

With **refine** 3.x.x **headless** version, we have released two new packages named `@pankod/refine-core` and `@pankod/refine-antd`. The `refine-core` package includes UI independent hooks and components. The `refine-antd` package includes Ant Design components and there are table, form, select, etc hooks and components compatible with `@pankod/refine-core`.

## 🪄 Migrating your project automatically with refine-codemod ✨ (recommended)

[`@pankod/refine-codemod`][refine-codemod] package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `2.x.x` to `3.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @pankod/refine-codemod refine2-to-refine3
```

And it's done. Now your project uses `refine@3.x.x`.

## Migrating your project manually

### Updating the packages

Packages used by your app must be updated to `^3.xx.xx`

@pankod/refine has been deprecated with **refine** 3.x.x version. You must now use `@pankod/refine-core` and `@pankod/refine-antd`.

```bash
npm uninstall @pankod/refine

npm i @pankod/refine-core @pankod/refine-antd
```

export const Packages = () => {
const packages = [
"@pankod/refine-airtable",
"@pankod/refine-altogic",
"@pankod/refine-graphql",
"@pankod/refine-hasura",
"@pankod/refine-nestjsx-crud",
"@pankod/refine-nextjs-router",
"@pankod/refine-react-router",
"@pankod/refine-simple-rest",
"@pankod/refine-strapi",
"@pankod/refine-strapi-v4",
"@pankod/refine-strapi-graphql",
"@pankod/refine-supabase",
"@pankod/refine-appwrite",
"@pankod/refine-ably",
]
return (
<Tabs
defaultValue="@pankod/refine-airtable"
values={packages.map(p => ({
label: p, value: p
}))} >{
packages.map(p =>
<TabItem value={p}>
<CodeBlock className="language-bash">{`npm i ${p}@latest`}</CodeBlock>
</TabItem>
)
}
</Tabs>
)
}

<Packages/>

:::danger
Make sure your using packages are version of 3.x.x otherwise you may get errors.
:::

### Change Import

UI independent import packages have been migrated to the `refine-core` package with version **refine** 3.x.x.

<details>
<summary>Show All Core Imports</summary>
<p>

```tsx
[
    "Authenticated",
    "AuthenticatedProps",
    "CanAccess",
    "CanAccessProps",
    "Refine",
    "RefineProps",
    "LayoutWrapperProps",
    "LayoutWrapper",
    "LayoutProps",
    "DefaultLayout",
    "RouteChangeHandler",
    "UndoableQueue",
    "defaultAccessControlContext",
    "AccessControlContext",
    "AccessControlContextProvider",
    "CanParams",
    "CanReturnType",
    "IAccessControlContext",
    "TLogoutVariables",
    "TLogoutData",
    "IAuthContext",
    "Pagination",
    "Search",
    "CrudOperators",
    "CrudFilter",
    "CrudSort",
    "CrudFilters",
    "CrudSorting",
    "CustomResponse",
    "GetListResponse",
    "CreateResponse",
    "CreateManyResponse",
    "UpdateResponse",
    "UpdateManyResponse",
    "GetOneResponse",
    "GetManyResponse",
    "DeleteOneResponse",
    "DeleteManyResponse",
    "IDataContext",
    "IDataContextProvider",
    "defaultDataProvider",
    "DataContext",
    "DataContextProvider",
    "ILiveContext",
    "ILiveContextProvider",
    "LiveContext",
    "LiveContextProvider",
    "defaultNotificationProvider",
    "NotificationContext",
    "NotificationContextProvider",
    "RefineContext",
    "RefineContextProvider",
    "ResourceContext",
    "ResourceContextProvider",
    "IResourceContext",
    "OptionsProps",
    "ResourceProps",
    "IResourceComponentsProps",
    "IResourceComponents",
    "IResourceItem",
    "RouterContext",
    "RouterContextProvider",
    "IRouterProvider",
    "IRouterContext",
    "PromptProps",
    "TranslationContext",
    "TranslationContextProvider",
    "Translate",
    "I18nProvider",
    "ITranslationContext",
    "UnsavedWarnContext",
    "UnsavedWarnContextProvider",
    "IUnsavedWarnContext",
    "importCSVMapper",
    "userFriendlyResourceName",
    "userFriendlySecond",
    "parseTableParams",
    "parseTableParamsFromQuery",
    "stringifyTableParams",
    "compareFilters",
    "unionFilters",
    "setInitialFilters",
    "file2Base64",
    "UseCanProps",
    "useCan",
    "useCanWithoutCache",
    "useAuthenticated",
    "useCheckError",
    "useGetIdentity",
    "useIsAuthenticated",
    "UseLoginReturnType",
    "useLogin",
    "useLogout",
    "usePermissions",
    "useIsExistAuthentication",
    "unionFilters",
    "useApiUrl",
    "UseCreateReturnType",
    "useCreate",
    "UseCreateManyReturnType",
    "useCreateMany",
    "UseCustomProps",
    "useCustom",
    "useDelete",
    "useDeleteMany",
    "UseListProps",
    "useList",
    "UseManyProps",
    "useMany",
    "UseOneProps",
    "useOne",
    "UseUpdateReturnType",
    "useUpdate",
    "useUpdateMany",
    "CSVDownloadProps",
    "LabelKeyObject",
    "useExport",
    "Authenticated",
    "CanAccess",
    "LayoutWrapper",
    "Refine",
    "RouteChangeHandler",
    "UndoableQueue",
    "file2Base64",
    "importCSVMapper",
    "parseTableParams",
    "parseTableParamsFromQuery",
    "setInitialFilters",
    "stringifyTableParams",
    "unionFilters",
    "useApiUrl",
    "useAuthenticated",
    "useCacheQueries",
    "useCan",
    "useCanWithoutCache",
    "useCancelNotification",
    "useCheckError",
    "useCreate",
    "useCreateMany",
    "useCustom",
    "useDelete",
    "useDeleteMany",
    "useExport",
    "useGetIdentity",
    "useGetLocale",
    "useGetManyQueries",
    "useGetOneQueries",
    "useHandleNotification",
    "useIsAuthenticated",
    "useIsExistAuthentication",
    "useList",
    "useListResourceQueries",
    "useLiveMode",
    "useLogin",
    "useLogout",
    "useMany",
    "useMutationMode",
    "useNavigation",
    "useNotification",
    "useOne",
    "usePermissions",
    "usePublish",
    "useRedirectionAfterSubmission",
    "useRefineContext",
    "useResource",
    "useResourceSubscription",
    "useResourceWithRoute",
    "useRouterContext",
    "useSetLocale",
    "useShow",
    "useSubscription",
    "useSyncWithLocation",
    "useTitle",
    "useTranslate",
    "useUpdate",
    "useUpdateMany",
    "useWarnAboutChange",
    "userFriendlyResourceName",
    "AuthenticatedProps",
    "CanAccessProps",
    "RefineProps",
    "LayoutWrapperProps",
    "LiveModeProps",
    "UseResourceSubscriptionProps",
    "PublishType",
    "UseSubscriptionProps",
    "LiveEvent",
    "HistoryType",
    "UseRedirectionAfterSubmissionType",
    "UseWarnAboutChangeType",
    "UseMutationModeType",
    "useRefineContext",
    "UseSyncWithLocationType",
    "TitleProps",
    "UseResourceType",
    "useResourceWithRoute",
    "useShowReturnType",
    "useShowProps",
    "UseGetLocaleType",
    "Fields",
    "NestedField",
    "QueryBuilderOptions",
    "MetaDataQuery",
    "VariableOptions",
    "HttpError",
    "BaseRecord",
    "Option",
    "MapDataFn",
    "MutationMode",
    "IUndoableQueue",
    "RedirectionTypes",
    "ResourceErrorRouterParams",
    "ResourceRouterParams",
    "SuccessErrorNotification",
    "OpenNotificationParams",
    "AuthProvider",
];
```

</p>
</details>

All of the imports defined above must now be imported from `@pankod/refine-core`. UI related imports and other imports are now in `@pankod/refine-antd`.

```diff title="App.tsx"
- import { Refine } from "@pankod/refine";
+ import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-json-server";

- import "@pankod/refine/dist/styles.min.css";
+ import "@pankod/refine-antd/dist/reset.css"

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
        />
    );
};
```

<details>
<summary>List Page Example</summary>
<p>

```diff title="PostList.tsx"
- import {
-    IResourceComponentsProps,
-    useMany,
-    List,
-    TextField,
-    TagField,
-    DateField,
-    Table,
-    useTable,
-    Space,
-    EditButton,
-    ShowButton,
-    FilterDropdown,
-    Select,
-    useSelect,
-    DeleteButton,
- } from "@pankod/refine"

+ import { IResourceComponentsProps, useMany } from "@pankod/refine-core";

+ import {
+    List,
+    TextField,
+    TagField,
+    DateField,
+    useTable,
+    EditButton,
+    ShowButton,
+    FilterDropdown,
+    useSelect,
+    DeleteButton,
+} from "@pankod/refine-antd";
+ import { Table, Space, Select } from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    categoriesData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => {
                        return (
                            <Space>
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};

```

</p>
</details>

### `notificationProvider`

With **refine** 3.x.x, you can include and use different notification libraries in your project. The use of `notificationProvider` with Ant Design should be as below.

```tsx
import { Refine } from "@pankod/refine-core";
//highlight-start
import { notificationProvider } from "@pankod/refine-antd";
//highlight-end
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostEdit, PostCreate, PostShow } from "./pages";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
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
            //highlight-start
            notificationProvider={notificationProvider}
            //highlight-end
        />
    );
};
```

### `Layout` and `ErrorComponent`

If you are using the default `layout` of **refine**, you need to import and define it from the `refine-antd` package as in the example below.

```tsx
import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    //highlight-start
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
//highlight-end
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            //highlight-start
            Layout={Layout}
            catchAll={<ErrorComponent />}
            //highlight-end
        />
    );
};
```

### Default `LoginPage`

If you are using **refine**'s default login page while using AuthProvider, you must now import and define `LoginPage` from `@pankod/refine-antd`.

```tsx
import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    //highlight-next-line
    LoginPage,
    Layout,
    ErrorComponent,
    //highlight-next-line
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostEdit, PostShow } from "pages/posts";
import { DashboardPage } from "pages/dashboard";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            DashboardPage={DashboardPage}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            //highlight-next-line
            LoginPage={LoginPage}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
```

### `configProviderProps` to `ConfigProvider`

configProviderProps has been deprecated. Instead we use `ConfigProvider` which is included in the `refine-antd` package. If you are using `ConfigProvider` you need to wrap `Refine` component as below.

```diff
import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
+   ConfigProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
+       <ConfigProvider direction={"rtl"}>
            <Refine
                dataProvider={dataProvider(API_URL)}
                routerProvider={routerProvider}
-               configProviderProps={{
-                   direction: "rtl",
-               }}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
+       </ConfigProvider>
    );
};
```

### `setEditId` to `setId` & `editId` to `id`

Change the use `setEditId` and `editId` used in `useEditableTable`, `useModalForm`, and `useDrawerForm`.

-   `setEditId` -> `setId`

-   `editId` -> `id`

```diff title="PostList"
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    SaveButton,
    EditButton,
    TextField,
    useEditableTable,
} from "@pankod/refine-antd";
import { Table,
    Form,
    Space,
    Button,
    Input
} from "antd";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const {
        tableProps,
        formProps,
        isEditing,
-       setEditId,
+       setId,
-       editId,
+       id,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
    } = useEditableTable<IPost>();
};
```

[refine-codemod]: https://github.com/refinedev/refine/tree/master/packages/codemod
[refine]: /api-reference/core/components/refine-config.md
[resources]: /api-reference/core/components/refine-config.md#resources
[routerprovider]: /api-reference/core/providers/router-provider.md
[custompages]: /advanced-tutorials/custom-pages.md
[auth-provider]: /api-reference/core/providers/auth-provider/
