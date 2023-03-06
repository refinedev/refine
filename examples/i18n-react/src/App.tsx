import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import { useTranslation } from "react-i18next";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Header } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            legacyRouterProvider={routerProvider}
            i18nProvider={i18nProvider}
            Header={Header}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
