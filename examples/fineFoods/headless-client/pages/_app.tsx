import type { AppProps } from "next/app";
import Head from "next/head";
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { Layout, Footer, Header, OffLayoutArea } from "../components";
import { API_URL } from "../constants";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            Header={Header}
            Footer={Footer}
            OffLayoutArea={OffLayoutArea}
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
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
