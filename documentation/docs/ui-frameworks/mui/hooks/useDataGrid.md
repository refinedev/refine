---
id: useDataGrid
title: useDataGrid
---

By using `useDataGrid`, you are able to get properties that are compatible with MUI X `<DataGrid>` component. All features such as sorting, filtering and pagination comes as out of box. For all the other features, you can refer to the MUI X [`<DataGrid>`](https://mui.com/x/react-data-grid/) documentation.

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
import { useDataGrid, DataGrid, GridColumns, List } from "@pankod/refine-mui";

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "status", headerName: "Status" },
];

export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    return (
        <List>
            <DataGrid {...dataGridProps} autoHeight />
        </List>
    );
};

interface IPost {
    id: string;
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
    columns,
});
```

> If the resource option is given, `syncWithLocation` will not work.

:::

## Pagination

The hook handles pagination by setting the `paginationMode`, `page`, `onPageChange`, `pageSize` and `onPageSizeChange` props that are compatible with `<DataGrid>`.

```tsx
export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid({
        columns,
    });

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
    columns,
    initialCurrent: 2,
    initialPageSize: 10,
});
```

:::

## Sorting

The hook handles sorting by setting the `sortingMode`, `sortModel` and `onSortModelChange`props that are compatible with `<DataGrid>`.

```tsx
export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid({
        columns,
    });

    //highlight-start
    const { sortingMode, sortModel, onSortModelChange, ...restDataGridProps } =
        dataGridProps;
    //highlight-end

    return (
        <List>
            <DataGrid
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
    columns,
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
    { field: "title", headerName: "Title", flex: 1 },
    { field: "status", headerName: "Status" },
];

export const PostsList: React.FC = () => {
    const { dataGridProps, setSorter } = useDataGrid({
        columns,
    });

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
            <DataGrid {...dataGridProps} autoHeight />
        </List>
    );
};
```

Mui X community version only sort the rows according to one criterion at a time. To use multi-sorting, you need to upgrade to the [Pro plan](#).

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
    const { dataGridProps } = useDataGrid({
        columns,
    });

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
    columns,
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
    { field: "title", headerName: "Title", flex: 1 },
    { field: "status", headerName: "Status" },
];

export const PostsList: React.FC = () => {
    const { dataGridProps, setFilters } = useDataGrid({
        columns,
    });

    const handleFilter = (
        e: React.ChangeEvent<HTMLInputElement>,
        checked: boolean,
    ) => {
        if (checked) {
            setFilters([
                {
                    field: "status",
                    value: "draft",
                    operator: "eq",
                },
            ]);
        } else {
            setFilters([
                {
                    field: "status",
                    value: undefined,
                    operator: "eq",
                },
            ]);
        }
    };

    return (
        <List>
            <FormControlLabel
                label="Filter by Draft Status"
                control={<Checkbox onChange={handleFilter} />}
            />
            <DataGrid {...dataGridProps} autoHeight />
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

[source-code]: https://github.com/pankod/refine/blob/master/packages/mui/src/hooks/useDataGrid/index.ts
