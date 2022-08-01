import React from "react";
import { AppProps } from "next/app";
import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";

import { Refine, LoginPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider, { authProvider } from "@pankod/refine-medusa";

import { API_URL } from "../src/constants";

import { CollectionsList, ProductList, ProductShow } from "@components";
import { CollectionsShow } from "@components/collections/show";
import { ManagedUIContext } from "@components/ui/context";
import Layout from "@components/common/Layout";
import { CardProvider } from "@lib/context";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ManagedUIContext>
            <CardProvider>
                <Refine
                    Layout={Layout}
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
            </CardProvider>
        </ManagedUIContext>
    );
}

export default MyApp;
