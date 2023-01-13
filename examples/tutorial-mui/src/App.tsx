import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
    Layout,
    ThemeProvider,
    LightTheme,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mui";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { ProductList } from "pages/products/list";
import { ProductEdit } from "pages/products/edit";
import { ProductCreate } from "pages/products/create";
import { ProductShow } from "pages/products/show";

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
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
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
