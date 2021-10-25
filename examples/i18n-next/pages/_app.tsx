import React from "react";
import { AppProps } from "next/app";
import "@styles/global.css";

import { appWithTranslation, useTranslation } from "next-i18next";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { PostList, PostCreate, PostEdit, PostShow } from "@components";
import { authProvider } from "src/authProvider";

import "@pankod/refine/dist/styles.min.css";

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
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
            i18nProvider={i18nProvider}
            resources={[
                { name: "users" },
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
            warnWhenUnsavedChanges={true}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default appWithTranslation(MyApp);
