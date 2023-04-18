import { GitHubBanner, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { BlogPostList } from "pages/blog-posts/list";
import { BlogPostCreate } from "pages/blog-posts/create";
import { BlogPostShow } from "pages/blog-posts/show";
import { BlogPostEdit } from "pages/blog-posts/edit";

function App() {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <GitHubBanner />
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                            show: "/blog-posts/show/:id",
                            create: "/blog-posts/create",
                            edit: "/blog-posts/edit/:id",
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
                    <ThemedLayoutV2>
                        <Routes>
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="blog_posts" />
                                }
                            />

                            <Route path="/blog-posts">
                                <Route index element={<BlogPostList />} />
                                <Route
                                    path="show/:id"
                                    element={<BlogPostShow />}
                                />
                                <Route
                                    path="create"
                                    element={<BlogPostCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<BlogPostEdit />}
                                />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </ThemedLayoutV2>
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
