import {
    AuthBindings,
    Authenticated,
    GitHubBanner,
    Refine,
} from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    AuthPage,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/nhost";
import { NhostAuthProvider } from "@nhost/react-auth";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { nhost } from "utility";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";
import { ConfigProvider } from "antd";

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
            error: {
                message: "Check failed",
                name: "Not authenticated",
            },
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
            <GitHubBanner />
            <NhostAuthProvider nhost={nhost}>
                <ConfigProvider theme={RefineThemes.Blue}>
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
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="posts" />
                                    }
                                />

                                <Route path="/posts">
                                    <Route index element={<PostList />} />
                                    <Route
                                        path="create"
                                        element={<PostCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<PostEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<PostShow />}
                                    />
                                </Route>

                                <Route path="/categories">
                                    <Route index element={<CategoryList />} />
                                    <Route
                                        path="create"
                                        element={<CategoryCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<CategoryEdit />}
                                    />
                                </Route>
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
            </NhostAuthProvider>
        </BrowserRouter>
    );
};

export default App;
