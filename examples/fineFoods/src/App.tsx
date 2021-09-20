import { useEffect } from "react";
import { Refine, Resource, Icons, Icon } from "@pankod/refine";
import jsonServerDataProvider from "@pankod/refine-simple-rest";
import de_DE from "@pankod/refine/node_modules/antd/lib/locale/de_DE";
import { authProvider } from "authProvider";
import dayjs from "dayjs";

import "styles/antd.less";
import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { LoginPage } from "./pages/login";
import { OrderList, OrderShow } from "./pages/orders";
import { UserList, UserShow } from "./pages/users";
import {
    CourierList,
    CourierShow,
    CouriersCreate,
    CouriersEdit,
} from "./pages/couriers";
import { ProductList } from "./pages/products";
import { StoreCreate, StoreEdit, StoreList } from "./pages/stores";
import { CategoryList } from "./pages/categories";
import { ReviewsList } from "./pages/reviews";
import { useTranslation } from "react-i18next";
import { Header, Title } from "components";
import { BikeWhiteIcon, PizzaIcon } from "components/icons";

const App: React.FC = () => {
    const API_URL = "https://api.finefoods.refine.dev";
    const dataProvider = jsonServerDataProvider(API_URL);

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    const locale = i18nProvider.getLocale();

    useEffect(() => {
        if (locale === "de") {
            dayjs.locale("de");
        } else {
            dayjs.locale("en");
        }
    }, [locale]);

    return (
        <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            Header={Header}
            Title={Title}
            DashboardPage={DashboardPage}
            LoginPage={LoginPage}
            syncWithLocation
            warnWhenUnsavedChanges
            configProviderProps={{
                locale: locale === "de" ? de_DE : undefined,
            }}
        >
            <Resource
                name="orders"
                list={OrderList}
                show={OrderShow}
                icon={<Icons.ShoppingOutlined />}
            />
            <Resource
                name="users"
                list={UserList}
                show={UserShow}
                icon={<Icons.UsergroupAddOutlined />}
            />
            <Resource name="products" list={ProductList} icon={<PizzaIcon />} />
            <Resource
                name="stores"
                list={StoreList}
                edit={StoreEdit}
                create={StoreCreate}
                icon={<Icons.ShopOutlined />}
            />
            <Resource name="categories" list={CategoryList} />
            <Resource
                name="couriers"
                list={CourierList}
                show={CourierShow}
                create={CouriersCreate}
                edit={CouriersEdit}
                icon={<BikeWhiteIcon />}
            />
            <Resource
                name="reviews"
                list={ReviewsList}
                icon={<Icons.StarOutlined />}
            />
        </Refine>
    );
};

export default App;
