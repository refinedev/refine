---
id: useDataGrid
title: useDataGrid
---

By using `useDataGrid`, you are able to get properties that are compatible with MUI X `<DataGrid>` component. All features such as sorting, filtering and pagination comes as out of box. For all the other features, you can refer to the MUI X [`<DataGrid>`][data-grid] documentation.

:::info
The `useDataGrid` hook works in compatible with both the `<DataGrid>` and the `<DataGridPro>` component.
:::

This hook is extended from [`useTable`](/core/hooks/useTable.md) from the [`@pankod/refine-core`](https://github.com/pankod/refine/tree/master/packages/core) package.

## Basic usage

Let's assume that the data we are going to show on the table came like this from the endpoint:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 1,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "status": "published"
    },
    {
        "id": 2,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "status": "draft"
    }
]
```

To see basic usage, let's create a table with the `id`, `title` and `content` columns.

```tsx title="/src/pages/posts/list.tsx"
import React from "react";
import { useDataGrid, DataGrid, GridColumns, List } from "@pankod/refine-mui";

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
    const { dataGridProps } = useDataGrid<IPost>();

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}
```

:::tip

Within the `<Refine>` component, a resource page knows which resource name it has by reading from the URL.

If you want to use a different resource name, you can pass `resource` as a prop like this:

```tsx
const { dataGridProps } = useDataGrid({
    //highlight-next-line
    resource: "categories",
});
```

> If the resource option is given, `syncWithLocation` will not work.

:::

## Pagination

The hook handles pagination by setting the `paginationMode`, `page`, `onPageChange`, `pageSize` and `onPageSizeChange` props that are compatible with `<DataGrid>`.

:::info
To disable pagination, you can set `hasPagination` property to `false` which is `true` by default. If pagination is disabled, `hideFooterPagination` property will be send as `true` with `paginationMode`, `page,` `onPageChange`, `pageSize` and `onPageSizeChange` set to undefined.
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

Above, you can see the pagination properties from `dataGridProps`.

:::note
To see how the pagination works, you can look at the [source code][source-code] of the `useDataGrid` hook.
:::

:::tip
You can set initial values for the pagination by passing `initialCurrent` and `initialPageSize` props.

```tsx
const { dataGridProps } = useDataGrid({
    initialCurrent: 2,
    initialPageSize: 10,
});
```

:::

## Sorting

The hook handles sorting by setting the `sortingMode`, `sortModel` and `onSortModelChange`props that are compatible with `<DataGrid>`.

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

Above, you can see the sorting properties from `dataGridProps`.

:::note
To see how the sorting works, you can look at the [source code][source-code] of the `useDataGrid` hook.
:::

:::tip
You can pass `initialSorter` prop to set initial sorting and `permanentSorter` prop to set permanent sorting.

```tsx
const { dataGridProps } = useDataGrid({
    initialSorter: [{ field: "id", order: "desc" }],
    permanentSorter: [{ field: "title", order: "asc" }],
});
```

:::

:::tip

If you want to sort externally from the `<DataGrid>` component. You can use `setSorter` like this:

```tsx
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    Button,
    ButtonGroup,
} from "@pankod/refine-mui";

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

Mui X community version only sorts the rows according to one criterion at a time. To use multi-sorting, you need to upgrade to the [Pro plan](https://mui.com/pricing/).

However, multiple sorting can be done as server-side without specifying the `sortModel`.

```tsx
return <DataGrid {...dataGridProps} sortModel={undefined} autoHeight />;
```

When `sortModel` is not passed, it supports more than one criteria at a time, but cannot show which fields are sorted in `<DataGrid>` headers.

:::

## Filtering

The hook handles filtering by setting the `filterMode`, `filterModel` and `onFilterModelChange`props that are compatible with `<DataGrid>`.

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

Above, you can see the filtering properties from `dataGridProps`.

:::note
To see how the filtering works, you can look at the [source code][source-code] of the `useDataGrid` hook.
:::

:::tip
You can pass `initialFilter` prop to set initial filter and `permanentFilter` prop to set permanent filter.

```tsx
const { dataGridProps } = useDataGrid({
    initialFilter: [{ field: "title", value: "lorem", operator: "contains" }],
    permanentFilter: [{ field: "status", value: "draft", operator: "eq" }],
});
```

:::

:::tip

If you want to filter externally from the `<DataGrid>` component. You can use `setFilter` like this:

```tsx
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    FormControlLabel,
    Checkbox,
} from "@pankod/refine-mui";

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

Mui X community version only filter the rows according to one criterion at a time. To use multi-filtering, you need to upgrade to the [Pro plan](#).

However, multiple filtering can be done as server-side without specifying the `filterModel`.

```tsx
return <DataGrid {...dataGridProps} filterModel={undefined} autoHeight />;
```

When `filterModel` is not passed, it supports more than one criteria at a time, but cannot show which fields are filtered in `<DataGrid>` headers.

:::

## API

### Properties

| Key                                                                                                | Description                                                                                                                                                        | Type                                                                           | Default                                                                              |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| resource                                                                                           | The resource to use for table data                                                                                                                                 | `string` \| `undefined`                                                        | Resource name that it reads from the URL                                             |
| permanentFilter                                                                                    | Default and unchangeable filter                                                                                                                                    | [`CrudFilters`][crudfilters]                                                   | `[]`                                                                                 |
| permanentSorter                                                                                    | Default and unchangeable sorter state                                                                                                                              | [`CrudSorting`][crudsorting]                                                   | `[]`                                                                                 |
| hasPagination                                                                                      | Whether to use server side pagination or not                                                                                                                       | `boolean`                                                                      | `true`                                                                               |
| initialCurrent                                                                                     | Initial page index                                                                                                                                                 | `number`                                                                       | `1`                                                                                  |
| initialPageSize                                                                                    | Number of records shown per initial number of pages                                                                                                                | `number`                                                                       | `25`                                                                                 |
| initialSorter                                                                                      | Initial sorting                                                                                                                                                    | [`CrudSorting`][crudsorting]                                                   |
| initialFilter                                                                                      | Initial filtering                                                                                                                                                  | [`CrudFilters`][crudfilters]                                                   |
| syncWithLocation                                                                                   | Sortings, filters, page index and records shown per page are tracked by browser history                                                                            | `boolean`                                                                      | Value set in [Refine][refine swl]. If a custom resource is given, it will be `false` |
| onSearch                                                                                           | When the search form is submitted, it creates the 'CrudFilters' object. Refer to [search form][table search] to learn how to create a search form                  | `Function`                                                                     |
| queryOptions                                                                                       | `react-query`'s `useQuery` options                                                                                                                                 | ` UseQueryOptions<`<br/>`{ data: TData[]; },`<br/>`TError>`                    |
| metaData                                                                                           | Metadata query for `dataProvider`                                                                                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                           | {}                                                                                   |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook)                                       | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)         | `"off"`                                                                              |
| liveParams                                                                                         | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled                                                                                     | [`{ ids?: string[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined`                                                                          |
| onLiveEvent                                                                                        | Callback to handle all related live events of this hook                                                                                                            | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)              | `undefined`                                                                          |

### Type Parameters

| Property         | Desription                                                   | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData            | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Values for search params                                     |                            | `{}`                       |

### Return values

| Property                      | Description                                                                                                    | Type                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| dataGridProps                 | MUI X [`<DataGrid>`][data-grid] props                                                                          | `DataGridPropsType`\*                                                                             |
| tableQueryResult              | Result of the `react-query`'s `useQuery`                                                                       | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`][usequery] |
| search                        | It sends the parameters it receives to its `onSearch` function                                                 | `(value: TSearchVariables) => Promise<void>`                                                      |
| current                       | Current page index state (returns `undefined` if pagination is disabled)                                       | `number` \| `undefined`                                                                           |
| totalPage                     | Total page count (returns `undefined` if pagination is disabled)                                               | `number` \| `undefined`                                                                           |
| setCurrent                    | A function that changes the current (returns `undefined` if pagination is disabled)                            | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                     |
| pageSize                      | Current pageSize state (returns `undefined` if pagination is disabled)                                         | `number` \| `undefined`                                                                           |
| setPageSize                   | A function that changes the pageSize (returns `undefined` if pagination is disabled)                           | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                     |
| hideFooterPagination          | Whether to hide the footer pagination or not. This value is only returned if `hasPagination` is set to `false` | `boolean`                                                                                         |
| sorter                        | Current sorting state                                                                                          | [`CrudSorting`][crudsorting]                                                                      |
| setSorter                     | A function that accepts a new sorter state                                                                     | `(sorter: CrudSorting) => void`                                                                   |
| filters                       | Current filters state                                                                                          | [`CrudFilters`][crudfilters]                                                                      |
| setFilters                    | A function that accepts a new filter state                                                                     | `(filters: CrudFilters) => void`                                                                  |
| createLinkForSyncWithLocation | A function create accessible links for syncWithLocation                                                        | `(params: `[SyncWithLocationParams][syncwithlocationparams]`) => string;`                         |

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

<br/>

:::caution
The `onStateChange` callback is used internally by the `useDataGrid` hook. If you want to override it, you can use like this:

```tsx
export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

    return (
        <List>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                //highlight-start
                onStateChange={(state) => {
                    dataGridProps.onStateChange(state);
                    // do something else
                }}
                //highlight-end
            />
        </List>
    );
};
```

:::

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//github/pankod/refine/tree/master/examples/table/mui/useDataGrid?embed=1&view=preview&theme=dark&preset=node"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-use-data-grid-example"
></iframe>

[source-code]: https://github.com/pankod/refine/blob/master/packages/master/src/hooks/useDataGrid/index.ts
[syncwithlocationparams]: /core/interfaces.md#syncwithlocationparams
[crudsorting]: /core/interfaces.md#crudsorting
[crudfilters]: /core/interfaces.md#crudfilters
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/interfaces.md#baserecord
[httperror]: /core/interfaces.md#httperror
[refine swl]: /core/components/refine-config.md#syncwithlocation
[table search]: /guides-and-concepts/search/table-search.md
[data-grid]: https://mui.com/x/react-data-grid/
