import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";

import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";

import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "@refinedev/supabase";

import authProvider from "./authProvider";
import { supabaseClient } from "utility";
import { Login } from "./pages/login";
import { DashboardOutlined } from "@ant-design/icons";

import {
    HackathonersList,
    HackathonersCreate,
    HackathonersEdit,
    HackathonersShow,
} from "./pages/hackathoners";
import {
    HackathonsList,
    HackathonsCreate,
    HackathonsEdit,
    HackathonsShow,
} from "./pages/hackathons";
import {
    ProjectsList,
    ProjectsCreate,
    ProjectsEdit,
    ProjectsShow,
} from "./pages/projects";
import {
    CriteriasList,
    CriteriasCreate,
    CriteriasEdit,
    CriteriasShow,
} from "./pages/criterias";
import { DashboardPage } from "./pages/dashboard";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(supabaseClient)}
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    resources={[
                        {
                            name: "dashboard",
                            list: "/",
                            meta: {
                                label: "Dashboard",
                                icon: <DashboardOutlined />,
                            },
                        },
                        {
                            name: "hackathons",
                            list: "/hackathons",
                            show: "/hackathons/show/:id",
                            edit: "/hackathons/edit/:id",
                            create: "/hackathons/create",
                        },
                        {
                            name: "projects",
                            list: "/projects",
                            show: "/projects/show/:id",
                            edit: "/projects/edit/:id",
                            create: "/projects/create",
                        },
                        {
                            name: "hackathoners",
                            list: "/hackathoners",
                            show: "/hackathoners/show/:id",
                            edit: "/hackathoners/edit/:id",
                            create: "/hackathoners/create",
                        },
                        {
                            name: "criterias",
                            list: "/criterias",
                            show: "/criterias/show/:id",
                            edit: "/criterias/edit/:id",
                            create: "/criterias/create",
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
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route index element={<DashboardPage />} />

                            <Route path="hackathons">
                                <Route index element={<HackathonsList />} />
                                <Route
                                    path="show/:id"
                                    element={<HackathonsShow />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<HackathonsEdit />}
                                />
                                <Route
                                    path="create"
                                    element={<HackathonsCreate />}
                                />
                            </Route>

                            <Route path="projects">
                                <Route index element={<ProjectsList />} />
                                <Route
                                    path="show/:id"
                                    element={<ProjectsShow />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ProjectsEdit />}
                                />
                                <Route
                                    path="create"
                                    element={<ProjectsCreate />}
                                />
                            </Route>

                            <Route path="hackathoners">
                                <Route index element={<HackathonersList />} />
                                <Route
                                    path="show/:id"
                                    element={<HackathonersShow />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<HackathonersEdit />}
                                />
                                <Route
                                    path="create"
                                    element={<HackathonersCreate />}
                                />
                            </Route>

                            <Route path="criterias">
                                <Route index element={<CriteriasList />} />
                                <Route
                                    path="show/:id"
                                    element={<CriteriasShow />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<CriteriasEdit />}
                                />
                                <Route
                                    path="create"
                                    element={<CriteriasCreate />}
                                />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="hackathons" />
                                </Authenticated>
                            }
                        >
                            <Route path="/login" element={<Login />} />
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
