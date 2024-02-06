import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { dependencies } from "../../intro/react-router/sandpack";
import { finalFiles as initialFiles } from "../../authentication/react-router/sandpack";

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
import routerProvider from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

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
                element={(
                    <Authenticated key="authenticated-routes" redirectOnFail="/login">
                        <Header />
                        <Outlet />
                    </Authenticated>
                )}
            >
                <Route
                    index
                    element={<Navigate to="/products" />}
                />
                <Route path="/products">
                    <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                </Route>
            </Route>
            <Route
                element={(
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <Navigate to="/products" />
                    </Authenticated>
                )}
            >
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
`.trim();

const AppTsxWithResources = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
          resources={[
            {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
            }
          ]}
      >
        <Routes>
            <Route
                element={(
                    <Authenticated key="authenticated-routes" redirectOnFail="/login">
                        <Header />
                        <Outlet />
                    </Authenticated>
                )}
            >
                <Route
                    index
                    element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                    <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                </Route>
            </Route>
            <Route
                element={(
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <NavigateToResource resource="protected-products" />
                    </Authenticated>
                )}
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

export const AddRoutesToApp = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/App.tsx", AppTsxWithRoutes);
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

export const AddResourcesToApp = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/App.tsx", AppTsxWithResources);
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

// files

export const finalFiles = {
    ...initialFiles,
    "App.tsx": {
        code: AppTsxWithResources,
    },
};
