import React from "react";
import { AppProps } from "next/app";
import { GitHubBanner, Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import { Layout } from "@components/Layout";

import "src/styles/global.css";

const API_URL = "https://fakestoreapi.com";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <GitHubBanner />
            <Refine
                routerProvider={routerProvider}
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
