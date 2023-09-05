import React, { Suspense } from "react";

import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
    ErrorComponent,
    notificationProvider,
    ThemedLayoutV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

const BlogPostList = React.lazy(() => import("blog_posts/BlogPostList"));
const BlogPostShow = React.lazy(() => import("blog_posts/BlogPostShow"));
const BlogPostEdit = React.lazy(() => import("blog_posts/BlogPostEdit"));
const BlogPostCreate = React.lazy(() => import("blog_posts/BlogPostCreate"));

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <Refine
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
                        routerProvider={routerBindings}
                        authProvider={authProvider}
                        resources={[
                            {
                                name: "blog_posts",
                                list: "/blog-posts",
                                create: "/blog-posts/create",
                                edit: "/blog-posts/edit/:id",
                                show: "/blog-posts/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            },
                            {
                                name: "categories",
                                list: "/categories",
                                create: "/categories/create",
                                edit: "/categories/edit/:id",
                                show: "/categories/show/:id",
                                meta: {
                                    canDelete: true,
                                },
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
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2 Header={Header}>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route index element={<div>Dashboard</div>} />
                                <Route path="/blog-posts">
                                    <Route
                                        index
                                        element={
                                            <Suspense
                                                fallback={<div>Loading...</div>}
                                            >
                                                <BlogPostList />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="create"
                                        element={
                                            <Suspense
                                                fallback={<div>Loading...</div>}
                                            >
                                                <BlogPostCreate />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={
                                            <Suspense
                                                fallback={<div>Loading...</div>}
                                            >
                                                <BlogPostEdit />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="show/:id"
                                        element={
                                            <Suspense
                                                fallback={<div>Loading...</div>}
                                            >
                                                <BlogPostShow />
                                            </Suspense>
                                        }
                                    />
                                </Route>
                                {/* <Route path="/categories">
                                    <Route index element={<CategoryList />} />
                                    <Route
                                        path="create"
                                        element={<CategoryCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<CategoryEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<CategoryShow />}
                                    />
                                </Route> */}
                            </Route>
                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource />
                                    </Authenticated>
                                }
                            >
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/forgot-password"
                                    element={<ForgotPassword />}
                                />
                            </Route>
                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2 Header={Header}>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>

                        <RefineKbar />
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
