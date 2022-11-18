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
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import {
    MuiEditGuesser,
    MuiShowGuesser,
    MuiListGuesser,
} from "@pankod/refine-guesser/mui";

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
                            name: "posts",
                            list: MuiListGuesser,
                            edit: MuiEditGuesser,
                            show: MuiShowGuesser,
                            canDelete: true,
                        },
                        {
                            name: "categories",
                            list: MuiListGuesser,
                            edit: MuiEditGuesser,
                            show: MuiShowGuesser,
                        },
                        {
                            name: "users",
                            list: MuiListGuesser,
                            edit: MuiEditGuesser,
                            show: MuiShowGuesser,
                        },
                        {
                            name: "tags",
                        },
                        {
                            name: "languages",
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
