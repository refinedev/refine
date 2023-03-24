import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ErrorComponent,
    RefineThemes,
    ThemedLayout,
    AuthPage,
} from "@refinedev/antd";
import {
    GoogleOutlined,
    GithubOutlined,
    DashboardOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Modal, Space, theme } from "antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import DashboardPage from "pages/dashboard";
import { useState } from "react";
import { authProvider } from "utils/authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [customTheme, setCustomTheme] = useState({
        token: RefineThemes.Magenta.token,
        algorithm: theme.darkAlgorithm,
    });

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={customTheme}>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        {
                            name: "dashboard",
                            list: "/",
                            meta: {
                                label: "Dashboard",
                                icon: <DashboardOutlined />,
                            },
                        },
                        {
                            name: "Multi Level",
                            meta: {
                                label: "Multi Level",
                            },
                        },
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
                        {
                            name: "Demo 1",
                            list: "/demo1",
                            meta: {
                                label: "Demo 1",
                                parent: "Multi Level",
                            },
                        },
                        {
                            name: "Demo 2",
                            list: "/demo2",
                            meta: {
                                label: "Demo 2",
                                parent: "Multi Level",
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
                                    <ThemedLayout>
                                        <Outlet />
                                    </ThemedLayout>
                                </Authenticated>
                            }
                        >
                            <Route index element={<DashboardPage />} />

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
                                    <ThemedLayout>
                                        <Outlet />
                                    </ThemedLayout>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />

                    {/** antd theme config debugger **/}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        <Button
                            onClick={() =>
                                setIsConfigModalOpen((prevState) => !prevState)
                            }
                        >
                            Open Config Modal
                        </Button>
                    </div>
                    <Modal
                        open={isConfigModalOpen}
                        onCancel={() => setIsConfigModalOpen(false)}
                        destroyOnClose
                    >
                        <Space
                            style={{
                                flexWrap: "wrap",
                            }}
                        >
                            {Object.keys(RefineThemes).map((name) => {
                                const theme =
                                    RefineThemes[
                                        name as keyof typeof RefineThemes
                                    ];

                                return (
                                    <Button
                                        key={theme.token?.colorPrimary}
                                        onClick={() => {
                                            setCustomTheme((prevState) => ({
                                                ...prevState,
                                                token: theme.token,
                                            }));
                                            setIsConfigModalOpen(false);
                                        }}
                                        style={{
                                            background:
                                                theme.token?.colorPrimary,
                                        }}
                                    >
                                        {theme.token?.colorPrimary}
                                    </Button>
                                );
                            })}
                        </Space>

                        <Space
                            style={{
                                marginTop: 24,
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setCustomTheme((prevState) => ({
                                        ...prevState,
                                        algorithm: theme.darkAlgorithm,
                                    }));
                                    setIsConfigModalOpen(false);
                                }}
                            >
                                Set dark mode
                            </Button>
                            <Button
                                onClick={() => {
                                    setCustomTheme((prevState) => ({
                                        ...prevState,
                                        algorithm: theme.defaultAlgorithm,
                                    }));
                                    setIsConfigModalOpen(false);
                                }}
                            >
                                Set light mode
                            </Button>
                        </Space>
                    </Modal>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
