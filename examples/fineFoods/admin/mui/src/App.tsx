import { Refine } from "@pankod/refine-core";
import { KBarProvider } from "@pankod/refine-kbar";
import {
    ErrorComponent,
    ReadyPage,
    notificationProvider,
    Layout,
    GlobalStyles,
    CssBaseline,
    RefineSnackbarProvider,
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
import { AuthPage } from "pages/auth";
import { StoreList, StoreEdit, StoreCreate } from "pages/stores";
import { ProductList } from "pages/products";
import { CategoryList } from "pages/categories";
import { ColorModeContextProvider } from "contexts";
import { Header, Title, OffLayoutArea } from "components";
import { BikeWhiteIcon } from "components/icons/bike-white";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <KBarProvider>
            <ColorModeContextProvider>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <RefineSnackbarProvider>
                    <Refine
                        routerProvider={{
                            ...routerProvider,
                            routes: [
                                {
                                    path: "/register",
                                    element: (
                                        <AuthPage
                                            type="register"
                                            formProps={{
                                                defaultValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    ),
                                },
                                {
                                    path: "/forgot-password",
                                    element: (
                                        <AuthPage
                                            type="forgotPassword"
                                            formProps={{
                                                defaultValues: {
                                                    email: "demo@refine.dev",
                                                },
                                            }}
                                        />
                                    ),
                                },
                                {
                                    path: "/update-password",
                                    element: <AuthPage type="updatePassword" />,
                                },
                            ],
                        }}
                        dataProvider={dataProvider(
                            "https://api.finefoods.refine.dev",
                        )}
                        authProvider={authProvider}
                        i18nProvider={i18nProvider}
                        DashboardPage={DashboardPage}
                        Title={Title}
                        ReadyPage={ReadyPage}
                        Layout={Layout}
                        Header={Header}
                        LoginPage={() => (
                            <AuthPage
                                type="login"
                                formProps={{
                                    defaultValues: {
                                        email: "demo@refine.dev",
                                        password: "demodemo",
                                    },
                                }}
                            />
                        )}
                        catchAll={<ErrorComponent />}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                        notificationProvider={notificationProvider}
                        OffLayoutArea={OffLayoutArea}
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
                </RefineSnackbarProvider>
            </ColorModeContextProvider>
        </KBarProvider>
    );
};

export default App;
