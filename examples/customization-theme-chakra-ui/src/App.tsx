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

import { PostList, PostCreate, PostEdit, PostShow } from "./pages";
import { Header } from "./components/header";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider()}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Layout={Layout}
                Header={Header}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        show: PostShow,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
