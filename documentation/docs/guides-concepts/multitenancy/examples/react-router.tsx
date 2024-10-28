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
        "multi-tenancy.ts": {
          code: MultiTenancyProviderTsxCode,
          readOnly: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import { RefineEnterprise } from "@refinedev-ee/core";
import { WithTenant } from "@refinedev-ee/multi-tenancy";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";

import { multiTenancyProvider } from "./multi-tenancy";

import { ProductsList, ProductsCreate, ProductsShow, ProductsEdit } from "./products";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RefineEnterprise
        multiTenancyProvider={multiTenancyProvider}
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
          <Route path="/:tenantId" element={
            <WithTenant
              fallback={<div>Tenant not found</div>}
              loadingComponent={<div>Loading...</div>}
            >
              <Outlet />
            </WithTenant>
          }>
            <Route path="products" element={<ProductsList />} />
            <Route path="products/create" element={<ProductsCreate />} />
            <Route path="products/:id" element={<ProductsShow />} />
            <Route path="products/:id/edit" element={<ProductsEdit />} />
          </Route>
        </Routes>
      </RefineEnterprise>
    </BrowserRouter>
  );
};
`.trim();

const MultiTenancyProviderTsxCode = /* jsx */ `
import type { MultiTenancyProvider } from "@refinedev-ee/core";
import { useRouterAdapter } from "@refinedev-ee/multi-tenancy";
import dataProvider from "@refinedev/simple-rest";

export type Tenant = {
  id: string;
  name: string;
};

export const multiTenancyProvider: MultiTenancyProvider = {
  adapter: useRouterAdapter,
  fetchTenants: async () => {
    const response = await dataProvider("<API_URL>").getList<Tenant>({
      resource: "categories",
      pagination: {
        mode: "off",
      },
    });
    const tenants = response.data;
    const defaultTenant = tenants[0];

    return {
      tenants,
      defaultTenant,
    };
  },
};
`.trim();
