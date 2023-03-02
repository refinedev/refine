import { Refine, Authenticated } from "@pankod/refine-core";
import { notificationProvider, ErrorComponent } from "@pankod/refine-antd";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerBindings, {
    NavigateToResource,
} from "@pankod/refine-react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import { Layout } from "components/layout";
import { CanvasFeaturedList, CanvasList, CanvasShow } from "pages/canvases";
import { AuthPage } from "pages/auth";

import { supabaseClient } from "utility";
import { authProvider, auditLogProvider } from "./providers";

import "@pankod/refine-antd/dist/reset.css";

import "styles/style.css";

function App() {
    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#3ecf8e",
                        colorText: "#80808a",
                        colorError: "#fa541c",
                        colorBgLayout: "#f0f2f5",
                        colorLink: "#3ecf8e",
                        colorLinkActive: "#3ecf8e",
                        colorLinkHover: "#3ecf8e",
                    },
                }}
            >
                <Refine
                    authProvider={authProvider}
                    dataProvider={dataProvider(supabaseClient)}
                    liveProvider={liveProvider(supabaseClient)}
                    auditLogProvider={auditLogProvider}
                    routerProvider={routerBindings}
                    resources={[
                        {
                            name: "canvases",
                            list: CanvasList,
                            show: CanvasShow,
                        },
                    ]}
                    notificationProvider={notificationProvider}
                >
                    <Routes>
                        <Route
                            element={
                                <Layout>
                                    <Outlet />
                                </Layout>
                            }
                        >
                            <Route index element={<CanvasFeaturedList />} />
                            <Route path="/canvases" element={<CanvasList />} />
                            <Route
                                path="/canvases/show/:id"
                                element={<CanvasShow />}
                            />
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource />
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
                                                name: "github",
                                                icon: (
                                                    <GithubOutlined
                                                        style={{
                                                            fontSize: "18px",
                                                        }}
                                                    />
                                                ),
                                                label: "Sign in with GitHub",
                                            },
                                        ]}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={<AuthPage type="register" />}
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

                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
