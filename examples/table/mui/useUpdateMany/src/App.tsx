import { Refine } from "@pankod/refine-core";
import {
    Layout,
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
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "posts",
                            list: PostsList,
                        },
                    ]}
                    options={{ disableTelemetry: true }}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
