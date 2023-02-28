import { Refine, AuthBindings } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
} from "@pankod/refine-antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostEdit, PostShow } from "pages/posts";
import { DashboardPage } from "pages/dashboard";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: async ({ providerName, email }) => {
            if (providerName === "google") {
                window.location.href =
                    "https://accounts.google.com/o/oauth2/v2/auth";
                return Promise.resolve({
                    success: true,
                });
            }

            if (providerName === "github") {
                window.location.href =
                    "https://github.com/login/oauth/authorize";
                return Promise.resolve({
                    success: true,
                });
            }

            if (email) {
                localStorage.setItem("email", email);
                return Promise.resolve({
                    success: true,
                    redirectTo: "/",
                });
            }

            return Promise.resolve({
                success: false,
                error: new Error("Invalid email or password"),
            });
        },
        register: (params) => {
            if (params.email && params.password) {
                localStorage.setItem("email", params.email);
                return Promise.resolve({
                    success: true,
                    redirectTo: "/",
                });
            }
            return Promise.resolve({
                success: false,
                error: new Error("Invalid email or password"),
            });
        },
        updatePassword: (params) => {
            if (params.newPassword) {
                //we can update password here
                return Promise.resolve({
                    success: true,
                });
            }
            return Promise.resolve({
                success: false,
                error: new Error("Invalid password"),
            });
        },
        forgotPassword: (params) => {
            if (params.email) {
                //we can send email with reset password link here
                return Promise.resolve({
                    success: true,
                });
            }
            return Promise.resolve({
                success: false,
                error: new Error("Invalid email"),
            });
        },
        logout: () => {
            localStorage.removeItem("email");
            return Promise.resolve({
                success: true,
                redirectTo: "/login",
            });
        },
        onError: () => Promise.resolve({}),
        check: () =>
            localStorage.getItem("email")
                ? Promise.resolve({
                      authenticated: true,
                  })
                : Promise.resolve({
                      authenticated: false,
                      error: new Error("Not authenticated"),
                      logout: true,
                      redirectTo: "/login",
                  }),
        getPermissions: () => Promise.resolve(["admin"]),
        getIdentity: () =>
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
            legacyRouterProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/register",
                        element: (
                            <AuthPage
                                type="register"
                                providers={[
                                    {
                                        name: "google",
                                        label: "Sign in with Google",
                                        icon: (
                                            <GoogleOutlined
                                                style={{
                                                    fontSize: 24,
                                                    lineHeight: 0,
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        name: "github",
                                        label: "Sign in with GitHub",
                                        icon: (
                                            <GithubOutlined
                                                style={{
                                                    fontSize: 24,
                                                    lineHeight: 0,
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        ),
                    },
                    {
                        path: "/forgot-password",
                        element: <AuthPage type="forgotPassword" />,
                    },
                    {
                        path: "/update-password",
                        element: <AuthPage type="updatePassword" />,
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
            LoginPage={() => (
                <AuthPage
                    providers={[
                        {
                            name: "google",
                            label: "Sign in with Google",
                            icon: (
                                <GoogleOutlined
                                    style={{ fontSize: 24, lineHeight: 0 }}
                                />
                            ),
                        },
                        {
                            name: "github",
                            label: "Sign in with GitHub",
                            icon: (
                                <GithubOutlined
                                    style={{ fontSize: 24, lineHeight: 0 }}
                                />
                            ),
                        },
                    ]}
                />
            )}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
