import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function TanStackRouterResourceAndRoutesUsage() {
  return (
    <Sandpack
      showNavigator
      showFiles
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/tanstack-router": "latest",
        "@tanstack/react-router": "^1.131.35",
      }}
      startRoute="/my-products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
        },
        "/pages/products/show.tsx": {
          code: ShowTsxCode,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/tanstack-router";
import dataProvider from "@refinedev/simple-rest";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import "./style.css";

import { ProductList } from "./pages/products/list.tsx";
import { ProductShow } from "./pages/products/show.tsx";

const rootRoute = createRootRoute({
  component: () => (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "products",
          // We're defining the routes and assigning them to an action of a resource
          list: "/my-products",
          show: "/my-products/:id",
          // For sake of simplicity, we are not defining other routes here but the implementation is the same
          // create: "/my-products/new",
          // edit: "/my-products/:id/edit",
          // clone: "/my-products/:id/clone",
        },
      ]}
    >
      <Outlet />
    </Refine>
  ),
});

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-products",
  component: ProductList,
});

const showRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-products/$id",
  component: ProductShow,
});

const routeTree = rootRoute.addChildren([listRoute, showRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
`.trim();

const StyleCssCode = `
html {
    margin: 0;
    padding: 0;
}
body {
    margin: 0;
    padding: 12px;
}
* {
    box-sizing: border-box;
}
body {
    font-family: sans-serif;
}
form label, form input, form button {
    display: block;
    width: 100%;
    margin-bottom: 6px;
}
span + button {
    margin-left: 6px;
}
ul > li {
    margin-bottom: 6px;
}
`.trim();

const ListTsxCode = `
import React from "react";

import { useGo, useList } from "@refinedev/core";

export const ProductList: React.FC = () => {
  // We're inferring the resource from the route
  // So we call \`useList\` hook without any arguments.
  // const { ... } = useList({ resource: "products" })
  const { result, query } = useList();
  const products = result?.data;

  const go = useGo();

  if (query.isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>
          <span>{product.name}</span>
          <button
            onClick={() => {
              go({
                to: {
                  resource: "products",
                  action: "show",
                  id: product.id,
                },
              });
            }}
          >
            show
          </button>
        </li>
      ))}
    </ul>
  );
};
`.trim();

const ShowTsxCode = `
import React from "react";

import { useGo, useShow } from "@refinedev/core";

export const ProductShow: React.FC = () => {
  // We're inferring the resource and the id from the route params
  // So we can call useShow hook without any arguments.
  // const result = useShow({ resource: "products", id: "xxx" })
  const result = useShow();

  const {
    query: { data, isLoading },
  } = result;

  const go = useGo();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h1>{data?.data?.name}</h1>
        <p>Material: {data?.data?.material}</p>
        <small>ID: {data?.data?.id}</small>
      </div>
      <button
        onClick={() => {
          go({
            to: {
              resource: "products",
              action: "list",
            },
          });
        }}
      >
        Go to Products list
      </button>
    </>
  );
};
`.trim();
