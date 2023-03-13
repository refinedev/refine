import { GitHubBanner, Refine } from "@refinedev/core";

import {
    Layout,
    ErrorComponent,
    ReadyPage,
    RefineSnackbarProvider,
    notificationProvider,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import { PostsList, PostCreate, PostEdit } from "pages/posts";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts";

const App: React.FC = () => {
    return (
        <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <GitHubBanner />
                <Refine
                    notificationProvider={notificationProvider}
                    legacyRouterProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    Header={Header}
                    resources={[
                        {
                            name: "posts",
                            list: PostsList,
                            create: PostCreate,
                            edit: PostEdit,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ColorModeContextProvider>
    );
};

export default App;
