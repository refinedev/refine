import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { Layout } from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            Layout={Layout}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
