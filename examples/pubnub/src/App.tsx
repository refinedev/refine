import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import { liveProvider } from "@pankod/refine-pubnub";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine/dist/styles.min.css";

import { pubnubClient } from "utility";
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
            liveProvider={liveProvider(pubnubClient)}
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
        />
    );
};

export default App;
