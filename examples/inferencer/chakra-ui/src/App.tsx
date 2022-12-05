import { Refine } from "@pankod/refine-core";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import {
    ChakraUIListInferencer,
    ChakraUIEditInferencer,
    ChakraUIShowInferencer,
    ChakraUICreateInferencer,
} from "@pankod/refine-inferencer/chakra-ui";

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
                        list: ChakraUIListInferencer,
                        edit: ChakraUIEditInferencer,
                        show: ChakraUIShowInferencer,
                        create: ChakraUICreateInferencer,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: ChakraUIListInferencer,
                        edit: ChakraUIEditInferencer,
                        show: ChakraUIShowInferencer,
                        create: ChakraUICreateInferencer,
                        canDelete: true,
                    },
                    {
                        name: "users",
                        list: ChakraUIListInferencer,
                        edit: ChakraUIEditInferencer,
                        show: ChakraUIShowInferencer,
                        create: ChakraUICreateInferencer,
                        canDelete: true,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
