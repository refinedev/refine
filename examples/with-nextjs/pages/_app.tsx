import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@refinedev/core";
import { notificationProvider } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import "@styles/global.css";

import { authProvider } from "src/authProvider";
import { API_URL } from "../src/constants";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                { name: "users", list: "/users" },
                {
                    name: "posts",
                    list: "/posts",
                    create: "/posts/create",
                    edit: "/posts/edit/:id",
                    show: "/posts/show/:id",
                    meta: {
                        canDelete: true,
                    },
                },
            ]}
            options={{ syncWithLocation: true }}
            notificationProvider={notificationProvider}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
