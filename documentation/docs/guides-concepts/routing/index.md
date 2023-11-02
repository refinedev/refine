---
title: Routing
---

refine's approach to routing is all about flexibility and adaptability. It gives you freedom to decide how you want to handle routing in your application. This means you are not locked into a specific router, so you can decide your routing strategy based on your project's needs, not **refine**'s.

**refine**'s headless architecture allow it's **core** to be completely detached from your routing logic and doesn't interfere with the way you are defining or handling routes in your application.

This means you are responsible for creating your routes as you would normally do.

If you are using **React Router**, you'll be defining your routes under the `Routes` component.<br />
If you are using **Next.js**, you'll be defining your routes in the `pages` directory.<br />
If you are using **Remix**, you'll be defining your routes in the `app/routes` directory.

After defining your routes and creating your page components, the next step involves integrating **refine** with your application's routing strategy through a router integration.

While it's entirely optional to use a router integration, it will significantly simplify using **refine**'s features such as hooks, components, providers and utilities.

<!-- Automatic parameter detection, redirections, utilities bla bla. We need to mention high level benefits, without going technical details. We'll explain technically in the next sections. -->

<!-- While using a router integration is optional, there are a lot of benefits of using one. Some of these benefits are: -->

<!-- -   Inferring the `resource`, the `action` and the `id` from the current route without explicitly passing them to the hooks.
-   Your table's pagination, sorting and filtering parameters can be populated from the current route's query parameters.
-   Using the query strings and parameters of the current route in your data fetching logic.
-   Navigating between pages/routes after a successful mutation or after a failed authentication.
-   Syncing your modals and drawers with the current route.
-   A set of utility components and hooks that let's you easily navigate between defined routes and pages. -->

## Routing Integrations

**refine** offers built-in router integrations for the most popular frameworks such as **React Router**, **Next.js** and **Remix**.

These pre-built router integrations of refine will cover for all the use-cases you'll need without having to worry about the implementation details.

All you need to do is to import the router integration of your choice and pass it to the `<Refine />` component within the `routerProvider` prop.

<Tabs>
<TabItem value="react-router-v6" label="React Router v6" default>

```tsx title="App.tsx"
// highlight-next-line
import routerProvider from "@refinedev/react-router-v6";

const App = () => (
    <Refine
        // highlight-next-line
        routerProvider={routerProvider}
    >
        {/* ... */}
    </Refine>
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

As you can see in the examples above, the only difference between the router integrations is the import path of the router provider and where you define `<Refine />` component.

Once you passed router provider to `<Refine />` component, you can use all the features of refine in a same way, regardless of your application's framework/router.

As a next step, we'll add `products` resource to help **refine** understand the relationship between resources their routes.

## Relationship Between Resources and Routes <GuideBadge id="guides-concepts/general-concepts" />

One of the most practical features of refine is the ability to infer current `resource`, `action` and it's `id` from the **current route**.

This is made possible by the relationship between the resources and the routes. Using this feature, you can easily use the current route's resource, action and id in your components and hooks without explicitly passing them down to hooks.

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

TODO: We can use this paragraph:

You can use fields like, tableQueryResult, current, pageSize, filters and sorters to present the data in your UI.

OR SOMETHING LIKE

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
