import React from "react";
import { AppProps } from "next/app";
import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";

import { Refine, LoginPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider, { authProvider } from "@pankod/refine-medusa";

import { API_URL } from "../src/constants";

import { ProductList } from "@components";
import { ManagedUIContext } from "@components/ui/context";
import Layout from "@components/common/Layout";
import { CartProvider } from "@lib/context";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const { categories } = pageProps;
    return (
        <CartProvider>
            <ManagedUIContext>
                <Refine
                    Layout={({ ...rest }) => (
                        <Layout {...rest} categories={categories} />
                    )}
                    LoginPage={LoginPage}
                    DashboardPage={ProductList}
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
                    <Component {...pageProps} />
                </Refine>
            </ManagedUIContext>
        </CartProvider>
    );
}

export default MyApp;
