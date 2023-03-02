import { Authenticated, Refine } from "@pankod/refine-core";
import {
    ErrorComponent,
    Layout,
    notificationProvider,
} from "@pankod/refine-antd";
import { ConfigProvider } from "antd";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerBindings, {
    NavigateToResource,
} from "@pankod/refine-react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { Title } from "./components/layout";
import { supabaseClient } from "utility";

import "@pankod/refine-antd/dist/reset.css";

import {
    auditLogProvider,
    authProvider,
    accessControlProvider,
} from "providers";
import { CanvasList, UserList } from "pages";
import { AuthPage } from "pages/auth";

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
                    auditLogProvider={auditLogProvider}
                    dataProvider={dataProvider(supabaseClient)}
                    liveProvider={liveProvider(supabaseClient)}
                    authProvider={authProvider}
                    accessControlProvider={accessControlProvider}
                    routerProvider={routerBindings}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "users",
                            list: "/users",
                        },
                        {
                            name: "canvases",
                            list: "/canvases",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated>
                                    <Layout Title={Title}>
                                        <Outlet />
                                    </Layout>
                                </Authenticated>
                            }
                        >
                            <Route index element={<NavigateToResource />} />
                            <Route path="/users" element={<UserList />} />
                            <Route path="/canvases" element={<CanvasList />} />
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
                                        registerLink={false}
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

                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
