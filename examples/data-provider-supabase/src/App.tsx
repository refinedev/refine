import { Refine, AuthBindings } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
} from "@pankod/refine-antd";
import { notification } from "antd";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import { GoogleOutlined } from "@ant-design/icons";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { supabaseClient } from "utility";

const authProvider: AuthBindings = {
    login: async ({ email, password, providerName }) => {
        // sign in with oauth
        try {
            if (providerName) {
                const { data, error } =
                    await supabaseClient.auth.signInWithOAuth({
                        provider: providerName,
                    });

                if (error) {
                    return Promise.resolve({
                        success: false,
                        error,
                    });
                }

                if (data?.url) {
                    return Promise.resolve({
                        success: true,
                    });
                }
            }

            // sign in with email and password
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email,
                    password,
                });

            if (error) {
                return Promise.resolve({
                    success: false,
                    error,
                });
            }

            if (data?.user) {
                return Promise.resolve({
                    success: true,
                });
            }
        } catch (error: any) {
            return Promise.resolve({
                success: false,
                error,
            });
        }

        return Promise.resolve({
            success: false,
            error: new Error("Login failed"),
        });
    },
    register: async ({ email, password }) => {
        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
            });

            if (error) {
                return Promise.resolve({
                    success: false,
                    error,
                });
            }

            if (data) {
                return Promise.resolve({
                    success: true,
                });
            }
        } catch (error: any) {
            return Promise.resolve({
                success: false,
                error,
            });
        }

        return Promise.resolve({
            success: false,
            error: new Error("Login failed"),
        });
    },
    forgotPassword: async ({ email }) => {
        try {
            const { data, error } =
                await supabaseClient.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/update-password`,
                });

            if (error) {
                return Promise.resolve({
                    success: false,
                    error,
                });
            }

            if (data) {
                notification.open({
                    type: "success",
                    message: "Success",
                    description:
                        "Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.",
                });
                return Promise.resolve({
                    success: true,
                });
            }
        } catch (error: any) {
            return Promise.resolve({
                success: false,
                error,
            });
        }

        return Promise.resolve({
            success: false,
            error: new Error("Forgot Password password failed"),
        });
    },
    updatePassword: async ({ password }) => {
        try {
            const { data, error } = await supabaseClient.auth.updateUser({
                password,
            });

            if (error) {
                return Promise.resolve({
                    success: false,
                    error,
                });
            }

            if (data) {
                return Promise.resolve({
                    success: true,
                    redirectTo: "/",
                });
            }
        } catch (error: any) {
            return Promise.resolve({
                success: false,
                error,
            });
        }
        return Promise.resolve({
            success: false,
            error: new Error("Update Password password failed"),
        });
    },
    logout: async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            return Promise.resolve({
                success: false,
                error,
            });
        }

        return Promise.resolve({
            success: true,
            redirectTo: "/",
        });
    },
    onError: () => Promise.resolve({}),
    check: async () => {
        try {
            const { data } = await supabaseClient.auth.getSession();
            const { session } = data;

            if (!session) {
                return Promise.resolve({
                    authenticated: false,
                    error: new Error("Not authenticated"),
                    logout: true,
                    redirectTo: "/login",
                });
            }
        } catch (error: any) {
            return Promise.resolve({
                authenticated: false,
                error: error || new Error("Not authenticated"),
                logout: true,
                redirectTo: "/login",
            });
        }

        return Promise.resolve({
            authenticated: true,
        });
    },
    getPermissions: async () => {
        const user = await supabaseClient.auth.getUser();

        if (user) {
            return Promise.resolve(user.data.user?.role);
        }
    },
    getIdentity: async () => {
        const { data } = await supabaseClient.auth.getUser();

        if (data?.user) {
            return Promise.resolve({
                ...data.user,
                name: data.user.email,
            });
        }
    },
};

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            legacyRouterProvider={{
                ...routerProvider,
                routes: [
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
            authProvider={authProvider}
            LoginPage={() => (
                <AuthPage
                    type="login"
                    providers={[
                        {
                            name: "google",
                            label: "Sign in with Google",
                            icon: (
                                <GoogleOutlined
                                    style={{ fontSize: 18, lineHeight: 0 }}
                                />
                            ),
                        },
                    ]}
                    formProps={{
                        initialValues: {
                            email: "info@refine.dev",
                            password: "refine-supabase",
                        },
                    }}
                />
            )}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            /**
             * Multiple subscriptions are currently not supported with the supabase JS client v2 and @pankod/refine-supabase v4.
             * Therefore, enabling global live mode will cause unexpected behaviors.
             * Please set `liveMode: "auto"` or `liveMode: "manual"` manually while using real-time features of refine.
             */
            options={{ liveMode: "off" }}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
