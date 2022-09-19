import { AuthProvider, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    MantineProvider,
    ErrorComponent,
    ReadyPage,
    AuthPage,
} from "@pankod/refine-mantine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { BrandGoogle, BrandGithub } from "tabler-icons-react";

import { PostCreate, PostEdit, PostList } from "./pages";

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
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
        <MantineProvider
            withNormalizeCSS
            notificationProps={{ position: "top-right" }}
        >
            <Refine
                routerProvider={{
                    ...routerProvider,
                    routes: [
                        {
                            path: "/register",
                            element: <AuthPage type="register" />,
                        },
                        {
                            path: "/reset-password",
                            element: <AuthPage type="resetPassword" />,
                        },
                        {
                            path: "/update-password",
                            element: <AuthPage type="updatePassword" />,
                        },
                    ],
                }}
                authProvider={authProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                LoginPage={() => (
                    <AuthPage
                        providers={[
                            {
                                name: "google",
                                label: "Sign in with Google",
                                icon: <BrandGoogle />,
                            },
                            {
                                name: "github",
                                label: "Sign in with GitHub",
                                icon: <BrandGithub />,
                            },
                        ]}
                    />
                )}
                catchAll={<ErrorComponent />}
                ReadyPage={ReadyPage}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                ]}
                options={{ reactQuery: { devtoolConfig: false } }}
            />
        </MantineProvider>
    );
};

export default App;
