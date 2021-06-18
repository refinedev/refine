import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import { useTranslation } from "react-i18next";
import "@pankod/refine/dist/styles.min.css";
import "i18n";

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
        <Admin
            dataProvider={dataProvider(API_URL)}
            i18nProvider={i18nProvider}
            Header={Header}
        >
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Admin>
    );
};

export default App;
