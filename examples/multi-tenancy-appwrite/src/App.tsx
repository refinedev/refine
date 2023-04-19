import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
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
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { appwriteClient } from "utility";
import { authProvider } from "./authProvider";

import { ProductList } from "pages/products";
import { OrderCreate, OrderList, OrderEdit } from "pages/orders";
import { ProductShow } from "components/product";
import { StoreProvider } from "context/store";
import { CustomSider } from "components/sider";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <StoreProvider>
                <ConfigProvider theme={RefineThemes.Blue}>
                    <Refine
                        routerProvider={routerProvider}
                        liveProvider={liveProvider(appwriteClient)}
                        dataProvider={dataProvider(appwriteClient)}
                        authProvider={authProvider}
                        options={{
                            liveMode: "auto",
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                        resources={[
                            {
                                name: "61cb01b17ef57",
                                list: "/products",
                                show: "/products/show/:id",
                                meta: {
                                    label: "Products",
                                },
                            },
                            {
                                name: "61cb019fdbd11",
                                list: "/orders",
                                create: "/orders/create",
                                edit: "/orders/edit/:id",
                                meta: {
                                    label: "Orders",
                                },
                            },
                        ]}
                        notificationProvider={notificationProvider}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2 Sider={CustomSider}>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={<Navigate to="products" />}
                                />

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

                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <Navigate to="products" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={<AuthPage type="login" />}
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2 Sider={CustomSider}>
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
            </StoreProvider>
        </BrowserRouter>
    );
}

export default App;
