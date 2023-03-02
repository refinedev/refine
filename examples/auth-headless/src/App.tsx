import { AuthPage, AuthBindings, Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import { PostList, PostCreate, PostEdit } from "./pages/posts";
import { ExamplePage } from "./pages/example";
import Layout from "./pages/layout";

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: async ({ providerName, email }) => {
            if (providerName === "google") {
                window.location.href =
                    "https://accounts.google.com/o/oauth2/v2/auth";
                return {
                    success: true,
                };
            }

            if (providerName === "github") {
                window.location.href =
                    "https://github.com/login/oauth/authorize";
                return {
                    success: true,
                };
            }

            if (email) {
                localStorage.setItem("email", email);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                error: new Error("Email is wrong"),
            };
        },
        register: async ({ email, password }) => {
            if (email && password) {
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
            return {
                success: false,
                error: new Error("Email or password is wrong"),
            };
        },
        updatePassword: async ({ password }) => {
            if (password) {
                //we can update password here
                return {
                    success: true,
                    redirectTo: "/login",
                };
            }
            return {
                success: false,
                error: new Error("password is wrong"),
            };
        },
        forgotPassword: async ({ email }) => {
            if (email) {
                //we can send email with forgot password link here
                return {
                    success: true,
                    redirectTo: "/login",
                };
            }
            return {
                success: false,
                error: new Error("Email is wrong"),
            };
        },
        logout: async () => {
            localStorage.removeItem("email");
            return {
                success: true,
                redirectTo: "/",
            };
        },
        onError: async () => ({}),
        check: async () => {
            return localStorage.getItem("email")
                ? { authenticated: true }
                : {
                      authenticated: false,
                      redirectTo: "/login",
                      error: new Error("Not authenticated"),
                  };
        },
        getPermissions: async () => ["admin"],
        getIdentity: async () => ({
            id: 1,
            name: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
    };

    return (
        <Refine
            legacyRouterProvider={{
                ...routerProvider,
                routes: [
                    { path: "/example", element: <ExamplePage /> },
                    {
                        path: "/register",
                        element: <AuthPage type="register" />,
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
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={authProvider}
            LoginPage={() => <AuthPage />}
            Layout={({ children }) => <Layout>{children}</Layout>}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    canDelete: true,
                },
            ]}
        />
    );
};

export default App;
