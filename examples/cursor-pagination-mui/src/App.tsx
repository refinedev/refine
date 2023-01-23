import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    ThemeProvider,
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

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
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    LoginPage={LoginPage}
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
