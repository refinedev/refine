import { useMemo } from "react";
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    DarkTheme,
    LightTheme,
    useMediaQuery,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import { authProvider } from "authProvider";
import { OrderList, OrderShow } from "pages/orders";

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

    return (
        <ThemeProvider theme={theme}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.finefoods.refine.dev")}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                syncWithLocation
                warnWhenUnsavedChanges
                resources={[
                    {
                        name: "orders",
                        list: OrderList,
                        show: OrderShow,
                        icon: <AddShoppingCartOutlinedIcon />,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
