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
    LoginPage,
    ErrorComponent,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import { DataProvider } from "@pankod/refine-strapi-v4";

import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import { PostList, PostCreate, PostEdit } from "./pages/posts";

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    LoginPage={LoginPage}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            create: PostCreate,
                            edit: PostEdit,
                            canDelete: true,
                        },
                    ]}
                    options={{
                        mutationMode: "undoable",
                        syncWithLocation: true,
                        disableTelemetry: true,
                    }}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
