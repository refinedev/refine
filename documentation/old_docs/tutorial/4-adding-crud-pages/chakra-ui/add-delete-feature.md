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

2.  Import the `<DeleteButton/>` component from `@refinedev/antd`:

    ```tsx
    import { DeleteButton } from "@refinedev/chakra-ui";
    ```

3.  Add the `<DeleteButton/>` component to the `actions` column of the table:

    ```tsx
    {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
            return (
                <HStack>
                    <ShowButton
                        hideText
                        recordItemId={getValue() as string}
                    />
                    <EditButton
                        hideText
                        recordItemId={getValue() as string}
                    />
                    //highlight-start
                    <DeleteButton
                        hideText
                        recordItemId={getValue() as string}
                    />
                    //highlight-end
                </HStack>
            );
        },
    },
    ```

You can now delete a record from the list page by clicking on the delete button of any blog post.

> For more information, refer to the [`<DeleteButton/>` documentation&#8594](/docs/api-reference/chakra-ui/components/buttons/delete-button/)

## Enabling the Delete Feature on Show and Edit Pages

We can enable the delete feature on both show and edit pages while we are defining a resource by setting the `canDelete` property in the `meta` to `true` as shown below:

```tsx src="src/App.tsx"
import { Refine } from "@refinedev/core";
import routerBindings, {
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    ErrorComponent,
    Layout,
    refineTheme,
    notificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { BlogPostList } from "pages/blog-posts/list";
import { BlogPostEdit } from "pages/blog-posts/edit";
import { BlogPostShow } from "pages/blog-posts/show";
import { BlogPostCreate } from "pages/blog-posts/create";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
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
                            // highlight-start
                            meta: {
                                canDelete: true,
                            },
                            // highlight-end
                        },
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    {/* ... */}
                    <UnsavedChangesNotifier />
                </Refine>
            </BrowserRouter>
        </ChakraProvider>
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

<ChecklistItem id="add-delete-feature-chakra-ui">
I have added the delete feature to the list page.
</ChecklistItem>
<ChecklistItem id="add-delete-feature-chakra-ui-2">
I have enabled the delete feature on the show page and edit page
</ChecklistItem>

</Checklist>
