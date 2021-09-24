import React from "react";
import { AppProps } from "next/app";
import "@styles/global.css";

import { NextRouteComponent, Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import {
    PostList,
    PostCreate,
    PostEdit,
    PostShow,
    UserList,
} from "@components";

import "@pankod/refine/dist/styles.min.css";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    if (Component !== NextRouteComponent) {
        return <Component {...pageProps} />;
    }

    return (
        <Refine
            {...(routerProvider() as any)}
            dataProvider={dataProvider(API_URL)}
            routes={[{ path: "awesomeroute", component: PostList }]}
            resources={[
                { name: "users", list: UserList },
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
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
