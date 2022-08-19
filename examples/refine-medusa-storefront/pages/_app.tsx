import React from "react";
import { AppProps } from "next/app";
import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";

import { Refine, LoginPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider, {
    authProvider as medusaAuthProvider,
} from "@pankod/refine-medusa";

import { API_URL } from "@lib/constants";
import { ProductList } from "@components";
import { ManagedUIContext } from "@components/ui/context";
import Layout from "@components/common/Layout";
import { CartProvider } from "@lib/context";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const { categories } = pageProps;
    const authProvider = medusaAuthProvider(API_URL);

    const customAuthProvider = {
        ...authProvider,
        checkError: (error: any) => {
            return Promise.resolve();
        },
    };

    return (
        <ManagedUIContext>
            <Refine
                Layout={({ ...rest }) => (
                    <Layout {...rest} categories={categories} />
                )}
                LoginPage={LoginPage}
                DashboardPage={ProductList}
                authProvider={customAuthProvider}
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
