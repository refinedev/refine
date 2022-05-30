import { useMemo } from "react";
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    DarkTheme,
    useMediaQuery,
    CssBaseline,
    ThemeProvider,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "authProvider";
import { PostCreate, PostEdit, PostList, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = useMemo(
        () => (prefersDarkMode ? DarkTheme : LightTheme),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Refine
                authProvider={authProvider}
                routerProvider={routerProvider as any}
                dataProvider={dataProvider(API_URL)}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
