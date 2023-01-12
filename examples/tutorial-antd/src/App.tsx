import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

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
