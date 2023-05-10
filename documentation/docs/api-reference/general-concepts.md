---
id: general-concepts
title: General Concepts
---

**refine** core is fully independent of UI, meaning that you can use core components and hooks without any UI dependency. All of the **data**-related hooks, such as [`useTable`](/docs/api-reference/core/hooks/useTable/), [`useForm`](/api-reference/core/hooks/useForm.md), [`useList`](/docs/api-reference/core/hooks/data/useList), of refine can also be given some common properties like `resource`, `meta`, `queryOptions` etc. that are independent of UI.

## `resource`

`resource` is a prop that gets passed to `dataProvider` as a paremeter by **refine**. It is usually used as an API endpoint path but it all depends on how you hanlde it in your `dataProvider`

> For an example, refer to the [`Creating a data provider from scratch part of the tutorial`](/docs/tutorial/understanding-dataprovider/create-dataprovider/)

### How does **refine** know what the value of `resource` is?

**refine** automatically determines the value from the active route where the component or the hook is used.

For example, if you are using the hook in the `<PostList>` component, the `resource` value defaults to `"posts"` because the active route is `/posts`

:::info
To make the inference work, you need to pass the `routerProvider` prop to the `<Refine>` component from your router package choice.
:::

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PostList } from "pages/posts/list.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                    },
                ]}
            >
                <Routes>
                    <Route path="/posts" element={<PostList />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;
```

This value however can be overriden by passing the `resource` prop to the hook:

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@refinedev/core";

const PostList: React.FC = () => {
    const result = useTable({
        //highlight-next-line
        resource: "users",
    });

    return <div>...</div>;
};
```

:::info
The value passed to the `resource` property is also used to determine the active `resource` from the `resources` array, which is optional for API interactions, but enables useful `refine` features such as redirecting to the list page after create and update operations.
:::

---

:::info
If you want to use `resource` with nested routes, refer to the [related section in FAQ &#8594](/faq.md#how-can-i-request-an-api-with-nested-route)
:::

## `meta`

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

-   Customizing the data provider methods for specific use cases.
-   Generating GraphQL queries using plain JavaScript Objects (JSON).
-   Filling additional parameters in target routes when occurs redirection.

### Passing a global `meta` specific to a resource

You can define a global `meta` specific to a resource, which will be passed to all the data provider methods whenever the resource is matched.

For instance, to pass the `role` property to all data provider methods for the `posts` resource:

```tsx
import { Refine } from "@refinedev/core";

const App: React.FC = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    // highlight-start
                    meta: {
                        role: "editor",
                    },
                    // highlight-end
                },
            ]}
        />
    );
};
```

### Passing `meta` with hook-specific properties

You can pass the `meta` property with hook-specific properties to data provider methods, which will override the global `meta` of the resource.

For example, you can pass the `headers` property to the `getOne` method by using the `meta` property in the `useOne` hook:

```tsx
    useOne({
        resource: "posts",
        id: 1,
        // highlight-start
        meta: {
            headers: { "x-meta-data": "true" },
        },
        // highlight-end
    });

    const myDataProvider = {
        ...
        getOne: async ({ resource, id, meta }) => {
            // highlight-next-line
            const headers = meta?.headers ?? {};
            const url = `${apiUrl}/${resource}/${id}`;

            //highlight-next-line
            const { data } = await httpClient.get(url, { headers });

            return {
                data,
            };
        },
        ...
    };
```

:::note
You can pass any property to handle your specific use cases with the same logic
:::

### Using URL query parameters as `meta` properties

Query parameters on the URL can also be used as `meta` properties for data provider methods, which is very useful when you want to customize them based on query parameters.

For example, if the URL is `https://example.com/posts?foo=bar`, the `foo` property will be passed to the data provider methods as a `meta` property.

```tsx
const dataProvider = {
    getList: async ({ resource, meta }) => {
        console.log(meta); // { foo: "bar" }
    },
    ...
};
```

:::info
The order of precedence for creating the `meta` is as follows: first, it is passed to the hook; second, it is defined in the URL query parameters; and third, it is defined in the `resources` prop of the `<Refine>` component.
:::

:::caution

The `meta` property defined in the `resources` prop of the `<Refine>` is passed to the data provider methods only via the following hooks and their derivatives:

-   [`useTable`](/docs/api-reference/core/hooks/useTable/)
-   [`useForm`](/docs/api-reference/core/hooks/useForm/)
-   [`useSelect`](/docs/api-reference/core/hooks/useSelect/)
-   [`useShow`](/docs/api-reference/core/hooks/show/useShow/)

:::

### Using `meta` to generate GraphQL queries

[Refer to the `GraphQL` guide&#8594](/docs/packages/documentation/data-providers/graphql/)

### Passing `meta` to your existing `dataProvider` methods

[Refer to the related section in FAQ&#8594](/faq.md#how-i-can-override-specific-function-of-data-providers)
