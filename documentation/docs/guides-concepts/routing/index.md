---
title: Routing
---

Routing is essential for any CRUD application. **refine**'s headless architecture allows you to use any router solution, without being locked into a specific router/framework.

**refine** also offers built-in router integrations for the most popular frameworks such as **React Router**, **Next.js** and **Remix**.

These integrations makes it easier to use **refine** with these frameworks and offers a lot of benefits such as:
- Automatic parameter detection in hooks/components.
- Generate menu items from your route definitions.
- Breadcrumbs.
- Automatic redirections after mutation or authentication.
- Passing query parameters to your data provider.
- Set of router agnostic utility components and hooks which can be used to navigate between pages/routes.

Since **refine** is router agnostic, you are responsible for creating your routes.

If you are using **React Router**, you'll be defining your routes under the `Routes` component.<br />
If you are using **Next.js**, you'll be defining your routes in the `pages` or `app` directory.<br />
If you are using **Remix**, you'll be defining your routes in the `app/routes` directory.

Once you created your routes, you can use one of our router integrations.


## Router Integrations

To integrate a router provider with **refine**, all you need to do is to import the router integration of your choice and pass it to the `<Refine />`'s `routerProvider` prop.

<Tabs>
<TabItem value="react-router-v6" label="React Router v6" default>

```tsx title="App.tsx"
import { BrowserRouter, Routes } from "react-router-dom";
// highlight-next-line
import routerProvider from "@refinedev/react-router-v6";

const App = () => (
    <BrowserRouter>
        // highlight-next-line
        <Refine routerProvider={routerProvider}>
            <Routes>
                {/* Your route definitions */}
            </Routes>
        </Refine>
    </BrowserRouter>
);
```

[Check out React Router documentation for detailed information](router-integrations/react-router/index)

</TabItem>
<TabItem value="next-js" label="Next.js">

```tsx title="pages/_app.tsx"
// highlight-next-line
import routerProvider from "@refinedev/nextjs-router";

export function MyApp({ Component, pageProps }) {
    return (
        <Refine
            // highlight-next-line
            routerProvider={routerProvider}
        >
            <Component {...pageProps} />
        </Refine>
    );
}
```

> While using this integration, you won't be missing out Next.js features such as **SSR** and **ISR**.


[Check out Next.js Router documentation for detailed information](router-integrations/next-js/index)

</TabItem>
<TabItem value="remix" label="Remix">

```tsx title="app/root.tsx"
// highlight-next-line
import routerProvider from "@refinedev/remix-router";

export default function App() {
    return (
        <html>
            <body>
                <Refine
                    // highlight-next-line
                    routerProvider={routerProvider}
                >
                    <Outlet />
                </Refine>
            </body>
        </html>
    );
}
```

> While using this integration, you won't be missing out Remix features such as **SSR** and **ISR**.

[Check out Remix Router documentation for detailed information](router-integrations/remix/index)

</TabItem>
<TabItem value="expo-router" label="Expo Router (React Native)">

```tsx title="App.tsx"
// highlight-next-line
import routerProvider from "@refinenative/expo-router";

const App = () => (
    <Refine
        // highlight-next-line
        routerProvider={routerProvider}
    >
        {/* ... */}
    </Refine>
);
```

refine is able to work on React Native apps and with the help of the community package `@refinenative/expo-router`, you can use refine's routing features on React Native as well.

[Check out Expo Router (Community Package) documentation for detailed information](https://www.npmjs.com/package/@refinenative/expo-router)

</TabItem>
</Tabs>

Once you passed router provider to `<Refine />` component, you can use all the features of refine in a same way, regardless of your application's framework/router.

As a next step, we'll add `products` resource to help **refine** understand the relationship between resources their routes.

## Relationship Between Resources and Routes <GuideBadge id="guides-concepts/general-concepts" />

One of the most practical features of refine is the ability to infer current `resource`, `action` and it's `id` from the **current route**.

This is made possible by the relationship between the resources and the routes. Using this feature, you can easily use the current route's resource, action and id in your components and hooks without explicitly passing them down to hooks.

import NextJSRouteDefinitions from './nextjs-route-definitions';

<NextJSRouteDefinitions />

As you can see in the example below, by providing **list** and **show** routes to the **products** resource, we can eliminate the need to pass **resource** and **id** props to the `useList` and `useShow` hooks.

```tsx
import { Refine, useList } from "@refinedev/core";

export const App = () => {
    <Refine resources={[
            {
                name: "products",
                // added-line
                list: "/my-products",
                // added-line
                show: "/my-products/:id",
            },
        ]}
    >
        {/* ... */}
    </Refine>
}

// http://localhost:5173/my-products
export const ProductList = () => {
    // removed-line
    const { data } = useList({ resource: "products" })
    // added-line
    const { data } = useList()
}

// http://localhost:5173/my-products/123
export const ProductShow = () => {
    // removed-line
    const { queryResult: { data } } = useShow({ resource: "products", id: "123" })
    // added-line
    const { queryResult: { data } } = useShow()
    // ...
}
```

import ResourceAndRoutesUsage from "./resource-and-routes-usage";

<ResourceAndRoutesUsage />

## Hook Integrations

### useTable

To enable automatic parameter detection feature, you need to pass `syncWithLocation` to `<Refine />` component's `options` prop.

```tsx
<Refine
    // ...
    options={{ syncWithLocation: true }}
>
    // ...
</Refine>
```

Once `syncWithLocation` is enabled, you can use `useTable` hook without passing any parameters as shown in the example below.

```tsx
const { ... } = useTable()
```

And then navigate the following route:

```
/products?current=1&pageSize=2&sorters[0][field]=id&sorters[0][order]=asc&filters[0][field]=category.id&filters[0][operator]=eq&filters[0][value]=1
```

You will see a list of products, already **filtered**, **sorted** and **paginated** automatically based on the query parameters of the **current route**.

```ts
const { tableQueryResult, current, pageSize, filters, sorters } = useTable()

console.log(tableQueryResult.data.data) // [{...}, {...}]
console.log(tableQueryResult.data.total) // 32 - total number of unpaginated records
console.log(current) // 1 - current page
console.log(pageSize) // 2 - page size
console.log(filters) // [{ field: "category.id", operator: "eq", value: "1" }]
console.log(sorters) // [{ field: "id", order: "asc" }]
```

Also, `setFilters`, `setSorters`, `setCurrent`, and `setPageSize` can be used to modify these parameters.

```ts
const { current, setCurrent } = useTable()

<button onClick={() => { setCurrent(current + 1) }}>Next Page</button>
```

Clicking the button will **update the current route** and **fetch the next page** of the table automatically.

import UseTableUsage from "./use-table-usage";

<UseTableUsage />

#### Next.JS

If you want to fetch products on the server-side with NextJS, you will need to modify your `pages/products/index.tsx` page.


- Export a function caleld `getServerSideProps`.
- Import **parseTableParams** from **@refinedev/nextjs-router** to parse the query parameters of the current route and pass them to the **dataProvider**'s **getList** method.
- Return the data as `props.initialData` to your client side component.
- Pass `props.initialData` to the `useTable` hook's `queryOptions.initialData` prop.

```tsx title="pages/products.index.tsx"
import { useTable } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
// highlight-next-line
import { parseTableParams } from "@refinedev/nextjs-router";

import { API_URL } from "src/constants";

export const getServerSideProps = async (context) => {
    const { pagination, filters, sorters } = parseTableParams(
        context.resolvedUrl?.split("?")[1] ?? "",
    );

    const data = await dataProvider(API_URL).getList({
        resource: "products",
        filters,
        pagination,
        sorters,
    });

    return {
        // highlight-next-line
        props: { initialData: data },
    };
};

const ProductList = (props) => {
    // highlight-next-line
    const { initialData } = props

    const result = useTable({
        // highlight-next-line
        queryOptions: { initialData }
    });

    const { tableQueryResult, current, pageSize, filters, sorters } = result;

    console.log(tableQueryResult.data.data) // [{...}, {...}]
    console.log(tableQueryResult.data.total) // 32 - total number of unpaginated records
    console.log(current) // 1 - current page
    console.log(pageSize) // 2 - page size
    console.log(filters) // [{ field: "category.id", operator: "eq", value: "1" }]
    console.log(sorters) // [{ field: "id", order: "asc" }]

    return (
        // ...
    )
}


```

#### Remix

TBA...

## The `routerProvider` Interface

A router integration of refine consists of a set of basic implementations for:

-   Ability to navigate between pages/routes
-   An interface to interact with the parameters and query strings of the current route
-   An utility to navigate back in the history
-   A simple component to use for anchor tags

These implementations will be provided via `routerProvider` which expects an object with the following methods:

-   `go`: A function that accepts an object and returns a function that handles the navigation.
-   `back`: A function that returns a function that handles the navigation back in the history.
-   `parse`: A function that returns a function that parses the current route and returns an object.
-   `Link`: A React component that accepts a `to` prop and renders a component that handles the navigation to the given `to` prop.

While all these methods are optional, if you're working on creating a custom router integration, you'll be able to incrementally add more features and adopt more of refine's features by implementing more of these methods.

To learn more about the `routerProvider` interface, check out the [`Router Provider` section of the Core API Reference](/docs/core/providers/router-provider/index).
