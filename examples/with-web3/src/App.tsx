import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";

import "@refinedev/antd";
import simpleRestDataProvider from "@refinedev/simple-rest";
import { authProvider } from "authProvider";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";
import { DashboardPage } from "pages/dashboard";

function App() {
    const API_URL = "https://api.fake-rest.refine.dev";
    const dataProvider = simpleRestDataProvider(API_URL);
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={dataProvider}
            legacyAuthProvider={authProvider}
            LoginPage={Login}
            DashboardPage={DashboardPage}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
}

export default App;
