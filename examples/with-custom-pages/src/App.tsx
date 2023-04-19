import {
    GitHubBanner,
    Refine,
    Authenticated,
    AuthBindings,
} from "@refinedev/core";
import {
    notificationProvider,
    AuthPage,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { PostReview } from "pages/post-review";
import { Sider } from "components/sider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: async ({ email }) => {
            if (email) {
                localStorage.setItem("email", email);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                message: "Invalid email or password",
            };
        },
        logout: async () => {
            localStorage.removeItem("email");
            return { redirectTo: "/login", success: true };
        },
        onError: async (error) => {
            console.error(error);
            return { error };
        },
        check: async () =>
            localStorage.getItem("email")
                ? {
                      authenticated: true,
                  }
                : {
                      authenticated: false,
                      redirectTo: "/login",
                  },
        getPermissions: async () => ["admin"],
    };

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(API_URL)}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            show: "/posts/show/:id",
                        },
                    ]}
                    notificationProvider={notificationProvider}
                    options={{
                        warnWhenUnsavedChanges: true,
                        syncWithLocation: true,
                    }}
                >
                    <Routes>
                        <Route index element={<Navigate to="post-review" />} />

                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2 Sider={() => <Sider />}>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="posts">
                                <Route index element={<PostList />} />
                                <Route path="create" element={<PostCreate />} />
                                <Route path="edit/:id" element={<PostEdit />} />
                                <Route path="show/:id" element={<PostShow />} />
                            </Route>

                            <Route
                                path="post-review"
                                element={<PostReview />}
                            />
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="posts" />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        formProps={{
                                            initialValues: {
                                                email: "admin@refine.dev",
                                                password: "password",
                                            },
                                        }}
                                    />
                                }
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
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
