import { Refine } from "@refinedev/core";
import {
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "samples",
                        list: ChakraUIInferencer,
                        edit: ChakraUIInferencer,
                        show: ChakraUIInferencer,
                        create: ChakraUIInferencer,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: ChakraUIInferencer,
                        edit: ChakraUIInferencer,
                        show: ChakraUIInferencer,
                        create: ChakraUIInferencer,
                        canDelete: true,
                    },
                    {
                        name: "users",
                        list: ChakraUIInferencer,
                        edit: ChakraUIInferencer,
                        show: ChakraUIInferencer,
                        create: ChakraUIInferencer,
                        canDelete: true,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
