import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        {
                            name: "CMS",
                        },
                        {
                            name: "posts",
                            list: "/CMS/posts",
                            create: "/CMS/posts/create",
                            edit: "/CMS/posts/edit/:id",
                            show: "/CMS/posts/show/:id",
                            meta: {
                                parent: "CMS",
                            },
                        },
                        {
                            name: "categories",
                            list: "/CMS/categories",
                            create: "/CMS/categories/create",
                            edit: "/CMS/categories/edit/:id",
                            meta: {
                                parent: "CMS",
                                canDelete: true,
                            },
                        },
                    ]}
                    notificationProvider={notificationProvider}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="posts" />
                                }
                            />

                            <Route path="CMS">
                                <Route path="posts">
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

                                <Route path="categories">
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

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
