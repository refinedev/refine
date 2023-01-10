---
id: add-delete-feature
title: 5. Adding Delete Feature
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/add-create-page
    next: tutorial/adding-crud-pages/{preferredUI}/adding-search-and-filters
---

There are many ways to delete a record. In this tutorial, we will first use the `<DeleteButton/>` to delete a record and then we will learn how to enable the delete feature on the show page and edit page.

## Adding Delete Feature to List Page

Let's start by adding the delete feature to the list page. To do this, we will use the `<DeleteButton/>` component.

`<DeleteButton/>` is a **refine** component that is used to delete a record. When you click on the delete button, it will show a confirmation modal. If you confirm the deletion, it will delete the record.

[Refer to the `<DeleteButton/>` documentation for more information &#8594](/docs/api-reference/chakra-ui/components/buttons/delete-button/)

To add a delete feature to the products table, you can follow the steps below:

1. Open the `src/pages/products/list.tsx` file on your editor.

2. Import the `<DeleteButton/>` component from `@pankod/refine-chakra-ui`:

    ```tsx
    import { DeleteButton } from "@pankod/refine-chakra-ui";
    ```

3. Add the `<DeleteButton/>` component to the `actions` column of the table as shown below:

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

    `recordItemId` is the id of the record you want to delete.

Now, you can try to delete a record from the list page. Just click on the delete button of the record you want to delete and confirm the deletion.

## Enabling Delete Feature on Show Page and Edit Page

When we define a resource, we can enable the delete feature on the show page and edit page by setting the `canDelete` property to `true` as shown below:

```tsx src="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";

import { ProductList } from "pages/products/list";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";
import { ProductCreate } from "pages/products/create";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "products",
                        list: ProductList,
                        edit: ProductEdit,
                        show: ProductShow,
                        create: ProductCreate,
                        //highlight-next-line
                        canDelete: true,
                    },
                ]}
            />
        </ChakraProvider>
    );
};
export default App;
```

After setting the `canDelete` property to `true`, you will see a delete button on the show page and edit page. Because we used the `<Show/>` and `<Edit/>` components in the show page and edit page, the delete button will be added automatically in these components.

[Refer to the `<Refine/>` documentation for more information about the `canDelete` property &#8594](/docs/api-reference/core/components/refine-config.md#candelete)
