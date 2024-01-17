import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function ViteAntdLayout() {
  return (
    <Sandpack
      showNavigator
      showFiles
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router-v6": "latest",
        "react-router-dom": "latest",
        "react-router": "latest",
        antd: "^5.0.5",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode.trim(),
        },
        "/refine/refine-context.tsx": {
          code: RefineContextTsxCode.trim(),
        },

        "/refine/pages/products/list.tsx": {
          code: ListTsxCode.trim(),
        },
        "/pages/home.tsx": {
          code: HomeTsxCode.trim(),
        },
        "/pages/about.tsx": {
          code: AboutTsxCode.trim(),
        },
      }}
    />
  );
}

const HomeTsxCode = /* tsx */ `
export const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>This file represents your existing page.</p>
      <p>This component isn't wrapped with Refine context.</p>
      <a href="/refine">Go to Refine route</a>
    </>
  );
};
`;

const AboutTsxCode = /* tsx */ `
  export const About = () => {
    return (
      <h1>About Page</h1>
    )
  }
`;

const RefineContextTsxCode = /* tsx */ `
import { App as AntdApp, ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { RefineThemes, ThemedLayoutV2 } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

export function RefineContext({ children }) {
  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          authProvider={{
            check: async () => ({ authenticated: true }),
            getIdentity: async () => ({ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/300" }),
          }}
          resources={[
            {
              name: "products",
              list: "/refine/my-products",
            },
          ]}
          options={{ syncWithLocation: true }}
        >
          <ThemedLayoutV2>{children}</ThemedLayoutV2>
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
`;

const AppTsxCode = /* tsx */ `
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import { ErrorComponent } from "@refinedev/antd";
import { NavigateToResource } from "@refinedev/react-router-v6";

import { Home } from "./pages/home.tsx";
import { About } from "./pages/about.tsx";
import { ProductList } from "./refine/pages/products/list.tsx";
import { RefineContext } from "./refine/refine-context.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Refine routes */}
        <Route
          path="/refine"
          element={
            <RefineContext>
              <Outlet />
            </RefineContext>
          }
        >
          <Route index element={<NavigateToResource />} />
          <Route path="my-products" element={<ProductList />} />
          <Route path="*" element={<ErrorComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
`;

const ListTsxCode = `
import { List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
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
