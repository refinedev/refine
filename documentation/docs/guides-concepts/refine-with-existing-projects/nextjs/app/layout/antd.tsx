import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSAppAntdLayout() {
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
        "/app/refine/layout.tsx": {
          code: RefineLayoutTsxCode.trim(),
          active: true,
        },
        "/app/refine/products/page.tsx": {
          code: RefineProductsPageTsxCode.trim(),
        },
        "/app/layout.tsx": {
          code: LayoutTsxCode.trim(),
          hidden: true,
        },
        "/app/page.tsx": {
          code: IndexPageTsxCode.trim(),
        },
        "/app/about/page.tsx": {
          code: AboutPageTsxCode.trim(),
        },
      }}
    />
  );
}

const LayoutTsxCode = /* tsx */ `
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

const IndexPageTsxCode = /* tsx */ `
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link href="/about">Go to About page</Link>
      <br />
      <Link href="/refine/products">Go to Refine page</Link>
    </main>
  );
}
`;

const AboutPageTsxCode = /* tsx */ `
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
"use client";
import { App as AntdApp, ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { RefineThemes, ThemedLayoutV2 } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import dataProvider from "@refinedev/simple-rest";
export default function RefineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

const RefineProductsPageTsxCode = /* tsx */ `
"use client";
import { useTable } from "@refinedev/antd";
import { List, Table } from "antd";

export default function Products() {
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
}
`;
