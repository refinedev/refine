---
id: react-table
title: React Table
---

**refine** offers a [React Table](#) adapter([@pankod/refine-react-table](#)) that allows you to use the React Table library with **refine**. Thus, it works in perfect harmony with the React Table library. All of React Table's features are supported and you can use all of the React Table's examples with no changes just copy and paste them into your project.

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

## Basic Usage

### Installation

Install the [`@pankod/refine-react-table`](#) library.

```bash
npm i @pankod/refine-react-table
```

### Create `<PostList>` component

We simply create a `<PostList>` component and pass to the `<Refine>` component as resource. All the implementation we will do from now on will be in the `<PostList>` component.

```tsx title="src/posts/list.tsx"
export const PostList: React.FC = () => {
    return <></>;
};
```

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

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

### Create basic table

Firts, we need to import the `useTable` hook from the `@pankod/refine-react-table` library.

```tsx title="src/posts/list.tsx"
//highlight-next-line
import { useTable } from "@pankod/refine-react-table";

export const PostList: React.FC = () => {
    return <></>;
};
```

Define columns what we want to display in the table. Then, return the headless table.

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

    //highlight-next-line
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<IPost>({ columns });

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
This example is the same as the basic example in the [React Table](#react-table) documentation.

[Refer to the basic example of React Table. &#8594](https://react-table.tanstack.com/docs/examples/basic)

:::

## Pagination
