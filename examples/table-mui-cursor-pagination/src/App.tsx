import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    LightTheme,
    ThemeProvider,
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import { dataProvider } from "rest-data-provider";
import { PostsList } from "pages/posts";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider("https://api.github.com")}
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "repos/refinedev/refine/commits",
                            list: PostsList,
                            options: {
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
