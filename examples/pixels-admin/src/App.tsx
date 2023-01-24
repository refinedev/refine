import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    Layout,
    notificationProvider,
    ReadyPage,
    ErrorComponent,
    ConfigProvider,
} from "@pankod/refine-antd";
import { Title } from "./components/layout";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerProvider from "@pankod/refine-react-router-v6";
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
                        formProps={{
                            initialValues: {
                                email: "info@refine.dev",
                                password: "refine-supabase",
                            },
                        }}
                        registerLink={false}
                    />
                )}
                notificationProvider={notificationProvider}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Layout={Layout}
                Title={Title}
            />
        </ConfigProvider>
    );
}

export default App;
