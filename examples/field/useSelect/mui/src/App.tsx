import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    ThemeProvider,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";
import { ThemeProvider } from "@mui/system";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostsList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
