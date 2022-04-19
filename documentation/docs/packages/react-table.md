---
id: react-table
title: React Table
---

import basicTable from '@site/static/img/packages/react-table/basic.png';
import pagination from '@site/static/img/packages/react-table/pagination.gif';
import sorting from '@site/static/img/packages/react-table/sorting.gif';
import filtering from '@site/static/img/packages/react-table/filtering.gif';

**refine** offers a [React Table][react-table] adapter([@pankod/refine-react-table][refine-react-table]) that allows you to use the React Table library with **refine**. Thus, you can manage your server-side data fetching operations.

All of React Table's features are supported and you can use all of the React Table's examples with no changes just copy and paste them into your project.

## Installation

Install the [`@pankod/refine-react-table`][refine-react-table] library.

```bash
npm i @pankod/refine-react-table
```

:::caution
For typescript users, you need to add React Table types to your project.
:::

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
`useTable` does not expect any data to be passed to it. It will fetch data from the data provider by resource.
:::

```tsx title="src/posts/list.tsx"
//highlight-next-line
import { useTable, Column } from "@pankod/refine-react-table";

export const PostList: React.FC = () => {
    //highlight-start
    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "id",
                Header: "ID",
                accessor: "id",
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
            },
            {
                id: "status",
                Header: "Status",
                accessor: "status",
            },
            {
                id: "createdAt",
                Header: "CreatedAt",
                accessor: "createdAt",
            },
        ],
        [],
    );
    //highlight-end

    //highlight-start
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
        useTable({ columns });
    //highlight-end

    return (
        //highlight-start
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
        //highlight-end
    );
};
```

:::note
This example is the same as the basic example in the [React Table][react-table] documentation.

[Refer to the basic example of React Table. &#8594](https://react-table.tanstack.com/docs/examples/basic)
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

We need to import the `usePagination` plugin and inject it into the `useTable` hook in order to use the pagination feature. React Table provides a bunch of methods that we can use to control the pagination. For example, we can use the `setPageSize` method to set the current `pageSize`. Every change in the `pageSize` and `pageIndex` will trigger a new request to the data provider.

[Refer to the `usePagination` documentation for detailed information. &#8594](https://react-table.tanstack.com/docs/api/usePagination#usepagination)

```tsx title="src/posts/list.tsx"
//highlight-next-line
import { useTable, Column, usePagination } from "@pankod/refine-react-table";

export const PostList: React.FC = () => {
    const columns: Array<Column> = React.useMemo(...); // Defined in the previous section

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        //highlight-next-line
        page, // Instead of using 'rows', we'll use page
        //highlight-start
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        //highlight-end
        //highlight-next-line
    } = useTable({ columns }, usePagination);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    //highlight-next-line
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            // Pagination can be built however you'd like.
            // This is just a very basic UI implementation:
            //highlight-start
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {"<"}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {">>"}
                </button>
                <span>
                    Page
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <span>
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span> <select
                    value={pageSize}
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

:::note
This example is the same as the pagination example in the [React Table][react-table] documentation.

[Refer to the pagination example of React Table. &#8594](https://react-table.tanstack.com/docs/examples/pagination)
:::

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

We need to import the `useSortBy` plugin and inject it into the `useTable` hook in order to use the sorting feature. React Table provides a bunch of methods that we can use to control the sorting. For example, we can use the `toggleSortBy` method to set the current `sortBy` value. Every change in the `sortBy` will trigger a new request to the data provider.

[Refer to the `useSortBy` documentation for detailed information. &#8594](https://react-table.tanstack.com/docs/api/useSortBy#usesortby)

```tsx title="src/posts/list.tsx"
import {
    useTable,
    Column,
    usePagination,
    //highlight-next-line
    useSortBy,
} from "@pankod/refine-react-table";

export const PostList: React.FC = () => {
    const columns: Array<Column> = React.useMemo(...); // Defined in the previous section

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        //highlight-next-line
    } = useTable({ columns }, useSortBy, usePagination);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                //highlight-start
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    // Add a sort direction indicator
                                    <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                        : ''}
                                    </span>
                                </th>
                                //highlight-end
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                // Pagination defined in the previous section
            </div>
        </>
    );
};
```

:::note
This example is the same as the sorting example in the [React Table][react-table] documentation.

[Refer to the pagination example of React Table. &#8594](https://react-table.tanstack.com/docs/examples/pagination)
:::

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

We need to import the `useFilters` plugin and inject it into the `useTable` hook in order to use filtering. React Table provides a bunch of methods that we can use to control the filtering. For example, we can use the `setFilter` method to set the current `filter` value. However, with which column we are going to filter, we need to specify the `filter` prop for that column. This `filter` prop must be [`CrudOperators`](/core/interfaces.md#crudoperators) type. Every change in the `filter` will trigger a new request to the data provider.

```tsx title="src/posts/list.tsx"
import {
    useTable,
    Column,
    usePagination,
    useSortBy,
    //highlight-next-line
    useFilters,
} from "@pankod/refine-react-table";

export const PostList: React.FC = () => {
    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "id",
                Header: "ID",
                accessor: "id",
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
                //highlight-next-line
                filter: "contains",
            },
            {
                id: "status",
                Header: "Status",
                accessor: "status",
            },
            {
                id: "createdAt",
                Header: "CreatedAt",
                accessor: "createdAt",
            },
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        //highlight-start
        setFilter,
        state: { pageIndex, pageSize, filters },
    } = useTable({ columns }, useFilters, useSortBy, usePagination);
    //highlight-end

    return (
        <>
            //highlight-start
            <div className="filtering">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={
                        filters.find((filter) => filter.id === "title")?.value
                    }
                    onChange={(event) => setFilter("title", event.target.value)}
                />
            </div>
            //highlight-end
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps(),
                                    )}
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                // Pagination defined in the previous section
            </div>
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

## API

### Properties

Supports all the properties supported by the `useTable` hook are available in the [React Table][react-table] documentation. Also, we added the following property:

`refineCoreProps`: You can define all properties provided by [`useTable`][react-table-core] here. You can see all of them in [here](/core/hooks/useTable.md#properties).

> For example, we can define the `refineCoreProps` property in the `useTable` hook as:

```tsx
import { useTable } from "@pankod/refine-react-table";

const { ... } = useTable({
    ...,
    refineCoreProps: {
        resource: "posts",
        syncWithLocation: true,
        // You can define all properties provided by refine useTable
    },
});
```

### Type Parameters

| Property | Desription                                                   | Type                       | Default                    |
| -------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError   | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |

### Return values

Returns all the properties returned by [React Table][react-table] of the `useTable` hook. Also, we added the following return values:

`refineCore`: Returns all values returned by [`useTable`][react-table-core]. You can see all of them in [here](/core/hooks/useTable.md##return-values).

> For example, we can access the `refineCore` return value in the `useTable` hook as:

```tsx
import { useTable } from "@pankod/refine-react-table";

const {
    refineCore: { tableQueryResult, ... },
} = useTable({ ... });
```

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-react-table-example-nhldb?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fposts%2Flist.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-react-table-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[react-table]: https://react-table.tanstack.com
[refine-react-table]: https://github.com/pankod/refine/tree/master/packages/react-table
[react-table-core]: /core/hooks/useTable.md
[baserecord]: /core/interfaces.md#baserecord
[httperror]: /core/interfaces.md#httperror
