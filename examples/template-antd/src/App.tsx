import React from "react";

import { Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            legacyRouterProvider={routerProvider}
        />
    );
}

export default App;
