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

import { BasicDataGrid } from "pages/dataGrid";
import { PostList } from "pages/table";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "Posts",
                        },
                        {
                            name: "posts",
                            parentName: "Posts",
                            list: PostList,
                            options: {
                                route: "react-table",
                                label: "React Table",
                            },
                        },
                        {
                            name: "posts",
                            parentName: "Posts",
                            list: BasicDataGrid,
                            options: { route: "data-grid", label: "Data Grid" },
                        },
                    ]}
                    options={{ disableTelemetry: true }}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
