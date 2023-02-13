import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import dataProvider from "@pankod/refine-simple-rest";

import { Layout } from "components/layout";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: () => <div>dummy posts page</div>,
                },
                {
                    name: "categories",
                    list: () => <div>dummy categories page</div>,
                },
            ]}
            Layout={Layout}
        />
    );
};

export default App;
