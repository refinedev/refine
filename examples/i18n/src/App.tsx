import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import { useTranslation } from "react-i18next";
import "@pankod/refine/dist/styles.min.css";

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
        </Refine>
    );
};

export default App;
