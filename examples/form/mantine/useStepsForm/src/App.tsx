import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    MantineProvider,
    Layout,
    LightTheme,
} from "@pankod/refine-mantine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostCreate, PostEdit, PostList } from "./pages";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={LightTheme}
            withNormalizeCSS
            notificationProps={{ position: "top-right" }}
        >
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                    {
                        name: "categories",
                        list: PostList,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                    {
                        parentName: "posts",
                        name: "Step_1",
                        list: PostList,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                    {
                        parentName: "posts",
                        name: "Step_2",
                        list: PostList,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                    {
                        parentName: "posts",
                        name: "Step_3",
                        list: PostList,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                    {
                        parentName: "Step_3",
                        name: "Step_1",
                        list: PostList,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                    {
                        parentName: "Step_3",
                        name: "Step_",
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
