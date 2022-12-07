import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    AuthPage,
    notificationProvider,
    ReadyPage,
    ErrorComponent,
    Icons,
    Image,
} from "@pankod/refine-antd";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerProvider from "@pankod/refine-react-router-v6";

import { Layout } from "components/layout";
import { SponsorsBanner } from "components/banners";
import { CanvasFeaturedList, CanvasList, CanvasShow } from "pages";
import { supabaseClient } from "utility";
import authProvider from "./auth-provider";

import "styles/antd.less";

const { GoogleOutlined, GithubOutlined } = Icons;
const { Link } = routerProvider;

function App() {
    return (
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
                                            <SponsorsBanner />
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
    );
}

export default App;
