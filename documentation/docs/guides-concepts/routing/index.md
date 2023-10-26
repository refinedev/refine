---
title: Routing
---

refine's approach to routing is all about flexibility and choice. It gives you the power to decide how you want to handle routing in your application, whether it's with a built-in supported library or a custom solution. This means you're not locked into a specific router but can tailor your routing strategy to your project's needs.

## Routing Features and Abilities

refine's routing is not restrictive but rather flexible and customizable. A router integration of refine consists of a set of basic implementations for;

-   Ability to navigate between pages/routes
-   An interface to interact with the parameters and query strings of the current route
-   An utility to navigate back in the history
-   A simple component to use for anchor tags

By providing such methods, you'll be unlocking the following features and abilities in your application:

-   Inferring the `resource`, the `action` and the `id` from the current route without explicitly passing them to the hooks.
-   Syncing your table's pagination, sorting and filtering with the current route.
-   Using the query strings and parameters of the current route in your data fetching logic.
-   Navigating between pages/routes after a successful mutation or after a failed authentication.
-   Syncing your modals and drawers with the current route.
-   A set of utility components and hooks that let's you easily navigate between defined routes and pages.

All these features are provided without interfering with the router's way of working. This means that you can still use the router's API and take advantage of all the features it provides.

## Routing Integrations

While all you need to integrate with a router is to implement the basic methods mentioned above, refine provides a set of integrations for the most popular routers of the React ecosystem. These integrations are carefully implemented to avoid leaving any gaps between the router and refine and still provide all the features and abilities of both refine and the router itself.

-   [React Router v6 with `@refinedev/react-router-v6`](router-integrations/react-router/index)
-   [Next.js (Both `/app` and `/pages` router) with `@refinedev/nextjs-router`](router-integrations/next-js/index)
-   [Remix with `@refinedev/remix`](router-integrations/remix/index)
-   [Expo Router with `@refinenative/expo-router` (A Community Package)](https://www.npmjs.com/package/@refinenative/expo-router)

## Usage

All you need to do when using a router integration is to import the `routerProvider` from the integration package and pass it to the `<Refine>` component within the `routerProvider` prop.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
// highlight-next-line
import routerProvider from "@refinedev/react-router-v6";
// Or other router integration of your choice

const App = () => (
    <Refine
        // ...
        // highlight-next-line
        routerProvider={routerProvider}
    >
        {/* ... */}
    </Refine>
);
```

## Relationship Between Resources and Routes <GuideBadge id="guides-concepts/general-concepts" />

One of the most practical features of refine is the ability to infer the `resource`, the `action` and the `id` from the current route. This is made possible by the relationship between the resources and the routes. Using this feature, you can easily use the current route's resource, action and id in your components and hooks without explicitly passing them down.

import ResourceAndRoutesUsage from "./resource-and-routes-usage";

<ResourceAndRoutesUsage />

## Framework Features and SSR

refine's routing is framework agnostic and works with any framework that supports React. This means that you can use refine with any framework of your choice, whether it's Next.js, Remix, React Router or any other framework.

This agnostic approach also means that refine's routing works with the features of the framework you're using, such as server-side rendering and lazy loading of routes, out of the box.

## The `routerProvider` Interface

refine's `routerProvider` expects an object with the following methods:

-   `go`: A function that accepts an object and returns a function that handles the navigation.
-   `back`: A function that returns a function that handles the navigation back in the history.
-   `parse`: A function that returns a function that parses the current route and returns an object.
-   `Link`: A React component that accepts a `to` prop and renders a component that handles the navigation to the given `to` prop.

While all these methods are optional, if you're working on creating a custom router integration, you'll be able to incrementally add more features and adopt more of refine's features by implementing more of these methods.

To learn more about the `routerProvider` interface, check out the [`Router Provider` section of the Core API Reference](/docs/core/providers/router-provider/index).

// TODO: This can be replaced with a link to the `routerProvider` reference page.

```tsx title="src/router-provider.tsx"
export const myRouterProvider = {
    /**
     * `go` expects a function in return that accepts an object.
     * The object contains the parameters that are needed for the navigation.
     * This function will return void if the type is `push` or `replace`.
     * If the type is `path`, it will return the path that is generated.
     **/
    go: () => {
        return ({
            to,
            query,
            hash,
            options: { keepQuery, keepHash },
            type,
        }) => { /* ... */ }
    },
    /**
     * `back` expects a function in return that when called, will navigate back in the history.
     **/
    back: () => {
        return () => { /* ... */ }
    },
    /**
     * `parse` expects a function in return that when called, will parse the current route and return an object.
     **/
    parse: () => {
        return () => {
            // ...
            return {
                // A set of defined params and additional ones will be placed in `params`
                params: { filters, sorters, current, pageSize, ... },
                // If can be inferred, the resource, action and id will be placed in `resource`, `action` and `id`
                resource: "posts",
                action: "edit",
                id: "123",
                // The current path will be placed in `pathname`
                pathname: "/posts/edit/123",
            }
        }
    },
    /**
     * `Link` is expected to be a React component that accepts a `to` prop.
     * It is expected to render a component that handles the navigation to the given `to` prop.
     **/
    Link: ({ to, ...rest }) => {
            // your implementation
        }
    },
}
```
