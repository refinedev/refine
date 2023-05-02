---
title: useDataGrid
slug: /api-reference/mui/hooks/useDataGrid
source: /packages/mui/src/hooks/useDataGrid
---

import BasicUsagePreview from "./\_partial-use-data-grid-basic-usage-live-preview.md";
import RelationalPreview from "./\_partial-use-data-grid-relational-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

By using `useDataGrid`, you can get properties that are compatible with MUI X [`<DataGrid>`][data-grid] component. All features such as sorting, filtering, and pagination come out of the box. Under the hood it uses [`useList`](/docs/api-reference/core/hooks/data/useList/) for the fetch.

For all the other features, you can refer to the MUI X [`<DataGrid>`][data-grid] documentation

> 💡 The `useDataGrid` hook is compatible with both the [`<DataGrid>`][data-grid] and the [`<DataGridPro>`](https://mui.com/x/react-data-grid/#commercial-version) components.

:::info
This hook is extended from [`useTable`][use-table-core] from the [`@refinedev/core`](https://github.com/refinedev/refine/tree/master/packages/core) package. This means that you can use all the features of [`useTable`][use-table-core] hook.
:::

## Basic usage

In basic usage, `useDataGrid` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the URL.

<BasicUsagePreview/>

## Pagination

The hook handles pagination by setting the `paginationMode`, `page`, `onPageChange`, `pageSize`, and `onPageSizeChange` props that are compatible with `<DataGrid>`.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

:::info
If you want to handle the pagination on client-side, you can pass the `pagination.mode` prop to the `useDataGrid` hook and set it to `"client"`.
:::

```tsx
export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid();

    const {
        //highlight-start
        paginationMode,
        page,
        onPageChange,
        pageSize,
        onPageSizeChange,
        //highlight-end
        ...restDataGridProps
    } = dataGridProps;

    return (
        <List>
            <DataGrid
                columns={columns}
                {...restDataGridProps}
                //highlight-start
                paginationMode={paginationMode}
                page={page}
                onPageChange={onPageChange}
                pageSize={pageSize}
                onPageSizeChange={onPageSizeChange}
                //highlight-end
                autoHeight
            />
        </List>
    );
};
```

## Sorting

The hook handles sorting by setting the `sortingMode`, `sortModel`, and `onSortModelChange`props that are compatible with `<DataGrid>`.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

```tsx
export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid();

    //highlight-start
    const { sortingMode, sortModel, onSortModelChange, ...restDataGridProps } =
        dataGridProps;
    //highlight-end

    return (
        <List>
            <DataGrid
                columns={columns}
                {...restDataGridProps}
                //highlight-start
                sortingMode={sortingMode}
                sortModel={sortModel}
                onSortModelChange={onSortModelChange}
                //highlight-end
                autoHeight
            />
        </List>
    );
};
```

If you want to sort externally from the `<DataGrid>` component. You can use `setSorter` like this:

```tsx
import { useDataGrid, List } from "@refinedev/mui";
import { Button, ButtonGroup } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title" },
    { field: "status", headerName: "Status" },
];

export const PostsList: React.FC = () => {
    const { dataGridProps, setSorter } = useDataGrid();

    const handleSorting = (order: "asc" | "desc") => {
        setSorter([
            {
                field: "title",
                order,
            },
        ]);
    };

    return (
        <List>
            <ButtonGroup variant="outlined">
                <Button onClick={() => handleSorting("asc")}>Asc</Button>
                <Button onClick={() => handleSorting("desc")}>Desc</Button>
            </ButtonGroup>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
```

:::tip

Mui X community version only sorts the rows according to one criterion at a time. To use multi-sorting, you need to upgrade to the [Pro plan](https://mui.com/pricing/).

However, multiple sorting can be done server-side without specifying the `sortModel`.

```tsx
return <DataGrid {...dataGridProps} sortModel={undefined} autoHeight />;
```

When `sortModel` is not passed, it supports more than one criteria at a time, but cannot show which fields are sorted in `<DataGrid>` headers.

:::

## Filtering

The hook handles filtering by setting the `filterMode`, `filterModel` and `onFilterModelChange`props that are compatible with `<DataGrid>`.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

```tsx
export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid();

    //highlight-start
    const {
        filterMode,
        filterModel,
        onFilterModelChange,
        ...restDataGridProps
    } = dataGridProps;
    //highlight-end

    return (
        <List>
            <DataGrid
                columns={columns}
                {...restDataGridProps}
                //highlight-start
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                //highlight-end
                autoHeight
            />
        </List>
    );
};
```

If you want to filter externally from the `<DataGrid>` component. You can use `setFilter` like this:

```tsx
import { useDataGrid, List } from "@refinedev/mui";
import { FormControlLabel, Checkbox } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title" },
    { field: "status", headerName: "Status" },
];

export const PostsList: React.FC = () => {
    const { dataGridProps, setFilters } = useDataGrid();

    const handleFilter = (
        e: React.ChangeEvent<HTMLInputElement>,
        checked: boolean,
    ) => {
        setFilters([
            {
                field: "status",
                value: checked ? "draft" : undefined,
                operator: "eq",
            },
        ]);
    };

    return (
        <List>
            <FormControlLabel
                label="Filter by Draft Status"
                control={<Checkbox onChange={handleFilter} />}
            />
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
```

:::tip

Mui X community version only filters the rows according to one criterion at a time. To use multi-filtering, you need to upgrade to the [Pro plan](#).

However, multiple filtering can be done server-side without specifying the `filterModel`.

```tsx
return <DataGrid {...dataGridProps} filterModel={undefined} autoHeight />;
```

When `filterModel` is not passed, it supports more than one criteria at a time, but cannot show which fields are filtered in `<DataGrid>` headers.

:::

## Realtime Updates

> This feature is only available if you use a [Live Provider](/docs/api-reference/core/providers/live-provider).

When the `useDataGrid` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/docs/api-reference/core/providers/live-provider)

## Properties

### `resource`

<PropResource
hook={{
    name:"useList",
    URL:"/docs/api-reference/core/hooks/data/useList/"
}}
method={{
    name:"getList",
    URL:"/docs/api-reference/core/providers/data-provider/#getlist"
}}
/>

```tsx
useDataGrid({
    resource: "categories",
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. It is useful when you want to use a different `dataProvider` for a specific resource.

```tsx
useDataGrid({
    dataProviderName: "second-data-provider",
});
```

### `pagination.current`

> Default: `1`

Sets the initial value of the page index.

```tsx
useDataGrid({
    pagination: {
        current: 2,
    },
});
```

### `pagination.pageSize`

> Default: `25`

Sets the initial value of the page size.

```tsx
useDataGrid({
    pagination: {
        pageSize: 10,
    },
});
```

### `pagination.mode`

> Default: `"server"`

It can be `"off"`, `"server"` or `"client"`.

-   **"off":** Pagination is disabled. All records will be fetched.
-   **"client":** Pagination is done on the client side. All records will be fetched and then the records will be paginated on the client side.
-   **"server":**: Pagination is done on the server side. Records will be fetched by using the `current` and `pageSize` values.

```tsx
useDataGrid({
    pagination: {
        mode: "client",
    },
});
```

### `sorters.initial`

Sets the initial value of the sorter. The `initial` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `sorters.permanent` prop.

[Refer to the `CrudSorting` interface for more information &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

```tsx
useDataGrid({
    sorters: {
        initial: [
            {
                field: "name",
                order: "asc",
            },
        ],
    },
});
```

### `sorters.permanent`

Sets the permanent value of the sorter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `sorters.initial` prop.

[Refer to the `CrudSorting` interface for more information &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

```tsx
useDataGrid({
    sorters: {
        permanent: [
            {
                field: "name",
                order: "asc",
            },
        ],
    },
});
```

### `sorters.mode`

> Default: `"server"`

It can be `"off"`, or `"server"`.

-   **"off":** `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
-   **"server":**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

```tsx
useDataGrid({
    sorters: {
        mode: "server",
    },
});
```

### `filters.initial`

Sets the initial value of the filter. The `initial` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `filters.permanent` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

```tsx
useDataGrid({
    filters: {
        initial: [
            {
                field: "name",
                operator: "contains",
                value: "Foo",
            },
        ],
    },
});
```

### `filters.permanent`

Sets the permanent value of the filter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `filters.initial` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

```tsx
useDataGrid({
    filters: {
        permanent: [
            {
                field: "name",
                operator: "contains",
                value: "Foo",
            },
        ],
    },
});
```

### `filters.defaultBehavior`

> Default: `merge`

The filtering behavior can be set to either `"merge"` or `"replace"`.

-   When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

-   When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useDataGrid({
    filters: {
        defaultBehavior: "replace",
    },
});
```

### `filters.mode`

> Default: `"server"`

It can be `"off"` or `"server"`.

-   **"off":** `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
-   **"server":**: Filters are done on the server side. Records will be fetched by using the `filters` value.

```tsx
useDataGrid({
    filters: {
        mode: "off",
    },
});
```

### `syncWithLocation`

> Default: `false`

When you use the syncWithLocation feature, the `useDataGrid`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useDataGrid` state is automatically updated to match. This makes it easy to share table states across different routes or pages and allows users to bookmark or share links to specific table views.

Also, you can set this value globally on [`<Refine>`][refine swl] component.

```tsx
useDataGrid({
    syncWithLocation: true,
});
```

### `queryOptions`

`useDataGrid` uses [`useList`](/docs/api-reference/core/hooks/data/useList/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery).

```tsx
useDataGrid({
    queryOptions: {
        retry: 3,
    },
});
```

### `meta`

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

-   Customizing the data provider methods for specific use cases.
-   Generating GraphQL queries using plain JavaScript Objects (JSON).

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/docs/api-reference/general-concepts/#meta)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useDataGrid({
    meta: {
        headers: { "x-meta-data": "true" },
    },
});

const myDataProvider = {
    //...
    getList: async ({
        resource,
        pagination,
        sorters,
        filters,
        // highlight-next-line
        meta,
    }) => {
        // highlight-next-line
        const headers = meta?.headers ?? {};
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

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After data is fetched successfully, `useDataGrid` can call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx
useDataGrid({
    successNotification: (data, values, resource) => {
        return {
            message: `${data.title} Successfully fetched.`,
            description: "Success with no errors",
            type: "success",
        };
    },
});
```

### `errorNotification`

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After data fetching is failed, `useDataGrid` will call `open` function from [`NotificationProvider`][notification-provider] to show an error notification. With this prop, you can customize the error notification.

```tsx
useDataGrid({
    errorNotification: (data, values, resource) => {
        return {
            message: `Something went wrong when getting ${data.id}`,
            description: "Error",
            type: "error",
        };
    },
});
```

### `liveMode`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useDataGrid({
    liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useDataGrid({
    onLiveEvent: (event) => {
        console.log(event);
    },
});
```

### `liveParams`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/docs/api-reference/core/providers/live-provider/#subscribe) method.

### ~~`initialCurrent`~~

:::caution Deprecated
Use `pagination.current` instead.
:::

> Default: `1`

Sets the initial value of the page index.

```tsx
useDataGrid({
    initialCurrent: 2,
});
```

### ~~`initialPageSize`~~

:::caution Deprecated
Use `pagination.pageSize` instead.
:::

> Default: `25`

Sets the initial value of the page size.

```tsx
useDataGrid({
    initialPageSize: 20,
});
```

### ~~`hasPagination`~~

:::caution Deprecated
Use `pagination.mode` instead.
:::

> Default: `true`

Determines whether to use server-side pagination or not.

```tsx
useDataGrid({
    hasPagination: false,
});
```

### ~~`initialSorter`~~

:::caution Deprecated
Use `sorters.initial` instead.
:::

Sets the initial value of the sorter. The `initialSorter` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `permanentSorter` prop.

[Refer to the `CrudSorting` interface for more information &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

```tsx
useDataGrid({
    initialSorter: [
        {
            field: "name",
            order: "asc",
        },
    ],
});
```

### ~~`permanentSorter`~~

:::caution Deprecated
Use `sorters.permanent` instead.
:::

Sets the permanent value of the sorter. The `permanentSorter` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `initialSorter` prop.

[Refer to the `CrudSorting` interface for more information &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

```tsx
useDataGrid({
    permanentSorter: [
        {
            field: "name",
            order: "asc",
        },
    ],
});
```

### ~~`initialFilter`~~

:::caution Deprecated
Use `filters.initial` instead.
:::

Sets the initial value of the filter. The `initialFilter` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `permanentFilter` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

```tsx
useDataGrid({
    initialFilter: [
        {
            field: "name",
            operator: "contains",
            value: "Foo",
        },
    ],
});
```

### ~~`permanentFilter`~~

:::caution Deprecated
Use `filters.permanent` instead.
:::

Sets the permanent value of the filter. The `permanentFilter` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `initialFilter` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

```tsx
useDataGrid({
    permanentFilter: [
        {
            field: "name",
            operator: "contains",
            value: "Foo",
        },
    ],
});
```

### ~~`defaultSetFilterBehavior`~~

:::caution Deprecated
Use `filters.defaultBehavior` instead.
:::

> Default: `merge`

The filtering behavior can be set to either `"merge"` or `"replace"`.

-   When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

-   When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useDataGrid({
    defaultSetFilterBehavior: "replace",
});
```

## Return Values

### `dataGridProps`

The props needed by the [`<DataGrid>`][data-grid] component.

#### `sortingMode`

> Default: `server`

Determines whether to use server-side sorting or not.

#### `sortModel`

Current `GridSortModel` compatible with [`<DataGrid>`][data-grid] component.

#### `onSortModelChange`

When the user sorts a column, this function is called with the new sort model.

🚨 `dataGridProps.onSortModelChange` automatically transform `GridSortModel` to [`CrudSorting`][crudsorting] and call `setSorter` function. If you want to override it, you can use like this:

```tsx
<DataGrid
    {...dataGridProps}
    columns={columns}
    autoHeight
    onSortModelChange={(model, details) => {
        dataGridProps.onSortModelChange(model, details);
        // do something else
    }}
/>
```

#### `filterMode`

> Default: `server`

Determines whether to use server-side filtering or not.

#### `filterModel`

Current `GridFilterModel` compatible with [`<DataGrid>`][data-grid] component.

#### `onFilterModelChange`

When the user filters a column, this function is called with the new filter model.

🚨 `dataGridProps.onFilterModelChange` automatically transform `GridFilterModel` to [`CrudFilters`][crudfilters] and call `setFilters` function. If you want to override it, you can use like this:

```tsx
<DataGrid
    {...dataGridProps}
    columns={columns}
    autoHeight
    onFilterModelChange={(model, details) => {
        dataGridProps.onFilterModelChange(model, details);
        // do something else
    }}
/>
```

#### `onStateChange`

When the user sorts or filters a column, this function is called with the new state.

🚨 The onStateChange callback is used internally by the useDataGrid hook. If you want to override it, you can use like this:

```tsx
<DataGrid
    {...dataGridProps}
    columns={columns}
    autoHeight
    onStateChange={(state) => {
        dataGridProps.onStateChange(state);
        // do something else
    }}
/>
```

#### `rows`

Contains the data to be displayed in the data grid. Values fetched with [`useList`](/docs/api-reference/core/hooks/data/useList/) hook.

#### `rowCount`

Total number of data. Value fetched with [`useList`](/docs/api-reference/core/hooks/data/useList/) hook.

#### `loading`

Indicates whether the data is being fetched.

#### `pagination`

Returns pagination configuration values(pageSize, current, setCurrent, etc.).

### `tableQueryResult`

Returned values from [`useList`](/docs/api-reference/core/hooks/data/useList/) hook.

### `sorters`

Current [sorters state][crudsorting].

### `setSorters`

A function to set current [sorters state][crudsorting].

```tsx
 (sorters: CrudSorting) => void;
```

### `filters`

Current [filters state][crudfilters].

### `setFilters`

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

A function to set current [filters state][crudfilters].

### `current`

Current page index state. If pagination is disabled, it will be `undefined`.

### `setCurrent`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page index state. If pagination is disabled, it will be `undefined`.

### `pageSize`

Current page size state. If pagination is disabled, it will be `undefined`.

### `setPageSize`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page size state. If pagination is disabled, it will be `undefined`.

### `pageCount`

Total page count state. If pagination is disabled, it will be `undefined`.

### `createLinkForSyncWithLocation`

```tsx
(params: SyncWithLocationParams) => string;
```

A function creates accessible links for `syncWithLocation`. It takes [SyncWithLocationParams][syncwithlocationparams] as parameters.

### ~~`sorter`~~

:::caution Deprecated
Use `sorters` instead.
:::

Current [sorters state][crudsorting].

### ~~`setSorter`~~

:::caution Deprecated
Use `setSorters` instead.
:::

A function to set current [sorters state][crudsorting].

```tsx
 (sorters: CrudSorting) => void;
```

## FAQ

### How can I handle relational data?

You can use [`useSelect`](http://localhost:3000/docs/api-reference/core/hooks/useSelect/) hook to fetch relational data and filter [`<DataGrid>`][data-grid] by categories.

<RelationalPreview/>

### How can I handle client side filtering?

You can set the [`filters.mode: "off"`](#filtersmode) in order to disable server-side filtering. `useDataGrid` is fully compatible with [`Material UI <DataGrid>  component's`](https://mui.com/x/react-data-grid/filtering/) filtering feature.

```tsx
useDataGrid({
    filters: {
        mode: "off",
    },
});
```

### How can I handle client side sorting?

You can set the [`sorting.mode: "off"`](#sortersmode) in order to disable server-side sorting. `useDataGrid` is fully compatible with [`Material UI <DataGrid> component's`](https://mui.com/x/react-data-grid/sorting/) sorting feature.

```tsx
useDataGrid({
    sorting: {
        mode: "off",
    },
});
```

## API

### Properties

<PropsTable module="@refinedev/mui/useDataGrid"/>

### Type Parameters

| Property         | Desription                                                                                                                                                          | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData     | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Values for search params                                                                                                                                            |                            | `{}`                       |
| TData            | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property                      | Description                                                                                        | Type                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| dataGridProps                 | MUI X [`<DataGrid>`][data-grid] props                                                              | `DataGridPropsType`\*                                                                |
| tableQueryResult              | Result of the `react-query`'s `useQuery`                                                           | [` QueryObserverResult<{`` data: TData[];`` total: number; },`` TError> `][usequery] |
| search                        | It sends the parameters it receives to its `onSearch` function                                     | `(value: TSearchVariables) => Promise<void>`                                         |
| current                       | Current page index state (returns `undefined` if pagination is disabled)                           | `number` \| `undefined`                                                              |
| totalPage                     | Total page count (returns `undefined` if pagination is disabled)                                   | `number` \| `undefined`                                                              |
| setCurrent                    | A function that changes the current (returns `undefined` if pagination is disabled)                | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                        |
| pageSize                      | Current pageSize state (returns `undefined` if pagination is disabled)                             | `number` \| `undefined`                                                              |
| setPageSize                   | A function that changes the pageSize (returns `undefined` if pagination is disabled)               | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                        |
| hideFooterPagination          | Whether to hide the footer pagination accordingly your `pagination.mode` and `hasPagination` props | `boolean`                                                                            |
| sorters                       | Current sorting state                                                                              | [`CrudSorting`][crudsorting]                                                         |
| setSorters                    | A function that accepts a new sorters state                                                        | `(sorters: CrudSorting) => void`                                                     |
| ~~sorter~~                    | Current sorting state                                                                              | [`CrudSorting`][crudsorting]                                                         |
| ~~setSorter~~                 | A function that accepts a new sorters state                                                        | `(sorters: CrudSorting) => void`                                                     |
| filters                       | Current filters state                                                                              | [`CrudFilters`][crudfilters]                                                         |
| setFilters                    | A function that accepts a new filter state                                                         | `(filters: CrudFilters) => void`                                                     |
| createLinkForSyncWithLocation | A function create accessible links for syncWithLocation                                            | `(params: `[SyncWithLocationParams][syncwithlocationparams]`) => string;`            |

> **DataGridProps**
>
> | Property                | Default    | Property            | Default    |
> | ----------------------- | ---------- | ------------------- | ---------- |
> | rows                    | `[]`       | pageSize            | `25`       |
> | rowCount                | `0`        | onPageSizeChange    |            |
> | disableSelectionOnClick | `true`     | sortingMode         | `"server"` |
> | loading                 | `false`    | sortModel           |            |
> | paginationMode          | `"server"` | onSortModelChange   |            |
> | page                    | `0`        | filterMode          | `"server"` |
> | onPageChange            |            | filterModel         |            |
> | onStateChange           |            | onFilterModelChange |            |

## Example

<CodeSandboxExample path="table-material-ui-use-data-grid" />

[use-table-core]: /docs/api-reference/core/hooks/useTable
[source-code]: https://github.com/refinedev/refine/blob/master/packages/mui/src/hooks/useDataGrid/index.ts
[syncwithlocationparams]: /api-reference/core/interfaces.md#syncwithlocationparams
[crudsorting]: /api-reference/core/interfaces.md#crudsorting
[crudfilters]: /api-reference/core/interfaces.md#crudfilters
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
[refine swl]: /api-reference/core/components/refine-config.md#syncwithlocation
[table search]: /advanced-tutorials/search/table-search.md
[data-grid]: https://mui.com/x/react-data-grid/
[syncwithlocationparams]: /api-reference/core/interfaces.md#syncwithlocationparams
[notification-provider]: /api-reference/core/providers/notification-provider.md
