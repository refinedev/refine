import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import {
    dependencies,
    finalFiles as initialFiles,
} from "../../intro/react-router/sandpack";

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
import routerProvider from "@refinedev/react-router-v6";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";
import { Header } from "./header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
      >
        <Routes>
          <Route
            element={
              // We're wrapping our routes with the \`<Authenticated />\` component
              // We're omitting the \`fallback\` prop to redirect users to the login page if they are not authenticated.
              // If the user is authenticated, we'll render the \`<Header />\` component and the \`<Outlet />\` component to render the inner routes.
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            <Route index element={<ListProducts />} />
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* We're redirecting the user to "/" if they are authenticated and trying to access the "/login" route */}
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
`.trim();

// actions

export const AddAuthenticationToApp = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/App.tsx", AppTsxWithAuthentication);
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

// files

export const finalFiles = {
    ...initialFiles,
    "App.tsx": {
        code: AppTsxWithAuthentication,
    },
};
