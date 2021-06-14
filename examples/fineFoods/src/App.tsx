import { Admin, Resource } from "@pankod/refine";
import "styles/antd.less";
import jsonServerDataProvider from "@pankod/refine-json-server";
import { authProvider } from "authProvider";
import { DashbaordPage } from "./pages/dashboard";
import { PostList, PostCreate, PostEdit } from "./pages/posts";
import { useTranslation } from "react-i18next";
import { Header, Title } from "components";
import "i18n";

const App: React.FC = () => {
    const API_URL = "https://refine-fake-ecommerce.pankod.com";
    const dataProvider = jsonServerDataProvider(API_URL);

    /* const { t, i18n } = useTranslation(); */

    /*  const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    }; */

    return (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            /* i18nProvider={i18nProvider} */
            Header={Header}
            Title={Title}
            DashboardPage={DashbaordPage}
        >
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
            />
            <Resource name="orders" />
            <Resource name="users" />
        </Admin>
    );
};

export default App;
