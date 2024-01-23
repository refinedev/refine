import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { ErrorComponent, useNotificationProvider } from "@refinedev/antd";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { App as AntdApp, ConfigProvider } from "antd";

import { resources, themeConfig } from "@/config";
import { authProvider, dataProvider, liveProvider } from "@/providers";

import { AlgoliaSearchWrapper, FullScreenLoading, Layout } from "./components";
import { useAutoLoginForDemo } from "./hooks";
import { AuditLogPage, SettingsPage } from "./routes/administration";
import {
    CalendarCreatePage,
    CalendarEditPage,
    CalendarPageWrapper,
    CalendarShowPage,
} from "./routes/calendar";
import {
    CompanyCreatePage,
    CompanyEditPage,
    CompanyListPage,
} from "./routes/companies";
import {
    ContactCreatePage,
    ContactShowPage,
    ContactsListPage,
} from "./routes/contacts";
import { DashboardPage } from "./routes/dashboard";
import { ForgotPasswordPage } from "./routes/forgot-password";
import { LoginPage } from "./routes/login";
import {
    QuotesCreatePage,
    QuotesEditPage,
    QuotesListPage,
    QuotesShowPage,
} from "./routes/quotes";
import { RegisterPage } from "./routes/register";
import {
    KanbanCreatePage,
    KanbanCreateStage,
    KanbanEditPage,
    KanbanEditStage,
    KanbanPage,
} from "./routes/scrumboard/kanban";
import {
    SalesCreatePage,
    SalesCreateStage,
    SalesEditPage,
    SalesEditStage,
    SalesFinalizeDeal,
    SalesPage,
} from "./routes/scrumboard/sales";
import { UpdatePasswordPage } from "./routes/update-password";

import "./utilities/init-dayjs";
import "@refinedev/antd/dist/reset.css";
import "./styles/antd.css";
import "./styles/fc.css";
import "./styles/index.css";

const App: React.FC = () => {
    // This hook is used to automatically login the user.
    // We use this hook to skip the login page and demonstrate the application more quickly.
    const { loading } = useAutoLoginForDemo();

    if (loading) {
        return <FullScreenLoading />;
    }

    return (
        <AlgoliaSearchWrapper>
            <BrowserRouter>
                <ConfigProvider theme={themeConfig}>
                    <AntdApp>
                        <DevtoolsProvider>
                            <Refine
                                authProvider={authProvider}
                                dataProvider={dataProvider}
                                liveProvider={liveProvider}
                                routerProvider={routerProvider}
                                resources={resources}
                                notificationProvider={useNotificationProvider}
                                options={{
                                    liveMode: "auto",
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                }}
                            >
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
                                            path="/calendar"
                                            element={
                                                <CalendarPageWrapper>
                                                    <Outlet />
                                                </CalendarPageWrapper>
                                            }
                                        >
                                            <Route index element={null} />
                                            <Route
                                                path="show/:id"
                                                element={<CalendarShowPage />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<CalendarEditPage />}
                                            />
                                            <Route
                                                path="create"
                                                element={<CalendarCreatePage />}
                                            />
                                        </Route>
                                        <Route
                                            path="/scrumboard"
                                            element={<Outlet />}
                                        >
                                            <Route
                                                path="kanban"
                                                element={
                                                    <KanbanPage>
                                                        <Outlet />
                                                    </KanbanPage>
                                                }
                                            >
                                                <Route
                                                    path="create"
                                                    element={
                                                        <KanbanCreatePage />
                                                    }
                                                />
                                                <Route
                                                    path="edit/:id"
                                                    element={<KanbanEditPage />}
                                                />
                                                <Route
                                                    path="stages/create"
                                                    element={
                                                        <KanbanCreateStage />
                                                    }
                                                />
                                                <Route
                                                    path="stages/edit/:id"
                                                    element={
                                                        <KanbanEditStage />
                                                    }
                                                />
                                            </Route>
                                            <Route
                                                path="sales"
                                                element={
                                                    <SalesPage>
                                                        <Outlet />
                                                    </SalesPage>
                                                }
                                            >
                                                <Route
                                                    path="create"
                                                    element={
                                                        <SalesCreatePage>
                                                            <Outlet />
                                                        </SalesCreatePage>
                                                    }
                                                >
                                                    <Route
                                                        path="company/create"
                                                        element={
                                                            <CompanyCreatePage
                                                                isOverModal
                                                            />
                                                        }
                                                    />
                                                </Route>
                                                <Route
                                                    path="edit/:id"
                                                    element={<SalesEditPage />}
                                                />
                                                <Route
                                                    path="stages/create"
                                                    element={
                                                        <SalesCreateStage />
                                                    }
                                                />
                                                <Route
                                                    path="stages/edit/:id"
                                                    element={<SalesEditStage />}
                                                />
                                                <Route
                                                    path=":id/finalize"
                                                    element={
                                                        <SalesFinalizeDeal />
                                                    }
                                                />
                                            </Route>
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
                                                path="create"
                                                element={<CompanyCreatePage />}
                                            />
                                        </Route>
                                        <Route
                                            path="/companies/edit/:id"
                                            element={<CompanyEditPage />}
                                        />
                                        <Route
                                            path="/contacts"
                                            element={
                                                <ContactsListPage>
                                                    <Outlet />
                                                </ContactsListPage>
                                            }
                                        >
                                            <Route index element={null} />
                                            <Route
                                                path="show/:id"
                                                element={<ContactShowPage />}
                                            />
                                            <Route
                                                path="create"
                                                element={
                                                    <ContactCreatePage>
                                                        <Outlet />
                                                    </ContactCreatePage>
                                                }
                                            >
                                                <Route
                                                    path="company-create"
                                                    element={
                                                        <CompanyCreatePage
                                                            isOverModal
                                                        />
                                                    }
                                                />
                                            </Route>
                                        </Route>
                                        <Route
                                            path="/quotes"
                                            element={
                                                <QuotesListPage>
                                                    <Outlet />
                                                </QuotesListPage>
                                            }
                                        >
                                            <Route
                                                path="create"
                                                element={
                                                    <QuotesCreatePage>
                                                        <Outlet />
                                                    </QuotesCreatePage>
                                                }
                                            >
                                                <Route
                                                    path="company-create"
                                                    element={
                                                        <CompanyCreatePage
                                                            isOverModal
                                                        />
                                                    }
                                                />
                                            </Route>
                                            <Route
                                                path="edit/:id"
                                                element={
                                                    <QuotesEditPage>
                                                        <Outlet />
                                                    </QuotesEditPage>
                                                }
                                            >
                                                <Route
                                                    path="company-create"
                                                    element={
                                                        <CompanyCreatePage
                                                            isOverModal
                                                        />
                                                    }
                                                />
                                            </Route>
                                        </Route>
                                        <Route
                                            path="/quotes/show/:id"
                                            element={<QuotesShowPage />}
                                        />
                                        <Route
                                            path="/administration"
                                            element={<Outlet />}
                                        >
                                            <Route
                                                path="settings"
                                                element={<SettingsPage />}
                                            />
                                            <Route
                                                path="audit-log"
                                                element={<AuditLogPage />}
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
                                        <Route
                                            path="/update-password"
                                            element={<UpdatePasswordPage />}
                                        />
                                    </Route>
                                </Routes>
                                <UnsavedChangesNotifier />
                                <DocumentTitleHandler />
                            </Refine>
                            <DevtoolsPanel />
                        </DevtoolsProvider>
                    </AntdApp>
                </ConfigProvider>
            </BrowserRouter>
        </AlgoliaSearchWrapper>
    );
};

export default App;
