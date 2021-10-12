import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { Layout, Header, Footer } from "@components";
import { authProvider } from "../src/authProvider";

require("@pankod/refine/node_modules/antd/dist/antd.less");
require("@styles/global.less");

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider}
            Layout={Layout}
            Header={Header}
            Footer={Footer}
            warnWhenUnsavedChanges={true}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
