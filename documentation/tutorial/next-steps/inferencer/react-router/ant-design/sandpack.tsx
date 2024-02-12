import React from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { finalFiles as initialFiles } from "@site/tutorial/next-steps/intro/ant-design/sandpack";
import { dependencies } from "@site/tutorial/next-steps/intro/ant-design/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

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

const ListCategoriesBase = /* tsx */ `
export const ListCategories = () => {
  return (
    <div>
      <h1>Categories</h1>
    </div>
  );
};
`.trim();

const AppWithCategories = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { ThemedLayoutV2, ThemedTitleV2, useNotificationProvider } from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { ListCategories } from "./list-categories";

import { Login } from "./login";

import "antd/dist/reset.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
              {
                name: "categories",
                list: "/categories",
                meta: { label: "Categories" },
              }
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2
                      Title={(props) => (
                        <ThemedTitleV2
                          {...props}
                          text="Awesome Project"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
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
                <Route path="/categories">
                  <Route index element={<ListCategories />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="protected-products" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
`.trim();

const ListCategoriesWithInferencer = /* tsx */ `
import { AntdInferencer } from "@refinedev/inferencer/antd";

export const ListCategories = () => {
  return (
    <AntdInferencer
      // resource="categories" // We're omitting this prop because it's inferred from the route
      // action="list" // We're omitting this prop because it's inferred from the route
    />
  );
};
`.trim();

// actions

export const CreateListCategoriesTsx = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialCreateFileButton
            name="list-categories.tsx"
            onClick={() => {
                sandpack.addFile("list-categories.tsx", ListCategoriesBase);
                sandpack.setActiveFile("list-categories.tsx");
            }}
        />
    );
};

export const AddListCategoriesToApp = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("App.tsx", AppWithCategories);
                sandpack.setActiveFile("App.tsx");
            }}
        />
    );
};

export const AddInferencerToListCategories = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "list-categories.tsx",
                    ListCategoriesWithInferencer,
                );
                sandpack.setActiveFile("list-categories.tsx");
            }}
        />
    );
};

// files

export const finalFiles = {
    ...removeActiveFromFiles(initialFiles),
    "list-categories.tsx": {
        code: ListCategoriesWithInferencer,
        active: true,
    },
    "App.tsx": {
        code: AppWithCategories,
    },
};
