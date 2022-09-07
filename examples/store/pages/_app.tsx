import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";

import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider, { authProvider } from "@pankod/refine-medusa";
import NextNProgress from "nextjs-progressbar";

import { API_URL, PROXY_URL } from "@lib/constants";
import { Dashboard, SEO } from "@components";
import Layout from "@components/common/Layout";
import { CartProvider, ManagedUIContext } from "@lib/context";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const { categories } = pageProps;

    return (
        <ManagedUIContext>
            <Refine
                Layout={({ ...rest }) => (
                    <Layout {...rest} categories={categories} />
                )}
                DashboardPage={Dashboard}
                authProvider={authProvider(PROXY_URL)}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "dummy",
                    },
                ]}
                warnWhenUnsavedChanges={true}
                options={{
                    reactQuery: {
                        clientConfig: {
                            defaultOptions: {
                                queries: {
                                    keepPreviousData: false,
                                },
                            },
                        },
                    },
                }}
            >
                <CartProvider>
                    <SEO />
                    <NextNProgress options={{ showSpinner: false }} />
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-MBME4VEPK4"
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-MBME4VEPK4');
                        `}
                    </Script>
                    <Component {...pageProps} />
                </CartProvider>
            </Refine>
        </ManagedUIContext>
    );
}

export default MyApp;
