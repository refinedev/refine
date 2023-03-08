import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import {
    notificationProvider,
    refineTheme,
    ErrorComponent,
    Layout,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductList } from "pages/products/list";
import { ProductCreate } from "pages/products/create";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={refineTheme}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider()}
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
                    </Layout>
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
