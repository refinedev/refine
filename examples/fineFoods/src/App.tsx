import { Refine, Resource } from "@pankod/refine";
import "styles/antd.less";
import jsonServerDataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "authProvider";
import { DashboardPage } from "./pages/dashboard";
import { LoginPage } from "./pages/login";
import { OrderList, OrderShow } from "./pages/orders";
import { UserList, UserEdit, UserShow } from "./pages/users";
import { CourierList } from "./pages/couriers";
import {
    ProductCreate,
    ProductEdit,
    ProductList,
    ProductShow,
} from "./pages/products";
import { StoreCreate, StoreEdit, StoreList } from "./pages/stores";
import { CategoryList } from "./pages/categories";
import { ReviewsList } from "./pages/reviews";
import { useTranslation } from "react-i18next";
import { Header, Title } from "components";

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
        <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            Header={Header}
            Title={Title}
            DashboardPage={DashboardPage}
            LoginPage={LoginPage}
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
                show={UserShow}
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
            />
            <Resource
                name="categories"
                options={{
                    label: t("categories:title"),
                }}
                list={CategoryList}
            />
            <Resource
                name="couriers"
                options={{
                    label: t("couriers:title"),
                }}
                list={CourierList}
            />
            <Resource name="reviews" list={ReviewsList} />
        </Refine>
    );
};

export default App;
