import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, Title } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import { liveProvider } from "@refinedev/ably";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";

import { ablyClient } from "utility";
import { CustomSider } from "components";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoryList,
    CategoryCreate,
    CategoryEdit,
    CategoryShow,
} from "pages/categories";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            liveProvider={liveProvider(ablyClient)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
                {
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    show: CategoryShow,
                },
            ]}
            options={{ liveMode: "auto" }}
            Sider={CustomSider}
            Title={Title}
            notificationProvider={notificationProvider}
            Layout={Layout}
        />
    );
};

export default App;
