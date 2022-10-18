import { Refine } from "@pankod/refine-core";
import {
    ChakraProvider,
    Button,
    Layout,
    LightTheme,
    Box,
} from "@pankod/refine-chakra-ui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

// import { PostCreate, PostEdit, PostList } from "./pages";

const DashboardPage = () => {
    return <span>dashboard</span>;
};

const App: React.FC = () => {
    return (
        <ChakraProvider theme={LightTheme}>
            <Refine
                DashboardPage={DashboardPage}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                // notificationProvider={notificationProvider}
                // ReadyPage={ReadyPage}
                // catchAll={<ErrorComponent />}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        list: () => <span>posts list</span>,
                    },
                    {
                        name: "categories",
                        list: () => <span>categories</span>,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
