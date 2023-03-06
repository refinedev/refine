import { AuthBindings, Refine } from "@refinedev/core";
import {
    AuthPage,
    Layout,
    ErrorComponent,
    ReadyPage,
    notificationProvider,
    LightTheme,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";

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
                error: new Error("Invalid email or password"),
            };
        },
        register: async (params) => {
            if (params.email && params.password) {
                localStorage.setItem("email", params.email);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
            return {
                success: false,
                error: new Error("Invalid email or password"),
            };
        },
        updatePassword: async (params) => {
            if (params.newPassword) {
                //we can update password here
                return {
                    success: true,
                };
            }
            return {
                success: false,
                error: new Error("Invalid password"),
            };
        },
        forgotPassword: async (params) => {
            if (params.email) {
                //we can send email with reset password link here
                return {
                    success: true,
                };
            }
            return {
                success: false,
                error: new Error("Invalid email"),
            };
        },
        logout: async () => {
            localStorage.removeItem("email");
            return {
                success: true,
                redirectTo: "/login",
            };
        },
        onError: async () => ({}),
        check: async () =>
            localStorage.getItem("email")
                ? {
                      authenticated: true,
                  }
                : {
                      authenticated: false,
                      error: new Error("Not authenticated"),
                      logout: true,
                      redirectTo: "/login",
                  },
        getPermissions: async () => ["admin"],
        getIdentity: async () => ({
            id: 1,
            name: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
    };

    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    authProvider={authProvider}
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
                                                icon: <IconBrandGoogle />,
                                            },
                                            {
                                                name: "github",
                                                label: "Sign in with GitHub",
                                                icon: <IconBrandGithub />,
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
                    notificationProvider={notificationProvider}
                    LoginPage={() => (
                        <AuthPage
                            providers={[
                                {
                                    name: "google",
                                    label: "Sign in with Google",
                                    icon: <IconBrandGoogle />,
                                },
                                {
                                    name: "github",
                                    label: "Sign in with GitHub",
                                    icon: <IconBrandGithub />,
                                },
                            ]}
                        />
                    )}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    Layout={Layout}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            show: PostShow,
                            edit: PostEdit,
                            create: PostCreate,
                        },
                    ]}
                />
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default App;
