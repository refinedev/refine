import { Authenticated, Refine } from "@refinedev/core";

import {
    notificationProvider,
    LoginPage,
    ErrorComponent,
} from "@refinedev/antd";

import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";
import { DataProvider } from "@refinedev/strapi";
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
            <Refine
                dataProvider={dataProvider}
                authProvider={authProvider}
                Header={Header}
                Layout={Layout}
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
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
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
                        <Route path="/login" element={<LoginPage />} />
                    </Route>

                    <Route
                        element={
                            <Authenticated fallback={<Outlet />}>
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
            </Refine>
        </BrowserRouter>
    );
}

export default App;
