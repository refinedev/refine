import type { AppProps } from "next/app";
import Head from "next/head";
import { GitHubBanner, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";

import { Layout } from "@components";
import { BasketContextProvider } from "@context";
import { API_URL } from "src/constants";

import "src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <GitHubBanner />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
            >
                <Head>
                    <title>
                        Finefoods headless storefront example - refine
                    </title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                    />
                    <link rel="icon" type="image/png" href="/favicon.ico" />
                </Head>
                <BasketContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </BasketContextProvider>
            </Refine>
        </>
    );
}

export default MyApp;
