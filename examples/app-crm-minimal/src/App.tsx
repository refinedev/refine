import { Refine, Authenticated, ErrorComponent } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import routerProvider, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp, ConfigProvider } from "antd";
import { Layout } from "@/components";
import { authProvider, dataProvider, liveProvider } from "@/providers";
import { resources } from "@/config/resources";

import {
    DashboardPage,
    CompanyCreatePage,
    CompanyEditPage,
    CompanyListPage,
    KanbanCreatePage,
    KanbanEditPage,
    KanbanListPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
} from "@/routes";

import "@refinedev/antd/dist/reset.css";
import { AutoLogin } from "@/components/auto-login";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <DevtoolsProvider>
                        <Refine
                            routerProvider={routerProvider}
                            dataProvider={dataProvider}
                            liveProvider={liveProvider}
                            notificationProvider={useNotificationProvider}
                            authProvider={authProvider}
                            resources={resources}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                liveMode: "auto",
                            }}
                        >
                            <AutoLogin>
                                <Routes>
                                    <Route
                                        element={
                                            <Authenticated
                                                key="authenticated-layout"
                                                fallback={
                                                    <CatchAllNavigate to="/login" />
                                                }
                                            >
                                                <Layout>
                                                    <Outlet />
                                                </Layout>
                                            </Authenticated>
                                        }
                                    >
                                        <Route
                                            index
                                            element={<DashboardPage />}
                                        />

                                        <Route
                                            path="/kanban"
                                            element={
                                                <KanbanListPage>
                                                    <Outlet />
                                                </KanbanListPage>
                                            }
                                        >
                                            <Route
                                                path="create"
                                                element={<KanbanCreatePage />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<KanbanEditPage />}
                                            />
                                        </Route>

                                        <Route
                                            path="/companies"
                                            element={
                                                <CompanyListPage>
                                                    <Outlet />
                                                </CompanyListPage>
                                            }
                                        >
                                            <Route
                                                path="list"
                                                element={<CompanyListPage />}
                                            />
                                            <Route
                                                path="create"
                                                element={<CompanyCreatePage />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<CompanyEditPage />}
                                            />
                                        </Route>

                                        <Route
                                            path="*"
                                            element={<ErrorComponent />}
                                        />
                                    </Route>

                                    <Route
                                        element={
                                            <Authenticated
                                                key="authenticated-auth"
                                                fallback={<Outlet />}
                                            >
                                                <NavigateToResource resource="dashboard" />
                                            </Authenticated>
                                        }
                                    >
                                        <Route
                                            path="/login"
                                            element={<LoginPage />}
                                        />
                                        <Route
                                            path="/register"
                                            element={<RegisterPage />}
                                        />
                                        <Route
                                            path="/forgot-password"
                                            element={<ForgotPasswordPage />}
                                        />
                                    </Route>
                                </Routes>
                            </AutoLogin>

                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                        <DevtoolsPanel />
                    </DevtoolsProvider>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
