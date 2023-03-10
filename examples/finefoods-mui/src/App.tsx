import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { KBarProvider } from "@refinedev/kbar";
import {
    ErrorComponent,
    notificationProvider,
    Layout,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import { GlobalStyles, CssBaseline } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    AddShoppingCartOutlined,
    StarBorderOutlined,
    CategoryOutlined,
    StoreOutlined,
    LocalPizzaOutlined,
    PeopleOutlineOutlined,
    Dashboard,
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

const API_URL = "https://api.finefoods.refine.dev";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <BrowserRouter>
            <GitHubBanner />
            <KBarProvider>
                <ColorModeContextProvider>
                    <CssBaseline />
                    <GlobalStyles
                        styles={{ html: { WebkitFontSmoothing: "auto" } }}
                    />
                    <RefineSnackbarProvider>
                        <Refine
                            routerProvider={routerProvider}
                            dataProvider={dataProvider(API_URL)}
                            authProvider={authProvider}
                            i18nProvider={i18nProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                            }}
                            notificationProvider={notificationProvider}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: {
                                        icon: <Dashboard />,
                                    },
                                },
                                {
                                    name: "orders",
                                    list: "/orders",
                                    show: "/orders/show/:id",
                                    meta: {
                                        icon: <AddShoppingCartOutlined />,
                                    },
                                },
                                {
                                    name: "users",
                                    list: "/users",
                                    show: "/users/show/:id",
                                    meta: {
                                        icon: <PeopleOutlineOutlined />,
                                    },
                                },
                                {
                                    name: "products",
                                    list: "/products",
                                    meta: {
                                        icon: <LocalPizzaOutlined />,
                                    },
                                },
                                {
                                    name: "stores",
                                    list: "/stores",
                                    create: "/stores/create",
                                    edit: "/stores/edit/:id",
                                    meta: {
                                        icon: <StoreOutlined />,
                                    },
                                },
                                {
                                    name: "categories",
                                    list: "/categories",
                                    meta: {
                                        icon: <CategoryOutlined />,
                                    },
                                },
                                {
                                    name: "couriers",
                                    list: "/couriers",
                                    create: "/couriers/create",
                                    edit: "/couriers/edit/:id",
                                    show: "/couriers/show/:id",
                                    meta: {
                                        icon: <BikeWhiteIcon />,
                                    },
                                },
                                {
                                    name: "reviews",
                                    list: "/reviews",
                                    meta: {
                                        icon: <StarBorderOutlined />,
                                    },
                                },
                            ]}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <Authenticated
                                            fallback={
                                                <CatchAllNavigate to="/login" />
                                            }
                                        >
                                            <Layout
                                                Header={Header}
                                                Title={Title}
                                                OffLayoutArea={OffLayoutArea}
                                            >
                                                <Outlet />
                                            </Layout>
                                        </Authenticated>
                                    }
                                >
                                    <Route index element={<DashboardPage />} />

                                    <Route path="/orders">
                                        <Route index element={<OrderList />} />
                                        <Route
                                            path="show/:id"
                                            element={<OrderShow />}
                                        />
                                    </Route>

                                    <Route path="/users">
                                        <Route index element={<UserList />} />
                                        <Route
                                            path="show/:id"
                                            element={<UserShow />}
                                        />
                                    </Route>

                                    <Route
                                        path="/products"
                                        element={<ProductList />}
                                    />

                                    <Route path="/stores">
                                        <Route index element={<StoreList />} />
                                        <Route
                                            path="create"
                                            element={<StoreCreate />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<StoreEdit />}
                                        />
                                    </Route>

                                    <Route
                                        path="/categories"
                                        element={<CategoryList />}
                                    />

                                    <Route path="/couriers">
                                        <Route
                                            index
                                            element={<CourierList />}
                                        />
                                        <Route
                                            path="create"
                                            element={<CourierCreate />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<CourierEdit />}
                                        />
                                        <Route
                                            path="show/:id"
                                            element={<CourierShow />}
                                        />
                                    </Route>

                                    <Route
                                        path="/reviews"
                                        element={<ReviewsList />}
                                    />
                                </Route>

                                <Route
                                    element={
                                        <Authenticated fallback={<Outlet />}>
                                            <NavigateToResource />
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="/login"
                                        element={
                                            <AuthPage
                                                type="login"
                                                formProps={{
                                                    defaultValues: {
                                                        email: "demo@refine.dev",
                                                        password: "demodemo",
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/register"
                                        element={
                                            <AuthPage
                                                type="register"
                                                formProps={{
                                                    defaultValues: {
                                                        email: "demo@refine.dev",
                                                        password: "demodemo",
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/forgot-password"
                                        element={
                                            <AuthPage
                                                type="forgotPassword"
                                                formProps={{
                                                    defaultValues: {
                                                        email: "demo@refine.dev",
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/update-password"
                                        element={
                                            <AuthPage type="updatePassword" />
                                        }
                                    />
                                </Route>

                                <Route
                                    element={
                                        <Authenticated>
                                            <Layout
                                                Header={Header}
                                                Title={Title}
                                                OffLayoutArea={OffLayoutArea}
                                            >
                                                <Outlet />
                                            </Layout>
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="*"
                                        element={<ErrorComponent />}
                                    />
                                </Route>
                            </Routes>
                        </Refine>
                    </RefineSnackbarProvider>
                </ColorModeContextProvider>
            </KBarProvider>
        </BrowserRouter>
    );
};

export default App;
