import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
import { Layout } from "@components/Layout";

import "src/styles/global.css";

const API_URL = "https://fakestoreapi.com";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Refine>
    );
}

export default MyApp;
