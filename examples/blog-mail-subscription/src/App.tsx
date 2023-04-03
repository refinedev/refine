import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ErrorComponent,
    AuthPage,
    RefineThemes,
} from "@refinedev/antd";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { DataProvider } from "@refinedev/strapi";

import { ConfigProvider } from "antd";
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
                                <Route path="create" element={<MailCreate />} />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="subscribers" />
                                </Authenticated>
                            }
                        >
                            <Route path="/login" element={<AuthPage />} />
                        </Route>

                        <Route
                            element={
                                <Authenticated>
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
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
