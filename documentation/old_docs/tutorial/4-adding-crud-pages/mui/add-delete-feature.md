---
id: add-delete-feature
title: 5. Adding Delete Feature
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/add-create-page
    next: tutorial/adding-crud-pages/{preferredUI}/adding-sort-and-filters
---

## Adding Delete Feature to List Page

`<DeleteButton/>` is a **refine** component that is used for deleting records. When you click on the delete button, it will show a confirmation modal and delete the record upon confirmation. To add it to the "blog_posts" table:

1.  Open the `src/pages/blog-posts/list.tsx` file on your editor.

2.  Import the `<DeleteButton/>` component from `@refinedev/mui`:

    ```tsx
    import { DeleteButton } from "@refinedev/mui";
    ```

3.  Add the `<DeleteButton/>` component to the `actions` column of the table as shown below:

    ```tsx
    {
        field: "actions",
        headerName: "Actions",
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
    ```

You can now delete a record from the list page by clicking on the delete button of any blog post.

> For more information, refer to the [`<DeleteButton/>` documentation&#8594](/docs/api-reference/mui/components/buttons/delete-button/)

## Enabling the Delete Feature on Show and Edit Pages

We can enable the delete feature on both show and edit pages while we are defining a resource by setting the `canDelete` property in the `meta` to `true` as shown below:

```tsx src="src/App.tsx"
import { Refine } from "@refinedev/core";
import {
    Layout,
    ErrorComponent,
    LightTheme,
    RefineSnackbarProvider,
    notificationProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import routerBindings from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { BlogPostList } from "pages/blog-posts/list";
import { BlogPostEdit } from "pages/blog-posts/edit";
import { BlogPostShow } from "pages/blog-posts/show";
import { BlogPostCreate } from "pages/blog-posts/create";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <BrowserRouter>
                    <Refine
                        routerProvider={routerBindings}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "blog_posts",
                                list: "/blog-posts",
                                show: "/blog-posts/show/:id",
                                create: "/blog-posts/create",
                                edit: "/blog-posts/edit/:id",
                                // highlight-start
                                meta: {
                                    canDelete: true,
                                },
                                // highlight-end
                            },
                        ]}
                    >
                        {/* ... */}
                    </Refine>
                </BrowserRouter>
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};
export default App;
```

After setting the `canDelete` property in `meta` to `true`, you will see a delete button on both show and edit pages.

> For more information, refer to the [`canDelete` section of the `<Refine/>` documentation&#8594](/docs/api-reference/core/components/refine-config.md#candelete)

<br/>

:::tip

You can also use `useDelete` hook provided by **refine** to delete a record.

For more information, refer to the [`useDelete` documentation&#8594](/docs/api-reference/core/hooks/data/useDelete/)

:::

<br/>

<Checklist>

<ChecklistItem id="add-delete-feature-mui">
I have added the delete feature to the list page
</ChecklistItem>
<ChecklistItem id="add-delete-feature-mui-2">
I have enabled the delete feature on the show page and edit page
</ChecklistItem>

</Checklist>
