import React from "react";

import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@refinedev/antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "@refinedev/antd/dist/reset.css";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import DashboardPage from "pages/dashBoardPage";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                legacyRouterProvider={routerProvider}
                DashboardPage={DashboardPage}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                    },
                ]}
            />
        </DndProvider>
    );
}

export default App;
