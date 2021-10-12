import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { Layout, Header, Footer } from "@components";
import { authProvider } from "../src/authProvider";
import { API_URL } from "../src/constants";

require("@pankod/refine/node_modules/antd/dist/antd.less");
require("@styles/global.less");

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider}
            Layout={Layout}
            Header={Header}
            Footer={Footer}
            resources={[{ name: "users" }]}
            warnWhenUnsavedChanges={true}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
