import React from "react";
import { AppProps } from "next/app";
import "@styles/global.css";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { PostList, PostCreate, PostEdit, PostShow } from "@components";
import { authProvider } from "../src/authProvider";

import "@pankod/refine/dist/styles.min.css";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider() as any}
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider}
            resources={[
                { name: "users" },
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
        >
            <Component {...pageProps} hede="1" />
        </Refine>
    );
}

export default MyApp;
