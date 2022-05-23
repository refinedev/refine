import { useEffect, useMemo, useState } from "react";
import { Refine } from "@pankod/refine-core";
import {
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    DarkTheme,
    LightTheme,
    notificationProviderHandle,
    Layout,
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
import {
    CourierList,
    CourierShow,
    CourierCreate,
    CourierEdit,
} from "pages/couriers";
import { LoginPage } from "pages/login";
import { StoreList, StoreEdit, StoreCreate } from "pages/stores";
import { ProductList } from "pages/products";
import { Header } from "components";
import { ColorModeContext } from "contexts";

const App: React.FC = () => {
    const colorModeFromLocalStorage = localStorage.getItem("colorMode");

    const [mode, setMode] = useState(colorModeFromLocalStorage || "light");

    const setModeWithLocalStorage = (mode: string) => {
        window.localStorage.setItem("colorMode", mode);
        setMode(mode);
    };

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                if (mode === "light") {
                    setModeWithLocalStorage("dark");
                } else {
                    setModeWithLocalStorage("light");
                }
            },
            mode,
        }),
        [mode],
    );

    useEffect(() => {
        const localTheme = localStorage.getItem("colorMode");
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        !localTheme
            ? setMode("dark")
            : localTheme
            ? setModeWithLocalStorage(localTheme)
            : setMode("light");
    }, []);

    const { t, i18n } = useTranslation();
    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    const notificationProvider = notificationProviderHandle();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={mode === "dark" ? DarkTheme : LightTheme}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.finefoods.refine.dev",
                    )}
                    authProvider={authProvider}
                    i18nProvider={i18nProvider}
                    DashboardPage={DashboardPage}
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
                            name: "couriers",
                            list: CourierList,
                            show: CourierShow,
                            create: CourierCreate,
                            edit: CourierEdit,
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
        </ColorModeContext.Provider>
    );
};

export default App;
