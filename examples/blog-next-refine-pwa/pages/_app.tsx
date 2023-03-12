import React from "react";
import { AppProps } from "next/app";
import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
    UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
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
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <UnsavedChangesNotifier />
            </Refine>
        </>
    );
}

export default MyApp;
