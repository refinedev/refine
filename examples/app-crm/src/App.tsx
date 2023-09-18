import { Refine, Authenticated } from "@refinedev/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { notificationProvider, ErrorComponent } from "@refinedev/antd";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import { InstantSearch } from "react-instantsearch";

import "@refinedev/antd/dist/reset.css";

import { authProvider } from "./providers/auth";
import { dataProvider, liveProvider } from "./providers/data";
import { resources } from "./providers/resources";
import { themeConfig } from "./providers/antd";
import { indexName, searchClient } from "./providers/search-client";

import { Layout } from "./components/layout";

import { LoginPage } from "./routes/login";
import { RegisterPage } from "./routes/register";
import { ForgotPasswordPage } from "./routes/forgot-password";
import { UpdatePasswordPage } from "./routes/update-password";
import { DashboardPage } from "./routes/dashboard";
import {
    CalendarPageWrapper,
    CalendarShowPage,
    CalendarEditPage,
    CalendarCreatePage,
} from "./routes/calendar";
import {
    KanbanPage,
    KanbanCreatePage,
    KanbanEditPage,
    KanbanCreateStage,
    KanbanEditStage,
} from "./routes/scrumboard/kanban";
import {
    CompanyEditPage,
    CompanyListPage,
    CompanyCreatePage,
} from "./routes/companies";
import {
    SalesPage,
    SalesCreatePage,
    SalesEditPage,
    SalesCreateStage,
    SalesEditStage,
    SalesCreateDetails,
} from "./routes/scrumboard/sales";
import {
    ContactsListPage,
    ContactCreatePage,
    ContactEditPage,
    ContactShowPage,
} from "./routes/contacts";
import {
    QuotesListPage,
    QuotesCreatePage,
    QuotesEditPage,
    QuotesShowPage,
} from "./routes/quotes";
import { SettingsPage, AuditLogPage } from "./routes/administration";

import "./utilities/init-dayjs";

import "./styles/antd.css";
import "./styles/fc.css";
import "./styles/index.css";

const App: React.FC = () => {
    return (
        <InstantSearch searchClient={searchClient} indexName={indexName}>
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
                                <Route index element={<DashboardPage />} />
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
                                <Route path="/scrumboard" element={<Outlet />}>
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
                                            element={<KanbanCreatePage />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<KanbanEditPage />}
                                        />
                                        <Route
                                            path="stages/create"
                                            element={<KanbanCreateStage />}
                                        />
                                        <Route
                                            path="stages/edit/:id"
                                            element={<KanbanEditStage />}
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
                                            element={<SalesCreateStage />}
                                        />
                                        <Route
                                            path="stages/edit/:id"
                                            element={<SalesEditStage />}
                                        />
                                        <Route
                                            path="details/edit/:id"
                                            element={<SalesCreateDetails />}
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
                                        path="edit/:id"
                                        element={<ContactEditPage />}
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
                                <Route path="*" element={<ErrorComponent />} />
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
                        <ReactQueryDevtools />
                    </Refine>
                </ConfigProvider>
            </BrowserRouter>
        </InstantSearch>
    );
};

export default App;
