import React from "react";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Refine } from "@refinedev/core";
import { notificationProvider, Layout as AntdLayout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";
import "@styles/global.css";

import { authProvider } from "src/authProvider";
import { API_URL } from "src/constants";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    layout?: string;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const ActiveLayout =
        Component.layout === "auth" ? React.Fragment : AntdLayout;

    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            resources={[
                {
                    name: "posts",
                    list: "/posts",
                    create: "/posts/create",
                    edit: "/posts/edit/:id",
                    show: "/posts/show/:id",
                },
                {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                },
            ]}
        >
            <ActiveLayout>
                <Component {...pageProps} />
            </ActiveLayout>
        </Refine>
    );
}

export default MyApp;
