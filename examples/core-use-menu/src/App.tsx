import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { Layout } from "components/layout";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
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
