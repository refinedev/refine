---
id: router-provider
title: Router Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** needs some router functions to create resource pages, navigate, etc. This provider allows you to use the router library you want.

A router provider must include following methods:

```tsx
const routerProvider = {
    useHistory: () => {
        push: (...args) => any,
        replace: (...args) => any,
        goBach: (...args) => any,
    },
    useLocation: () => {
        pathname: string,
        search: string,
    },
    useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params,
    Prompt: React.FC<PromptProps*>,
    Link: React.FC<any>,
    RouterComponent?: React.FC<any>,
};
```

> `*`: Too see &#8594 [`<PromptProps>`](/api-references/interfaces.md#promptprops)

:::info

**refine** includes many out-of-the-box router providers to use in your projects like

-   [react-router][react-router]
-   [nextjs-router][nextjs-router]

:::

:::tip

We do not recommend creating this provider unless you do not need any customization on the router. Instead, you can use [nextjs-router][nextjs-router] for your [Next.js](https://nextjs.org/) app and [react-router][react-router] for your [react](https://en.reactjs.org/) app.

:::

## Usage

To activate router provider in **refine**, we have to pass the `routerProvider` to the `<Refine />` component.

<Tabs
defaultValue="react"
values={[
{label: 'react-router', value: 'react'},
{label: 'nextjs-router', value: 'nextjs'}
]}>
<TabItem value="react">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

  </TabItem>
    <TabItem value="nextjs">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-nextjs-router";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

  </TabItem>
</Tabs>

## Creating a router provider

The `routerProvider` methods **refine** expects are exactly the same as [react-router-dom](https://reactrouter.com/web) methods.

To understand how to create a `routerProvider`, let's examine how the [react-router][react-router] and [nextjs-router][nextjs-router] libraries provided by **refine** create a `routerProvider`.

### `useHistory`

**refine** uses `push`, `replace`, and `goBack` functions of `useHistory` for navigation.

<Tabs
defaultValue="react-useHistory"
values={[
{label: 'react-router', value: 'react-useHistory'},
{label: 'nextjs-router', value: 'nextjs-useHistory'}
]}>
<TabItem value="react-useHistory">

```ts title="routerProvider.ts" {1,5}
import { IRouterProvider } from "@pankod/refine";
import { useHistory } from "react-router-dom";

const routerProvider: IRouterProvider = {
    ...
    useHistory,
    ...
};
```

  </TabItem>
    <TabItem value="nextjs-useHistory">

```ts title="routerProvider.ts" {1,5-13}
import { IRouterProvider } from "@pankod/refine";
import { useRouter } from "next/router";

const routerProvider: IRouterProvider = {
    ...
    useHistory: () => {
        const router = useRouter();
        const { push, replace, back } = router;
        return {
            push,
            replace,
            goBack: back,
        };
    },
    ...
};
```

  </TabItem>
</Tabs>

### `useLocation`

**refine** uses the `pathname` to find the location of the user and `search` to find the query string.

<Tabs
defaultValue="react-useLocation"
values={[
{label: 'react-router', value: 'react-useLocation'},
{label: 'nextjs-router', value: 'nextjs-useLocation'}
]}>
<TabItem value="react-useLocation">

```ts title="routerProvider.ts" {1,5}
import { IRouterProvider } from "@pankod/refine";
import { useLocation } from "react-router-dom";

const routerProvider: IRouterProvider = {
    ...
    useLocation,
    ...
};
```

  </TabItem>
    <TabItem value="nextjs-useLocation">

```ts title="routerProvider.ts" {1-2,6-16}
import { IRouterProvider } from "@pankod/refine";
import { useRouter } from "next/router";
import qs from "qs";

const routerProvider: IRouterProvider = {
    ...
    useLocation: () => {
        const router = useRouter();
        const { pathname, query } = router;

        const queryParams = qs.stringify(query);

        return {
            pathname,
            search: queryParams && `?${queryParams}`,
        };
    },
    ...
};
```

  </TabItem>
</Tabs>

### `useParams`

**refine** uses `useParams` to use action name, record id, etc. found in the route.

<Tabs
defaultValue="react-useParams"
values={[
{label: 'react-router', value: 'react-useParams'},
{label: 'nextjs-router', value: 'nextjs-useParams'}
]}>
<TabItem value="react-useParams">

```ts title="routerProvider.ts" {1,5}
import { IRouterProvider } from "@pankod/refine";
import { useParams } from "react-router-dom";

const routerProvider: IRouterProvider = {
    ...
    useParams,
    ...
};
```

  </TabItem>
    <TabItem value="nextjs-useParams">

```ts title="routerProvider.ts" {1,5-10}
import { IRouterProvider } from "@pankod/refine";
import { useRouter } from "next/router";

const routerProvider: IRouterProvider = {
    ...
    useParams: <Params>() => {
        const router = useRouter();

        const { query } = router;
        return query as unknown as Params;
    },
    ...
};
```

  </TabItem>
</Tabs>

### `Prompt`

**refine** uses `<Prompt>` to display the alert when [warnWhenUnsavedChanges](/api-references/components/refine-config.md#warnwhenunsavedchanges) is `true`.

<Tabs
defaultValue="react-prompt"
values={[
{label: 'react-router', value: 'react-prompt'},
{label: 'nextjs-router', value: 'nextjs-prompt'}
]}>
<TabItem value="react-prompt">

```ts title="routerProvider.ts" {1,5}
import { IRouterProvider } from "@pankod/refine";
import { Prompt } from "react-router-dom";

const routerProvider: IRouterProvider = {
    ...
    Prompt: Prompt as any,
    ...
};
```

  </TabItem>
    <TabItem value="nextjs-prompt">

```tsx title="Prompt.tsx"
import { useRouter } from "next/router";
import { useEffect } from "react";

import type { PromptProps } from "@pankod/refine";

export const Prompt: React.FC<PromptProps> = ({
    message,
    when,
    setWarnWhen,
}) => {
    const router = useRouter();

    useEffect(() => {
        const routeChangeStart = () => {
            if (when) {
                const allowTransition = window.confirm(message);
                if (allowTransition) {
                    setWarnWhen?.(false);
                } else {
                    router.events.emit("routeChangeError");
                    throw "Abort route change due to unsaved changes prompt. Ignore this error.";
                }
            }
        };
        router.events.on("routeChangeStart", routeChangeStart);

        return () => router.events.off("routeChangeStart", routeChangeStart);
    }, [when]);
    return null;
};
```

```ts title="routerProvider.ts" {2, 6}
import { IRouterProvider } from "@pankod/refine";

import { Prompt } from "./prompt";

const routerProvider: IRouterProvider = {
    ...
    Prompt,
    ...
};
```

  </TabItem>
</Tabs>

### `Link`

**refine** uses `<Link>` for navigation.

<Tabs
defaultValue="react-link"
values={[
{label: 'react-router', value: 'react-link'},
{label: 'nextjs-router', value: 'nextjs-link'}
]}>
<TabItem value="react-link">

```ts title="routerProvider.ts" {1,5}
import { IRouterProvider } from "@pankod/refine";
import { Link } from "react-router-dom";

const routerProvider: IRouterProvider = {
    ...
    Link,
    ...
};
```

  </TabItem>
    <TabItem value="nextjs-link">

```ts title="routerProvider.ts" {1,5}
import { IRouterProvider } from "@pankod/refine";
import { Link } from "next/link";

const routerProvider: IRouterProvider = {
    ...
    Link,
    ...
};
```

  </TabItem>
</Tabs>

### `RouterComponent`

It creates the navigation routes of the **refine** app and determines how the components will be rendered on which paths.

In general, we can list what it does as follows:

-   It creates create, edit, list, show pages with paths according to the resources' own name.
-   Allows rendering of custom `routes` passed to `<Refine>` as props.
-   Different routers render when the user is authenticated and not.

:::info
`RouteComponent` is required for **refine** React apps but not required for Nextjs apps.

Since Nextjs has a folder base route structure, it is used by importing the `RouteComponent` into the created page.
:::

<br />

&#8594 [Refer to the react-router's `<RouteComponent>` for detailed usage information.][routecomponent]  
&#8594 [Refer to the nextjs-router's `<NextRouteComponent>` for detailed usage information.](https://github.com/pankod/refine/blob/alpha/packages/nextjs-router/src/nextRouteComponent.tsx)

## Serving the application from a subdirectory

<Tabs
defaultValue="react-subdirectory"
values={[
{label: 'React', value: 'react-subdirectory'},
{label: 'Nextjs', value: 'nextjs-subdirectory'}
]}>
<TabItem value="react-subdirectory">

If you want to serve from a subdirectory in your **refine** react app. You can use `basename` property of [`<BrowserRouter>`][browserrouter].

The [`<RouteComponent>`][routecomponent] in the [react-router][react-router] package passes all its properties to the [`<BrowserRouter>`][browserrouter] component. Therefore, a `<BrowserRouter>` property that we will give to the `<RouteComponent>` is passed to the `<BrowserRouter>` that wraps our application.

In the example below you can see how to serve the application in a subdirectory.

```tsx {1,9,11,16-19} title="src/App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const { RouterComponent } = routerProvider;

const CustomRouterComponent = () => <RouterComponent basename="/admin" />;

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                RouterComponent: CustomRouterComponent,
            }}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
        />
    );
};

export default App;
```

Now you can access our application at `www.domain.com/admin`.

  </TabItem>
    <TabItem value="nextjs-subdirectory">

To serve your application from a subdirectory in your **refine** Nextjs application, simply add `basePath` to your `next.config.js` file.

```ts
module.exports = {
    basePath: "/admin",
};
```

[Refer to the `Nextjs` documentation for detailed usage information. &#8594](https://nextjs.org/docs/api-reference/next.config.js/basepath)

Now you can access our application at `www.domain.com/admin`.

  </TabItem>
</Tabs>

[browserrouter]: https://reactrouter.com/web/api/BrowserRouter
[routecomponent]: https://github.com/pankod/refine/blob/alpha/packages/react-router/src/routerComponent.tsx
[react-router]: https://github.com/pankod/refine/tree/alpha/packages/react-router
[nextjs-router]: https://github.com/pankod/refine/tree/alpha/packages/nextjs-router
