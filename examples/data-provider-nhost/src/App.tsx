import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    AuthPage,
    ErrorComponent,
} from "@refinedev/antd";
import dataProvider from "@refinedev/nhost";
import { NhostAuthProvider } from "@nhost/react-auth";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { nhost } from "utility";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        const { error } = await nhost.auth.signIn({
            email,
            password,
        });

        if (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                    name: "Login Error",
                },
            };
        }

        return {
            success: true,
            redirectTo: "/",
        };
    },
    logout: async () => {
        const { error } = await nhost.auth.signOut();
        if (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                    name: "Login Error",
                },
            };
        }

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error.status === 401) {
            nhost.auth.refreshSession();
        }

        return {};
    },
    check: async () => {
        const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
        if (isAuthenticated) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: new Error("Not authenticated"),
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => {
        const user = nhost.auth.getUser();
        if (user) {
            return user.roles;
        }

        return [];
    },
    getIdentity: async () => {
        const user = nhost.auth.getUser();
        if (user) {
            return {
                ...user,
                name: user.displayName,
                avatar: user.avatarUrl,
            };
        }

        return null;
    },
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <NhostAuthProvider nhost={nhost}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(nhost)}
                    // Refine supports GraphQL subscriptions as out-of-the-box. For more detailed information, please visit here, https://refine.dev/docs/core/providers/live-provider/
                    // liveProvider={liveProvider(gqlWebSocketClient)}
                    // options={{ liveMode: "auto" }}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            show: "/posts/show/:id",
                        },
                        {
                            name: "categories",
                            list: "/categories",
                            create: "/categories/create",
                            edit: "/categories/edit/:id",
                        },
                    ]}
                    notificationProvider={notificationProvider}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<Navigate to="/login" />}
                                >
                                    <Layout>
                                        <Outlet />
                                    </Layout>
                                </Authenticated>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="posts" />
                                }
                            />
                            <Route path="/posts" element={<PostList />} />
                            <Route
                                path="/posts/create"
                                element={<PostCreate />}
                            />
                            <Route
                                path="/posts/edit/:id"
                                element={<PostEdit />}
                            />
                            <Route
                                path="/posts/show/:id"
                                element={<PostShow />}
                            />
                            <Route
                                path="/categories"
                                element={<CategoryList />}
                            />
                            <Route
                                path="/categories/create"
                                element={<CategoryCreate />}
                            />
                            <Route
                                path="/categories/edit/:id"
                                element={<CategoryEdit />}
                            />
                        </Route>

                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        formProps={{
                                            initialValues: {
                                                email: "info@refine.dev",
                                                password: "demodemo",
                                            },
                                        }}
                                    />
                                }
                            />
                        </Route>

                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <Layout>
                                        <Outlet />
                                    </Layout>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </NhostAuthProvider>
        </BrowserRouter>
    );
};

export default App;
