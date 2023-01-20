import React from "react";
import "./index.css";
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-airtable";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";
import { Layout } from " components/Layout";
import { PostList } from "pages/post/list";
import { PostShow } from "pages/post/show";
import { PostCreate } from "pages/post/create";
import { PostEdit } from "pages/post/edit";

function App() {
    const { t, i18n } = useTranslation();

    const API_TOKEN = "key0uWArSH56JHNJV";
    const BASE_ID = "appez0LgaOVA6SdCO";

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <Refine
            dataProvider={dataProvider(API_TOKEN, BASE_ID)}
            routerProvider={routerProvider}
            i18nProvider={i18nProvider}
            resources={[
                {
                    name: "posts",
                    icon: "",
                    list: PostList,
                    show: PostShow,
                    create: PostCreate,
                    edit: PostEdit,
                },
            ]}
            Layout={Layout}
        />
    );
}

export default App;
