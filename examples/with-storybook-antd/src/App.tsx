import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import "@refinedev/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
