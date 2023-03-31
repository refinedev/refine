import { GitHubBanner, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {
    notificationProvider,
    ThemedLayout,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { ProductList } from "pages/products/list";
import { ProductCreate } from "pages/products/create";
import { ProductShow } from "pages/products/show";
import { ProductEdit } from "pages/products/edit";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "products",
                            list: "/products",
                            show: "/products/show/:id",
                            create: "/products/create",
                            edit: "/products/edit/:id",
                        },
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <ThemedLayout>
                        <Routes>
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="products" />
                                }
                            />

                            <Route path="/products">
                                <Route index element={<ProductList />} />
                                <Route
                                    path="show/:id"
                                    element={<ProductShow />}
                                />
                                <Route
                                    path="create"
                                    element={<ProductCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ProductEdit />}
                                />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </ThemedLayout>
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
