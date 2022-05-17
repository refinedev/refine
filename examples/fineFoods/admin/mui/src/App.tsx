import { useMemo } from "react";
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    useMediaQuery,
    DarkTheme,
    LightTheme,
    notificationProviderHandle,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";
import {
    AddShoppingCartOutlined,
    StarBorderOutlined,
    BikeScooterOutlined,
    StoreOutlined,
    LocalPizzaOutlined,
    PeopleOutlineOutlined,
} from "@mui/icons-material";

import { authProvider } from "authProvider";
import { DashboardPage } from "pages/dashboard";
import { OrderList, OrderShow } from "pages/orders";
import { UserList, UserShow } from "pages/users";
import { ReviewsList } from "pages/reviews";
import { CourierList, CourierShow } from "pages/couriers";
import { LoginPage } from "pages/login";
import { StoreList, StoreEdit, StoreCreate } from "pages/stores";
import { ProductList } from "pages/products";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = useMemo(
        () => (prefersDarkMode ? DarkTheme : LightTheme),
        [prefersDarkMode],
    );
    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={theme}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.finefoods.refine.dev")}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                DashboardPage={DashboardPage}
                ReadyPage={ReadyPage}
                Layout={Layout}
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
                        name: "couriers",
                        list: CourierList,
                        show: CourierShow,
                        icon: <BikeScooterOutlined />,
                    },
                    {
                        name: "reviews",
                        list: ReviewsList,
                        icon: <StarBorderOutlined />,
                    },
                    {
                        name: "stores",
                        list: StoreList,
                        edit: StoreEdit,
                        create: StoreCreate,
                        icon: <StoreOutlined />,
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
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
