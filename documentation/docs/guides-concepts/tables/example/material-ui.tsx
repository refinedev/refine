import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BaseMaterialUI() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/mui": "latest",
        "@mui/x-data-grid": "latest",
        "@mui/material": "latest",
        "@mui/system": "latest",
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
import { ProductTable } from "./product-table.tsx";

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <ProductTable />
        </Refine>
    );
}

`.trim();

export const ProductTableTsxCode = `
import React from "react";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ProductTable: React.FC = () => {
    const { dataGridProps } = useDataGrid<IProduct>({
        resource: "products",
    });

    const columns = React.useMemo<GridColDef<IProduct>[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                width: 50,
            },
            { field: "name", headerName: "Name", minWidth: 400, flex: 1 },
            { field: "price", headerName: "Price", minWidth: 120, flex: 0.3 },
        ],
        [],
    );

    return (
        <div style={{ padding:"4px" }}>
            <h2>Products</h2>
            <DataGrid {...dataGridProps} columns={columns} />
        </div>
    );
};

interface IProduct {
    id: number;
    name: string;
    price: string;
}

`.trim();
