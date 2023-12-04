import {
    AuthPage,
    ErrorComponent,
    RefineThemes,
    ThemedLayoutV2,
    useNotificationProvider,
} from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import "@refinedev/antd/dist/reset.css";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { appwriteClient, authProvider } from "./utility";
import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        dataProvider={dataProvider(appwriteClient, {
                            databaseId: "6537bfaa2f54cd235e51",
                        })}
                        liveProvider={liveProvider(appwriteClient, {
                            databaseId: "6537bfaa2f54cd235e51",
                        })}
                        authProvider={authProvider}
                        routerProvider={routerProvider}
                        resources={[
                            {
                                name: "6537bff1acea7f73acbf",
                                list: "/posts",
                                create: "/posts/create",
                                edit: "/posts/edit/:id",
                                show: "/posts/show/:id",
                                meta: {
                                    label: "Posts",
                                },
                            },
                        ]}
                        notificationProvider={useNotificationProvider}
                        options={{
                            liveMode: "auto",
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        key="authenticated-routes"
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
                                        <NavigateToResource resource="6537bff1acea7f73acbf" />
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
                            </Route>

                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="6537bff1acea7f73acbf" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage forgotPasswordLink={false} />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={<AuthPage type="register" />}
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated key="catch-all">
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
                        <DocumentTitleHandler />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
