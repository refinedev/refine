---
title: Refine with existing projects
---

Integrating Refine into an existing project is as simple as installing `@refinedev/core` package, importing `Refine` component into your application.

Once imported, `Refine` component provides necessary context to all children components for **Refine hooks** to work.

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
        <ExistingComponent1>
        <ExistingComponent2>
        <ComponentWithRefineHooks />
      </Refine>
    </ExistingProvider>
  );
}
```

## Headless Example

The following example shows how to use Refine's `useShow` hook with an existing application.

<Tabs wrapContent={false}>

<TabItem value="vite" label="Vite">

import { ViteHeadless } from './vite/headless';

As you can see in the example below, wrapping `App.tsx` file with `Refine` component is enough to use Refine hooks inside your application.

<ViteHeadless />

</TabItem>

<TabItem value="nextjs" label="Next.js">

import { NextJSHeadless } from './nextjs/headless'

As you can see in the example below, wrapping `_app.tsx` file with `Refine` component is enough to use Refine hooks inside your application.

<NextJSHeadless />

</TabItem>

</Tabs>

## UI & Routing Integration Example

In the following example, we have an application that uses Ant Design as UI Library and React Router for routing. We will integrate Refine into this application's `/refine` route.

<InstallPackagesCommand args="@refinedev/core @refinedev/simple-rest @refinedev/antd" />

import {AntdLayout} from './vite/layout/antd';

<AntdLayout />
