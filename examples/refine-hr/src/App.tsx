import { Authenticated, Refine } from "@refinedev/core";
import {
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
  AuthPage,
} from "@refinedev/mui";
import dataProvider from "@refinedev/nestjsx-crud";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PageEmployeeOverview } from "@/pages/overview";
import { PageDummy } from "@/pages/dummy";

import { Layout } from "@/components/layout";

import { ThemeProvider } from "@/providers/theme-provider";
import { authProvider } from "@/providers/auth-provider";
import { employeeResources } from "@/providers/resources";

import { BASE_URL } from "@/utilities/constants";
import { axiosInstance } from "@/utilities/axios";

const App: React.FC = () => {
  const selectedResources = employeeResources;

  return (
    <BrowserRouter>
      <ThemeProvider>
        <RefineSnackbarProvider>
          <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider(BASE_URL, axiosInstance)}
            notificationProvider={useNotificationProvider}
            resources={selectedResources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route index element={<PageEmployeeOverview />} />
                <Route path="/my-info" element={<PageDummy />} />
                <Route path="/time-off" element={<PageDummy />} />
                <Route path="/calendar" element={<PageDummy />} />
                <Route path="/directory" element={<PageDummy />} />
                <Route path="/expenses" element={<PageDummy />} />
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource={selectedResources[0].name} />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      formProps={{
                        defaultValues: {
                          email: "michael.scott@dundermifflin.com",
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
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
