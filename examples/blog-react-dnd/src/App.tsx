import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "@pankod/refine-antd/dist/reset.css";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import DashboardPage from "pages/dashBoardPage";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                routerProvider={routerProvider}
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
