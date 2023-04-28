import React from "react";

import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { MantineInferencer } from "@refinedev/inferencer/mantine";

import {
    notificationProvider,
    ThemedLayoutV2,
    RefineThemes,
    ErrorComponent,
    AuthPage,
} from "@refinedev/mantine";

import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";

import { DataProvider } from "@refinedev/strapi-v4";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";

import { PostList, PostCreate, PostEdit } from "./pages/posts";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <MantineProvider
                theme={RefineThemes.Blue}
                withNormalizeCSS
                withGlobalStyles
            >
                <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
                <NotificationsProvider position="top-right">
                    <Refine
                        authProvider={authProvider}
                        dataProvider={DataProvider(
                            API_URL + `/api`,
                            axiosInstance,
                        )}
                        notificationProvider={notificationProvider}
                        routerProvider={routerProvider}
                        resources={[
                            {
                                name: "posts",
                                list: "/posts",
                                create: "/posts/create",
                                edit: "/posts/edit/:id",
                                meta: {
                                    canDelete: true,
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
                        options={{
                            mutationMode: "optimistic",
                            syncWithLocation: true,
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

                                <Route path="posts">
                                    <Route index element={<PostList />} />
                                    <Route
                                        path="edit/:id"
                                        element={<PostEdit />}
                                    />
                                    <Route
                                        path="create"
                                        element={<PostCreate />}
                                    />
                                </Route>

                                <Route path="categories">
                                    <Route
                                        index
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="create"
                                        element={<MantineInferencer />}
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
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
}

export default App;
