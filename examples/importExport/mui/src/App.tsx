import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "authProvider";

import { ImportList } from "pages/list";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    return (
        <Refine
            authProvider={authProvider}
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
    );
};

export default App;
