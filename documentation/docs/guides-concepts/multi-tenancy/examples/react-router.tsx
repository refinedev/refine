import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function RouteDefinitions() {
  return (
    <Sandpack
      hidePreview={true}
      showFiles={false}
      showOpenInCodeSandbox={false}
      showReadOnly={false}
      template="react-ts"
      dependencies={{
        "@refinedev/core": "latest",
      }}
      files={{
        "App.tsx": {
          code: AppTsxCode,
          readOnly: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";

import { ProductsList, ProductsCreate, ProductsShow, ProductsEdit } from "./products";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider("<API_URL>")}
        routerProvider={routerProvider}
        resources={[
          {
            name: "products",
            // We're prefixing the routes with \`/:tenantId\` to make them tenant-aware.
            list: "/:tenantId/products",
            show: "/:tenantId/products/:id",
            edit: "/:tenantId/products/:id/edit",
            create: "/:tenantId/products/create",
          },
        ]}
      >
        <Routes>
          {/* We're defining the \`tenantId\` as a route parameter. */}
          <Route path="/:tenantId" element={<Outlet />}>
            <Route path="products" element={<ProductsList />} />
            <Route path="products/create" element={<ProductsCreate />} />
            <Route path="products/:id" element={<ProductsShow />} />
            <Route path="products/:id/edit" element={<ProductsEdit />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
`.trim();
