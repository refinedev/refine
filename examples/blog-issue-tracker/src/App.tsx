import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import "@refinedev/antd/dist/reset.css";

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
            legacyRouterProvider={{
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
        />
    );
}

export default App;
