import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function RouteDefinitions() {
  return (
    <Sandpack
      hidePreview={true}
      showFiles={true}
      showOpenInCodeSandbox={false}
      showReadOnly={false}
      template="react-ts"
      dependencies={{
        "@refinedev/core": "latest",
      }}
      files={{
        "/app/root.tsx": {
          code: AppTsxCode,
          active: true,
          readOnly: true,
        },
        "/app/routes/$tenantId.products._index.tsx": {
          code: ListTsxCode,
          readOnly: true,
        },
        "/app/routes/$tenantId.products.create.tsx": {
          code: CreateTsxCode,
          readOnly: true,
        },
        "/app/routes/$tenantId.products.$id._index.tsx": {
          code: ShowTsxCode,
          readOnly: true,
        },
        "/app/routes/$tenantId.products.$id.edit.tsx": {
          code: EditTsxCode,
          readOnly: true,
        },
        "/app/providers/multitenancy.ts": {
          code: MultitenancyProviderTsxCode,
          readOnly: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { RefineEnterprise } from "@refinedev-ee/enterprise";
import { WithTenant } from "@refinedev-ee/multitenancy";
import routerProvider from "@refinedev-ee/remix-router";
import dataProvider from "@refinedev-ee/simple-rest";


import { multitenancyProvider } from "./providers/multitenancy";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <RefineEnterprise
          multitenancyProvider={multitenancyProvider}
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
          <WithTenant
            fallback={<div>Tenant not found</div>}
            loadingComponent={<div>Loading...</div>}
          >
            <Outlet />
          </WithTenant>
        </RefineEnterprise>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";

import { useList } from "@refinedev-ee/core";

export default function ProductsList() {
  const { data, isLoading } = useList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data.map((record) => (
          <li key={record.id}>{record.name}</li>
        ))}
      </ul>
    </div>
  );
}
`.trim();

const CreateTsxCode = /* jsx */ `
import React from "react";

import { useCreate } from "@refinedev-ee/core";

export default function ProductsCreate() {
  const { onFinish } = useForm();

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={(event) => { /* ... */ }}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
`.trim();

const ShowTsxCode = /* jsx */ `
import React from "react";

import { useShow } from "@refinedev-ee/core";

export default function ProductsShow() {
  const {
    query: { data, isLoading },
  } = useShow();
  const record = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{record?.name}</h1>
      <p>{record?.description}</p>
    </div>
  );
}
`.trim();

const EditTsxCode = /* jsx */ `
import React from "react";

import { useForm } from "@refinedev-ee/core";

export default function ProductsEdit() {
  const { onFinish, query, formLoading } = useForm();
  const record = query?.data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={(event) => { /* ... */ }}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" defaultValue={record?.name} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
`.trim();

const MultitenancyProviderTsxCode = /* jsx */ `
import type { MultiTenancyProvider } from "@refinedev-ee/enterprise";
import { useRouterAdapter } from "@refinedev-ee/multitenancy";
import dataProvider from "@refinedev-ee/simple-rest";

export type Tenant = {
  id: string;
  name: string;
};

export const multiTenancyProvider: MultiTenancyProvider = {
  adapter: useRouterAdapter(),
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
