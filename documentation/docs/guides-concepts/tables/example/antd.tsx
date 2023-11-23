import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BaseAntdTableExample() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/antd": "latest",
        antd: "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: false,
        },
        "/product-table.tsx": {
          code: ProductTableTsxCode,
          hidden: false,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { ConfigProvider, App as AntdApp } from "antd";
import { ProductTable } from "./product-table.tsx";

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
    return (
        <ConfigProvider>
          <AntdApp>
            <Refine dataProvider={dataProvider(API_URL)}>
                <ProductTable />
            </Refine>
          </AntdApp>
        </ConfigProvider>
    );
}

`.trim();

export const ProductTableTsxCode = `
import React from "react";
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export const ProductTable: React.FC = () => {
    const { tableProps } = useTable<IProduct>({
        resource: "products",
    });

    return (
        <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="id" title="ID" />
            <Table.Column dataIndex="name" title="Name" />
            <Table.Column dataIndex="price" title="Price" />
        </Table>
    );
};

interface IProduct {
    id: number;
    name: string;
    price: string;
}

`.trim();
