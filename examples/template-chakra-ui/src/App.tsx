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
import routerProvider from "@pankod/refine-react-router-v6/legacy";

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
            />
        </ChakraProvider>
    );
}

export default App;
