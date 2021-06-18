import { Admin, Resource } from "@pankod/refine";
import "styles/antd.less";
import jsonServerDataProvider from "@pankod/refine-json-server";
import { authProvider } from "authProvider";
import { DashbaordPage } from "./pages/dashboard";
import { OrderList, OrderShow } from "./pages/orders";
import { UserList, UserEdit } from "./pages/users";
import {
    ProductCreate,
    ProductEdit,
    ProductList,
    ProductShow,
} from "./pages/products";
import { StoreCreate, StoreEdit, StoreList, StoreShow } from "./pages/stores";
import { useTranslation } from "react-i18next";
import { Header, Title } from "components";
import "i18n";

const App: React.FC = () => {
    const API_URL = "https://api.finefoods.refine.dev";
    const dataProvider = jsonServerDataProvider(API_URL);

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            Header={Header}
            Title={Title}
            DashboardPage={DashbaordPage}
        >
            <Resource
                options={{
                    label: t("orders:title"),
                }}
                name="orders"
                list={OrderList}
                show={OrderShow}
            />
            <Resource
                options={{
                    label: t("users:title"),
                }}
                name="users"
                list={UserList}
                edit={UserEdit}
            />
            <Resource
                options={{
                    label: t("products:title"),
                }}
                name="products"
                list={ProductList}
                edit={ProductEdit}
                create={ProductCreate}
                show={ProductShow}
            />
            <Resource
                name="stores"
                options={{
                    label: t("stores:title"),
                }}
                list={StoreList}
                edit={StoreEdit}
                create={StoreCreate}
                show={StoreShow}
            />
            <Resource name="categories" />
        </Admin>
    );
};

export default App;
