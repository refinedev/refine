import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoryList,
    CategoryCreate,
    CategoryEdit,
    CategoryShow,
} from "pages/categories";
import { DashboardPage } from "pages/dashboard";
import { ILoginDto } from "interfaces";

import refineSDK from "utils/refine-sdk";

const API_URL = "https://api.fake-rest.refine.dev";

const authProvider: AuthBindings = {
    login: async (payload: ILoginDto) => {
        const { email, password, providerName } = payload;

        try {
            await refineSDK.auth.login({
                email,
                password,
                provider: providerName,
            });

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: new Error("Invalid email or password"),
            };
        }
    },
    logout: async () => {
        try {
            await refineSDK.auth.logout();

            return {
                success: true,
                redirectTo: "/login",
            };
        } catch (error: any) {
            return {
                success: false,
                error: new Error(error),
            };
        }
    },
    onError: async () => ({}),
    check: async () => {
        try {
            await refineSDK.auth.getSessionFromUrl();
            const user = await refineSDK.auth.session();

            if (!user) {
                return {
                    authenticated: false,
                    redirectTo: "/login",
                    logout: true,
                };
            }

            return {
                authenticated: true,
            };
        } catch (error: any) {
            return {
                authenticated: false,
                redirectTo: "/login",
                logout: true,
                error,
            };
        }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        try {
            const response = await refineSDK.auth.session();
            return response;
        } catch (error) {
            return null;
        }
    },
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        show: "/posts/show/:id",
                        create: "/posts/create",
                        edit: "/posts/edit/:id",
                        meta: {
                            canDelete: true,
                            audit: ["create", "delete", "update"],
                        },
                    },
                    {
                        name: "categories",
                        list: "/categories",
                        show: "/categories/show/:id",
                        create: "/categories/create",
                        edit: "/categories/edit/:id",
                        meta: {
                            canDelete: true,
                        },
                    },
                ]}
                notificationProvider={notificationProvider}
                auditLogProvider={{
                    create: async ({ ...params }) => {
                        await refineSDK.log.create(params);
                    },
                    get: async ({ resource, action, meta, author }) => {
                        return await refineSDK.log.get({
                            resource,
                            action,
                            meta,
                            author,
                        });
                    },
                    update: async ({ id, name }) => {
                        return await refineSDK.log.update(id, {
                            name,
                        });
                    },
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <Layout>
                                    <Outlet />
                                </Layout>
                            </Authenticated>
                        }
                    >
                        <Route index element={<DashboardPage />} />

                        <Route path="/posts" element={<PostList />} />
                        <Route path="/posts/show/:id" element={<PostShow />} />
                        <Route path="/posts/create" element={<PostCreate />} />
                        <Route path="/posts/edit/:id" element={<PostEdit />} />

                        <Route path="/categories" element={<CategoryList />} />
                        <Route
                            path="/categories/show/:id"
                            element={<CategoryShow />}
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
                                <NavigateToResource resource="posts" />
                            </Authenticated>
                        }
                    >
                        <Route path="/login" element={<AuthPage />} />
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
        </BrowserRouter>
    );
};

export default App;
