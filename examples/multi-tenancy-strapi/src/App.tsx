import {
    AuthPage,
    ErrorComponent,
    ThemedLayoutV2,
    useNotificationProvider,
    RefineThemes,
} from "@refinedev/antd";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

import { OrderCreate, OrderEdit, OrderList } from "./pages/order";
import { ProductList } from "./pages/product";
import { Header } from "./components/header";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";

const App: React.FC = () => {
    // inital tenant
    const tenant = "1";

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        authProvider={authProvider}
                        dataProvider={DataProvider(
                            API_URL + "/api",
                            axiosInstance,
                        )}
                        routerProvider={routerProvider}
                        resources={[
                            {
                                name: "products",
                                list: "/:tenant/products",
                                meta: {
                                    tenant,
                                },
                            },
                            {
                                name: "orders",
                                list: "/:tenant/orders",
                                create: "/:tenant/orders/create",
                                edit: "/:tenant/orders/edit/:id",
                                meta: {
                                    tenant,
                                },
                            },
                        ]}
                        notificationProvider={useNotificationProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        key="authenticated-routes"
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2 Header={Header}>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="products" />
                                    }
                                />
                                <Route path="/:tenant">
                                    <Route path="products">
                                        <Route
                                            index
                                            element={<ProductList />}
                                        />
                                    </Route>

                                    <Route path="orders">
                                        <Route index element={<OrderList />} />
                                        <Route
                                            path="create"
                                            element={<OrderCreate />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<OrderEdit />}
                                        />
                                    </Route>
                                </Route>
                            </Route>

                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="posts" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            formProps={{
                                                initialValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated key="catch-all">
                                        <ThemedLayoutV2 Header={Header}>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
