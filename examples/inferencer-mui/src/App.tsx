import { Refine } from "@refinedev/core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    notificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    legacyRouterProvider={routerProvider}
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
