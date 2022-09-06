import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";

import {
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    UpdatePasswordPage,
} from "pages/auth";
import { PostList, PostEdit, PostShow } from "pages/posts";
import { DashboardPage } from "pages/dashboard";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.providerName === "facebook") {
                return Promise.resolve(
                    "https://www.facebook.com/v2.12/dialog/oauth",
                );
            }
            if (params.providerName === "google") {
                return Promise.resolve(
                    "https://accounts.google.com/o/oauth2/v2/auth",
                );
            }
            if (params.providerName === "github") {
                return Promise.resolve("https://github.com/login");
            }
            if (params.email === "admin@refine.com") {
                localStorage.setItem("email", params.username);
                return Promise.resolve();
            }

            return Promise.reject();
        },
        register: (params: any) => {
            if (params.email && params.password) {
                localStorage.setItem("email", params.username);
                return Promise.resolve();
            }
            return Promise.reject();
        },
        updatePassword: (params: any) => {
            if (params.newPassword) {
                //we can update password here
                return Promise.resolve();
            }
            return Promise.reject();
        },
        resetPassword: (params: any) => {
            if (params.email) {
                //we can send email with reset password link here
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
            routerProvider={{
                ...routerProvider,
                routes: [
                    { path: "/register", element: <RegisterPage /> },
                    {
                        path: "/reset-password",
                        element: <ResetPasswordPage />,
                    },
                    {
                        path: "/update-password",
                        element: <UpdatePasswordPage />,
                    },
                ],
            }}
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
