import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={{
                        ...dataProvider(API_URL),
                        getList: async (params) => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(
                                        dataProvider(API_URL).getList(params),
                                    );
                                }, 5000);
                            });
                        },
                        update: async (params) => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(
                                        dataProvider(API_URL).update(params),
                                    );
                                }, 6000);
                            });
                        },
                        getOne: async (params) => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(
                                        dataProvider(API_URL).getOne(params),
                                    );
                                }, 6000);
                            });
                        },
                        create: async (params) => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(
                                        dataProvider(API_URL).create(params),
                                    );
                                }, 6000);
                            });
                        },
                    }}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            show: "/posts/show/:id",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                    ]}
                    notificationProvider={notificationProvider}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        reactQuery: {
                            clientConfig: {
                                defaultOptions: {
                                    queries: {
                                        cacheTime: 0,
                                    },
                                },
                            },
                        },
                        overtime: {
                            interval: 1000,
                            onInterval(elapsedInterval) {
                                console.log(elapsedInterval);
                            },
                        },
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route index element={<NavigateToResource />} />

                            <Route path="/posts">
                                <Route index element={<PostList />} />
                                <Route path="create" element={<PostCreate />} />
                                <Route path="edit/:id" element={<PostEdit />} />
                                <Route path="show/:id" element={<PostShow />} />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
