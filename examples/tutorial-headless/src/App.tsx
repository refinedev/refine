import React from "react";

import { Refine } from "@refinedev/core";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { ProductList } from "pages/products/list";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";
import { ProductCreate } from "pages/products/create";

function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            legacyRouterProvider={routerProvider}
            resources={[
                {
                    name: "products",
                    list: ProductList,
                    show: ProductShow,
                    create: ProductCreate,
                    edit: ProductEdit,
                },
            ]}
        />
    );
}

export default App;
