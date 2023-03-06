import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";

import { CalendarPage } from "pages/calendar";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "events",
                    list: CalendarPage,
                },
            ]}
            Layout={Layout}
        />
    );
};

export default App;
