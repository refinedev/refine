---
title: Migrating from 4.x.x to 5.x.x
sidebar_label: 4.x.x to 5.x.x
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

## Motivation Behind the Release

**Refine v5** removes deprecated APIs and legacy systems, upgrades to TanStack Query v5, and adds React 19 support. The result is a cleaner, faster codebase with better developer experience.

<h2>Migration Steps </h2>

- **Step 1**: [Upgrade dependencies](#1-upgrade-all-refine-dependencies-to-v5)
- **Step 2**: [Remove deprecated APIs](#2-remove-all-deprecated-apis-from-refine-v4)
- **Step 3**: [Update router provider][router-provider-migration]
- **Step 4**: [Update auth provider][auth-provider-migration]
- **Step 5**: [Upgrade TanStack Query](#5-upgrade-tanstack-query-to-v5)
- **Step 6**: [Optional: Upgrade React](#6-optionally-upgrade-react-to-v19)

## 1. Upgrade All Refine Dependencies to v5

#### Package Version Changes

All Refine packages have been bumped to the next major version as a coordinated release. This ensures maximum stability and compatibility when using packages together - all Refine v5 packages are tested as a complete ecosystem.

| Package                      | v4 Version | v5 Version |
| ---------------------------- | ---------- | ---------- |
| `@refinedev/core`            | 4.x.x      | 5.x.x      |
| `react`                      | 17 or 18   | 18 or 19   |
| `TanStack React Query`       | 4.x.x      | 5.x.x      |
| `@refinedev/antd`            | 5.x.x      | 6.x.x      |
| `@refinedev/mui`             | 6.x.x      | 7.x.x      |
| `@refinedev/mantine`         | 2.x.x      | 3.x.x      |
| `@refinedev/chakra-ui`       | 2.x.x      | 3.x.x      |
| `@refinedev/react-hook-form` | 4.x.x      | 5.x.x      |
| `@refinedev/react-table`     | 5.x.x      | 6.x.x      |
| `@refinedev/react-router`    | 1.x.x      | 2.x.x      |
| `@refinedev/nextjs-router`   | 6.x.x      | 7.x.x      |
| `@refinedev/remix-router`    | 3.x.x      | 4.x.x      |
| `@refinedev/inferencer`      | 5.x.x      | 6.x.x      |
| `@refinedev/devtools`        | 1.x.x      | 2.x.x      |

<Tabs
defaultValue="refine-cli"
values={[
{label: 'Refine CLI', value: 'refine-cli'},
{label: 'Manual', value: 'manual'},
]}>

<TabItem value="refine-cli">

⚡️ You can easily update Refine packages with the Refine CLI [`update`](/docs/packages/cli/#update) command.

```bash
npm run refine update
```

> [How to add Refine CLI to an existing project?](/docs/packages/cli/#how-to-add-to-an-existing-project)

</TabItem>

<TabItem value="manual">

You need to update all `@refinedev/*` packages to their compatible v5 versions. Use the version table above to find the correct version for each package you're using in your project.

**Core packages (required):**

```bash
npm i @refinedev/core@^5.0.0 @tanstack/react-query@^5.0.0
```

**UI library packages (choose based on what you're using):**

```bash
# If using Ant Design
npm i @refinedev/antd@^6.0.0

# If using Material-UI
npm i @refinedev/mui@^7.0.0

# If using Mantine
npm i @refinedev/mantine@^3.0.0

# If using Chakra UI
npm i @refinedev/chakra-ui@^3.0.0
```

**Router packages (choose based on your router):**

```bash
# If using React Router
npm i @refinedev/react-router@^2.0.0

# If using Next.js
npm i @refinedev/nextjs-router@^7.0.0

# If using Remix
npm i @refinedev/remix-router@^4.0.0
```

**Additional packages (if you're using them):**

```bash
# Form handling
npm i @refinedev/react-hook-form@^5.0.0

# Table handling
npm i @refinedev/react-table@^6.0.0

# Data providers (update the ones you use)
npm i @refinedev/simple-rest@^5.0.0
npm i @refinedev/graphql@^6.0.0
npm i @refinedev/strapi-v4@^5.0.0
npm i @refinedev/supabase@^5.0.0
# ... and others based on your data provider
```

**Example for a complete Ant Design project:**

```bash
npm i @refinedev/core@^5.0.0 @refinedev/antd@^6.0.0 @refinedev/react-router@^2.0.0 @refinedev/simple-rest@^5.0.0 @tanstack/react-query@^5.0.0
```

</TabItem>

</Tabs>

Once dependencies are updated, proceed with the following breaking changes:

---

## 2. Remove All Deprecated APIs from Refine v4

All deprecated APIs marked for removal in v4 have been completely removed in v5.

### 🪄 Migrating your project automatically with refine-codemod ✨ (recommended)

The [`@refinedev/codemod`][refine-codemod] package handles the breaking changes for your project and automatically migrates it from `4.x.x` to `5.x.x`.

Simply `cd` into the root folder of your project (where the `package.json` is located) and run this command:

```sh
npx @refinedev/codemod@latest refine4-to-refine5
```

:::caution Important Notes
The codemod **cannot automatically migrate** legacy router providers and auth providers. You'll need to manually update these:

- **Legacy Router Provider**: If you're using `legacyRouterProvider`, follow the [Router Provider migration section](#3-refactor-legacy-router-provider-to-use-new-router-provider) below
- **Legacy Auth Provider**: If you're using `legacyAuthProvider` and `v3LegacyAuthProviderCompatible`, follow the [Auth Provider Migration Guide](#4-refactor-legacy-auth-provider-to-use-new-auth-provider) below

:::

### Manual Migration Guide

If you prefer to migrate manually or the codemod didn't handle all your use cases, you can follow this comprehensive guide to update your codebase step by step. Each section below covers a specific breaking change with before/after examples.

#### metaData → meta

🚨 Affects: All data hooks, useForm, useTable, useDataGrid, useSelect, etc.

The `metaData` parameter has been renamed to `meta` across all hooks:

```diff
useList({
-    metaData: { foo: "bar" },
+    meta: { foo: "bar" },
})

useOne({
-    metaData: { headers: { "Authorization": "Bearer token" } },
+    meta: { headers: { "Authorization": "Bearer token" } },
})

useCreate({
-    metaData: { endpoint: "custom" },
+    meta: { endpoint: "custom" },
})
```

#### sorter/sort → sorters

🚨 Affects: useList, useInfiniteList, useTable, useDataGrid, useSelect

The `sorter` and `sort` parameters have been renamed to `sorters`:

```diff
useList({
-    sort: [{ field: "title", order: "asc" }],
+    sorters: [{ field: "title", order: "asc" }],
})

useTable({
-    initialSorter: [{ field: "createdAt", order: "desc" }],
+    sorters: {
+        initial: [{ field: "createdAt", order: "desc" }]
+    },
})
```

#### filters Updates

🚨 Affects: useList, useTable, useDataGrid, useSelect

Filter configuration has been simplified and moved out of config objects:

```diff
useList({
-    config: {
-        filters: [{ field: "status", operator: "eq", value: "published" }],
-    },
+    filters: [{ field: "status", operator: "eq", value: "published" }],
})

useTable({
-    initialFilter: [{ field: "category", operator: "eq", value: "tech" }],
-    permanentFilter: [{ field: "status", operator: "eq", value: "active" }],
+    filters: {
+        initial: [{ field: "category", operator: "eq", value: "tech" }],
+        permanent: [{ field: "status", operator: "eq", value: "active" }]
+    },
})
```

#### pagination Updates

🚨 Affects: useList, useTable, useDataGrid, useSelect

Pagination configuration has been restructured:

```diff
useList({
-    hasPagination: false,
+    pagination: { mode: "off" },
})

useTable({
-    initialCurrent: 1,
-    initialPageSize: 20,
+    pagination: { current: 1, pageSize: 20 },
-    hasPagination: false,
+    pagination: { mode: "off" },
})
```

#### Resource options → meta

🚨 Affects: Resource definitions in `<Refine>` component

Resource `options` have been renamed to `meta`:

```diff
<Refine
    resources={[
        {
            name: "posts",
-            options: { label: "Blog Posts" },
+            meta: { label: "Blog Posts" },
        },
    ]}
/>
```

#### resourceName/resourceNameOrRouteName → resource

🚨 Affects: useImport, useExport, useResource, All Button components

```diff
useImport({
-    resourceName: "posts",
+    resource: "posts",
})

<CreateButton
-    resourceNameOrRouteName="posts"
+    resource="posts"
/>
```

#### config Object Removal

🚨 Affects: useList, useInfiniteList

The config parameter has been flattened in data hooks:

```diff
useList({
-    config: {
-        pagination: { current: 1, pageSize: 10 },
-        sorters: [{ field: "title", order: "asc" }],
-        filters: [{ field: "status", operator: "eq", value: "published" }],
-        hasPagination: false,
-        sort: [{ field: "title", order: "asc" }],
-        metaData: { foo: "bar" },
-    },
+    pagination: { current: 1, pageSize: 10, mode: "off" },
+    sorters: [{ field: "title", order: "asc" }],
+    filters: [{ field: "status", operator: "eq", value: "published" }],
+    meta: { foo: "bar" },
})
```

#### useTable Hook Restructuring

🚨 Affects: useTable, useSimpleList, useDataGrid

The `useTable` hook and its UI variants (`useDataGrid` from @refinedev/mui, `useSimpleList`) have been significantly restructured:

```diff
useTable({
-    initialCurrent: 1,
-    initialPageSize: 10,
+    pagination: { current: 1, pageSize: 10 },

-    initialSorter: [{ field: "title", order: "asc" }],
-    permanentSorter: [{ field: "status", order: "asc" }],
+    sorters: {
+        initial: [{ field: "title", order: "asc" }],
+        permanent: [{ field: "status", order: "asc" }]
+    },

-    initialFilter: [{ field: "status", operator: "eq", value: "published" }],
-    permanentFilter: [{ field: "category", operator: "eq", value: "tech" }],
-    defaultSetFilterBehavior: "replace",
+    filters: {
+        initial: [{ field: "status", operator: "eq", value: "published" }],
+        permanent: [{ field: "category", operator: "eq", value: "tech" }],
+        defaultBehavior: "replace"
+    },

-    hasPagination: false,
+    pagination: { mode: "off" },
})

// Return values also changed
const {
-    sorter,
-    setSorter,
-    tableQueryResult,
+    sorters,
+    setSorters,
+    tableQuery,
} = useTable();
```

#### queryResult → query

🚨 Affects: useForm, useSelect, useShow, useSimpleList, useMany

```diff
const {
-    queryResult,
+    query,
} = useShow();

const {
-    queryResult,
+    query,
} = useForm();

```

#### defaultValueQueryResult → defaultValueQuery

🚨 Affects: useSelect

```diff
const {
-    defaultValueQueryResult,
+    defaultValueQuery,
} = useSelect();
```

#### tableQueryResult → tableQuery

🚨 Affects: useTable, useDataGrid

```diff
const {
-    tableQueryResult,
+    tableQuery,
} = useTable();
```

#### mutationResult → mutation

🚨 Affects: useCreate, useUpdate, useDelete, useCreateMany, useUpdateMany, useDeleteMany, useCustomMutation

```diff

const {
-    mutationResult,
+    mutation,
} = useForm();

```

#### isLoading → isPending

🚨 Affects: useCreate, useUpdate, useDelete, useCreateMany, useUpdateMany, useDeleteMany, useCustomMutation

For mutation hooks, the loading state property has been updated:

```diff
const { mutate, isPending } = useCreate();

- if (isLoading) return <Spinner />;
+ if (isPending) return <Spinner />;
```

#### useNavigation → useGo, useBack

The `useNavigation` hook has been replaced with individual hooks:

```diff
- import { useNavigation } from "@refinedev/core";
+ import { useGo, useBack } from "@refinedev/core";

const MyComponent = () => {
-   const { push, goBack, replace } = useNavigation();
+   const go = useGo();
+   const back = useBack();

-   push("/posts");
+   go({ to: "/posts" });

-   goBack();
+   back();

-   replace("/posts");
+   go({ to: "/posts", type: "replace" });
};
```

#### useResource → useResourceParams (Recommended)

```diff
// useResource parameter simplification
- useResource({ resourceNameOrRouteName: "posts" });
+ useResource("posts");
```

:::tip Recommendation
While `useResource` continues to work for backward compatibility, we now recommend using [`useResourceParams`](https://refine.dev/docs/routing/hooks/use-resource-params/) for new projects. It provides a more stable, granular, and precise solution for resource management.

```typescript
// Recommended approach
import { useResourceParams } from "@refinedev/core";

const { resource, action, id } = useResourceParams();
```

:::

#### ignoreAccessControlProvider → accessControl

```diff
<CreateButton
-    ignoreAccessControlProvider
+    accessControl={{ enabled: false }}
-    resourceNameOrRouteName="posts"
+    resource="posts"
/>
```

##### Resource options → meta

The `options` prop has been moved to `meta`:

```diff
<Refine
  resources={[
    {
        name: "posts",
-       options: {
-           label: "Blog Posts",
-           icon: <PostIcon />,
-           route: "my-posts",
-           auditLog: {
-               permissions: ["list", "create"],
-           },
-           hide: false,
-           dataProviderName: "default",
-       },
-       canDelete: true,
+       meta: {
+           label: "Blog Posts",
+           icon: <PostIcon />,
+           parent: "categories",
+           canDelete: true,
+           audit: ["list", "create"],
+           hide: false,
+           dataProviderName: "default",
+       },
    },
]}
/>
```

#### DataProvider getList and custom Method Updates

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
        // ...
    },

    custom: ({
        // ...
+        sorters,
-        sort,
    }) => {
        // ...
    },
};
```

#### useImport and useExport Hook Updates

The `useImport` and `useExport` hooks have additional parameter updates:

```diff
useImport({
-    resourceName: "posts",
+    resource: "posts",
-    metaData: { foo: "bar" },
+    meta: { foo: "bar" },
    // These are now used as direct props instead of nested config
-    mapData: (item) => item,
-    paparseConfig: {},
-    batchSize: 1000,
+    mapData: (item) => item,
+    paparseConfig: {},
+    batchSize: 1000,
})

useExport({
-    resourceName: "posts",
+    resource: "posts",
-    sorter: [{ field: "title", order: "asc" }],
+    sorters: [{ field: "title", order: "asc" }],
-    metaData: { foo: "bar" },
+    meta: { foo: "bar" },
-    exportOptions: {},
+    unparseConfig: {},
    // These are now used as direct props
-    mapData: (item) => item,
-    maxItemCount: 1000,
-    pageSize: 20,
+    mapData: (item) => item,
+    maxItemCount: 1000,
+    pageSize: 20,
})
```

#### queryKeys -> keys

🚨 Affects: Custom implementations using Refine helpers

```diff
// queryKeys helper updates
- import { queryKeys } from "@refinedev/core";
+ import { keys } from "@refinedev/core";

// Usage updates
- queryKeys.data().resource("posts").action("list").get();
+ keys().data().resource("posts").action("list").get();
```

## 3. Refactor Legacy Router Provider to use new Router Provider

If your project is still using the `legacyRouterProvider` provider, you'll need to migrate to the new router system. The new router provider offers greater flexibility and better integration with modern routing patterns.

Please refer these guides to refactor your project:

- [Migrating Router Provider from 3.x.x to 4.x.x][router-provider-migration]
- [React Router v6 to v7](/docs/routing/integrations/react-router/migration-guide-v6-to-v7)

## 4. Refactor Legacy Auth Provider to use new Auth Provider

If your project is still using the legacy auth provider `legacyAuthProvider` or auth hooks with `v3LegacyAuthProviderCompatible: true`, you **must** migrate to the modern auth provider structure because these are completely removed.

For complete migration instructions, please refer to the [Auth Provider Migration Guide][auth-provider-migration].

```diff
useLogin({
-    v3LegacyAuthProviderCompatible: true,
});

<Refine
-    legacyAuthProvider={legacyAuthProvider}
+    authProvider={authProvider}
/>
```

## 5. Upgrade TanStack Query to v5

You'll need to upgrade TanStack Query from v4 to v5. Please refer to the [TanStack Query migration guide](https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5) for detailed instructions on this upgrade.

## 6. Upgrade React to v19

Refine v5 supports both React 18 and React 19. If you want to take advantage of the latest React features, you can optionally upgrade to React 19. Please refer to the [React 19 release notes](https://react.dev/blog/2024/04/25/react-19) for more information about the new features and migration considerations.

[refine-codemod]: https://github.com/refinedev/refine/tree/main/packages/codemod
[router-provider-migration]: /docs/migration-guide/router-provider/
[auth-provider-migration]: /docs/migration-guide/auth-provider/
