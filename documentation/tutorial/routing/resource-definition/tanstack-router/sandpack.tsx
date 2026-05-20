import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { dependencies } from "../../intro/tanstack-router/sandpack";
import { finalFiles as initialFiles } from "../../authentication/tanstack-router/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showNavigator
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const AppTsxWithRoutes = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/tanstack-router";

import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
} from "@tanstack/react-router";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

const rootRoute = createRootRoute({
  component: () => (
    <Refine
      dataProvider={dataProvider}
      authProvider={authProvider}
      routerProvider={routerProvider}
    >
      <Outlet />
    </Refine>
  ),
});

const authenticatedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authenticated-layout",
  component: () => (
    <Authenticated key="authenticated-routes" redirectOnFail="/login">
      <Header />
      <Outlet />
    </Authenticated>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/",
  component: () => <Navigate to="/products" />,
});

const productsRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/products",
  component: ListProducts,
});

const showProductRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/products/$id",
  component: ShowProduct,
});

const editProductRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/products/$id/edit",
  component: EditProduct,
});

const createProductRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/products/create",
  component: CreateProduct,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Authenticated key="auth-pages" fallback={<Login />}>
      <Navigate to="/products" />
    </Authenticated>
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    authenticatedLayoutRoute.addChildren([
      indexRoute,
      productsRoute,
      showProductRoute,
      editProductRoute,
      createProductRoute,
    ]),
    loginRoute,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
`.trim();

const AppTsxWithResources = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/tanstack-router";

import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

const rootRoute = createRootRoute({
  component: () => (
    <Refine
      dataProvider={dataProvider}
      authProvider={authProvider}
      routerProvider={routerProvider}
      resources={[
        {
          name: "protected-products",
          list: "/products",
          show: "/products/:id",
          edit: "/products/:id/edit",
          create: "/products/create",
          meta: { label: "Products" },
        },
      ]}
    >
      <Outlet />
    </Refine>
  ),
});

const authenticatedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authenticated-layout",
  component: () => (
    <Authenticated key="authenticated-routes" redirectOnFail="/login">
      <Header />
      <Outlet />
    </Authenticated>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/",
  component: () => <NavigateToResource resource="protected-products" />,
});

const productsRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/products",
  component: ListProducts,
});

const showProductRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/products/$id",
  component: ShowProduct,
});

const editProductRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/products/$id/edit",
  component: EditProduct,
});

const createProductRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/products/create",
  component: CreateProduct,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Authenticated key="auth-pages" fallback={<Login />}>
      <NavigateToResource resource="protected-products" />
    </Authenticated>
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    authenticatedLayoutRoute.addChildren([
      indexRoute,
      productsRoute,
      showProductRoute,
      editProductRoute,
      createProductRoute,
    ]),
    loginRoute,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
`.trim();

// actions

export const AddRoutesToApp = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithRoutes);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

export const AddResourcesToApp = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithResources);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithResources,
    active: true,
  },
};
