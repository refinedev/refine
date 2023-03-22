import React from "react";
import { AppProps } from "next/app";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";

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

    // const authProvider: AuthBindings = {
    //     login: async () => {
    //         return {
    //             success: true,
    //         };
    //     },
    //     logout: async () => {
    //         // logout({ returnTo: window.location.origin });
    //         return {
    //             success: true,
    //         };
    //     },
    //     onError: async (error) => {
    //         console.error(error);
    //         return { error };
    //     },
    //     check: async () => {
    //         const token = await checkSession();

    //         return {
    //             authenticated: true,
    //         };

    //         // try {
    //         //     const token = await checkSession();
    //         //     if (token) {
    //         //         axios.defaults.headers.common = {
    //         //             Authorization: `Bearer ${token.__raw}`,
    //         //         };
    //         //         return {
    //         //             authenticated: true,
    //         //         };
    //         //     } else {
    //         //         return {
    //         //             authenticated: false,
    //         //             error: new Error("Token not found"),
    //         //             redirectTo: "/login",
    //         //             logout: true,
    //         //         };
    //         //     }
    //         // } catch (error: any) {
    //         //     return {
    //         //         authenticated: false,
    //         //         error: new Error(error),
    //         //         redirectTo: "/login",
    //         //         logout: true,
    //         //     };
    //         // }
    //     },
    //     getPermissions: async () => null,
    //     getIdentity: async () => {
    //         if (user) {
    //             return {
    //                 ...user,
    //                 avatar: user.picture,
    //             };
    //         }
    //         return null;
    //     },
    // };

    return (
        <UserProvider>
            <GitHubBanner />
            <Refine
                routerProvider={routerProvider}
                // authProvider={authProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    { name: "users", list: "/users" },
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                        edit: "/posts/edit/:id",
                        show: "/posts/show/:id",
                    },
                ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
                notificationProvider={notificationProvider}
            >
                {renderComponent()}
                <UnsavedChangesNotifier />
            </Refine>
        </UserProvider>
    );
}

export default MyApp;
