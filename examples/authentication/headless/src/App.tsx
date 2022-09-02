import { AuthProvider, Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostList, PostCreate, PostEdit } from "./pages/posts";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth";
import { ForgotPasswordPage } from "./pages/auth/forgotPassword";
import { ExamplePage } from "./pages/example";
import { UpdatePasswordPage } from "./pages/auth/updatePassword";

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
                    {
                        path: "/auth/update-password",
                        element: <UpdatePasswordPage />,
                    },
                ],
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={authProvider}
            LoginPage={LoginPage}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    canDelete: true,
                },
            ]}
            disableTelemetry={true}
        />
    );
};

export default App;
