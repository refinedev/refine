import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    ReadyPage,
    ErrorComponent,
    Icons,
    ConfigProvider,
} from "@pankod/refine-antd";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerProvider from "@pankod/refine-react-router-v6";

import { Layout } from "components/layout";
import { CanvasFeaturedList, CanvasList, CanvasShow } from "pages/canvases";
import { AuthPage } from "pages/auth";

import { supabaseClient } from "utility";
import authProvider from "./auth-provider";

import "@pankod/refine-antd/dist/reset.css";

import "styles/style.css";

const { GoogleOutlined, GithubOutlined } = Icons;

function App() {
    return (
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
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={{
                    ...routerProvider,
                    routes: [
                        {
                            path: "/login",
                            element: (
                                <AuthPage
                                    type="login"
                                    providers={[
                                        {
                                            name: "google",
                                            icon: (
                                                <GoogleOutlined
                                                    style={{ fontSize: "18px" }}
                                                />
                                            ),
                                            label: "Sign in with Google",
                                        },
                                        {
                                            name: "github",
                                            icon: (
                                                <GithubOutlined
                                                    style={{ fontSize: "18px" }}
                                                />
                                            ),
                                            label: "Sign in with GitHub",
                                        },
                                    ]}
                                    formProps={{
                                        initialValues: {
                                            email: "info@refine.dev",
                                            password: "refine-supabase",
                                        },
                                    }}
                                />
                            ),
                        },
                        {
                            path: "/register",
                            element: <AuthPage type="register" />,
                        },
                        {
                            path: "/forgot-password",
                            element: <AuthPage type="forgotPassword" />,
                        },
                        {
                            path: "/update-password",
                            element: <AuthPage type="updatePassword" />,
                        },
                    ],
                }}
                DashboardPage={() => <CanvasFeaturedList />}
                resources={[
                    {
                        name: "canvases",
                        list: CanvasList,
                        show: CanvasShow,
                    },
                ]}
                notificationProvider={notificationProvider}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Layout={Layout}
            />
        </ConfigProvider>
    );
}

export default App;
