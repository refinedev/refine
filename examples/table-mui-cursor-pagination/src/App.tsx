import { Refine } from "@refinedev/core";

import {
    Layout,
    ErrorComponent,
    LightTheme,
    notificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import routerProvider from "@refinedev/react-router-v6";

import { dataProvider } from "rest-data-provider";
import { PostsList } from "pages/posts";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    legacyRouterProvider={routerProvider}
                    dataProvider={dataProvider("https://api.github.com")}
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "repos/refinedev/refine/commits",
                            list: PostsList,
                            meta: {
                                label: "Commits",
                            },
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
