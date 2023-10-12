import React from "react";
import { GitHubBanner, Refine } from "@refinedev/core";
import { AppProps } from "next/app";

import { appWithTranslation, useTranslation } from "next-i18next";

import {
    useNotificationProvider,
    RefineThemes,
    ThemedLayoutV2,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/nextjs-router";

import { Header } from "@components";

import "@refinedev/antd/dist/reset.css";
import "@styles/global.css";
import { ConfigProvider, App as AntdApp } from "antd";

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
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
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
                        notificationProvider={useNotificationProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <ThemedLayoutV2 Header={Header}>
                            <Component {...pageProps} />
                        </ThemedLayoutV2>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </>
    );
}

export default appWithTranslation(MyApp);
