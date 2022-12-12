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
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

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
                            name: "samples",
                            list: MuiInferencer,
                            edit: MuiInferencer,
                            show: MuiInferencer,
                            create: MuiInferencer,
                            canDelete: true,
                        },
                        {
                            name: "categories",
                            list: MuiInferencer,
                            edit: MuiInferencer,
                            show: MuiInferencer,
                            create: MuiInferencer,
                            canDelete: true,
                        },
                        {
                            name: "users",
                            list: MuiInferencer,
                            edit: MuiInferencer,
                            show: MuiInferencer,
                            create: MuiInferencer,
                            canDelete: true,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
