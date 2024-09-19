import { Authenticated, CanAccess, Refine } from "@refinedev/core";
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { ErrorComponent } from "@refinedev/mui";
import dataProvider from "@refinedev/nestjsx-crud";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PageEmployeeTimeOffsList } from "@/pages/employee/time-offs/list";
import { PageEmployeeTimeOffsCreate } from "@/pages/employee/time-offs/create";
import { PageManagerRequestsList } from "@/pages/manager/requests/list";
import { PageManagerRequestsTimeOffsEdit } from "@/pages/manager/requests/time-offs/edit";

import { PageLogin } from "@/pages/login";

import { Layout } from "@/components/layout";

import { ThemeProvider } from "@/providers/theme-provider";
import { authProvider } from "@/providers/auth-provider";
import { accessControlProvider } from "@/providers/access-control";
import { useNotificationProvider } from "@/providers/notification-provider";
import { queryClient } from "@/providers/query-client";
import { resources } from "@/providers/resources";

import { BASE_URL } from "@/utilities/constants";
import { axiosInstance } from "@/utilities/axios";

import { Role } from "@/types";

import "@/utilities/init-dayjs";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DevtoolsProvider>
          <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider(BASE_URL, axiosInstance)}
            notificationProvider={useNotificationProvider}
            resources={resources}
            accessControlProvider={accessControlProvider}
            options={{
              reactQuery: {
                clientConfig: queryClient,
              },
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <Outlet />
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={
                    <CanAccess
                      action="manager"
                      fallback={<NavigateToResource resource="time-offs" />}
                    >
                      <NavigateToResource resource="requests" />
                    </CanAccess>
                  }
                />

                <Route
                  path="employee"
                  element={
                    <ThemeProvider role={Role.EMPLOYEE}>
                      <Layout>
                        <CanAccess
                          action="employee"
                          fallback={<NavigateToResource resource="requests" />}
                        >
                          <Outlet />
                        </CanAccess>
                      </Layout>
                    </ThemeProvider>
                  }
                >
                  <Route path="time-offs" element={<Outlet />}>
                    <Route index element={<PageEmployeeTimeOffsList />} />
                    <Route
                      path="new"
                      element={<PageEmployeeTimeOffsCreate />}
                    />
                  </Route>
                </Route>

                <Route
                  path="manager"
                  element={
                    <ThemeProvider role={Role.MANAGER}>
                      <Layout>
                        <CanAccess
                          action="manager"
                          fallback={<NavigateToResource resource="time-offs" />}
                        >
                          <Outlet />
                        </CanAccess>
                      </Layout>
                    </ThemeProvider>
                  }
                >
                  <Route
                    path="requests"
                    element={
                      <PageManagerRequestsList>
                        <Outlet />
                      </PageManagerRequestsList>
                    }
                  >
                    <Route
                      path=":id/edit"
                      element={<PageManagerRequestsTimeOffsEdit />}
                    />
                  </Route>
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <CanAccess
                      action="manager"
                      fallback={<NavigateToResource resource="time-offs" />}
                    >
                      <NavigateToResource resource="requests" />
                    </CanAccess>
                  </Authenticated>
                }
              >
                <Route path="/login" element={<PageLogin />} />
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
            <Toaster position="bottom-right" reverseOrder={false} />
            <DevtoolsPanel />
          </Refine>
        </DevtoolsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
