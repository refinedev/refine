import { Refine, Authenticated } from "@refinedev/core";
import { notificationProvider, ErrorComponent } from "@refinedev/antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

import { authProvider } from "./providers/auth";
import { dataProvider, liveProvider } from "./providers/data";
import { resources } from "./providers/resources";

import { LoginPage } from "./routes/login";
import { RegisterPage } from "./routes/register";
import { ForgotPasswordPage } from "./routes/forgot-password";
import { UpdatePasswordPage } from "./routes/update-password";

import { DashboardPage } from "./routes/dashboard/index";

import { CalendarPageWrapper } from "./routes/calendar/wrapper";
import { KanbanPage } from "./routes/scrumboard/kanban";
import { SalesPage } from "./routes/scrumboard/sales";
import { CompaniesPage } from "./routes/companies";
import { CompanyShowPage } from "./routes/companies/show";
import { ContactsPage } from "./routes/contacts";
import { QuotesPage } from "./routes/quotes";
import { SettingsPage } from "./routes/administration/settings";
import { AuditLogPage } from "./routes/administration/audit-log";
import { Layout } from "./components/layout";
import { themeConfig } from "./providers/antd";
import { CalendarShowPage } from "./routes/calendar/show";
import { CalendarEditPage } from "./routes/calendar/edit";
import { CalendarCreatePage } from "./routes/calendar/create";

import "./styles/index.css";

dayjs.extend(utc);
dayjs.extend(relativeTime);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={themeConfig}>
                <Refine
                    authProvider={authProvider}
                    dataProvider={dataProvider}
                    liveProvider={liveProvider}
                    routerProvider={routerProvider}
                    resources={resources}
                    notificationProvider={notificationProvider}
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
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <Layout>
                                        <Outlet />
                                    </Layout>
                                </Authenticated>
                            }
                        >
                            <Route index element={<DashboardPage />} />
                            <Route
                                path="/calendar"
                                element={
                                    <CalendarPageWrapper>
                                        <Outlet />
                                    </CalendarPageWrapper>
                                }
                            >
                                <Route index />
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
                            <Route path="/scrumboard" element={<Outlet />}>
                                <Route path="kanban" element={<KanbanPage />} />
                                <Route path="sales" element={<SalesPage />} />
                            </Route>
                            <Route path="/companies">
                                <Route index element={<CompaniesPage />} />
                                <Route
                                    path=":id"
                                    element={<CompanyShowPage />}
                                />
                            </Route>
                            <Route
                                path="/contacts"
                                element={<ContactsPage />}
                            />
                            <Route path="/quotes" element={<QuotesPage />} />
                            <Route path="/administration" element={<Outlet />}>
                                <Route
                                    path="settings"
                                    element={<SettingsPage />}
                                />
                                <Route
                                    path="audit-log"
                                    element={<AuditLogPage />}
                                />
                            </Route>
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="dashboard" />
                                </Authenticated>
                            }
                        >
                            <Route path="/login" element={<LoginPage />} />
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
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
