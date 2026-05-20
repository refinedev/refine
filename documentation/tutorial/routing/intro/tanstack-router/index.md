---
title: Introduction
---

import { Sandpack, AddRouterProviderToApp } from "./sandpack.tsx";

<Sandpack>

This routing unit uses [TanStack Router](/core/docs/routing/integrations/tanstack-router/) with `@refinedev/tanstack-router`.

At this stage we only need to do two things:

1. Install the TanStack Router packages.
2. Render `<Refine />` from a root route so Refine can consume the current location through the router provider.

<InstallPackagesCommand args="@tanstack/react-router @refinedev/tanstack-router" />

The starter integration looks like this:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/tanstack-router";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <Refine routerProvider={routerProvider}>{/* ... */}<Outlet /></Refine>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Home</div>,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute]),
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

<AddRouterProviderToApp />

Once the provider is in place, Refine can start inferring resources and actions from your route tree, and the rest of the routing helpers become available.

</Sandpack>
