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
    ChakraUIListGuesser,
    ChakraUIEditGuesser,
    ChakraUIShowGuesser,
} from "@pankod/refine-guesser/chakra-ui";

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
                        name: "posts",
                        list: ChakraUIListGuesser,
                        edit: ChakraUIEditGuesser,
                        show: ChakraUIShowGuesser,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: ChakraUIListGuesser,
                        edit: ChakraUIEditGuesser,
                        show: ChakraUIShowGuesser,
                    },
                    {
                        name: "users",
                        list: ChakraUIListGuesser,
                        edit: ChakraUIEditGuesser,
                        show: ChakraUIShowGuesser,
                    },
                    {
                        name: "tags",
                    },
                    {
                        name: "languages",
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
