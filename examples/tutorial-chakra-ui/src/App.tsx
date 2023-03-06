import React from "react";

import { Refine } from "@refinedev/core";
import {
    notificationProvider,
    refineTheme,
    ReadyPage,
    ErrorComponent,
    Layout,
} from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

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
        </ChakraProvider>
    );
}

export default App;
