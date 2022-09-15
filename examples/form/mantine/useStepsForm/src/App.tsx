import { Refine } from "@pankod/refine-core";
import { notificationProvider, MantineProvider } from "@pankod/refine-mantine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostCreate, PostEdit, PostList } from "./pages";

const App: React.FC = () => {
    return (
        <MantineProvider
            withNormalizeCSS
            notificationProps={{ position: "top-right" }}
        >
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                ]}
            />
        </MantineProvider>
    );
};

export default App;
