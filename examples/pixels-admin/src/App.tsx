import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    AuthPage,
    notificationProvider,
    ReadyPage,
    ErrorComponent,
    Icons,
    Image,
    ConfigProvider,
} from "@pankod/refine-antd";

import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerProvider from "@pankod/refine-react-router-v6";
import { supabaseClient } from "utility";
import "@pankod/refine-antd/dist/reset.css";

import {
    Title,
    Header,
    Sider,
    Footer,
    Layout,
    OffLayoutArea,
} from "components/layout";
import {
    auditLogProvider,
    authProvider,
    accessControlProvider,
} from "providers";
import { CanvasList, UserList } from "pages";
import { StackBanner } from "components/banners";

const { GoogleOutlined, GithubOutlined } = Icons;
const { Link } = routerProvider;

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
                auditLogProvider={auditLogProvider}
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                accessControlProvider={accessControlProvider}
                routerProvider={{
                    ...routerProvider,
                    routes: [
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
                resources={[
                    {
                        name: "users",
                        list: UserList,
                    },
                    {
                        name: "canvases",
                        list: CanvasList,
                    },
                ]}
                LoginPage={() => (
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
                        wrapperProps={{
                            style: {
                                background: "#fff",
                            },
                        }}
                        renderContent={(content: React.ReactNode) => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Link
                                        to="/"
                                        style={{ marginBottom: "32px" }}
                                    >
                                        <Image
                                            height="160"
                                            src="/pixels-logo.svg"
                                            alt="pixels-logo"
                                        />
                                    </Link>
                                    {content}
                                    <StackBanner />
                                </div>
                            );
                        }}
                        contentProps={{
                            style: {
                                backgroundColor: "#fff",
                                border: "1px solid #f5f5f5",
                                borderRadius: "16px",
                                boxShadow:
                                    "4px 8px 16px rgba(42, 42, 66, 0.25)",
                                width: "384px",
                                padding: "0",
                            },
                        }}
                    />
                )}
                notificationProvider={notificationProvider}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Title={Title}
                Header={Header}
                Sider={Sider}
                Footer={Footer}
                Layout={Layout}
                OffLayoutArea={OffLayoutArea}
            />
        </ConfigProvider>
    );
}

export default App;
