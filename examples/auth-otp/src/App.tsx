import { AuthBindings, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: ({ gsmNumber, code }) => {
            if (code === "1234") {
                localStorage.setItem("gsmNumber", gsmNumber);
                return Promise.resolve({
                    success: true,
                    redirectTo: "/",
                });
            }

            return Promise.resolve({
                success: false,
                error: new Error("Login code: 1234"),
            });
        },
        logout: () => {
            localStorage.removeItem("gsmNumber");
            return Promise.resolve({
                success: true,
                redirectTo: "/login",
            });
        },
        onError: () => Promise.resolve({}),
        check: () =>
            localStorage.getItem("gsmNumber")
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
