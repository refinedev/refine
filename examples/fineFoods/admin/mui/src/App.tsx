import { useContext } from "react";
import { Refine } from "@pankod/refine-core";
import {
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    notificationProviderHandle,
    Layout,
    GlobalStyles,
    CssBaseline,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";
import {
    AddShoppingCartOutlined,
    StarBorderOutlined,
    CategoryOutlined,
    StoreOutlined,
    LocalPizzaOutlined,
    PeopleOutlineOutlined,
} from "@mui/icons-material";

import { authProvider } from "authProvider";
import { DarkTheme, LightTheme } from "theme";
import { DashboardPage } from "pages/dashboard";
import { OrderList, OrderShow } from "pages/orders";
import { UserList, UserShow } from "pages/users";
import { ReviewsList } from "pages/reviews";
import {
    CourierList,
    CourierShow,
    CourierCreate,
    CourierEdit,
} from "pages/couriers";
import { LoginPage } from "pages/login";
import { StoreList, StoreEdit, StoreCreate } from "pages/stores";
import { ProductList } from "pages/products";
import { CategoryList } from "pages/categories";
import { Header, Title } from "components";
import { ColorModeContext } from "contexts";
import { BikeWhiteIcon } from "components/icons/bike-white";

const App: React.FC = () => {
    const { mode } = useContext(ColorModeContext);
    const { t, i18n } = useTranslation();
    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={mode === "dark" ? DarkTheme : LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.finefoods.refine.dev")}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                DashboardPage={DashboardPage}
                Title={Title}
                ReadyPage={ReadyPage}
                Layout={Layout}
                Header={Header}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                syncWithLocation
                warnWhenUnsavedChanges
                notificationProvider={notificationProvider}
                resources={[
                    {
                        name: "orders",
                        list: OrderList,
                        show: OrderShow,
                        icon: <AddShoppingCartOutlined />,
                    },
                    {
                        name: "users",
                        list: UserList,
                        show: UserShow,
                        icon: <PeopleOutlineOutlined />,
                    },
                    {
                        name: "products",
                        list: ProductList,
                        icon: <LocalPizzaOutlined />,
                    },
                    {
                        name: "stores",
                        list: StoreList,
                        edit: StoreEdit,
                        create: StoreCreate,
                        icon: <StoreOutlined />,
                    },
                    {
                        name: "categories",
                        list: CategoryList,
                        icon: <CategoryOutlined />,
                    },
                    {
                        name: "couriers",
                        list: CourierList,
                        show: CourierShow,
                        create: CourierCreate,
                        edit: CourierEdit,
                        icon: <BikeWhiteIcon />,
                    },
                    {
                        name: "reviews",
                        list: ReviewsList,
                        icon: <StarBorderOutlined />,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
