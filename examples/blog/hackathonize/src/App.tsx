import { Refine } from "@pankod/refine-core";

import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";

import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";
import { dataProvider } from "@pankod/refine-supabase";

import authProvider from "./authProvider";
import { supabaseClient } from "utility";
import { Login } from "./pages/login";

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
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            LoginPage={Login}
            DashboardPage={DashboardPage}
            routerProvider={routerProvider}
            resources={[
                {
                    name: "hackathons",
                    list: HackathonsList,
                    create: HackathonsCreate,
                    edit: HackathonsEdit,
                    show: HackathonsShow,
                },
                {
                    name: "projects",
                    list: ProjectsList,
                    create: ProjectsCreate,
                    edit: ProjectsEdit,
                    show: ProjectsShow,
                },
                {
                    name: "hackathoners",
                    list: HackathonersList,
                    create: HackathonersCreate,
                    edit: HackathonersEdit,
                    show: HackathonersShow,
                },
                {
                    name: "criterias",
                    list: CriteriasList,
                    create: CriteriasCreate,
                    edit: CriteriasEdit,
                    show: CriteriasShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
}

export default App;
