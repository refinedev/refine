import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function ViteMount() {
  return (
    <Sandpack
      template="vite-react-ts"
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router-v6": "latest",
        "@refinedev/inferencer": "latest",
        "react-router-dom": "latest",
        "react-router": "latest",
        antd: "^5.0.5",
      }}
      showConsole
      showNavigator
      showFiles
      files={{
        "/App.tsx": {
          code: AppTsxCode.trim(),
        },
        "/refine/pages/products/list.tsx": { code: MyRefineComponent.trim() },
        "/pages/my-home.tsx": {
          code: MyHomeComponent.trim(),
        },
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

import { MyHomePage } from "./pages/my-home.tsx";

import { RefineProductList } from "./refine/pages/products/list.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Routes>
            <Route path="/" element={<MyHomePage />} />
            <Route
              path="/refine"
              element={
                <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                  {
                    name: "products",
                    list: "/my-products",
                    show: "/my-products/:id",
                  },
                ]}
                options={{ syncWithLocation: true }}
              >
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
                </Refine>
              }
            >

                <Route path="/products" element={<RefineProductList />} />
                <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

`;

const MyRefineComponent = /* tsx */ `
import { List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const RefineProductList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="price" title="Price" />
      </Table>
    </List>
  );
};
`;

const MyHomeComponent = `
export const MyHomePage = () => {
  return (
    <div>
      Hello From My Existing Home Page
    </div>
  );
};
`.trim();
