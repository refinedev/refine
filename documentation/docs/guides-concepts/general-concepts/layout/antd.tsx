import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function AntdLayout() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router-v6": "latest",
        "@refinedev/inferencer": "latest",
        "react-router-dom": "latest",
        "react-router": "latest",
        antd: "^5.0.5"
      }}
      startRoute="/my-products"
      files={{
        "/App.tsx": {
          code: AppTsxCode
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode
        },
        "/pages/products/show.tsx": {
          code: ShowTsxCode,
          active: true
        }
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";

import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";

import { ErrorComponent, RefineThemes, ThemedLayoutV2 } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { ProductList } from "./pages/products/list.tsx";
import { ProductShow } from "./pages/products/show.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={{
              check: async () => ({  authenticated: true }),
              getIdentity: async () => ({ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/300"})
            }}
            resources={[
              {
                name: "products",
                // We're defining the routes and assigning them to an action of a resource
                list: "/my-products",
                show: "/my-products/:id"
                // For sake of simplicity, we are not defining other routes here but the implementation is the same
                // create: "/my-products/new",
                // edit: "/my-products/:id/edit",
                // clone: "/my-products/:id/clone",
              }
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="/my-products" element={<ProductList />} />
                <Route path="/my-products/:id" element={<ProductShow />} />
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};
`.trim();

const ListTsxCode = `
import { List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
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

    const {  queryResult: { data, isLoading } } = result

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
