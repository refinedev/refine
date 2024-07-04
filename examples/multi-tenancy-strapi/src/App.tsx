import { Layout } from "@/components/layout";
import { CategoriesList, CategoryCreate } from "@/pages/categories";
import { CustomerList, CustomerShow } from "@/pages/customer";
import { OrderList, OrderShow } from "@/pages/order";
import { ProductCreate, ProductEdit, ProductList } from "@/pages/product";
import { authProvider } from "@/providers/auth";
import { ConfigProvider } from "@/providers/config";
import { dataProvider } from "@/providers/data";
import { TenantProvider, useTenant } from "@/providers/tenant";
import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
} from "@refinedev/antd";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { LayoutGrid, List, ShoppingBag, UsersRound } from "lucide-react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner
        containerStyle={{
          paddingLeft: "312px",
        }}
      />
      <AntdApp>
        <Refine
          authProvider={authProvider}
          dataProvider={dataProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "products",
              list: "/:tenantId/products",
              create: "/:tenantId/products/new",
              edit: "/:tenantId/products/:id/edit",
              meta: {
                icon: <LayoutGrid />,
              },
            },
            {
              name: "categories",
              list: "/:tenantId/categories",
              create: "/:tenantId/categories/new",
              meta: {
                icon: <List />,
              },
            },
            {
              name: "orders",
              list: "/:tenantId/orders",
              show: "/:tenantId/orders/:id",
              meta: {
                icon: <ShoppingBag />,
              },
            },
            {
              name: "customers",
              list: "/:tenantId/customers",
              show: "/:tenantId/customers/:id",
              meta: {
                icon: <UsersRound />,
              },
            },
          ]}
          notificationProvider={useNotificationProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            breadcrumb: false,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <TenantProvider>
                    <ConfigProvider>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </ConfigProvider>
                  </TenantProvider>
                </Authenticated>
              }
            >
              <Route
                index
                Component={() => {
                  const { tenant } = useTenant();

                  return (
                    <div>
                      <NavigateToResource
                        meta={{
                          tenantId: tenant?.id,
                        }}
                      />
                    </div>
                  );
                }}
              />

              <Route path="/:tenantId">
                <Route index element={<NavigateToResource />} />

                <Route
                  path="products"
                  element={
                    <ProductList>
                      <Outlet />
                    </ProductList>
                  }
                >
                  <Route path="new" element={<ProductCreate />} />
                  <Route path=":id/edit" element={<ProductEdit />} />
                </Route>

                <Route
                  path="categories"
                  element={
                    <CategoriesList>
                      <Outlet />
                    </CategoriesList>
                  }
                >
                  <Route path="new" element={<CategoryCreate />} />
                </Route>

                <Route
                  path="orders"
                  element={
                    <OrderList>
                      <Outlet />
                    </OrderList>
                  }
                >
                  <Route path=":id" element={<OrderShow />} />
                </Route>

                <Route
                  path="customers"
                  element={
                    <CustomerList>
                      <Outlet />
                    </CustomerList>
                  }
                >
                  <Route path=":id" element={<CustomerShow />} />
                </Route>
              </Route>
            </Route>

            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      initialValues: {
                        email: "demo@refine.dev",
                        password: "demodemo",
                      },
                    }}
                  />
                }
              />
            </Route>

            <Route
              element={
                <Authenticated key="catch-all">
                  <Layout>
                    <Outlet />
                  </Layout>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </AntdApp>
    </BrowserRouter>
  );
};

export default App;
