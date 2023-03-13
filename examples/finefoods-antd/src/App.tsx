import React from "react";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";

// It is recommended to use explicit import as seen below to reduce bundle size.
// import { IconName } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

import jsonServerDataProvider from "@refinedev/simple-rest";
import { authProvider } from "authProvider";

import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { OrderList, OrderShow } from "./pages/orders";
import { AuthPage } from "./pages/auth";
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

import "@refinedev/antd/dist/reset.css";

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
        <RefineKbarProvider>
            <GitHubBanner />
            <Refine
                legacyRouterProvider={{
                    ...routerProvider,
                    routes: [
                        {
                            path: "/register",
                            element: (
                                <AuthPage
                                    type="register"
                                    formProps={{
                                        initialValues: {
                                            email: "demo@refine.dev",
                                            password: "demodemo",
                                        },
                                    }}
                                />
                            ),
                        },
                        {
                            path: "/forgot-password",
                            element: <AuthPage type="forgotPassword" />,
                        },
                        {
                            path: "/update-password",
                            element: <AuthPage type="updatePassword" />,
                        },
                    ],
                }}
                dataProvider={dataProvider}
                legacyAuthProvider={authProvider}
                i18nProvider={i18nProvider}
                OffLayoutArea={OffLayoutArea}
                DashboardPage={DashboardPage}
                LoginPage={() => (
                    <AuthPage
                        type="login"
                        formProps={{
                            initialValues: {
                                email: "demo@refine.dev",
                                password: "demodemo",
                            },
                        }}
                    />
                )}
                Title={Title}
                Header={Header}
                Layout={Layout}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
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
            />
        </RefineKbarProvider>
    );
};

export default App;
