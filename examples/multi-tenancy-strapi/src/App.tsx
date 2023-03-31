import {
    AuthPage,
    ErrorComponent,
    ThemedLayout,
    notificationProvider,
    RefineThemes,
} from "@refinedev/antd";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { CustomSider } from "components/sider";
import { StoreProvider } from "context/store";
import { OrderCreate, OrderEdit, OrderList } from "pages/order";
import { ProductList } from "pages/product";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <StoreProvider>
                <ConfigProvider theme={RefineThemes.Blue}>
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
                                list: "/products",
                            },
                            {
                                name: "orders",
                                list: "/orders",
                                create: "/orders/create",
                                edit: "/orders/edit/:id",
                            },
                        ]}
                        notificationProvider={notificationProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayout Sider={CustomSider}>
                                            <Outlet />
                                        </ThemedLayout>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="products" />
                                    }
                                />

                                <Route path="products">
                                    <Route index element={<ProductList />} />
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

                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
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
                                    <Authenticated>
                                        <ThemedLayout Sider={CustomSider}>
                                            <Outlet />
                                        </ThemedLayout>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                    </Refine>
                </ConfigProvider>
            </StoreProvider>
        </BrowserRouter>
    );
};

export default App;
