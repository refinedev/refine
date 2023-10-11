import React from "react";
import { AppProps } from "next/app";
import { SessionProvider, useSession, signOut, signIn } from "next-auth/react";

import { AuthBindings, GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    useNotificationProvider,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import { ConfigProvider, App as AntdApp } from "antd";
import "@styles/global.css";

import { API_URL } from "src/constants";
import type { NextPage } from "next";
import { useRouter } from "next/router";

export type ExtendedNextPage = NextPage & {
    noLayout?: boolean;
};

type ExtendedAppProps = AppProps & {
    Component: ExtendedNextPage;
};

const App = (props: React.PropsWithChildren) => {
    const { data, status } = useSession();
    const router = useRouter();
    const { to } = router.query;

    if (status === "loading") {
        return <span>loading...</span>;
    }

    const authProvider: AuthBindings = {
        login: async ({ providerName, email, password }) => {
            if (providerName) {
                signIn(providerName, {
                    callbackUrl: to ? to.toString() : "/",
                    redirect: true,
                });

                return {
                    success: true,
                };
            }

            const signInResponse = await signIn("CredentialsSignIn", {
                email,
                password,
                callbackUrl: to ? to.toString() : "/",
                redirect: false,
            });

            if (!signInResponse) {
                return {
                    success: false,
                };
            }

            const { ok, error } = signInResponse;

            if (ok) {
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                error: new Error(error?.toString()),
            };
        },
        register: async ({ providerName, email, password }) => {
            if (providerName) {
                signIn(providerName, {
                    callbackUrl: to ? to.toString() : "/",
                    redirect: true,
                });

                return {
                    success: true,
                };
            }

            const signUpResponse = await signIn("CredentialsSignUp", {
                email,
                password,
                callbackUrl: to ? to.toString() : "/",
                redirect: false,
            });

            if (!signUpResponse) {
                return {
                    success: false,
                };
            }

            const { ok, error } = signUpResponse;

            if (ok) {
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                error: new Error(error?.toString()),
            };
        },
        updatePassword: async (params) => {
            if (params.password === "demodemo") {
                //we can update password here
                return {
                    success: true,
                    redirectTo: "/login",
                };
            }
            return {
                success: false,
                error: {
                    message: "Update password failed",
                    name: "Invalid password",
                },
            };
        },
        forgotPassword: async (params) => {
            if (params.email === "demo@refine.dev") {
                //we can send email with reset password link here
                return {
                    success: true,
                    redirectTo: "/login",
                };
            }
            return {
                success: false,
                error: {
                    message: "Forgot password failed",
                    name: "Invalid email",
                },
            };
        },
        logout: async () => {
            signOut({
                redirect: true,
                callbackUrl: "/login",
            });

            return {
                success: true,
            };
        },
        onError: async (error) => {
            console.error(error);
            return {
                error,
            };
        },
        check: async () => {
            if (status === "unauthenticated") {
                return {
                    authenticated: false,
                    redirectTo: "/login",
                };
            }

            return {
                authenticated: true,
            };
        },
        getPermissions: async () => {
            return null;
        },
        getIdentity: async () => {
            if (data?.user) {
                const { user } = data;
                return {
                    name: user.name,
                    avatar: user.image,
                };
            }

            return null;
        },
    };

    return (
        <>
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <GitHubBanner />
                    <Refine
                        routerProvider={routerProvider}
                        authProvider={authProvider}
                        dataProvider={dataProvider(API_URL)}
                        resources={[
                            {
                                name: "blog_posts",
                                list: "/blog-posts",
                                create: "/blog-posts/create",
                                edit: "/blog-posts/edit/:id",
                                show: "/blog-posts/show/:id",
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                        notificationProvider={useNotificationProvider}
                    >
                        {props.children}
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </>
    );
};

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: ExtendedAppProps): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

        return (
            <ThemedLayoutV2>
                <Component {...pageProps} />
            </ThemedLayoutV2>
        );
    };

    return (
        <SessionProvider session={session}>
            <App>{renderComponent()}</App>
        </SessionProvider>
    );
}

export default MyApp;
