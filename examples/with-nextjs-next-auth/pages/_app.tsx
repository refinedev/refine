import React from "react";
import { AppProps } from "next/app";
import { SessionProvider, useSession, signOut, signIn } from "next-auth/react";

import { AuthBindings, GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    notificationProvider,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import { ConfigProvider } from "antd";
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

            signIn("credentials", {
                email,
                password,
                callbackUrl: to ? to.toString() : "/",
                redirect: true,
            });

            return {
                success: true,
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
                    notificationProvider={notificationProvider}
                >
                    {props.children}
                    <UnsavedChangesNotifier />
                </Refine>
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
