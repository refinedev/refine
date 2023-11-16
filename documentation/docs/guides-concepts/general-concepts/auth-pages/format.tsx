import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { Authenticated, Refine } from "@refinedev/core";
import {
  AuthPage,
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/mui";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { ProductList } from "./pages/products/list.tsx";
import { ProductShow } from "./pages/products/show.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          authProvider={{
            check: async () => ({
              authenticated: false,
              redirectTo: "/login",
            }),
            getIdentity: async () => ({
              id: 1,
              name: "John Doe",
              avatar: "https://i.pravatar.cc/300",
            }),
          }}
          resources={[
            {
              name: "products",
              list: "/my-products",
              show: "/my-products/:id",
            },
          ]}
          options={{ syncWithLocation: true }}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="/my-products" element={<ProductList />} />
              <Route path="/my-products/:id" element={<ProductShow />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="products" />
                </Authenticated>
              }
            >
              <Route path="/login" element={<AuthPage type="login" />} />
              <Route path="/register" element={<AuthPage type="register" />} />
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              />
              <Route
                path="/update-password"
                element={<AuthPage type="updatePassword" />}
              />
            </Route>
            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
