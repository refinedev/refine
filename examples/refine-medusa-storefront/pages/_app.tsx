import React from "react";
import { AppProps } from "next/app";
import "@assets/main.css";
import "@assets/chrome-bug.css";

import { Refine, LoginPage } from "@pankod/refine-core";
import dataProvider from "../src/dataProvider";
import routerProvider from "@pankod/refine-nextjs-router";

import { API_URL } from "../src/constants";

import { PostList, PostShow } from "@components";
import { authProvider } from "src/authProvider";
import Navbar from "@components/common/Navbar";
import Footer from "@components/common/Footer";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            // Header={Navbar}
            Layout={({ children }) => (
                <div className="min-h-screen flex flex-col w-full ">
                    <Navbar />
                    <div className="flex-1">{children}</div>
                    <Footer />
                </div>
            )}
            LoginPage={LoginPage}
            authProvider={authProvider()}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "products",
                    list: PostList,
                    show: PostShow,
                },
            ]}
            warnWhenUnsavedChanges={true}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
