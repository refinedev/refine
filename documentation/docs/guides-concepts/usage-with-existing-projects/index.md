---
title: Usage with Existing Projects
---

Integrating Refine into an existing project is as simple as installing `@refinedev/core` package and importing `Refine` component into your application.

Once imported, `Refine` component provides necessary context to all children components for **Refine** hooks and components to work.

Only required prop for `Refine` component is `dataProvider`. You can read more about data provider [here](/docs/data/data-provider).

## Quickstart

Only needed package for Refine to work is `@refinedev/core`. For demonstration purposes, we will also install `@refinedev/simple-rest` package to use as data provider. You can use one of our data providers or create your own.

<InstallPackagesCommand args="@refinedev/core @refinedev/simple-rest" />

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

function App() {
  return (
    <ExistingProvider>
      <Refine dataProvider={dataProvider(API_URL)}>
        {/* You can use Refine hooks inside here */}
        <ComponentWithRefineHooks />
        <ExistingComponent1>
      </Refine>
    </ExistingProvider>
  );
}
```

## Headless Examples

The following example shows how to use Refine's `useShow` hook with an existing application.

<Tabs wrapContent={false}>

<TabItem value="vite" label="Vite">

import { ViteHeadless } from './vite/headless';

As you can see in the example below, wrapping `App.tsx` file with `Refine` component is enough to use Refine hooks inside your application.

<ViteHeadless />

</TabItem>

<TabItem value="nextjs-app" label="Next.js App">

import { NextJSAppHeadless } from './nextjs/app/headless'

As you can see in the example below, wrapping `layout.tsx` file with `Refine` component is enough to use Refine hooks & components inside your application.

<NextJSAppHeadless />

</TabItem>

<TabItem value="nextjs-pages" label="Next.js Pages">

import { NextJSPagesHeadless } from './nextjs/pages/headless'

As you can see in the example below, wrapping `_app.tsx` file with `Refine` component is enough to use Refine hooks & components inside your application.

<NextJSPagesHeadless />

</TabItem>

</Tabs>

## UI & Routing Integration Example

In the following examples below, we will integrate Refine into `/refine` route of an existing application.

<Tabs wrapContent={false} defaultValue="vite">

<TabItem value="vite" label="Vite">

import { ViteAntdLayout } from './vite/layout/antd';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/react-router-v6 @refinedev/antd @refinedev/simple-rest" />

:::simple

- We start by creating `RefineContext` component in `refine/refine-context.tsx` file.
  This file will be used to wrap `/refine` routes of our application.

- And then in `App.tsx` file, we are adding a new `Route` component with `path="/refine"` and wrapping it with `RefineContext` component.

- Finally, we create `refine/pages/products/list.tsx` file, here we can use Refine features, since it's layout is wrapped with `Refine` component.

:::

<ViteAntdLayout />

</TabItem>

<TabItem value="nextjs-app" label="Next.js App">

import { NextJSAppAntdLayout } from './nextjs/app/layout/antd';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/nextjs-router @refinedev/antd @refinedev/simple-rest" />

:::simple

- We start by creating `app/refine/layout.tsx` file, this layout will be used by all pages under `/refine` folder.
- Then we create `app/refine/products/page.tsx` file, here we can use Refine features, since it's layout is wrapped with `Refine` component.

:::

<NextJSAppAntdLayout />

</TabItem>

<TabItem value="nextjs-pages" label="Next.js Pages">

import { NextJSPagesAntdLayout } from './nextjs/pages/layout/antd';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/nextjs-router @refinedev/antd @refinedev/simple-rest" />

:::simple

- We start by creating `src/components/layout.tsx` file, this component will be conditionally rendered by `pages/_app.tsx` file.
- Then we create `pages/_app.tsx` file, here we are checking if the current file has `getLayout` function, if it does, we are rendering it by wrapping it with `getLayout` function.
- Then we create `pages/refine/products.tsx` file, here we are adding `Page.getLayout` to our component, so it will be wrapped with `Refine` context. Then we can use Refine features, since it's layout is wrapped with `Refine` component.

:::

<NextJSPagesAntdLayout />

</TabItem>

</Tabs>

## Authentication

If want to use Refine with your existing application, probably you already have authentication in-place. In this case, in order to enable Authentication features of `Refine`, only thing you need to do is to implement `AuthProvider`'s [check](/docs/authentication/auth-provider/#check) method.

Once you provide the `check` method, you can use [Authenticated](/docs/authentication/components/authenticated/index.md) component in your application. Refine will redirect user to given login page for unauthorized users.

If you want to handle Authentication with Refine, you can check [Authentication Guide](/documentation/docs/guides-concepts/authentication/index.md)

Optionally, you can also implement [getIdentity](/docs/authentication/auth-provider/#getidentity) method to enable [useGetIdentity hook](/docs/authentication/hooks/use-get-identity/index.md). This hook is also used to render current user information in the header of UI Integration layouts.

- [AntD Header Docs](/docs/ui-integrations/ant-design/components/themed-layout/#header)
- [Material UI Header Docs](/docs/ui-integrations/material-ui/components/themed-layout/#header)
- [Chakra UI Header Docs](/docs/ui-integrations/chakra-ui/components/themed-layout/#header)
- [Mantine Header Docs](/docs/ui-integrations/mantine/components/themed-layout/#header)
