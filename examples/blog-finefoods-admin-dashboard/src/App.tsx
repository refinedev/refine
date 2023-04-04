import {
    Authenticated,
    ErrorComponent,
    GitHubBanner,
    Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, Layout } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { DashboardOutlined } from "@ant-design/icons";
import { DashboardPage } from "pages/Dashboard";
import { Header, Title, OffLayoutArea } from "components";
import { authProvider } from "authProvider";
import { AuthPage } from "pages/auth";
import jsonServerDataProvider from "@refinedev/simple-rest";

function App() {
    const API_URL = "https://api.finefoods.refine.dev";
    const dataProvider = jsonServerDataProvider(API_URL);

    return (
        <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <Refine
                        notificationProvider={notificationProvider}
                        routerProvider={routerBindings}
                        authProvider={authProvider}
                        dataProvider={dataProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                        resources={[
                            {
                                name: "dashboard",
                                list: "/",
                                meta: {
                                    label: "Dashboard",
                                    icon: <DashboardOutlined />,
                                },
                            },
                        ]}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <Layout
                                            Header={Header}
                                            Title={Title}
                                            OffLayoutArea={OffLayoutArea}
                                        >
                                            <Outlet />
                                        </Layout>
                                    </Authenticated>
                                }
                            >
                                <Route index element={<DashboardPage />} />
                            </Route>

                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource resource="dashboard" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            formProps={{
                                                initialValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <AuthPage
                                            type="register"
                                            formProps={{
                                                initialValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated>
                                        <Layout
                                            Header={Header}
                                            Title={Title}
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
                        <RefineKbar />
                        <UnsavedChangesNotifier />
                    </Refine>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
