import { Refine } from "@refinedev/core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    notificationProvider,
    LightTheme,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";

const App: React.FC = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    legacyRouterProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
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
                />
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default App;
