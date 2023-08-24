import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-antd";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "styles/antd.less";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            routerProvider={routerProvider}
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
    );
}

export default App;
