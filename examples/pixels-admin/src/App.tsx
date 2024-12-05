import {
  Authenticated,
  CanAccess,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import {
  ErrorComponent,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { ConfigProvider, App as AntdApp } from "antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import "@refinedev/antd/dist/reset.css";

import { Title } from "./components/layout";
import { supabaseClient } from "./utility";
import {
  auditLogProvider,
  authProvider,
  accessControlProvider,
} from "./providers";
import { CanvasList, UserList } from "./pages";
import { AuthPage } from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3ecf8e",
            colorText: "#80808a",
            colorError: "#fa541c",
            colorBgLayout: "#f0f2f5",
            colorLink: "#3ecf8e",
            colorLinkActive: "#3ecf8e",
            colorLinkHover: "#3ecf8e",
          },
        }}
      >
        <AntdApp>
          <Refine
            auditLogProvider={auditLogProvider}
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            accessControlProvider={accessControlProvider}
            routerProvider={routerBindings}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "users",
                list: "/users",
              },
              {
                name: "canvases",
                list: "/canvases",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated key="authenticated-routes">
                    <ThemedLayoutV2 Title={Title}>
                      <CanAccess>
                        <Outlet />
                      </CanAccess>
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<NavigateToResource />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/canvases" element={<CanvasList />} />
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="users" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={<AuthPage type="login" registerLink={false} />}
                />
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
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
