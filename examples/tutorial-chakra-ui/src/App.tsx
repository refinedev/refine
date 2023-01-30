import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    ChakraProvider,
    refineTheme,
    ReadyPage,
    ErrorComponent,
    Layout,
} from "@pankod/refine-chakra-ui";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { ProductList } from "pages/products/list";
import { ProductCreate } from "pages/products/create";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";

function App() {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider()}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Layout={Layout}
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
        </ChakraProvider>
    );
}

export default App;
