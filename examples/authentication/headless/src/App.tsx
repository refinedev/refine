import { AuthProvider, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth";
import { ForgotPasswordPage } from "./pages/auth/forgotPassword";
import { ExamplePage } from "./pages/example";

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
            if (params.email === "admin@refine.com") {
                localStorage.setItem("email", params.username);
                return Promise.resolve();
            }

            return Promise.reject();
        },
        register: (params: any) => {
            if (params.username && params.password) {
                localStorage.setItem("email", params.username);
                return Promise.resolve();
            }
            return Promise.reject();
        },
        updatePassword: (params: any) => {
            if (params.password && params.newPassword) {
                //update password
                console.log("update password", params);
                return Promise.resolve();
            }
            return Promise.reject();
        },
        resetPassword: (params: any) => {
            if (params.email) {
                //send email with new password
                console.log("reset password", params);
                return Promise.resolve();
            }
            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("email");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("email")
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
            routerProvider={{
                ...routerProvider,
                routes: [
                    { path: "/example", element: <ExamplePage /> },
                    { path: "/auth/register", element: <RegisterPage /> },
                    {
                        path: "/auth/forgot-password",
                        element: <ForgotPasswordPage />,
                    },
                ],
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            AuthPage={LoginPage}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
            disableTelemetry={true}
        />
    );
};

export default App;
