import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    LoginPage,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostEdit, PostShow } from "pages/posts";
import { DashboardPage } from "pages/dashboard";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.username === "admin") {
                localStorage.setItem("username", params.username);
                return Promise.resolve();
            }

            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("username");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("username")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["admin"]),
        getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                name: "Jane Doe",
                avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };

    return (
        <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            DashboardPage={DashboardPage}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            LoginPage={LoginPage}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
