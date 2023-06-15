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

import { PostList } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(API_URL)}
                    routerProvider={routerProvider}
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
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
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="blog_posts" />
                                }
                            />

                            <Route path="/blog-posts" element={<PostList />} />

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
