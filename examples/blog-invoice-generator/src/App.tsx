import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    AuthPage,
    RefineThemes,
} from "@refinedev/antd";
import {
    FileAddOutlined,
    UserAddOutlined,
    TeamOutlined,
    InfoCircleOutlined,
    SlidersOutlined,
} from "@ant-design/icons";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";
import { DataProvider } from "@refinedev/strapi-v4";
import { authProvider, axiosInstance } from "./authProvider";

import { CompanyList } from "pages/company";
import { ClientList } from "pages/client";
import { ContactsList, ContactEdit } from "pages/contacts";
import { InvoiceList, InvoiceCreate, InvoiceEdit } from "pages/invoice";
import { MissionList } from "pages/mission";

import { API_URL } from "../src/constants";
import { ConfigProvider } from "antd";

function App() {
    const dataProvider = DataProvider(API_URL + "/api", axiosInstance);

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    notificationProvider={notificationProvider}
                    dataProvider={dataProvider}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "companies",
                            list: "/companies",
                            meta: {
                                label: "Company",
                                icon: <InfoCircleOutlined />,
                            },
                        },
                        {
                            name: "clients",
                            list: "/clients",
                            meta: {
                                icon: <TeamOutlined />,
                            },
                        },
                        {
                            name: "contacts",
                            list: "/contacts",
                            edit: "/contacts/edit/:id",
                            meta: {
                                icon: <UserAddOutlined />,
                            },
                        },
                        {
                            name: "missions",
                            list: "/missions",
                            meta: {
                                icon: <SlidersOutlined />,
                            },
                        },
                        {
                            name: "invoices",
                            list: "/invoices",
                            create: "/invoices/create",
                            edit: "/invoices/edit/:id",
                            meta: {
                                icon: <FileAddOutlined />,
                            },
                        },
                    ]}
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
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="companies" />
                                }
                            />

                            <Route path="companies" element={<CompanyList />} />

                            <Route path="clients" element={<ClientList />} />

                            <Route path="contacts">
                                <Route index element={<ContactsList />} />
                                <Route
                                    path="edit/:id"
                                    element={<ContactEdit />}
                                />
                            </Route>

                            <Route path="missions" element={<MissionList />} />

                            <Route path="invoices">
                                <Route index element={<InvoiceList />} />
                                <Route
                                    path="edit/:id"
                                    element={<InvoiceEdit />}
                                />
                                <Route
                                    path="create"
                                    element={<InvoiceCreate />}
                                />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="companies" />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
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
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
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
