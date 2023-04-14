---
"@refinedev/core": minor
---

feat: Expose the query params to the `meta` and add the ability to pass global `meta` to data provider methods

-   Added the ability to pass `meta` to data provider methods globally for specific resources.

    For example, to pass the `role` property to all data provider methods for the `posts` resource, use the following code:

    ```tsx
    import { Refine } from "@refinedev/core";

    const App: React.FC = () => {
        return (
            <Refine
                resources={[
                    {
                        name: "posts",
                        meta: {
                            role: "editor",
                        },
                    },
                ]}
            />
        );
    };
    ```

    Now, when you call any data hook with the `posts` resource, the `meta` property will be accessible in the data provider methods.

    ```tsx
    const dataProvider = {
        getList: async ({ resource, meta }) => {
            console.log(meta.role); // "editor"
        },
    };
    ```

-   Added the query params to the `meta` property by default.

    For example, if you call the `useList` hook on the `example.com/posts?status=published` URL, the `meta` property will be accessible in the data provider methods as follows:

    ```tsx
    const dataProvider = {
        getList: async ({ resource, meta }) => {
            console.log(meta.status); // "published"
        },
    };
    ```
