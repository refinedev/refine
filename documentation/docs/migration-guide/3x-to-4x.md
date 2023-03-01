---
id: 3x-to-4x
title: Migrating from 3.x.x to 4.x.x
sidebar_label: 3.x.x to 4.x.x
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

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

Our npm organization has been moved from `@pankod` to `@refinedev`. So you must install the packages with the new organization name.

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
npm install @mantine/core @emotion/react @mantine/hooks @mantine/notifications @mantine/form
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @mantine/core @emotion/react @mantine/hooks @mantine/notifications @mantine/form
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @mantine/core @emotion/react @mantine/hooks @mantine/notifications @mantine/form
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
[custompages]: /advanced-tutorials/custom-pages.md
[auth-provider]: /api-reference/core/providers/auth-provider/
