import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { BasicDataGrid } from "pages/dataGrid";
import { PostList } from "pages/table";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    return (
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
                    list: PostList,
                    options: { name: "Table" },
                },
                {
                    name: "posts",
                    list: BasicDataGrid,
                    options: { route: "basic-data-grid", name: "Data table" },
                },
            ]}
        />
    );
};

export default App;
