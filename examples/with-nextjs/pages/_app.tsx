import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@refinedev/core";
import { notificationProvider, Layout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import "@styles/global.css";

import { authProvider } from "src/authProvider";
import { API_URL } from "../src/constants";

// import { PostList, PostCreate, PostEdit, PostShow } from "@components";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Refine>
    );
}

export default MyApp;
