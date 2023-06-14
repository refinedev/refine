import { GitHubBanner, Refine, useLoadingOvertime } from "@refinedev/core";
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

import { PostList, PostCreate, PostEdit, PostShow } from "../src/pages/posts";
import { useState } from "react";

const API_URL = "https://api.fake-rest.refine.dev";

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { elapsedTime } = useLoadingOvertime({
        isLoading,
        interval: 1000,
        onInterval(elapsedInterval, context) {
            console.log("loading overtime", elapsedInterval, context);
        },
    });

    return (
        <section>
            <h1>Dashboard</h1>
            <button onClick={() => setIsLoading((prev) => !prev)}>
                {isLoading ? "Stop" : "Start"} Loading
            </button>
            <p>{elapsedTime && `Loading took ${elapsedTime}`} </p>
        </section>
    );
};

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
                        undoableTimeout: 1000000000,
                        overtime: {
                            // interval: 500,
                            // onInterval(elapsedInterval, context) {
                            //     console.log(
                            //         "loading overtime",
                            //         elapsedInterval,
                            //         context,
                            //     );
                            // },
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
                            <Route index element={<DashboardPage />} />

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
