import React from "react";

import { Refine } from "@pankod/refine-core";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import { ProductList } from "pages/products/list";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";
import { ProductCreate } from "pages/products/create";

function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
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
