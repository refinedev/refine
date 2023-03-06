import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";

import { GetListResponse, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/legacy";
import dataProvider, { authProvider } from "@refinedev/medusa";
import NextNProgress from "nextjs-progressbar";
import { ProductCollection } from "@medusajs/medusa";

import { PROXY_URL } from "@lib/constants";
import { Dashboard, SEO } from "@components";
import Layout from "@components/common/Layout";
import { CartProvider, ManagedUIContext } from "@lib/context";
import { useAnalytics } from "@lib/hooks";

import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";

function MyApp({
    Component,
    pageProps,
}: AppProps<{ categories: GetListResponse<ProductCollection> }>): JSX.Element {
    const { categories } = pageProps;

    useAnalytics();

    return (
        <ManagedUIContext>
            <Refine
                Layout={({ ...rest }) => (
                    <Layout {...rest} categories={categories} />
                )}
                DashboardPage={Dashboard}
                legacyRouterProvider={routerProvider}
                legacyAuthProvider={authProvider(PROXY_URL)}
                dataProvider={dataProvider(PROXY_URL)}
                resources={[
                    {
                        name: "dummy",
                    },
                ]}
                options={{
                    warnWhenUnsavedChanges: true,
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
                        src="https://www.googletagmanager.com/gtag/js?id=G-7BSVVDBPMB"
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-7BSVVDBPMB');
                        `}
                    </Script>
                    <Component {...pageProps} />
                </CartProvider>
            </Refine>
        </ManagedUIContext>
    );
}

export default MyApp;
