import { Refine } from "@refinedev/core";
import {
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { PostList } from "./pages";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider()}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
