import { Refine } from "@refinedev/core";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        />
    );
};

export default App;
