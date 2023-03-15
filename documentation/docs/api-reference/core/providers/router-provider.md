---
id: router-provider
title: Router Provider
sidebar_label: Router Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** provides a simple interface from the `routerProvider` prop to infer the resource from route, pass, parse and sync the query parameters and handle navigation operations. This provider and its properties are optional but it is recommended to use it to get the most out of **refine**. Rather than restricting and limiting our users to specific routing libraries or practices, we have designed the `routerProvider` interface to communicate with the router libraries rather than managing them.

A router provider may contain the following methods:

```tsx
const routerProvider: {
    go?: () => ({
        to?: string;
        query?: Record<string, unknown>;
        hash?: string;
        options?: {
            keepQuery?: boolean;
            keepHash?: boolean;
        };
        type?: "push" | "replace" | "path";
    }) => void | string;
    back?: () => () => void;
    parse?: () => () => {
        resource?: IResourceItem;
        id?: BaseKey;
        action?: Action;
        pathname?: string;
        params?: {
            filters?: CrudFilters;
            sorters?: CrudSorting;
            current?: number;
            pageSize?: number;
            [key: string]: any;
        }
    };
    Link?: React.ComponentType<{ to: string; children?: React.ReactNode; }>;
};
```

:::info

**refine** includes many out-of-the-box router providers to use in your projects like

-   [React Router V6][react-router-v6]
-   [Next.js Router][nextjs-router]
-   [Remix Router][remix-router]
-   [React Router V5][react-router-v5] (Only available for `legacyRouterProvider`)

:::

:::tip

You can also create your own router provider or easily customize the existing ones to suit your needs. The existing implementations are pretty simple and straightforward. Do not hesitate to check the source code of the existing router providers when creating your own.

:::

## Usage

To activate router provider in **refine**, we have to pass the `routerProvider` to the `<Refine />` component.

<Tabs
defaultValue="react-router-v6"
values={[
{label: 'React Router V6', value: 'react-router-v6'},
{label: 'Next.js Router', value: 'nextjs'},
{label: 'Remix Router', value: 'remix'},
{label: 'React Router V5 (Legacy)', value: 'react-router'},
{label: 'React Location (Legacy)', value: 'react-location'}
]}>
<TabItem value="react-router-v6">

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";

import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                // highlight-next-line
                routerProvider={routerProvider}
                /* ... */
            >
                {/* ... */}
            </Refine>
        </BrowserRouter>
    );
};
```

</TabItem>
<TabItem value="react-router">

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@pankod/refine-react-router";

const App: React.FC = () => {
    return <Refine legacyRouterProvider={routerProvider} />;
};
```

</TabItem>
<TabItem value="react-location">

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@pankod/refine-react-location";

const App: React.FC = () => {
    return <Refine legacyRouterProvider={routerProvider} />;
};
```

</TabItem>
<TabItem value="nextjs">

```tsx title="pages/_app.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine routerProvider={routerProvider}>
            <Component {...pageProps} />
        </Refine>
    );
}
```

  </TabItem>
<TabItem value="remix">

```tsx title="app/root.tsx"
import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/remix-router";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix + Refine App",
    viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Refine routerProvider={routerProvider}>
                    <Outlet />
                </Refine>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
```

</TabItem>
</Tabs>

## Creating a router provider

The `routerProvider`methods are designed to be as simple as possible and to be compatible with any router library. **refine** also exports some helper functions to make it easier to create a customized `routerProvider` for your needs.

### `go`

The `go` method is used to navigate to a specific page. It accepts a `to` parameter which is the path of the page to navigate to. It also accepts `query`, `hash`, and `options` parameters to customize the navigation. The `type` parameter is used to specify the type of navigation. It can be `push`, `replace`, or `path`.

The `path` type returns the path to navigate, which can be used in links or redirects. The `push` and `replace` types navigate to the path.

`to` parameter is `undefined`. In this case, we expect `go` function to use the current path and add the `query` and `hash` parameters to it.

`query` is passed as an object to let the router library handle the query string. In our implementations, we use `qs` library to stringify the query object which supports nested objects. The `query` is also parsed in the `parse` method of the `routerProvider`, this allows us to implement custom ways of stringifying and parsing the queries.

### `back`

The `back` method is used to navigate back to the previous page. It has no parameters and has no return value.

### `parse`

The `parse` method is used to parse the current path and return the current `resource`, `id` and `action` of the page as well as the `pathname` and the `params` of the page.

`params` is an object that contains both the URL parameters and the query parameters. We use `qs` library to parse the query string and return the query parameters as an object. But you can use any other library or implement your own way of parsing the query string.

`resource` is the name of the resource that is used in the current page and also defined in the `resources` prop of the `<Refine />` component. This can be `undefined` if there's no matching resource route.

Matching the resource route can be done with the help of the `matchResourceFromRoute` function from the `@refinedev/core` package.

`id` is the id of the record that is used in the current page. This can be `undefined` if there's no matching parameter.

`action` is the name of the action that is used in the current page. This can be `undefined` if there's no matching route for a resource action.

### `Link`

The `Link` component is used to create links to other pages. It accepts a `to` parameter which is the path of the page to navigate to. It's meant to be used internally in UI packages and other parts of **refine** to complement the router library. It's not meant to be used directly in the application.

### Source Code for the Existing Router Providers

- [React Router V6](https://github.com/refinedev/refine/blob/next/packages/react-router-v6/src/bindings.tsx)
- [Next.js Router](https://github.com/refinedev/refine/blob/next/packages/nextjs-router/src/pages/bindings.tsx)
- [Remix Router](https://github.com/refinedev/refine/blob/next/packages/remix/src/bindings.tsx)

## Legacy Router Provider

**refine**'s v4 release is backward compatible and supports the legacy router provider implementations until v5. The legacy router provider implementations are still available at `/legacy` paths in the router provider packages. For example, the legacy router provider implementation for React Router V6 is available at `@refinedev/react-router-v6/legacy`.

If you want to use a legacy router provider, you can pass them to the `<Refine />` component using the `legacyRouterProvider` prop.

[react-router-v5]: https://github.com/refinedev/refine/tree/master/packages/react-router
[react-router-v6]: https://github.com/refinedev/refine/tree/master/packages/react-router-v6
[nextjs-router]: https://github.com/refinedev/refine/tree/master/packages/nextjs-router
[remix-router]: https://github.com/refinedev/refine/tree/master/packages/remix
