import { Refine } from "@pankod/refine-core";
import { notificationProvider, Layout, Title } from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import { liveProvider } from "@pankod/refine-ably";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

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
            routerProvider={routerProvider}
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
            liveMode="auto"
            Sider={CustomSider}
            Title={Title}
            notificationProvider={notificationProvider}
            Layout={Layout}
        />
    );
};

export default App;
