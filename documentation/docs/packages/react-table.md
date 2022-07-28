---
id: react-table
title: React Table
---

import basicTable from '@site/static/img/packages/react-table/basic.png';
import pagination from '@site/static/img/packages/react-table/pagination.gif';
import sorting from '@site/static/img/packages/react-table/sorting.gif';
import filtering from '@site/static/img/packages/react-table/filtering.gif';

**refine** offers a [TanStack Table][tanstack-table] adapter with [@pankod/refine-react-table][refine-react-table] that allows you to use the TanStack Table library with **refine**. Thus, you can manage your server-side data fetching operations.

All of TanStack Table's features are supported and you can use all of the TanStack Table's examples with no changes just copy and paste them into your project.

## Installation

Install the [`@pankod/refine-react-table`][refine-react-table] library.

```bash
npm i @pankod/refine-react-table
```

## Basic Usage

In this documentation, we'll step-by-step create an example of a headless table with sorting, filtering, and pagination capabilities.

Let's say you have a endpoint that returns the following data.

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "status": "published",
        "createdAt": "2021-04-18T00:09:11.607Z"
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "status": "draft",
        "createdAt": "2020-01-28T02:57:58.892Z"
    }
]
```

### Create `<PostList>` component

We simply create a `<PostList>` component and pass to the `<Refine>` component as a resource. All the implementation we will do from now on will be in the `<PostList>` component.

```tsx title="src/posts/list.tsx"
export const PostList: React.FC = () => {
    return <></>;
};
```

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import "./App.css";

//highlight-next-line
import { PostList } from "pages/posts/list";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            //highlight-next-line
            resources={[{ name: "posts", list: PostList }]}
        />
    );
};

export default App;
```

<details>
<summary>Show basic table style</summary>
<p>

```css title="src/App.css"
table {
    border-spacing: 0;
    border: 1px solid black;
}

table th,
td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
}

table tr:last-child td {
    border-bottom: 0;
}

table th,
td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
}

table th:last-child,
td:last-child {
    border-right: 0;
}
```

</p>
</details>

### Create basic table

Firts, we need to import the `useTable` hook from the `@pankod/refine-react-table` library.

```tsx title="src/posts/list.tsx"
//highlight-next-line
import { useTable } from "@pankod/refine-react-table";

export const PostList: React.FC = () => {
    return <></>;
};
```

Define columns what we want to display in the table. Then, return the headless table with using the `useTable` hook.

:::info
`useTable` does not expect any data prop to be passed to it. It will fetch data from the data provider by resource.
:::

```tsx title="src/posts/list.tsx"
//highlight-next-line
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}

export const PostList: React.FC = () => {
    //highlight-start
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
            },
            {
                id: "createdAt",
                header: "CreatedAt",
                accessorKey: "createdAt",
            },
        ],
        [],
    );
    //highlight-end

    //highlight-start
    const { getHeaderGroups, getRowModel } = useTable({ columns });
    //highlight-end

    return (
        //highlight-start
        <table>
            <thead>
                {getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        //highlight-end
    );
};
```

:::note
This example is the same as the basic example in the [TanStack Table][tanstack-table] documentation.

[Refer to the basic example of TanStack Table. &#8594](https://tanstack.com/table/v8/docs/examples/react/basic)
:::

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={basicTable} alt="Basic Table" />
</div>

<br/>

## Pagination

TanStack Table provides a bunch of methods that we can use to control the pagination. For example, we can use the `setPageSize` method to set the current `pageSize`. Every change in the `pageSize` and `pageIndex` will trigger a new request to the data provider.

[Refer to the TanStack Table Pagination API documentation for detailed information. &#8594](https://tanstack.com/table/v8/docs/api/features/pagination)

:::info
`useTable` hook from `@pankod/refine-react-table` sets `manualPagination` to `true` by default to handle the pagination. If you set `hasPagination` to `false` in `refineCoreProps` property in the `useTable` config, it will disable the server-side pagination and it will let you handle the pagination in the client side.
:::

```tsx title="src/posts/list.tsx"
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}

export const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(...); // Defined in the previous section

    const {
        getHeaderGroups,
        getRowModel,
        //highlight-start
        getState,
        setPageIndex,
        getCanPreviousPage,
        getPageCount,
        getCanNextPage,
        nextPage,
        previousPage,
        setPageSize,
        //highlight-end
    } = useTable({ columns });

    return (
        <>
            <table>
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            // Pagination can be built however you'd like. // This is just a very
            basic UI implementation: //highlight-start
            <div>
                <button
                    onClick={() => setPageIndex(0)}
                    disabled={!getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
                    {">"}
                </button>
                <button
                    onClick={() => setPageIndex(getPageCount() - 1)}
                    disabled={!getCanNextPage()}
                >
                    {">>"}
                </button>
                <span>
                    <div>Page</div>
                    <strong>
                        {getState().pagination.pageIndex + 1} of{" "}
                        {getPageCount()}
                    </strong>
                </span>
                <span>
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            setPageIndex(page);
                        }}
                    />
                </span>
                <select
                    value={getState().pagination.pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            //highlight-end
        </>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={pagination} alt="Pagination Table" />
</div>

<br/>

## Sorting

TanStack Table provides a bunch of methods that we can use to control the sorting. For example, we can use the `setColumnOrder` method to set the current `sorting` value. Every change in the `sorting` state will trigger a new request to the data provider.

[Refer to the `useSortBy` documentation for detailed information. &#8594](https://react-table.tanstack.com/docs/api/useSortBy#usesortby)

```tsx title="src/posts/list.tsx"
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}

export const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(...); // Defined in the previous section

    const {
        getHeaderGroups,
        getRowModel,
        getState,
        setPageIndex,
        getCanPreviousPage,
        getPageCount,
        getCanNextPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable({ columns });

    return (
        <>
            <table>
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        //highlight-start
                                        <div
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            {{
                                                asc: " 🔼",
                                                desc: " 🔽",
                                            }[
                                                header.column.getIsSorted() as string
                                            ] ?? null}
                                        </div>
                                        //highlight-end
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            // Pagination defined in the previous section
        </>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={sorting} alt="Sortable Table" />
</div>

<br/>

## Filtering

TanStack Table provides a bunch of methods that we can use to control the filtering. For example, we can use the `setColumnFilters` method to set the current `columnFilters` value. Every change in the `filter` will trigger a new request to the data provider.

You can specify which field will be filtered with which filter operator with the `filterOperator` property in the `meta` object. `filterOperator` must be a [`CrudOperators`](/core/interfaces.md#crudoperators) type.

```tsx title="src/posts/list.tsx"
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}

export const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                //highlight-start
                meta: {
                    filterOperator: "contains",
                },
                //highlight-end
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                //highlight-start
                meta: {
                    filterOperator: "contains",
                },
                //highlight-end
            },
            {
                id: "createdAt",
                header: "CreatedAt",
                accessorKey: "createdAt",
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        getState,
        setPageIndex,
        getCanPreviousPage,
        getPageCount,
        getCanNextPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable({ columns });

    return (
        <>
            <table>
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            <div
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                {{
                                                    asc: " 🔼",
                                                    desc: " 🔽",
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? null}
                                            </div>
                                            //highlight-start
                                            <div>
                                                <input
                                                    value={
                                                        (header.column.getFilterValue() as string) ??
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        header.column.setFilterValue(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            //highlight-end
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            // Pagination defined in the previous section
        </>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={filtering} alt="Filtering" />
</div>

<br/>

## API Reference

### Properties

| Property                  | Description                                                                                   | Type                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| refineCoreProps           | Configuration object for the core of the [`useTable`][use-table-core]                         | [`UseTableProps`](/core/hooks/useTable.md#properties) |
| Tanstack Table Properties | See [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#options) documentation |

### Type Parameters

| Property | Desription                                                   | Type                       | Default                    |
| -------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError   | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |

### Return values

| Property                     | Description                                                                                     | Type                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| refineCore                   | The return values of the [`useTable`][use-table-core] in the core                               | [`UseTableReturnValues`](/core/hooks/useTable.md#return-values) |
| Tanstack Table Return Values | See [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#table-api) documentation |


## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//github/pankod/refine/tree/master/examples/table/reactTable/basic/?embed=1&view=preview&theme=dark&preset=node"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-react-table-example"
></iframe>

[tanstack-table]: https://tanstack.com/table/v8
[refine-react-table]: https://github.com/pankod/refine/tree/master/packages/react-table
[use-table-core]: /core/hooks/useTable.md
[baserecord]: /core/interfaces.md#baserecord
[httperror]: /core/interfaces.md#httperror
