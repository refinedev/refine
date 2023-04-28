import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ErrorComponent,
    RefineThemes,
    ThemedLayoutV2,
    AuthPage,
} from "@refinedev/antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { useState } from "react";
import { authProvider } from "utils/authProvider";
import ThemeSettings from "components/theme-settings";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const [customTheme, setCustomTheme] = useState<ThemeConfig>({
        token: RefineThemes.Magenta.token,
        algorithm: theme.darkAlgorithm,
    });

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={customTheme}>
                <ThemeSettings
                    currentTheme={customTheme}
                    onThemeClick={(theme) => setCustomTheme(theme)}
                />
                <Refine
                    authProvider={authProvider}
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
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        type="login"
                                        providers={[
                                            {
                                                name: "google",
                                                label: "Sign in with Google",
                                                icon: (
                                                    <GoogleOutlined
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeight: 0,
                                                        }}
                                                    />
                                                ),
                                            },
                                            {
                                                name: "github",
                                                label: "Sign in with GitHub",
                                                icon: (
                                                    <GithubOutlined
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeight: 0,
                                                        }}
                                                    />
                                                ),
                                            },
                                        ]}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <AuthPage
                                        type="register"
                                        providers={[
                                            {
                                                name: "google",
                                                label: "Sign in with Google",
                                                icon: (
                                                    <GoogleOutlined
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeight: 0,
                                                        }}
                                                    />
                                                ),
                                            },
                                            {
                                                name: "github",
                                                label: "Sign in with GitHub",
                                                icon: (
                                                    <GithubOutlined
                                                        style={{
                                                            fontSize: 14,
                                                            lineHeight: 0,
                                                        }}
                                                    />
                                                ),
                                            },
                                        ]}
                                    />
                                }
                            />
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            <Route
                                path="/update-password"
                                element={<AuthPage type="updatePassword" />}
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
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
