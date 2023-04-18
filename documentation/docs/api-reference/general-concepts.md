---
id: general-concepts
title: General Concepts
---

-   **refine** core is fully independent of UI. So you can use core components and hooks without any UI dependency.
-   All the **data** related hooks([`useTable`](/docs/api-reference/core/hooks/useTable/), [`useForm`](/api-reference/core/hooks/useForm.md), [`useList`](/docs/api-reference/core/hooks/data/useList) etc.) of **refine** can be given some common properties like `resource`, `meta`, `queryOptions` etc.

## `resource`

**refine** passes the `resource` to the `dataProvider` as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your `dataProvider`. See the [`creating a data provider`](/docs/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how `resource` are handled.

How does refine know what the resource value is?

1- The resource value is determined from the active route where the component or the hook is used.

:::info
To make the inference work, you need to pass the `routerProvider` prop to the `<Refine>` component from your router package choice.
:::

Like below, if you are using the hook in the `<PostList>` component, the `resource` value defaults to `"posts"`. Because the active route is `/posts` and its also defined in the `resources` prop.

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerBindings from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route } from "react-router-dom";

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

2- The resource value is determined from the `resource` prop of the hook.

You can override the default `resource` value hook by passing the `resource` prop to the hook like below:

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

The value you pass to the `resource` property is also used to determine the active `resource` from the `resources` array. Defining the resource in the `resources` array is **not** required for your API interactions to work but it will enable features of **refine** such as redirecting to the list page after a successful create or update operation.

:::

How can I request an API with nested route?

<br/>

[Refer to how to use resource with nested routes documentation for more information. &#8594](/faq.md#how-can-i-request-an-api-with-nested-route)

## `meta`

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

-   Customizing the data provider methods for specific use cases.
-   Generating GraphQL queries using plain JavaScript Objects (JSON).
-   Filling additional parameters in target routes when occurs redirection.

### Pass global `meta` specific to a resource

You can define a global `meta` specific to a resource, which will be passed to all the data provider methods whenever the resource is matched.

For instance, to pass the `role` property to all data provider methods for the `posts` resource, use the following code:

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

### Pass `meta` with hook-specific properties

You can pass the `meta` property with hook-specific properties to data provider methods, which will override the global `meta` of the resource.

For example, you can pass the `headers` property to the `getOne` method by using the `meta` property in the `useOne` hook, as shown below:

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

By using this logic, you can pass any property to handle your specific use cases.

### Use URL query parameters as `meta` properties

Query parameters on the URL can also be used as `meta` properties for data provider methods.

For example, if the URL is `https://example.com/posts?foo=bar`, the `foo` property will be passed to the data provider methods as a `meta` property.

```tsx
const dataProvider = {
    getList: async ({ resource, meta }) => {
        console.log(meta); // { foo: "bar" }
    },
    ...
};
```

This can be useful when you want to customize the behavior of data provider methods based on query parameters passed in the URL.

<br />

:::info

The `meta` is created in the following order of precedence:

1.  Passed to the hook.
2.  Defined in the URL query parameters.
3.  Defined in the `resources` prop of the `<Refine>`.

:::

:::caution

The `meta` property defined in the `resources` prop of the `<Refine>` is only passed to the data provider methods via the following hooks and their derivatives:

-   [`useTable`](/docs/api-reference/core/hooks/useTable/)
-   [`useForm`](/docs/api-reference/core/hooks/useForm/)
-   [`useSelect`](/docs/api-reference/core/hooks/useSelect/)
-   [`useShow`](/docs/api-reference/core/hooks/show/useShow/)

:::

### Use `meta` to generate GraphQL queries

[Refer to the `GraphQL` guide to learn how to use `meta` to create GraphQL queries &#8594](/docs/packages/documentation/data-providers/graphql/)

### How to pass `meta` to your existing `dataProvider` methods

[Refer to the how to pass `meta` to your existing `dataProvider` methods &#8594](/faq.md#how-i-can-override-specific-function-of-data-providers)
