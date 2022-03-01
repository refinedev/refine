import type { AppProps } from "next/app";
import Head from "next/head";
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { Layout } from "@components";
import { BasketContextProvider } from "@context";
import { API_URL } from "src/constants";

import "src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            resources={[{ name: "users" }]}
        >
            <Head>
                <title>finefoods client example - refine</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <link rel="icon" type="image/png" href="/favicon.ico" />
            </Head>
            <BasketContextProvider>
                <Component {...pageProps} />
            </BasketContextProvider>
        </Refine>
    );
}

export default MyApp;
