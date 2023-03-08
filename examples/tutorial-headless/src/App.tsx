import { Refine, ErrorComponent } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductList } from "pages/products/list";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";
import { ProductCreate } from "pages/products/create";

function App() {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
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
            </Refine>
        </BrowserRouter>
    );
}

export default App;
