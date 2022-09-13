import { Refine } from "@pankod/refine-core";
import {
    MantineProvider,
    notificationProvider,
    Layout,
    Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "./authProvider";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";

function App() {
    return (
        <MantineProvider
            theme={{ colorScheme: "dark" }}
            withNormalizeCSS
            notificationProps={{ position: "top-right" }}
        >
            <Global
                styles={() => ({
                    p: {
                        marginBlockStart: 0,
                        marginBlockEnd: 0,
                    },
                })}
            />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                authProvider={authProvider}
                notificationProvider={notificationProvider}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        show: PostShow,
                        edit: PostEdit,
                        create: PostCreate,
                    },
                ]}
                syncWithLocation
                disableTelemetry={true}
            />
        </MantineProvider>
    );
}

export default App;
