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

import { FeedbackList } from "./pages/FeedbackList";

import "styles/global.css";

function App() {
    const API_URL = "http://localhost:1337";

    const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
    const dataProvider = DataProvider(API_URL, axiosInstance);
    return (
        <BrowserRouter>
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
                notificationProvider={notificationProvider}
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
                                <NavigateToResource resource="feedbacks" />
                            }
                        />

                        <Route path="/feedbacks" element={<FeedbackList />} />
                    </Route>

                    <Route
                        element={
                            <Authenticated fallback={<Outlet />}>
                                <NavigateToResource resource="feedbacks" />
                            </Authenticated>
                        }
                    >
                        <Route path="/login" element={<LoginPage />} />
                    </Route>

                    <Route
                        element={
                            <Authenticated>
                                <Layout>
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
