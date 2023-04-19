import {
    AuthBindings,
    Authenticated,
    GitHubBanner,
    Refine,
} from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider, { GraphQLClient } from "@refinedev/strapi-graphql";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { Login } from "pages/login";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.strapi.refine.dev/graphql";

const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "post",
                meta: {
                    operation: "login",
                    variables: {
                        input: {
                            value: { identifier: email, password },
                            type: "UsersPermissionsLoginInput",
                            required: true,
                        },
                    },
                    fields: ["jwt"],
                },
            });

            localStorage.setItem("token", data.jwt);
            client.setHeader("Authorization", `Bearer ${data.jwt}`);

            return {
                success: true,
                redirectTo: "/",
            };
        } catch (error: any) {
            return {
                success: false,
                error: new Error(error),
            };
        }
    },
    logout: async () => {
        localStorage.removeItem("token");
        client.setHeader("Authorization", "");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const jwt = localStorage.getItem("token");

        if (!jwt) {
            return {
                authenticated: false,
                error: {
                    message: "Check failed",
                    name: "Token not found",
                },
                redirectTo: "/login",
            };
        }

        client.setHeader("Authorization", `Bearer ${jwt}`);

        return {
            authenticated: true,
        };
    },
    getPermissions: async () => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "get",
                meta: {
                    operation: "me",
                    fields: [
                        {
                            role: ["name", "description", "type"],
                        },
                    ],
                },
            });
            const { role } = data;

            return role;
        } catch (error) {
            return null;
        }
    },
    getIdentity: async () => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "get",
                meta: {
                    operation: "me",
                    fields: ["id", "username", "email"],
                },
            });
            const { id, username, email } = data;
            return {
                id,
                name: username,
                email,
            };
        } catch (error) {
            return error;
        }
    },
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={gqlDataProvider}
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            show: "/posts/show/:id",
                            meta: {
                                canDelete: true,
                            },
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
                                element={
                                    <NavigateToResource resource="posts" />
                                }
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
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="posts" />
                                </Authenticated>
                            }
                        >
                            <Route path="/login" element={<Login />} />
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
