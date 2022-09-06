import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";
import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "@pankod/refine-strapi-v4";

import { API_URL } from "src/constants";
import { Layout } from "src/components";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const dataProvider = DataProvider(API_URL + "/api");

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://app.snipcart.com" />
                <link
                    rel="stylesheet"
                    href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
                />
                <script
                    async
                    src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"
                />
            </Head>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                resources={[{ name: "products" }]}
                Layout={Layout}
                options={{
                    reactQuery: { devtoolConfig: { position: "bottom-left" } },
                    disableTelemetry: true,
                }}
            >
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </Refine>
            <div
                hidden
                id="snipcart"
                data-api-key="YWEzNDc3NGQtOGI3ZS00MzI2LTliYmUtM2M4NDg0ZTg2OTE0NjM3ODAwODQ0NzIzNDc0NTIw"
            />
        </>
    );
}

export default MyApp;
