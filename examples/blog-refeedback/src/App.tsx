import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";

import {
    useNotificationProvider,
    AuthPage,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";

import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";
import { DataProvider } from "@refinedev/strapi";
import strapiAuthProvider from "authProvider";
import { Header, Layout, OffLayoutArea } from "components";

import { FeedbackList } from "./pages/FeedbackList";

import "styles/global.css";

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
                                name: "feedbacks",
                                list: "/feedbacks",
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
                                        <NavigateToResource resource="feedbacks" />
                                    }
                                />

                                <Route
                                    path="/feedbacks"
                                    element={<FeedbackList />}
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="feedbacks" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={<AuthPage type="login" />}
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated key="catch-all">
                                        <Layout>
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
