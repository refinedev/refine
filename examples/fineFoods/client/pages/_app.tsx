import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { Layout, Header, Footer } from "@components";
import { BasketContextProvider } from "@contextProviders";

require("@pankod/refine/node_modules/antd/dist/antd.less");
require("@styles/global.less");

const API_URL = "https://api.finefoods.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            Header={Header}
            Footer={Footer}
            resources={[{ name: "users" }]}
            warnWhenUnsavedChanges={true}
        >
            <BasketContextProvider>
                <Component {...pageProps} />
            </BasketContextProvider>
        </Refine>
    );
}

export default MyApp;
