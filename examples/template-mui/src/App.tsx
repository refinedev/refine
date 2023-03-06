import React from "react";

import { Refine } from "@refinedev/core";
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
                    legacyRouterProvider={routerProvider}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
