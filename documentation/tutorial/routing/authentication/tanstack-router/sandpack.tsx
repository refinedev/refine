import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import {
  dependencies,
  finalFiles as initialFiles,
} from "../../intro/tanstack-router/sandpack";
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

const AppTsxWithAuthentication = /* tsx */ `
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
  component: ListProducts,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Authenticated key="auth-pages" fallback={<Login />}>
      {/* We're redirecting the user to "/" if they are authenticated and trying to access the "/login" route */}
      <Navigate to="/" />
    </Authenticated>
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    authenticatedLayoutRoute.addChildren([indexRoute]),
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

export const AddAuthenticationToApp = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithAuthentication);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithAuthentication,
    active: true,
  },
};
