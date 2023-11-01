---
title: Routing
---

refine's approach to routing is all about flexibility and choice. It gives you the power to decide how you want to handle routing in your application. This means you're not locked into a specific router but can tailor your routing strategy to your project's needs.

While using a router integration is optional and you can still use refine without one, by integrating your router you'll be unlocking the following features in your application:

-   Inferring the `resource`, the `action` and the `id` from the current route without explicitly passing them to the hooks.
-   Syncing your table's pagination, sorting and filtering with the current route.
-   Using the query strings and parameters of the current route in your data fetching logic.
-   Navigating between pages/routes after a successful mutation or after a failed authentication.
-   Syncing your modals and drawers with the current route.
-   A set of utility components and hooks that let's you easily navigate between defined routes and pages.

## Routing Integrations

The pre-built router integrations of refine will cover for all the use-cases you'll need without having to worry about the implementation details.

All you need to do is to import the router integration of your choice and pass it to the `<Refine />` component within the `routerProvider` prop.

<Tabs>
<TabItem value="react-router-v6" label="React Router v6" default>

React Router integration works smoothly with refine without missing out any features of both refine and React Router.

[Check out React Router documentation for detailed information](router-integrations/react-router/index)

```tsx title="App.tsx"
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

</TabItem>
<TabItem value="next-js" label="Next.js">

Next.js integration works with both the App router and the Pages router. While using it with refine, you won't be missing out any features of both refine and Next.js such as **SSR** and ISR.

[Check out Next.js Router documentation for detailed information](router-integrations/next-js/index)

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

</TabItem>
<TabItem value="remix" label="Remix">

Remix integration works smoothly with refine without missing out any features of both refine and Remix.

[Check out Remix Router documentation for detailed information](router-integrations/remix/index)

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

</TabItem>
<TabItem value="expo-router" label="Expo Router (React Native)">

refine is able to work on React Native apps and with the help of the `@refinenative/expo-router` package, you can use refine's routing features on React Native as well.

[Check out Expo Router (Community Package) documentation for detailed information](https://www.npmjs.com/package/@refinenative/expo-router)

```tsx title="App.tsx"
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

</TabItem>
</Tabs>

## Relationship Between Resources and Routes <GuideBadge id="guides-concepts/general-concepts" />

One of the most practical features of refine is the ability to infer the `resource`, the `action` and the `id` from the current route. This is made possible by the relationship between the resources and the routes. Using this feature, you can easily use the current route's resource, action and id in your components and hooks without explicitly passing them down.

import ResourceAndRoutesUsage from "./resource-and-routes-usage";

<ResourceAndRoutesUsage />

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
