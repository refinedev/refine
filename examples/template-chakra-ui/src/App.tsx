import React from "react";

import { GitHubBanner, Refine } from "@refinedev/core";
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

function App() {
    return (
        <ChakraProvider theme={refineTheme}>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider()}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Layout={Layout}
                legacyRouterProvider={routerProvider}
            />
        </ChakraProvider>
    );
}

export default App;
