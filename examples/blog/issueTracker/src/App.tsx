import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider } from "@pankod/refine-supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import "@pankod/refine-antd/dist/styles.min.css";

import { UserList } from "./pages/user";
import { TaskList, TaskShow, TaskCreate, EditTask } from "./pages/task";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

function App() {
    return (
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            DashboardPage={Dashboard}
            LoginPage={Login}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        element: <Signup />,
                        path: "/signup",
                    },
                ] as typeof routerProvider.routes,
            }}
            resources={[
                {
                    name: "users",
                    list: UserList,
                },
                {
                    name: "tasks",
                    list: TaskList,
                    edit: EditTask,
                    create: TaskCreate,
                    show: TaskShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            options={{ disableTelemetry: true }}
        />
    );
}

export default App;
