import React from "react";
import { Refine } from "@pankod/refine-core";
import { AppProps } from "next/app";

import { appWithTranslation, useTranslation } from "next-i18next";

import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { PostList, PostCreate, PostEdit, PostShow, Header } from "@components";

import "@pankod/refine-antd/dist/styles.min.css";
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
            options={{ disableTelemetry: true }}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default appWithTranslation(MyApp);
