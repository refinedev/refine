import {
    Authenticated,
    GitHubBanner,
    Refine,
    useParsed,
} from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    AuthPage,
    RefineThemes,
} from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { appwriteClient } from "utility";
import { authProvider } from "./authProvider";

import { ProductList } from "pages/products";
import { OrderCreate, OrderList, OrderEdit } from "pages/orders";
import { ProductShow } from "components/product";
import { Header } from "components/header";

function App() {
    // inital tenant
    const tenant = "refine";

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    liveProvider={liveProvider(appwriteClient, {
                        databaseId: "multi-tenancy",
                    })}
                    dataProvider={dataProvider(appwriteClient, {
                        databaseId: "multi-tenancy",
                    })}
                    authProvider={authProvider}
                    options={{
                        liveMode: "auto",
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                    resources={[
                        {
                            name: "products",
                            list: "/:tenant/products",
                            show: "/:tenant/products/show/:id",
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
                    notificationProvider={notificationProvider}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
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
                                    <Route index element={<ProductList />} />
                                    <Route
                                        path="show/:id"
                                        element={<ProductShow />}
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
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="products" />
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
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
