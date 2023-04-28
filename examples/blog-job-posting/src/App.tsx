import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import {
    CompanyList,
    CompanyShow,
    CompanyCreate,
    CompanyEdit,
} from "./pages/companies";
import { JobList, JobCreate, JobEdit } from "pages/jobs";

const App: React.FC = () => {
    const API_URL = "http://localhost:3000";
    const dataProvider = nestjsxCrudDataProvider(API_URL);

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    resources={[
                        {
                            name: "companies",
                            list: "/companies",
                            show: "/companies/show/:id",
                            create: "/companies/create",
                            edit: "/companies/edit/:id",
                        },
                        {
                            name: "jobs",
                            list: "/jobs",
                            create: "/jobs/create",
                            edit: "/jobs/edit/:id",
                        },
                    ]}
                    notificationProvider={notificationProvider}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="companies" />
                                }
                            />

                            <Route path="/companies" element={<CompanyList />}>
                                <Route index element={<CompanyList />} />
                                <Route
                                    path="show/:id"
                                    element={<CompanyShow />}
                                />
                                <Route
                                    path="create"
                                    element={<CompanyCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<CompanyEdit />}
                                />
                            </Route>

                            <Route path="/jobs" element={<JobList />}>
                                <Route index element={<JobList />} />
                                <Route path="create" element={<JobCreate />} />
                                <Route path="edit/:id" element={<JobEdit />} />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
