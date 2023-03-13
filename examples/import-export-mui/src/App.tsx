import { GitHubBanner, Refine } from "@refinedev/core";

import {
    Layout,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    RefineSnackbarProvider,
    notificationProvider,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import { ImportList } from "pages/list";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <GitHubBanner />
                <Refine
                    legacyRouterProvider={routerProvider}
                    notificationProvider={notificationProvider}
                    dataProvider={dataProvider(API_URL)}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "posts",
                            list: ImportList,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
