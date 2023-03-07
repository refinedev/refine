import { Refine } from "@refinedev/core";

import {
    Layout,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    notificationProvider,
    SnackbarProvider,
} from "@refinedev/mui";

import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <SnackbarProvider>
                <Refine
                    legacyRouterProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "posts",
                            list: PostsList,
                            create: PostCreate,
                            edit: PostEdit,
                        },
                    ]}
                />
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
