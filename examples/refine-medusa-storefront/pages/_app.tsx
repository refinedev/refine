import React from "react";
import { AppProps } from "next/app";
import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";

import { Refine, LoginPage } from "@pankod/refine-core";
import dataProvider from "../src/dataProvider";
import routerProvider from "@pankod/refine-nextjs-router";

import { API_URL } from "../src/constants";

import { CollectionsList, ProductList, ProductShow } from "@components";
import { authProvider } from "src/authProvider";
import { CollectionsShow } from "@components/collections/show";
import { ManagedUIContext } from "@components/ui/context";
import Layout from "@components/common/Layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ManagedUIContext>
            <Refine
                Layout={Layout}
                LoginPage={LoginPage}
                authProvider={authProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "products",
                        list: ProductList,
                        show: ProductShow,
                    },
                    {
                        name: "collections",
                        list: CollectionsList,
                        show: CollectionsShow,
                    },
                ]}
                warnWhenUnsavedChanges={true}
            >
                <Component {...pageProps} />
            </Refine>
        </ManagedUIContext>
    );
}

export default MyApp;
