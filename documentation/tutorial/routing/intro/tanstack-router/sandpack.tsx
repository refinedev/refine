import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { dependencies as initialDependencies } from "@site/tutorial/authentication/intro/sandpack";
import { finalFiles as initialFiles } from "@site/tutorial/authentication/data-provider-integration/sandpack";
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

const AppTsxWithRouterProvider = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/tanstack-router";
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
    >
      <Outlet />
    </Refine>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Authenticated key="protected" fallback={<Login />}>
      <Header />
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Authenticated>
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute]),
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

export const AddRouterProviderToApp = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithRouterProvider);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const dependencies = {
  ...initialDependencies,
  "@refinedev/tanstack-router": "latest",
  "@tanstack/react-router": "^1.131.35",
};

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithRouterProvider,
    active: true,
  },
};
