---
id: add-delete-action
title: 4.5. Adding Delete Action
tutorial:
    prev: tutorial/adding-crud-actions/add-create-page
    next: tutorial/adding-crud-actions/sort-and-filters
---

There are multiple ways to implement deleting a record in **refine**. This post explores one way that already came implemented with the project, using the `meta.canDelete` property of a resource item in the `resources` array. It also demonstrate a second option by adding a `<DeleteButton />` component to each item in the blog post `list` page.


## `delete` Action Using `meta.canDelete` Property on a Resource

When we define a resource, we are able to enable the delete feature on that resource item's `show` page and `edit` page. We can do this by setting the resource's `meta.canDelete` property to `true`:

```tsx src="src/App.tsx"
// Inside App.tsx

<Refine>
  resources={[
    {
      name: "blog_posts",
      list: "/blog-posts",
      create: "/blog-posts/create",
      edit: "/blog-posts/edit/:id",
      show: "/blog-posts/show/:id",
      meta: {
        canDelete: true,
      },
    },
    {
      name: "categories",
      list: "/categories",
      create: "/categories/create",
      edit: "/categories/edit/:id",
      show: "/categories/show/:id",
      // highlight-start
      meta: {
        canDelete: true,
      },
      // highlight-end
    },
  ]}
</Refine>
```

Setting `meta.canDelete: true` places a `<DeleteButton />` component inside the `<Show />` and `<Edit />` components that are used in the show page and edit page respectively. Thanks to this setting, we can see a `Delete` button in these pages.

[Refer to the `<Refine/>` documentation for more information about the `canDelete` property &#8594](/docs/api-reference/core/components/refine-config.md#candelete)


## Adding `<DeleteButton />` to List Page

We can also add the `delete` action using the `<DeleteButton />` component. In this section, add a little customization to our React admin panel app by adding a `<DeleteButton />` to each row in the blog post list page.

`<DeleteButton />` is a **refine** core component used to delete a record. Clicking on the delete button shows a confirmation modal. After confirmation, the item gets deleted.

Below, we are adding this `<DeleteButton />` to each item in the blog posts data grid:

```TypeScript
// src/pages/blog-posts/list.tsx

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
                            // highlight-next-line
                            <DeleteButton hideText recordItemId={row.id} />
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

With the above one-liner change, we are placing the `<DeleteButton />` component to each row, under the `actions` column of the table in the `<BlogPostList />` component. The `<DeleteButton />` receives the `resource` name from the `<List />` component which figures it out from the current URL.

[Refer to the `<DeleteButton />` documentation for more information &#8594](/docs/api-reference/mui/components/buttons/delete-button/)

With this customization, we have a button to delete a blog post item from the list page in our React admin panel app.

<br/>

:::tip

You can also use the `useDelete()` hook provided by **refine** to delete a record.

[Refer to the `useDelete()` documentation for more information information &#8594](/docs/api-reference/core/hooks/data/useDelete/)

:::

<Checklist>
<ChecklistItem id="add-delete-feature-mui">
I understand how <code>delete</code> action is enable using <code>meta.canDelete</code> property of a resource item in the <code>resources</code> array.
</ChecklistItem>
<ChecklistItem id="add-delete-feature-mui-2">
I know how to implement deleting a record using the {`<DeleteButton />`} component
</ChecklistItem>
</Checklist>
