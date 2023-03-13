import React from "react";

import { GitHubBanner, Refine } from "@refinedev/core";

import {
    notificationProvider,
    RefineSnackbarProvider,
    Layout,
    LightTheme,
    ReadyPage,
    ErrorComponent,
} from "@refinedev/mui";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

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
                <GitHubBanner />
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
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
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
