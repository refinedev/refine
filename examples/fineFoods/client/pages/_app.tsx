import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import {
    PostList,
    PostCreate,
    PostEdit,
    PostShow,
    HomePage,
} from "@components";
import { authProvider } from "../src/authProvider";

// import "@pankod/refine/dist/styles.min.css";
require("@pankod/refine/node_modules/antd/dist/antd.less");

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider}
            DashboardPage={HomePage}
            resources={[
                // { name: "users" },
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
            warnWhenUnsavedChanges={true}
        >
            <Component {...pageProps} hede="1" />
        </Refine>
    );
}

export default MyApp;
