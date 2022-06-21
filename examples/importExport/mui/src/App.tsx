import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    LightTheme,
    CssBaseline,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { ImportList } from "pages/list";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: ImportList,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
