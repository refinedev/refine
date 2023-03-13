import React from "react";
import { GitHubBanner, Refine } from "@refinedev/core";
import { AppProps } from "next/app";

import { appWithTranslation, useTranslation } from "next-i18next";

import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router/legacy";

import { PostList, PostCreate, PostEdit, PostShow, Header } from "@components";

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
        <>
            <GitHubBanner />
            <Refine
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                i18nProvider={i18nProvider}
                Header={Header}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                        canDelete: true,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            >
                <Component {...pageProps} />
            </Refine>
        </>
    );
}

export default appWithTranslation(MyApp);
