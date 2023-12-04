import {
    Authenticated,
    GitHubBanner,
    Refine,
    useParsed,
} from "@refinedev/core";
import {
    useNotificationProvider,
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
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

import { appwriteClient, resources } from "./utility";
import { authProvider } from "./authProvider";

import { ProductList } from "./pages/products";
import { OrderCreate, OrderList, OrderEdit } from "./pages/orders";
import { ProductShow } from "./components/product";
import { Header } from "./components/header";

function App() {
    // inital tenant
    const tenant = resources.tenant;

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        routerProvider={routerProvider}
                        liveProvider={liveProvider(appwriteClient, {
                            databaseId: resources.databaseId,
                        })}
                        dataProvider={dataProvider(appwriteClient, {
                            databaseId: resources.databaseId,
                        })}
                        authProvider={authProvider}
                        options={{
                            liveMode: "auto",
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                        resources={[
                            {
                                name: resources.products,
                                list: "/:tenant/products",
                                show: "/:tenant/products/show/:id",
                                meta: {
                                    label: "Products",
                                    tenant,
                                },
                            },
                            {
                                name: resources.orders,
                                list: "/:tenant/orders",
                                create: "/:tenant/orders/create",
                                edit: "/:tenant/orders/edit/:id",
                                meta: {
                                    label: "Orders",
                                    tenant,
                                },
                            },
                        ]}
                        notificationProvider={useNotificationProvider}
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
                                        <NavigateToResource
                                            resource={resources.products}
                                        />
                                    }
                                />

                                <Route path="/:tenant">
                                    <Route path="products">
                                        <Route
                                            index
                                            element={<ProductList />}
                                        />
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
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource
                                            resource={resources.products}
                                        />
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
}

export default App;
