import { useEffect } from "react";
import routerProvider from "@pankod/refine-react-router-v6";
import { Refine } from "@pankod/refine-core";
import {
    Icons,
    ConfigProvider,
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import jsonServerDataProvider from "@pankod/refine-simple-rest";
import de_DE from "antd/lib/locale/de_DE";
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
import { Header, Title, OffLayoutArea } from "components";
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
        <ConfigProvider locale={locale === "de" ? de_DE : undefined}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                OffLayoutArea={OffLayoutArea}
                DashboardPage={DashboardPage}
                LoginPage={LoginPage}
                Title={Title}
                Header={Header}
                Layout={Layout}
                syncWithLocation
                warnWhenUnsavedChanges
                resources={[
                    {
                        name: "orders",
                        list: OrderList,
                        show: OrderShow,
                        icon: <Icons.ShoppingOutlined />,
                    },
                    {
                        name: "users",
                        list: UserList,
                        show: UserShow,
                        icon: <Icons.UsergroupAddOutlined />,
                    },
                    {
                        name: "products",
                        list: ProductList,
                        icon: <PizzaIcon />,
                    },

                    {
                        name: "stores",
                        list: StoreList,
                        edit: StoreEdit,
                        create: StoreCreate,
                        icon: <Icons.ShopOutlined />,
                    },
                    {
                        name: "categories",
                        list: CategoryList,
                    },
                    {
                        name: "couriers",
                        list: CourierList,
                        show: CourierShow,
                        create: CouriersCreate,
                        edit: CouriersEdit,
                        icon: <BikeWhiteIcon />,
                    },
                    {
                        name: "reviews",
                        list: ReviewsList,
                        icon: <Icons.StarOutlined />,
                    },
                ]}
                notificationProvider={notificationProvider}
                catchAll={<ErrorComponent />}
            ></Refine>
        </ConfigProvider>
    );
};

export default App;
