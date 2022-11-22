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
    MuiEditInferencer,
    MuiShowInferencer,
    MuiListInferencer,
    MuiCreateInferencer,
} from "@pankod/refine-inferencer/mui";

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
                            list: MuiListInferencer,
                            edit: MuiEditInferencer,
                            show: MuiShowInferencer,
                            create: MuiCreateInferencer,
                            canDelete: true,
                        },
                        {
                            name: "categories",
                            list: MuiListInferencer,
                            edit: MuiEditInferencer,
                            show: MuiShowInferencer,
                            create: MuiCreateInferencer,
                        },
                        {
                            name: "users",
                            list: MuiListInferencer,
                            edit: MuiEditInferencer,
                            show: MuiShowInferencer,
                            create: MuiCreateInferencer,
                        },
                        {
                            name: "inferences",
                            list: MuiListInferencer,
                            edit: MuiEditInferencer,
                            show: MuiShowInferencer,
                            create: MuiCreateInferencer,
                            canDelete: true,
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
