---
title: React Table
slug: /packages/documentation/react-table
---

import BasicUsageLivePreview from "./\_partial-basic-usage-live-preview.md";
import PaginationLivePreview from "./\_partial-pagination-live-preview.md";

**refine** offers a [TanStack Table][tanstack-table] adapter with [@pankod/refine-react-table][refine-react-table] that allows you to use the TanStack Table library with **refine**. Thus, you can manage your server-side data fetching operations.

All of TanStack Table's features are supported and you can use all of the TanStack Table's examples with no changes just copy and paste them into your project.

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

<br/>

## Filtering

TanStack Table provides a bunch of methods that we can use to control the filtering. For example, we can use the `setColumnFilters` method to set the current `columnFilters` value. Every change in the `filter` will trigger a new request to the data provider.

You can specify which field will be filtered with which filter operator with the `filterOperator` property in the `meta` object. `filterOperator` must be a [`CrudOperators`](/api-reference/core/interfaces.md#crudoperators) type.

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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/packages/react-table/filtering.gif" alt="Filtering" />
</div>

<br/>

## API Reference

### Properties

<PropsTable module="@pankod/refine-react-table/useTable" />

:::tip External Props
It also accepts all props of [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#options).
:::

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
