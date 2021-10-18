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

-   [react-router](https://github.com/pankod/refine/tree/alpha/packages/react-router)
-   [nextjs-router](https://github.com/pankod/refine/tree/alpha/packages/nextjs-router)

:::

:::tip

We do not recommend creating this provider unless you do not need any customization on the router. Instead, you can use [nextjs-router](https://github.com/pankod/refine/tree/alpha/packages/nextjs-router) for your [Next.js](https://nextjs.org/) app and [react-router](https://github.com/pankod/refine/tree/alpha/packages/react-router) for your [react](https://en.reactjs.org/) app.

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

To understand how to create a `routerProvider`, let's examine how the [react-router](https://github.com/pankod/refine/tree/alpha/packages/react-router) and [nextjs-router](https://github.com/pankod/refine/tree/alpha/packages/nextjs-router) libraries provided by **refine** create a `routerProvider`.

### `useHistory`

**refine** uses `push`, `replace`, and `goBack` functions of `useHistory` for navigation.

<Tabs
defaultValue="react-useHistory"
values={[
{label: 'react-router', value: 'react-useHistory'},
{label: 'nextjs-router', value: 'nextjs-useHistory'}
]}>
<TabItem value="react-useHistory">

```ts title="dataProvider.ts" {1,5}
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

```ts title="dataProvider.ts" {1,5-13}
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

```ts title="dataProvider.ts" {1,5}
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

```ts title="dataProvider.ts" {1-2,6-16}
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
