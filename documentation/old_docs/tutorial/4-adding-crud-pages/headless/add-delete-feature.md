---
id: add-delete-feature
title: 5. Adding Delete Feature
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/add-create-page
    next: tutorial/adding-crud-pages/{preferredUI}/adding-sort-and-filters
---

`useDelete` is a **refine** hook that is used to delete a record. It returns mutation functions that can be used to delete a record, and when the mutation function is called, the parameters of the function are passed to the `delete` method of the data provider.

We will now add a delete button to the list page by using the `useDelete` hook; for this, follow these steps:

1. Open the `src/pages/blog-posts/list.tsx` file on your editor.

2. Import the `useOne` hook from `@refinedev/core`:

    ```tsx
    import { useOne } from "@refinedev/core";
    ```

3. Call the `useDelete` hook in the `BlogPostList` component:

    ```tsx
    const BlogPostList: React.FC = () => {
        const { mutate: deleteBlogPost } = useDelete();
    };
    ```

    > You can check the parameters of the `deleteBlogPost` mutation function in the [`useDelete` documentation](/docs/api-reference/core/hooks/data/useDelete/#properties).

4. Add the `<button/>` component to the `actions` column of the table as shown below:

    ```tsx
    {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: "4px",
                            }}
                        >
                            <button
                                onClick={() => {
                                    show("blog_posts", getValue() as string);
                                }}
                            >
                                Show
                            </button>
                            <button
                                onClick={() => {
                                    edit("blog_posts", getValue() as string);
                                }}
                            >
                                Edit
                            </button>
                            //highlight-start
                            <button
                                onClick={() => {
                                    deleteBlogPost({
                                        resource: "blog_posts",
                                        id: getValue() as string,
                                    });
                                }}
                            >
                                Delete
                            </button>
                            //highlight-end
                        </div>
                    );
                },
            },
    ```

You can now delete a record from the list page by clicking on the delete button of any blog post.

<br/>

:::tip

You can also use `useDelete` hook provided by **refine** to delete a record.

For more information, refer to the [`useDelete` documentation&#8594](/docs/api-reference/core/hooks/data/useDelete/)

:::

<br/>

<Checklist>

<ChecklistItem id="add-delete-feature-headless">
I have added the delete feature to the list page.
</ChecklistItem>
<ChecklistItem id="add-delete-feature-headless-2">
I have enabled the delete feature on the show page and edit page.
</ChecklistItem>

</Checklist>
