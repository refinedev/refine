---
title: React Table
slug: /packages/documentation/react-table
source: /packages/react-table/src/useTable
---

import BasicUsageLivePreview from "./\_partial-basic-usage-live-preview.md";
import PaginationLivePreview from "./\_partial-pagination-live-preview.md";
import SortingLivePreview from "./\_partial-sorting-live-preview.md";
import RelationalLivePreview from "./\_partial-relational-live-preview.md";

**refine** offers a [TanStack Table][tanstack-table] adapter with [@pankod/refine-react-table][refine-react-table] that allows you to use the TanStack Table library with **refine**. Thus, you can manage your server-side data fetching operations.

All of [TanStack Table's][tanstack-table] features are supported and you can use all of the [TanStack Table's][tanstack-table] examples with no changes just copy and paste them into your project.

:::info
`useTable` hook is extended from [`useTable`][use-table-core] hook from the [`@pankod/refine-core`](https://github.com/refinedev/refine/tree/master/packages/core) package. This means that you can use all the features of [`useTable`][use-table-core] hook.
:::

## Installation

Install the [`@pankod/refine-react-table`][refine-react-table] library.

<Tabs
defaultValue="npm"
values={[
{label: 'npm', value: 'npm'},
{label: 'yarn', value: 'yarn'},
{label: 'pnpm', value: 'pnpm'}
]}>

<TabItem value="npm">

```bash
npm i @pankod/refine-react-table
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @pankod/refine-react-table
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @pankod/refine-react-table
```

</TabItem>

</Tabs>

## Basic Usage

In basic usage `useTable` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the url.

<BasicUsageLivePreview/>

<br/>

## Pagination

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the pagination. For example, we can use the `setPageSize` method to set the current `pageSize`. Every change in the `pageSize` and `pageIndex` will trigger a new request to the data provider.

:::info
`useTable` hook from `@pankod/refine-react-table` sets `manualPagination` to `true` by default to handle the pagination. If you set `hasPagination` to `false` in `refineCoreProps` property in the `useTable` config, it will disable the server-side pagination and it will let you handle the pagination in the client side.
:::

<PaginationLivePreview/>

<br/>

## Sorting

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the sorting. For example, we can use the `setColumnOrder` method to set the current `sorting` value. Every change in the `sorting` state will trigger a new request to the data provider.

<SortingLivePreview/>

<br/>

## Filtering

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the filtering. For example, we can use the `setColumnFilters` method to set the current `columnFilters` value. Every change in the `filter` will trigger a new request to the data provider.

You can specify which field will be filtered with which filter operator with the `filterOperator` property in the `meta` object. `filterOperator` must be a [`CrudOperators`](/api-reference/core/interfaces.md#crudoperators) type.

<FilteringLivePreview/>

<br/>

## Realtime Updates

> This feature is only available if you use a [Live Provider](/docs/api-reference/core/providers/live-provider).
> When `useCreate` mutation runs successfully, it will call the `publish` method from `liveProvider` with some parameters such as `channel`, `type` etc. It is useful when you want to publish the changes to the subscribers on client side.

[Refer to the `liveProvider` documentation for more information &#8594](/docs/api-reference/core/providers/live-provider)

<br/>

## Properties

:::tip
It also accepts all props of [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#options).
:::

### `resource`

**refine** passes the `resource` to the `dataProvider` as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your `dataProvider`. See the [`creating a data provider`](/api-reference/core/providers/data-provider.md#creating-a-data-provider) section for an example of how `resource` are handled.

The `resource` value is determined from the active route where the component or the hook is used. It can be overridden by passing the `resource` prop.

Use case for overriding the `resource` prop:

-   We can list a `category` from the `<PostList>` page.

```tsx
import React from "react";
import { HttpError, IResourceComponentsProps } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}

interface ICategory {
    id: number;
    name: string;
}

export const PostList: React.FC<IResourceComponentsProps> = () => {
    // ---

    const tablePosts = useTable<IPost, HttpError>();

    const tableCategories = useTable<ICategory, HttpError>({
        refineCoreProps: {
            resource: "categories",
        },
    });

    return <div>{/* ... */}</div>;
};
```

Also you can give URL path to the `resource` prop.

```tsx
const table = useTable({
    refineCoreProps: {
        resource: "categories/subcategory", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory
    },
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. It is useful when you want to use a different `dataProvider` for a specific resource.

```tsx
const table = useTable({
    refineCoreProps: {
        dataProviderName: "second-data-provider",
    },
});
```

### `initialCurrent`

> Default: `1`

Sets the initial value of the page index.

```tsx
const table = useTable({
    refineCoreProps: {
        initialCurrent: 2, // This will cause the table to initially display the second page, rather than the default of the first page
    },
});
```

### `initialPageSize`

> Default: `10`

Sets the initial value of the page size.

```tsx
const table = useTable({
    refineCoreProps: {
        initialPageSize: 20, // This will cause the table to initially display 20 rows per page, rather than the default of 10
    },
});
```

### `initialSorter`

> Type: [`CrudSort[]`][crudsorting]

Sets the initial value of the sorter. The `initialSorter` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `permanentSorter` prop.

```tsx
const table = useTable({
    refineCoreProps: {
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
    },
});
```

### `permanentSorter`

> Type: [`CrudSort[]`][crudsorting]

Sets the permanent value of the sorter. The `permanentSorter` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `initialSorter` prop.

```tsx
const table = useTable({
    refineCoreProps: {
        permanentSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
    },
});
```

### `initialFilter`

> Type: [`CrudFilter[]`][crudfilters]

Sets the initial value of the filter. The `initialFilter` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `permanentFilter` prop.

```tsx
const table = useTable({
    refineCoreProps: {
        initialFilter: [
            {
                field: "title",
                operator: "contains",
                value: "Foo",
            },
        ],
    },
});
```

### `permanentFilter`

> Type: [`CrudFilter[]`][crudfilters]

Sets the permanent value of the filter. The `permanentFilter` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `initialFilter` prop.

```tsx
const table = useTable({
    refineCoreProps: {
        permanentFilter: [
            {
                field: "title",
                operator: "contains",
                value: "Foo",
            },
        ],
    },
});
```

### `defaultSetFilterBehavior`

> Default: `merge`

The filter behavior can be set to either `"merge"` or `"merge"`.

-   When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

-   When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
const table = useTable({
    refineCoreProps: {
        defaultSetFilterBehavior: "replace",
    },
});
```

### `hasPagination`

> Default: `true`

Determines whether to use server-side pagination or not.

```tsx
const table = useTable({
    refineCoreProps: {
        // highlight-start
        hasPagination: false,
        // highlight-end
    },
});
```

### `syncWithLocation`

> Default: `false`

When you use the syncWithLocation feature, the `useTable`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages, and to allow users to bookmark or share links to specific table views.

Also you can set this value globally on [`<Refine>`][refine swl] component.

```tsx
const table = useTable({
    refineCoreProps: {
        // highlight-start
        syncWithLocation: true,
        // highlight-end
    },
});
```

### `queryOptions`

`useTable` uses [`useList`](/docs/api-reference/core/hooks/data/useList/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery).

```tsx
const table = useTable({
    refineCoreProps: {
        // highlight-start
        queryOptions: {
            retry: 3,
        },
        // highlight-end
    },
});
```

### `metaData`

[`metaData`](/docs/api-reference/general-concepts/#metadata) is used following two purposes:

-   To pass additional information to data provider methods.
-   Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/docs/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
const table = useTable({
    refineCoreProps: {
        // highlight-start
        metaData: {
            headers: { "x-meta-data": "true" },
        },
        // highlight-end
    },
});

const myDataProvider = {
    //...
    getList: async ({
        resource,
        pagination,
        hasPagination,
        sort,
        filters,
        // highlight-next-line
        metaData,
    }) => {
        // highlight-next-line
        const headers = metaData?.headers ?? {};
        const url = `${apiUrl}/${resource}`;

        //...
        //...

        // highlight-next-line
        const { data, headers } = await httpClient.get(`${url}`, { headers });

        return {
            data,
        };
    },
    //...
};
```

### `successNotification`

> [`NotificationProvider`][notification-provider] is required.

After data is fetched successfully, `useTable` can call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx
const table = useTable({
    refineCoreProps: {
        // highlight-start
        successNotification: (data, values, resource) => {
            return {
                message: `${data.title} Successfully fetched.`,
                description: "Success with no errors",
                type: "success",
            };
        },
        // highlight-end
    },
});
```

### `errorNotification`

> [`NotificationProvider`][notification-provider] is required.

After data fetching is failed, `useTable` will call `open` function from [`NotificationProvider`][notification-provider] to show a error notification. With this prop, you can customize the error notification.

```tsx
const table = useTable({
    refineCoreProps: {
        // highlight-start
        errorNotification: (data, values, resource) => {
            return {
                message: `Something went wrong when getting ${data.id}`,
                description: "Error",
                type: "error",
            };
        },
        // highlight-end
    },
});
```

### `liveMode`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider) is required.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/api-reference/core/providers/live-provider/#livemode) page.

```tsx
const table = useTable({
    refineCoreProps: {
        // highlight-start
        liveMode: "auto",
        // highlight-end
    },
});
```

### `onLiveEvent`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider) is required.

The callback function that is executed when new events from a subscription are arrived.

```tsx
const table = useTable({
    // highlight-start
    onLiveEvent: (event) => {
        console.log(event);
    },
    // highlight-end
});
```

### `liveParams`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider) is required.

Params to pass to liveProvider's [subscribe](/docs/api-reference/core/providers/live-provider/#subscribe) method.

<br/>

## Return Values

:::tip
It also have all return values of [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#options).
:::

### `refineCore`

#### `tableQueryResult`

Returned values from [`useList`](/docs/api-reference/core/hooks/data/useList/) hook.

#### `sorter`

Current [sorter state][crudsorting].

#### `setSorter`

```tsx
 (sorter: CrudSorting) => void;
```

A function to set current [sorter state][crudsorting].

#### `filters`

Current [filters state][crudfilters].

#### `setFilters`

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

A function to set current [filters state][crudfilters].

#### `current`

Current page index state. If pagination is disabled, it will be `undefined`.

#### `setCurrent`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined
```

A function to set current page index state. If pagination is disabled, it will be `undefined`.

#### `pageSize`

Current page size state. If pagination is disabled, it will be `undefined`.

#### `setPageSize`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined
```

A function to set current page size state. If pagination is disabled, it will be `undefined`.

#### `pageCount`

Total page count state. If pagination is disabled, it will be `undefined`.

#### `createLinkForSyncWithLocation`

```tsx
(params: SyncWithLocationParams) => string;
```

A function create accessible links for `syncWithLocation`. It takes an [SyncWithLocationParams][syncwithlocationparams] as parameters.

<br/>

## FAQ

### How can I handle relational data ?

You can use [`useMany`](/docs/api-reference/core/hooks/data/useMany/) hook to fetch relational data.

<RelationalLivePreview/>

<br/>

## API Reference

### Properties

<PropsTable module="@pankod/refine-react-table/useTable" />

### Type Parameters

| Property | Desription                                                   | Type                       | Default                    |
| -------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError   | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |

### Return values

| Property                     | Description                                                                                     | Type                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| refineCore                   | The return values of the [`useTable`][use-table-core] in the core                               | [`UseTableReturnValues`](/docs/api-reference/core/hooks/useTable#return-values) |
| Tanstack Table Return Values | See [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#table-api) documentation |

## Example

<CodeSandboxExample path="table-react-table-basic" />

[tanstack-table]: https://tanstack.com/table/v8
[refine-react-table]: https://github.com/refinedev/refine/tree/master/packages/react-table
[use-table-core]: /docs/api-reference/core/hooks/useTable
[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
[syncwithlocationparams]: /api-reference/core/interfaces.md#syncwithlocationparams
[notification-provider]: /api-reference/core/providers/notification-provider.md
[crudsorting]: /api-reference/core/interfaces.md#crudsorting
[crudfilters]: /api-reference/core/interfaces.md#crudfilters
[refine swl]: /api-reference/core/components/refine-config.md#syncwithlocation
