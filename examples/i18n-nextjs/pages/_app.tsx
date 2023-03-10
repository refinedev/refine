import React from "react";
import { Refine } from "@refinedev/core";
import { AppProps } from "next/app";

import { appWithTranslation, useTranslation } from "next-i18next";

import { notificationProvider, Layout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";

import { Header } from "@components";

import "@refinedev/antd/dist/reset.css";
import "@styles/global.css";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const { t, i18n } = useTranslation();
    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            i18nProvider={i18nProvider}
            resources={[
                {
                    name: "posts",
                    list: "/posts",
                    create: "/posts/create",
                    edit: "/posts/edit/:id",
                    show: "/posts/show/:id",
                    meta: {
                        canDelete: true,
                    },
                },
            ]}
            notificationProvider={notificationProvider}
        >
            <Layout Header={Header}>
                <Component {...pageProps} />
            </Layout>
        </Refine>
    );
}

export default appWithTranslation(MyApp);
