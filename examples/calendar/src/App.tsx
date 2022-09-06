import { Refine } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import { CalendarPage } from "pages/calendar";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "events",
                    list: CalendarPage,
                },
            ]}
            Layout={Layout}
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
