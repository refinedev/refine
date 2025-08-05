# @refinedev/tanstack-router

## 1.0.0

### Major Changes

- [#6897](https://github.com/refinedev/refine/pull/6897) [`xxxxx`](https://github.com/refinedev/refine/commit/xxxxx): Initial release of TanStack Router support for Refine.

  This package provides TanStack Router bindings for Refine applications, enabling developers to use TanStack Router's modern routing patterns with full type safety and built-in data fetching capabilities.

  ### Features

  - **Full Type Safety**: Built-in TypeScript support with route-level type safety
  - **RouterBindings Interface**: Complete implementation of Refine's RouterBindings interface
  - **Modern Navigation**: Support for TanStack Router's navigation patterns and APIs
  - **Query Parameter Handling**: Advanced search parameter management with validation
  - **Performance Optimizations**: Built-in caching, preloading, and code splitting support
  - **Seamless Integration**: Drop-in replacement for other Refine router providers

  ### Usage

  ```tsx
  import React from "react";
  import { Refine } from "@refinedev/core";
  import routerBindings from "@refinedev/tanstack-router";
  import { createRouter, RouterProvider } from "@tanstack/react-router";

  const router = createRouter({ routeTree });

  function App() {
    return (
      <RouterProvider router={router}>
        <Refine
          routerProvider={routerBindings}
          // ... other props
        />
      </RouterProvider>
    );
  }
  ```

  ### Breaking Changes

  This is the initial release, so there are no breaking changes from previous versions.

  ### Dependencies

  - `@tanstack/react-router`: ^1.87.0
  - `qs`: ^6.10.1

  ### Peer Dependencies

  - `@refinedev/core`: ^4.46.1
  - `@tanstack/react-router`: ^1.87.0
  - `react`: ^17.0.0 || ^18.0.0
  - `react-dom`: ^17.0.0 || ^18.0.0
