import { Refine } from "@refinedev/core";
import {
    notificationProvider,
    refineTheme,
    WelcomePage,
} from "@refinedev/chakra-ui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={refineTheme}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                >
                    <Routes>
                        <Route index element={<WelcomePage />} />
                    </Routes>
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
