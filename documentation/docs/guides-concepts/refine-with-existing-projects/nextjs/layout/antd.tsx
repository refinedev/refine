import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSAntdLayout() {
  return (
    <Sandpack
      template="nextjs"
      showNavigator
      showFiles
      dependencies={{
        "@refinedev/antd": "latest",
        antd: "^5.0.5",
      }}
      startRoute="/"
      files={{
        "/next.config.js": {
          code: NextConfigJsCode.trim(),
        },
        "/pages/_app.tsx": {
          code: AppTsxCode.trim(),
        },
        "/pages/about.tsx": {
          code: AboutTsxCode.trim(),
        },
        "/pages/index.tsx": {
          code: IndexTsxCode.trim(),
        },
        "/pages/refine/products.tsx": {
          code: RefineProductsTsxCode.trim(),
        },
        "/src/components/refine-layout.tsx": {
          code: RefineLayoutTsxCode.trim(),
        },
      }}
    />
  );
}

const NextConfigJsCode = /* js */ `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@ant-design/icons-svg",
    "@refinedev/nextjs-router",
    "@refinedev/antd",
    "antd",
    "@ant-design/pro-components",
    "@ant-design/pro-layout",
    "@ant-design/pro-utils",
    "@ant-design/pro-provider",
    "rc-pagination",
    "rc-picker",
    "rc-util",
  ],
};

module.exports = nextConfig;
`;

const AppTsxCode = /* tsx */ `
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
`;

const IndexTsxCode = /* tsx */ `
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Link href="/about">Go to About page</Link>
      <br />
      <Link href="/refine/products">Go to Refine page</Link>
    </>
  );
}
`;

const AboutTsxCode = /* tsx */ `
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <Link href="/">Go to Home page</Link>
    </div>
  );
}
`;

const RefineLayoutTsxCode = /* tsx */ `
import { App as AntdApp, ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { RefineThemes, ThemedLayoutV2 } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";

export default function RefineLayout({ children }) {
  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          authProvider={{
            check: async () => ({ authenticated: true }),
            getIdentity: async () => ({
              id: 1,
              name: "John Doe",
              avatar: "https://i.pravatar.cc/300",
            }),
          }}
          resources={[
            {
              name: "products",
              list: "/refine/products",
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

const RefineProductsTsxCode = /* tsx */ `
import type { ReactElement } from "react";
import RefineLayout from "../../src/components/refine-layout";
import type { NextPageWithLayout } from "../_app";

import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

const Page: NextPageWithLayout = () => {
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

Page.getLayout = function getLayout(page: ReactElement) {
  return <RefineLayout>{page}</RefineLayout>;
};

export default Page;
`;
