import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";
import { NextPage } from "next";

import { GetListResponse, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider, { authProvider } from "@refinedev/medusa";
import NextNProgress from "nextjs-progressbar";
import { ProductCollection } from "@medusajs/medusa";

import { PROXY_URL } from "@lib/constants";
import { SEO } from "@components";
import Layout from "@components/common/Layout";
import { CartProvider, ManagedUIContext } from "@lib/context";
import { useAnalytics } from "@lib/hooks";

import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    categories: GetListResponse<ProductCollection>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const { categories } = pageProps;

    useAnalytics();

    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

        return (
            <Layout categories={categories}>
                <Component {...pageProps} />
            </Layout>
        );
    };

    return (
        <ManagedUIContext>
            <GitHubBanner />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(PROXY_URL)}
                authProvider={authProvider(PROXY_URL)}
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
                    {renderComponent()}
                </CartProvider>
            </Refine>
        </ManagedUIContext>
    );
}

export default MyApp;
