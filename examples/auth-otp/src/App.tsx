import { AuthBindings, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: async ({ gsmNumber, code }) => {
            if (code === "1234") {
                localStorage.setItem("gsmNumber", gsmNumber);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                error: new Error("Login code: 1234"),
            };
        },
        logout: async () => {
            localStorage.removeItem("gsmNumber");
            return {
                success: true,
                redirectTo: "/login",
            };
        },
        onError: async () => ({}),
        check: async () =>
            localStorage.getItem("gsmNumber")
                ? {
                      authenticated: true,
                  }
                : {
                      authenticated: false,
                      redirectTo: "/login",
                  },
        getPermissions: async () => ["admin"],
    };

    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
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
