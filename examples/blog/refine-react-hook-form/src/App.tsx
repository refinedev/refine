import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
    Layout,
    ThemeProvider,
    LightTheme,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import Create from "pages/create";

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "posts",
                            list: Create,
                        },
                    ]}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
