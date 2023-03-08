import { Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    LightTheme,
    ErrorComponent,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductList } from "pages/products/list";
import { ProductCreate } from "pages/products/create";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";

function App() {
    return (
        <BrowserRouter>
            <MantineProvider
                theme={LightTheme}
                withNormalizeCSS
                withGlobalStyles
            >
                <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
                <NotificationsProvider position="top-right">
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
                    >
                        <Layout>
                            <Routes>
                                <Route index element={<NavigateToResource />} />
                                <Route
                                    path="/products"
                                    element={<ProductList />}
                                />
                                <Route
                                    path="/products/show/:id"
                                    element={<ProductShow />}
                                />
                                <Route
                                    path="/products/create"
                                    element={<ProductCreate />}
                                />
                                <Route
                                    path="/products/edit/:id"
                                    element={<ProductEdit />}
                                />
                                <Route path="*" element={<ErrorComponent />} />
                            </Routes>
                        </Layout>
                    </Refine>
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
}

export default App;
