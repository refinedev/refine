---
id: index
title: 4.1. Adding List Page
tutorial:
    prev: tutorial/understanding-refine-props/resources
    next: tutorial/adding-crud-actions/add-edit-page
---

In [Unit 2.4](/docs/tutorial/getting-started/inferencer-for-crud-pages), we saw that the CRUD pages in our React admin panel are coded automatically with Inferencers. In this unit, we take those generated page components, add them to the pages and make some customizations ourselves.

In this post we cover the `blog_posts` `list` page.


## The List Page

The Inferencer-generated `<BlogPostList />` component is available at the `/` or the `/blog-posts` route. When we visit this page, we can view the code in a modal by clicking on `Show the auto-generated code` button:

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/blog-posts
setInitialRoutes(["/blog-posts"]);

import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    MarkdownField,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";

export const BlogPostList = () => {
    const { dataGridProps } = useDataGrid();

    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        resource: "categories",
        ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "title",
                flex: 1,
                headerName: "Title",
                minWidth: 200,
            },
            {
                field: "content",
                flex: 1,
                headerName: "Content",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return (
                        <MarkdownField
                            value={(value ?? "").slice(0, 80) + "..."}
                        />
                    );
                },
            },
            {
                field: "category",
                flex: 1,
                headerName: "Category",
                valueGetter: ({ row }) => {
                    const value = row?.category?.id;

                    return value;
                },
                minWidth: 300,
                renderCell: function render({ value }) {
                    return categoryIsLoading ? (
                        <>Loading...</>
                    ) : (
                        categoryData?.data?.find((item) => item.id === value)
                            ?.title
                    );
                },
            },
            {
                field: "status",
                flex: 1,
                headerName: "Status",
                minWidth: 200,
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: "Created At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [categoryData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
```

Let's copy this code and paste it into the file at `src/pages/blog-posts/list.tsx`. We should basically replace the existing code that uses the `<MuiListInferencer />`:

```tsx title="src/pages/blog-posts/list.tsx"
// Remove this code

import { IResourceComponentsProps } from "@refinedev/core";
import { MuiListInferencer } from "@refinedev/inferencer/mui";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  return <MuiListInferencer />;
};
```

The Inferencer generated the copied code by carrying out an initial polling to the `/blog-posts` endpoint in **Simple REST API**, figuring out the shape of the API response and placing appropriate **Material UI** elements for the list. The new code gives us the possibility to customize the component further.


## Understanding the List Page Components

Let's briefly make sense of the components and hooks used in the `list` page.

-   `<List />` is a **refine** component that is used to present collections of data. It also shows a create button, a page title and some other customizable UI elements.

    [Refer to the `<List />` documentation for more information &#8594](/docs/api-reference/mui/components/basic-views/list)

-   `<DataGrid />` is a native **Material UI** component that is used to display data in a table.

    [Refer to the **Material UI** `<DataGrid />` documentation for more information &#8594](https://mui.com/x/react-data-grid/)

-   The `useDataGrid()` hook, imported from `@refinedev/mui` package, is a high level hook built on top of the `useTable()` **refine** core hook. It provides all the features of the `useTable()` hook, as well as features related to relaying data to **Material UI** components.

    For example, it exposes the values needed by the `<DataGrid />` component with the `dataGridProps` object. The `useDataGrid()` hook first fetches data from API and then wraps it inside various helper objects required for the `<DataGrid />` component. It also makes available data interaction functions like sorting, filtering, and pagination to `<DataGrid />`.

[Refer to the `useDataGrid()` documentation for more information &#8594](/docs/api-reference/mui/hooks/useDataGrid/)

-   `<EditButton />` and `<ShowButton />` are **refine** components that are used to navigate to edit and show pages of the list item.

    [Refer to the `<EditButton/>` documentation for more information &#8594](/docs/api-reference/mui/components/buttons/edit-button/)

    [Refer to the `<ShowButton/>` documentation for more information &#8594](/docs/api-reference/mui/components/buttons/show-button/)

    
## Handling Relationships

The `blog_posts` resource is associated with `categories` resource. Each blog post includes the `category` field as a foreign key with the `id` property.

In the `<BlogPostList />` component above, we are using the `useMany()` hook to get the `title` field of the `category` associated with a blog post item:

```TypeScript
// useMany() hook in action

const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
        enabled: !!dataGridProps?.rows,
    },
});
```

The `useMany()` hook is good for fetching a collection of records in a single request. It has to be passed an array of the `id`'s of related records. In this case, we are passing in the `id`'s of the blog posts categories. The `useMany()` hook is useful for fetching associated data for multiple records.

[Refer to the `useMany()` documentation for more information &#8594](/docs/api-reference/core/hooks/data/useMany/)

Under the hood, the `usemany()` hook passes the `resource` and `ids` array to the `dataProvider`'s `getMany` method. The `dataProvider.getMany()` method then fetches all the specified `categories` records in a single request to the API. In our React admin panel app, the successfully fetched `data` variable is an array of `categories` records that looks like this:

```ts
[
    {
        id: 1,
        title: "mock category title",
    },
    {
        id: 2,
        title: "another mock category title",
    },
];
```

We are then using this `data` array to filter and display the `title` of each category in the table.

Now if we visit <a href="http://localhost:5173/blog-posts" rel="noopener noreferrer nofollow">http://localhost:5173/blog-posts</a> again, we can see the same blog list page in the browser.

This time, no `Show the auto-generated code` button is available as we did not use `<MuiListInferencer />`:

![1-blog-posts-list](https://imgbox.com/2JVOWyqE)

From this point on, we can start customizing the pages to our liking. But for the brevity of the tutorial, we won't make any change here.

<Checklist>
<ChecklistItem id="add-list-page-mui">
I added manually the Inferencer-generated code to <code>BlogPostList</code> component.
</ChecklistItem>
<ChecklistItem id="add-list-page-mui-2">
I understand the use of <strong>refine</strong> core and <strong>Material UI</strong>'s data hooks in the list page to fetch data from the backend.
</ChecklistItem>
<ChecklistItem id="add-list-page-mui-3">
I understand the use of <strong>refine</strong>'s <strong>Material UI</strong> components in the list page to display fetched data.
</ChecklistItem>
<ChecklistItem id="add-list-page-mui-4">
I understand how <code>useMany()</code> hook is used for fetching a resource's associated data.
</ChecklistItem>
</Checklist>
