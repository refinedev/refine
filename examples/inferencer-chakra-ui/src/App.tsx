import { Refine } from "@pankod/refine-core";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
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
