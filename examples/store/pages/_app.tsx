import React from "react";
import { AppProps } from "next/app";
import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";

import { Refine, LoginPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider, { authProvider } from "@pankod/refine-medusa";

import { API_URL } from "@lib/constants";
import { Dashboard } from "@components";
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
                LoginPage={LoginPage}
                DashboardPage={Dashboard}
                authProvider={authProvider(API_URL)}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "dummy",
                    },
                ]}
                warnWhenUnsavedChanges={true}
            >
                <CartProvider>
                    <Component {...pageProps} />
                </CartProvider>
            </Refine>
        </ManagedUIContext>
    );
}

export default MyApp;
