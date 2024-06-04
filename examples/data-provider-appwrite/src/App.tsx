import {
  AuthPage,
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import {
  type AppwriteException,
  dataProvider,
  liveProvider,
} from "@refinedev/appwrite";
import {
  type AuthProvider,
  Authenticated,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";
import { App as AntdApp, ConfigProvider } from "antd";

import { account, appwriteClient } from "./utility";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      await account.createEmailSession(email, password);
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const { type, message, code } = e as AppwriteException;
      return {
        success: false,
        error: {
          message,
          name: `${code} - ${type}`,
        },
      };
    }
  },
  logout: async () => {
    try {
      await account.deleteSession("current");
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error?.code === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    try {
      const session = await account.get();

      if (session) {
        return {
          authenticated: true,
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error,
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Session not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = await account.get();

    if (user) {
      return user;
    }

    return null;
  },
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(appwriteClient, {
              databaseId: "default",
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: "default",
            })}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "61c43ad33b857",
                list: "/posts",
                create: "/posts/create",
                edit: "/posts/edit/:id",
                show: "/posts/show/:id",
                meta: {
                  label: "Post",
                },
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              liveMode: "auto",
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
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="61c43ad33b857" />}
                />

                <Route path="/posts">
                  <Route index element={<PostList />} />
                  <Route path="create" element={<PostCreate />} />
                  <Route path="edit/:id" element={<PostEdit />} />
                  <Route path="show/:id" element={<PostShow />} />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="61c43ad33b857" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      formProps={{
                        initialValues: {
                          remember: false,
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
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
