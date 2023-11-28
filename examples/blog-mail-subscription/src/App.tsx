import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    useNotificationProvider,
    ErrorComponent,
    AuthPage,
    RefineThemes,
} from "@refinedev/antd";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { DataProvider } from "@refinedev/strapi";

import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

import strapiAuthProvider from "authProvider";
import { Header, Layout, OffLayoutArea } from "components";
import { SubscriberList, CreateSubscriber } from "./pages/subscriber";
import { MessageList, MailCreate } from "./pages/mail";

function App() {
    const API_URL = "http://localhost:1337";

    const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
    const dataProvider = DataProvider(API_URL, axiosInstance);
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        dataProvider={dataProvider}
                        authProvider={authProvider}
                        routerProvider={routerProvider}
                        resources={[
                            {
                                name: "subscribers",
                                list: "/subscribers",
                                create: "/subscribers/create",
                            },
                            {
                                name: "messages",
                                list: "/messages",
                                create: "/messages/create",
                            },
                        ]}
                        notificationProvider={useNotificationProvider}
                        options={{
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
                                        <Layout
                                            Header={Header}
                                            OffLayoutArea={OffLayoutArea}
                                        >
                                            <Outlet />
                                        </Layout>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="subscribers" />
                                    }
                                />

                                <Route path="subscribers">
                                    <Route index element={<SubscriberList />} />
                                    <Route
                                        path="create"
                                        element={<CreateSubscriber />}
                                    />
                                </Route>

                                <Route path="messages">
                                    <Route index element={<MessageList />} />
                                    <Route
                                        path="create"
                                        element={<MailCreate />}
                                    />
                                </Route>
                            </Route>

                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="subscribers" />
                                    </Authenticated>
                                }
                            >
                                <Route path="/login" element={<AuthPage />} />
                            </Route>

                            <Route
                                element={
                                    <Authenticated key="catch-all">
                                        <Layout
                                            Header={Header}
                                            OffLayoutArea={OffLayoutArea}
                                        >
                                            <Outlet />
                                        </Layout>
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
}

export default App;
