import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  AuthPage,
} from "@refinedev/antd";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";
import "./styles/custom.css";

import { Header } from "./components/header";
import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";
import { ColorModeContextProvider } from "./providers/color-mode";
import { CommonLayout } from "./components/Layout/common";
import { AccountsPageList } from "./pages/accounts/list";
import { AccountsPageCreate } from "./pages/accounts/create";
import { AccountsPageEdit } from "./pages/accounts/edit";
import { ClientsPageList } from "./pages/clients/list";
import { ClientsPageCreate } from "./pages/clients/create";
import { ClientsPageEdit } from "./pages/clients/edit";
import { InvoicePageList } from "./pages/invoices/list";
import { InvoicesPageCreate } from "./pages/invoices/create";
import { InvoicesPageShow } from "./pages/invoices/show";

const App: React.FC = () => {
  return (
    <DevtoolsProvider>
      <BrowserRouter>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              routerProvider={routerProvider}
              authProvider={authProvider}
              dataProvider={dataProvider}
              resources={[
                {
                  name: "accounts",
                  list: "/accounts",
                  create: "/accounts/new",
                  edit: "/accounts/:id/edit",
                },
                {
                  name: "clients",
                  list: "/clients",
                  create: "/clients/new",
                  edit: "/clients/:id/edit",
                },
                {
                  name: "invoices",
                  list: "/invoices",
                  show: "/invoices/:id",
                  create: "/invoices/new",
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
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={() => null}
                      >
                        <CommonLayout>
                          <Outlet />
                        </CommonLayout>
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource />} />
                  <Route
                    path="/accounts"
                    element={
                      <AccountsPageList>
                        <Outlet />
                      </AccountsPageList>
                    }
                  >
                    <Route index element={null} />
                    <Route path="new" element={<AccountsPageCreate />} />
                  </Route>
                  <Route
                    path="/accounts/:id/edit"
                    element={<AccountsPageEdit />}
                  />

                  <Route
                    path="/clients"
                    element={
                      <ClientsPageList>
                        <Outlet />
                      </ClientsPageList>
                    }
                  >
                    <Route index element={null} />
                    <Route path="new" element={<ClientsPageCreate />} />
                  </Route>
                  <Route
                    path="/clients/:id/edit"
                    element={<ClientsPageEdit />}
                  />
                  <Route path="/invoices">
                    <Route index element={<InvoicePageList />} />
                    <Route path="new" element={<InvoicesPageCreate />} />
                    <Route path=":id" element={<InvoicesPageShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource resource="posts" />
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
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
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
        </ColorModeContextProvider>
        <DevtoolsPanel />
      </BrowserRouter>
    </DevtoolsProvider>
  );
};

export default App;
