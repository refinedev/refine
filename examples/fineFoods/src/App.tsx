import { Refine, Resource, Icons, Icon } from "@pankod/refine";
import "styles/antd.less";
import jsonServerDataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "authProvider";
import { DashboardPage } from "./pages/dashboard";
import { LoginPage } from "./pages/login";
import { OrderList, OrderShow } from "./pages/orders";
import { UserList, UserEdit, UserShow } from "./pages/users";
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
                edit={UserEdit}
                show={UserShow}
                icon={<Icons.UsergroupAddOutlined />}
            />
            <Resource
                name="products"
                list={ProductList}
                icon={<Icon component={PizzaIcon} />}
            />
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
                icon={<Icon component={BikeWhiteIcon} />}
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
