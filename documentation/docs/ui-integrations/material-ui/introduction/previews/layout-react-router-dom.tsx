import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutReactRouterDom() {
  return (
    <Sandpack
      showNavigator
      // hidePreview
      //   showFiles
      initialPercentage={35}
      dependencies={{
        "@refinedev/mui": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router-v6": "latest",
        "@refinedev/react-hook-form": "^4.8.12",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "latest",
        "@mui/x-data-grid": "^7.22.2",
        "react-router-dom": "^6.8.1",
        "react-hook-form": "^7.43.5",
      }}
      startRoute="/products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";

import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import {
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  notificationProvider,
  RefineSnackbarProvider,
  AuthPage,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { ProductList } from "./pages/products/list";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles
            styles={{ html: { WebkitFontSmoothing: "auto" } }}
        />
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "products",
                list: "/products",
              }
            ]}
          >
            <Routes>
                <Route
                  // The layout will wrap all the pages inside this route
                  element={
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                    <Route path="/products" element={<ProductList />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Route>
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { List, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ProductList = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
        {
            field: "id",
            headerName: "ID",
            type: "number",
            width: 50,
        },
        { field: "name", headerName: "Name", minWidth: 300, flex: 1 },
        { field: "price", headerName: "Price", minWidth: 100, flex: 1 },
      ],
    []
  );

  return (
    <List>
        <DataGrid {...dataGridProps} columns={columns}  />
    </List>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
`.trim();
