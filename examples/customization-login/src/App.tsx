import { Refine, AuthBindings } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: ({ username }) => {
            if (username === "admin") {
                localStorage.setItem("username", username);
                return Promise.resolve({
                    success: true,
                    redirectTo: "/",
                });
            }

            return Promise.resolve({
                success: false,
                error: new Error("Invalid username"),
            });
        },
        logout: () => {
            localStorage.removeItem("username");
            return Promise.resolve({
                success: true,
                redirectTo: "/login",
            });
        },
        onError: () => Promise.resolve({}),
        check: () =>
            localStorage.getItem("username")
                ? Promise.resolve({
                      authenticated: true,
                  })
                : Promise.resolve({
                      authenticated: false,
                      redirectTo: "/login",
                  }),
        getPermissions: () => Promise.resolve(["admin"]),
    };

    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            authProvider={authProvider}
            legacyRouterProvider={routerProvider}
            LoginPage={Login}
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
};

export default App;
