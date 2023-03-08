import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { ProductList } from "pages/products/list";
import { ProductCreate } from "pages/products/create";
import { ProductShow } from "pages/products/show";
import { ProductEdit } from "pages/products/edit";

function App() {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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
                        <Route path="/products" element={<ProductList />} />
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
        </BrowserRouter>
    );
}

export default App;
