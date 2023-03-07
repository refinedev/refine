import React from "react";

import { Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@refinedev/antd";
import "@refinedev/antd";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { ProductList } from "pages/products/list";
import { ProductCreate } from "pages/products/create";
import { ProductShow } from "pages/products/show";
import { ProductEdit } from "pages/products/edit";

function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
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
