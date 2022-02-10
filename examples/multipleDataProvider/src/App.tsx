import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";
const FINE_FOODS_API_URL = "https://api.finefoods.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={{
                defaultProvider: dataProvider(API_URL),
                fineFoods: dataProvider(FINE_FOODS_API_URL),
            }}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
