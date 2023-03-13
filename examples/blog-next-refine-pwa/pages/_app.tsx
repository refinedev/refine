import React from "react";
import { AppProps } from "next/app";
import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/legacy";
import dataProvider from "@refinedev/simple-rest";
import { Layout } from "@components/Layout";

import "src/styles/global.css";

const API_URL = "https://fakestoreapi.com";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <GitHubBanner />
            <Refine
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[{ name: "products" }]}
            >
                <Component {...pageProps} />
            </Refine>
        </>
    );
}

export default MyApp;
