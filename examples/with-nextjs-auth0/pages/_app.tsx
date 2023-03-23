import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useUser, UserProvider } from "@auth0/nextjs-auth0/client";

import { AuthBindings, GitHubBanner, Refine } from "@refinedev/core";
import { Layout, notificationProvider } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import "@styles/global.css";

import { API_URL } from "src/constants";
import type { NextPage } from "next";

export type ExtendedNextPage = NextPage & {
    noLayout?: boolean;
};

type ExtendedAppProps = AppProps & {
    Component: ExtendedNextPage;
};

const App = (props: React.PropsWithChildren) => {
    const { user, error, isLoading } = useUser();
    const { replace } = useRouter();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error...</div>;
    }

    const authProvider: AuthBindings = {
        login: async () => {
            return {
                success: true,
            };
        },
        logout: async () => {
            replace("/api/auth/logout");
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
            // check withPageAuthRequired from @auth0/nextjs-auth0
            return {
                authenticated: true,
            };
        },
        getPermissions: async () => {
            return null;
        },
        getIdentity: async () => {
            return {
                avatar: user?.picture,
                ...user,
            };
        },
    };

    return (
        <>
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
        </>
    );
};

function MyApp({ Component, pageProps }: ExtendedAppProps): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    };

    return (
        <UserProvider>
            <App>{renderComponent()}</App>
        </UserProvider>
    );
}

export default MyApp;
