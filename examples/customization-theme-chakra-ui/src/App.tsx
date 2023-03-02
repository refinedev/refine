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

import { PostList, PostCreate, PostEdit, PostShow } from "./pages";
import { Header } from "./components/header";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                routerProvider={routerProvider}
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
