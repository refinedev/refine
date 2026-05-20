---
title: "TanStack Router Guide | SSR in Refine v5"
display_title: "TanStack Router"
sidebar_label: "TanStack Router"
description: "Implement TanStack Router in Refine v5. Learn the key steps. Explore typed navigation, layouts, auth flows, and URL state syncing."
---

Refine provides router bindings and utilities for [TanStack Router](https://tanstack.com/router/latest). It is built on top of the `@tanstack/react-router` package and gives Refine a typed way to infer resources from the current route, navigate between action pages, keep table state in the URL, and wire route-aware helpers such as `NavigateToResource`, `CatchAllNavigate`, `DocumentTitleHandler`, and `UnsavedChangesNotifier`.

<InstallPackagesCommand args="@refinedev/tanstack-router @tanstack/react-router"/>

[Refer to the Router Provider documentation for detailed information. &#8594;](/core/docs/routing/router-provider/)

## Usage

TanStack Router works best when Refine lives inside your route tree rather than around the whole application shell. The usual pattern is:

1. Create a root route.
2. Render `<Refine />` from that root route component.
3. Define resource routes with `createRoute`.
4. Pass `@refinedev/tanstack-router` to the `routerProvider` prop.

### Basic Usage

```tsx title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/tanstack-router";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

const rootRoute = createRootRoute({
  component: () => (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
        },
        {
          name: "categories",
          list: "/categories",
          show: "/categories/:id",
        },
      ]}
    >
      <Outlet />
    </Refine>
  ),
});

const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts",
  component: PostList,
});

const createPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts/create",
  component: PostCreate,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: CategoryList,
});

const categoryShowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories/$id",
  component: CategoryShow,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    postsRoute,
    createPostRoute,
    categoriesRoute,
    categoryShowRoute,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
```

### Usage with Authentication

TanStack Router encourages route-tree composition. With Refine, a good default is to keep authentication decisions in route components and still use Refine’s [`<Authenticated />`](/core/docs/authentication/components/authenticated/) component so the same `authProvider` contract powers redirects and UI guards.

```tsx title=App.tsx
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/tanstack-router";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { authProvider } from "./authProvider";
import { AuthPage } from "@refinedev/antd";
import { PostList } from "./pages/posts/list";

const rootRoute = createRootRoute({
  component: () => (
    <Refine
      routerProvider={routerProvider}
      authProvider={authProvider}
      resources={[{ name: "posts", list: "/posts" }]}
    >
      <Outlet />
    </Refine>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Authenticated fallback={<AuthPage type="login" />}>
      <NavigateToResource resource="posts" />
    </Authenticated>
  ),
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts",
  component: () => (
    <Authenticated redirectOnFail="/login">
      <PostList />
    </Authenticated>
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([loginRoute, protectedRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
```

If you prefer TanStack Router’s `beforeLoad` redirects for auth, you can layer that on top of Refine as well. The important part is that the redirect target and the rendered UI still line up with the same Refine `authProvider`.

### Usage with Layouts

Layouts fit naturally into TanStack Router by using pathless or parent routes.

```tsx title=App.tsx
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/tanstack-router";
import { ThemedLayout } from "@refinedev/antd";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { authProvider } from "./authProvider";
import { PostList } from "./pages/posts/list";

const rootRoute = createRootRoute({
  component: () => (
    <Refine
      routerProvider={routerProvider}
      authProvider={authProvider}
      resources={[{ name: "posts", list: "/posts" }]}
    >
      <Outlet />
    </Refine>
  ),
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => (
    <Authenticated redirectOnFail="/login">
      <ThemedLayout>
        <Outlet />
      </ThemedLayout>
    </Authenticated>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  component: () => <NavigateToResource resource="posts" />,
});

const postsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/posts",
  component: PostList,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    appLayoutRoute.addChildren([indexRoute, postsRoute]),
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
```

### Usage with an Error Page

TanStack Router already has a strong route-tree story for 404s. When you want the current location preserved for a login redirect, `CatchAllNavigate` mirrors the React Router helper.

```tsx title=App.tsx
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/tanstack-router";
import { ErrorComponent } from "@refinedev/antd";

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/_404",
  component: ErrorComponent,
});

const protectedNotFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-404",
  component: () => (
    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
      <ErrorComponent />
    </Authenticated>
  ),
});
```

### `NavigateToResource`

`NavigateToResource` redirects to the first resource with a `list` action, or to the specific `resource` prop when provided.

```tsx
import { NavigateToResource } from "@refinedev/tanstack-router";

<NavigateToResource resource="posts" />;
```

### `CatchAllNavigate`

`CatchAllNavigate` redirects to a path and includes the current location in a `to` search param. This is useful for login pages and auth flows.

```tsx
import { CatchAllNavigate } from "@refinedev/tanstack-router";

<CatchAllNavigate to="/login" />;
```

### `DocumentTitleHandler`

`DocumentTitleHandler` derives the current resource and action from Refine’s parsed route info and updates `document.title`.

```tsx
import { DocumentTitleHandler } from "@refinedev/tanstack-router";

<DocumentTitleHandler
  handler={({ autoGeneratedTitle, resource, action }) => {
    if (resource?.name === "posts" && action === "list") {
      return "Posts | Admin";
    }

    return autoGeneratedTitle;
  }}
/>;
```

### `UnsavedChangesNotifier`

`UnsavedChangesNotifier` plugs into TanStack Router’s navigation blocking APIs and Refine’s `warnWhenUnsavedChanges` option.

```tsx
import { Refine } from "@refinedev/core";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/tanstack-router";

<Refine
  routerProvider={routerProvider}
  options={{
    warnWhenUnsavedChanges: true,
  }}
>
  <UnsavedChangesNotifier />
</Refine>;
```

Mount it under `<Refine />` so it can watch both Refine’s form state and TanStack Router transitions.
