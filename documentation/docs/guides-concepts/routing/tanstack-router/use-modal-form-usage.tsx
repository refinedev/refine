import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function TanStackRouterUseModalFormUsage() {
  return (
    <Sandpack
      showNavigator
      showFiles
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/tanstack-router": "latest",
        "@refinedev/react-hook-form": "latest",
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
        "/components/modal.tsx": {
          code: ModalComponentTsxCode,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
          active: true,
        },
      }}
    />
  );
}

const ModalComponentTsxCode = /* tsx */ `
import React from "react";

export const Modal: React.FC = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-title">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};
`.trim();

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

const rootRoute = createRootRoute({
  component: () => (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "products",
          list: "/my-products",
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

const routeTree = rootRoute.addChildren([listRoute]);

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

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 1000;
    width: 75%;
    overflow-y: auto;
}

.modal .modal-title {
    display: flex;
    justify-content: flex-end;
    padding: 4px;
}

.modal .modal-content {
    padding: 0px 16px 16px 16px;
}
form label, form input, form button {
    display: block;
    width: 100%;
    margin-top: 3px;
    margin-bottom: 3px;
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

import { useList } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";

import { Modal } from "../../components/modal.tsx";

export const ProductList: React.FC = () => {
  const { result, query } = useList();
  const products = result?.data;

  const {
    modal: { visible, close, show },
    refineCore: { onFinish, formLoading },
    handleSubmit,
    register,
    saveButtonProps,
  } = useModalForm({
    refineCoreProps: { action: "edit" },
    syncWithLocation: true,
  });

  if (query.isLoading) return <div>Loading...</div>;

  return (
    <>
      <Modal isOpen={visible} onClose={close}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div>
            <label htmlFor="name">name</label>
            <input {...register("name")} />
          </div>
          <button type="submit" {...saveButtonProps}>
            <span>Save</span>
          </button>
        </form>
      </Modal>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <button
              onClick={() => {
                show(product.id);
              }}
            >
              edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
`.trim();
