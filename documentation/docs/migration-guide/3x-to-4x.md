---
id: 3x-to-4x
title: Migrating from 3.x.x to 4.x.x
sidebar_label: 3.x.x to 4.x.x 🆙
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

### Motivation behind the release

In refine v4, we had a target of making **refine** available in every platform you can use React and make it easy to use in both existing projects and new ones. This also comes with making **refine** flexible and a better fit for a wider use cases. This is only available if we present a more robust, easy to integrate and consistent API throughout the project and boosting the DX without limiting our users to ways to do things. Our aim is to make **refine** a friend for a developer by providing abstractions and ways to separate concerns and manage the data, routing, authorization, layouts, etc. without limiting the power of other tools and libraries they want to use. Changes are done in our API in a manner to allow you to use **refine** in every use case and incrementally adopt for your existing projects.

## 🪄 Migrating your project automatically with refine-codemod ✨ (recommended)

[`@refinedev/codemod`][refine-codemod] package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @refinedev/codemod refine3-to-refine4
```

And it's done. Now your project uses `refine@4.x.x`.

:::caution Known Issues in refine-codemod

- [Instantiation Expressions](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#instantiation-expressions) are not parsed correctly when running the codemod. This causes the codemod to fail for the files that contain instantiation expressions. If you encounter this issue, you can manually migrate the files that contain instantiation expressions.

- [Type declaration files (`.d.ts`)](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#dts-files) are not parsed correctly when running the codemod. This causes the codemod to fail for the files that contain type declarations. If you encounter this issue, you can manually migrate the files that contain type declarations.

- While making the changes, codemod fails to format the return statements with React fragments (`<>...</>`). If you encounter this issue, you may need to manually format the file after the codemod is done.

:::

## Migrating your project manually

refine v4 will be released under `@refinedev` npm organization.
So you must install the packages with the new organization name.

```bash
npm uninstall @pankod/refine-core @pankod/refine-antd @pankod/..

npm i @refinedev/core @refinedev/antd @refinedev/..
```

:::caution
You must make this change for all packages that start with `@pankod`.
:::

## **`@pankod/refine-core` changes**

### `routerProvider`

refine v4 includes a new interface for the `routerProvider` prop. It is now smaller and more flexible by leaving the control of the routes to the user and only constructing the communication and the bindings the router and **refine**.

`routerProvider` is now optional and you can use **refine** without a router. Passing one enables such features as, inferring the current resource from the URL, redirection and navigation helpers, menus, breadcrumbs, etc.

We still support the `routerProvider@v3` for backward compatibility. We changed name to `legacyRouterProvider` and it will be removed in the next major version. If you want to continue using the `routerProvider@v3` you can use it as `legacyRouterProvider` in your project.

```diff
- import routerProvider from "@pankod/refine-react-router-v6";
+ import routerProvider from "@refinedev/react-router-v6/legacy";

const App = () => {
    return (
        <Refine
-           routerProvider={routerProvider}
+           legacyRouterProvider={routerProvider}
        />
    );
};
```

🚨 While this is still working, if you want to move to the new `routerProvider` and enable features like nested routes with parameters, custom action routes and more control over your routes, you can use the new `routerProvider` interface.

[Please refer to the Router Provider Migration Guide for more information and guidance. →](/docs/migration-guide/router-provider/)

### `resources`

With the new `routerProvider` interface, we also made changes to the `resources` prop, which is now working more like the interaction and connection point between your API and the app rather than a necessity for the router to work. Your router can work without resources, in the same way your resources can work without a router.

Now, you can define your actions (`list`, `create`, `edit`, `show`, `clone`) as paths rather than components. This will allow you to define custom routes for actions and also use the full potential of your router without being restricted to the routes created automatically.

Defining custom routes enables nested routes and parameters for your resources, such as;

```tsx
resources={[
    {
        name: "products",
        // highlight-start
        list: "/products",
        show: "/categories/:categoryId/products/:id"
        // highlight-end
    }
]}
```

In the above example, you can see that the detail page of a product can have a nested structure and also supports additional parameters. These parameters can be passed along with the `meta` properties in such hooks and components. Existing parameters in the URL will also be used when constructing the navigation path.

The existing method for passing components to the actions are still supported and uses the default paths when an action has a component value but the new `routerProvider` doesn't create routes for it automatically. To achieve this, you can use the `RefineRoutes` components from the router packages. To learn more about changes about routing in resources, please check [Router Provider Migration Guide](/docs/migration-guide/router-provider/).

We've also made changes in the structure of the resource definition such as the `identifier` property, which lets you define a custom identifier to a resource which can be used to select it in the hooks and components. This is useful when using multiple definitions with different paths and the same name.

The `route` property is now deprecated with the new routing system which lets users define custom routes per action.

```diff
resources={[
    {
        name: "products",
-       list: ProductList,
+       list: "/my-products",
-       icon: <ProductsIcon />,
-       parentName: "categories",
-       options: {
-           route: "my-products",
-           label: "My Products",
-           auditLog: {
-               permissions: ["list", "create"],
-           },
-           hide: false,
-           dataProviderName: "default",
-       },
-       canDelete: true,
+       meta: {
+           icon: <ProductsIcon />,
+           parent: "categories",
+           label: "My Products",
+           canDelete: true,
+           audit: ["list", "create"],
+           hide: false,
+           dataProviderName: "default",
+       }
    }
]}
```

### `authProvider`

[Please refer to the Auth Provider Migration Guide for more information. →](/docs/migration-guide/auth-provider/)

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

const login = useLogin({
    // highlight-next-line
    v3LegacyAuthProviderCompatible: true,
});
```

### Import changes

All `@tanstack/react-query` imports re-exported from `@refinedev/core` have been removed. You should import them from `@tanstack/react-query` package directly.

If the package is not installed, you can install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @tanstack/react-query
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @tanstack/react-query
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @tanstack/react-query
```

</TabItem>

</Tabs>

After that, you can import them from `@tanstack/react-query` package directly instead of `@refinedev/core` package.

```diff
- import { QueryClient } from "@refinedev/core";

+ import { QueryClient } from "@tanstack/react-query";
```

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
`getList` parameters will still have `hasPagination`, `sort`, and `metaData` props. But they are deprecated. You can use them with v4. But we recommend you to use `pagination.mode`, `sorters`, and `meta` props instead.
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
`custom` parameters will still have `sort` prop. But it is deprecated. You can use it with v4. But we recommend you to use `sorters` prop instead.
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

### `useResource` hook

`useResource` hook now accepts a single string parameter as the resource name or the identifier (Also checked for `route` when `legacyRouterProvider` is in use). Instead of having an object with single property as a parameter, this leads users for a simpler usage.

```diff
-   useResource({
-       resourceNameOrRouteName: "products"
-   });
+   useResource("products");
```
### `useResourceWithRoute` hook

This hook is now deprecated and obsolete when using the new `routerProvider` property. Please use `useResource` instead.

### `useMenu` hook

Instead of returning an empty `selectedKey` value, now `useMenu` will return `undefined` if there's no matching key with the current route as the `selectedKey`.

Also this hook now accepts `meta` property, an object of parameters to use when additional parameters are present in the resource `list` paths. Such as, if you have a resource with list path defined as `/:authorId/posts` and want to show this resource in your menu, you can do;

```tsx
const { menuItems } = useMenu({ meta: { authorId: 123 }});
```

This won't be necessary if there's already a `authorId` parameter present in the current URL. **refine** will use this parameter by default if there's no override in the `meta` property. If you only want to show the items with defined parameters or no parameters, then you can pass `hideOnMissingParameter: true` to the `useMenu` and these items will not be returned.

### `useNavigation` hook

This hook is designed to work with the legacy router provider but updated and kept working with both router provider versions. Although, its recommended to use the new routing hooks when necessary or use the ones available from your router library. **refine** now exports `useGo`, `useParsed`, `useBack`, `useLink` and `useGetToPath` hooks for the new routing system.

Still, if you want to use the `useNavigation` hook and its returned functions, they now accept `meta` property for parametrized paths in new routing system.

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

`<ReadyPage>` component is deprecated and will be removed in the next major version. Use your own custom page instead.

## **`@pankod/refine-antd` changes**

### Import changes

All **Ant Design** components re-exported from `@pankod/refine-antd` have been removed. You should import them from `antd` package directly.

If the package is not installed, you should install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install antd
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add antd
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add antd
```

</TabItem>

</Tabs>

After that, you can import components from `antd` package directly like below:

```diff
-import { useTable, SaveButton, Button, Form, Input, Select } from "@pankod/refine-antd";

+import { useTable, SaveButton } from "@refinedev/antd";
+import { Button, Form, Input, Select } from "antd";
```

<br />

`Icons` are also removed from `@pankod/refine-antd`. So, you should import icons from `@ant-design/icons` package directly.

If the package is not installed, you should install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @ant-design/icons
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @ant-design/icons
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @ant-design/icons
```

</TabItem>

</Tabs>

After that, you can import icons from `@ant-design/icons` package directly like below:

```diff
-import { Icons } from "@pankod/refine-antd";
-const { EditOutlined } = Icons;

+ import { EditOutlined } from "@ant-design/icons";
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

### `useMenu` hook is removed

`useMenu` hook is removed. It will be exported from `@refinedev/core` package.

```diff
-import { useMenu } from "@pankod/refine-antd";
+import { useMenu } from "@refinedev/core";
```

### `useDrawerForm` and `useModalForm`  hooks

These hooks now support syncing their visibility state with the location with their `syncWithLocation` prop. You can either pass `true` or an object with `key` and `syncId` properties. If you pass the `key` property, it will be used in the query params for the visibility state. If you pass `syncId: true` it will also add the `id` of the form to the query params, this is useful when working on `clone` and `edit` modes.

```tsx
useDrawerForm({
    syncWithLocation: {
        key: "my-drawer",
        syncId: true,
    }
})
```

If `key` is not provided, `${resource.name}-${action}` will be used by default.

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

`resourceNameOrRouteName` prop is deprecated in favor of `resource` prop. You can pass the resource name or identifier. (`route` is also accepted for legacy router users)

```diff
<CreateButton
-   resourceNameOrRouteName="posts"
+   resource="posts"
/>
```

### `<ReadyPage>` component is deprecated

`<ReadyPage>` component is deprecated and will be removed in the next major version. Use your own custom page instead.

## **`@pankod/refine-mui` changes**

### Import changes

All **Material UI** components re-exported from `@pankod/refine-mui` have been removed. You should import them from Material UI packages directly.

If the packages are not installed, you can install them with your package manager:

> You don't have to install all of packages. You can install only the packages that you use.

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
```

</TabItem>

</Tabs>

After that, you can import them from related packages directly.

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

`resourceNameOrRouteName` prop is deprecated in favor of `resource` prop. You can pass the resource name or identifier. (`route` is also accepted for legacy router users)

```diff
<CreateButton
-   resourceNameOrRouteName="posts"
+   resource="posts"
/>
```

### Basic Views

Following basic view component props are removed:

-   `cardProps` prop is removed from all basic views components. Use `wrapperProps` prop instead.

    ```diff
      <List
    -    cardProps={{}}
    +    wrapperProps={{}}
      />
    ```

-   `cardHeaderProps` prop is removed from all basic views components. Use `headerProps` prop instead.

    ```diff
      <Create
    -    cardHeaderProps={{}}
    +    headerProps={{}}
      />
    ```

-   `cardContentProps` prop is removed from all basic views components. Use `contentProps` prop instead.

    ```diff
      <Edit
    -    cardContentProps={{}}
    +    contentProps={{}}
      />
    ```

-   `actionButtons` prop is removed from `<Create>`, `<Edit>`, and `<Show` components. Use `footerButtons` prop instead.

    ```diff
      <Show
    -    actionButtons={[]}
    +    footerButtons={[]}
      />
    ```

-   `cardActionsProps` prop is removed from `<Create>`, `<Edit>`, and `<Show` components. Use `footerButtonProps` prop instead.

    ```diff
      <List
    -    cardActionsProps={{}}
    +    footerButtonProps={{}}
      />
    ```

### `<ReadyPage>` component is deprecated

`<ReadyPage>` component is deprecated and will be removed in the next major version. Use your own custom page instead.

## **`@pankod/refine-mantine` changes**

### Import changes

All **Mantine** components re-exported from `@pankod/refine-mantine` have been removed. You should import them from Mantine packages directly.

If the packages are not installed, you can install them with your package manager:

> You don't have to install all of packages. You can install only the packages that you use.

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
```

</TabItem>

</Tabs>

After that, you can import them from related packages directly.

```diff
- import {
-    MantineProvider,
-    NotificationsProvider,
-    TextInput,
-    Select,
-    List,
-    useSelect,
- } from "@pankod/refine-mantine";

+ import { useSelect, List } from "@refinedev/mantine";
+ import { MantineProvider, TextInput, Select } from "@mantine/core";
+ import { NotificationsProvider } from "@mantine/notifications";
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

`resourceNameOrRouteName` prop is deprecated in favor of `resource` prop. You can pass the resource name or identifier. (`route` is also accepted for legacy router users)

```diff
<CreateButton
-   resourceNameOrRouteName="posts"
+   resource="posts"
/>
```

### `<ReadyPage>` component is deprecated

`<ReadyPage>` component is deprecated and will be removed in the next major version. Use your own custom page instead.

## **`@pankod/refine-chakra-ui` changes**

### Import changes

All **Chakra UI** components re-exported from `@pankod/refine-chakra-ui` have been removed. You should import them from `@chakra-ui/react` package directly.

If the packages are not installed, you can install them with your package manager:

> You don't have to install all of packages. You can install only the packages that you use.

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

</TabItem>

</Tabs>

After that, you can import them from related packages directly.

```diff
- import {
-    ChakraProvider,
-    Input,
-    Select,
-    ShowButton,
-    usePagination,
- } from "@pankod/refine-chakra-ui";

+ import { usePagination, ShowButton } from "@refinedev/chakra-ui";
+ import { ChakraProvider, Input, Select } from "@chakra-ui/react";
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

`resourceNameOrRouteName` prop is deprecated in favor of `resource` prop. You can pass the resource name or identifier. (`route` is also accepted for legacy router users)

```diff
<CreateButton
-   resourceNameOrRouteName="posts"
+   resource="posts"
/>
```

### `<ReadyPage>` component is deprecated

`<ReadyPage>` component is deprecated and will be removed in the next major version. Use your own custom page instead.

## **`@pankod/refine-react-table` changes**

### Import changes

All `@tanstack/react-table` imports re-exported from `@pankod/refine-react-table` have been removed. You should import them from the `@tanstack/react-table` package directly.

If the package is not installed, you can install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @tanstack/react-table
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @tanstack/react-table
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @tanstack/react-table
```

</TabItem>

</Tabs>

After that, you can import them from `@tanstack/react-table` package directly.

```diff
- import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

+ import { useTable } from "@refinedev/react-table";
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

If the package is not installed, you can install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install react-hook-form
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add react-hook-form
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add react-hook-form
```

</TabItem>

</Tabs>

After that, you can import them from `react-hook-form` package directly.

```diff
- import { useForm, Controller } from "@pankod/refine-react-hook-form";

+ import { useForm } from "@refinedev/react-hook-form";
+ import { Controller } from "react-hook-form";
```

[refine-codemod]: https://github.com/refinedev/refine/tree/master/packages/codemod
[refine]: /api-reference/core/components/refine-config.md
[resources]: /api-reference/core/components/refine-config.md#resources
[routerprovider]: /api-reference/core/providers/router-provider.md
[auth-provider]: /api-reference/core/providers/auth-provider/
