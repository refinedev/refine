import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    NotificationsProvider,
    notificationProvider,
    MantineProvider,
    Global,
    Layout,
    LightTheme,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mantine";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { ProductList } from "pages/products/list";
import { ProductCreate } from "pages/products/create";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";

function App() {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
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
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default App;
