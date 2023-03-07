import { Refine, LegacyAuthProvider as AuthProvider } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: ({ gsmNumber, code }) => {
            if (code === "1234") {
                localStorage.setItem("gsmNumber", gsmNumber);
                return Promise.resolve();
            }

            return Promise.reject({ message: "Login code: 1234" });
        },
        logout: () => {
            localStorage.removeItem("gsmNumber");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("gsmNumber")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["admin"]),
    };

    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            legacyRouterProvider={routerProvider}
            legacyAuthProvider={authProvider}
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
