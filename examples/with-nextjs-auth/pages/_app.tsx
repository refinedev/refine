import React from "react";
import { AppProps } from "next/app";

import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    notificationProvider,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import { ConfigProvider } from "antd";
import "@styles/global.css";

import { authProvider } from "src/authProvider";
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
            <ThemedLayoutV2>
                <Component {...pageProps} />
            </ThemedLayoutV2>
        );
    };

    return (
        <>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        { name: "users", list: "/users" },
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
                    {renderComponent()}
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ConfigProvider>
        </>
    );
}

export default MyApp;
