import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import PostCreate from "pages/PostCreate";
import PostEdit from "pages/PostEdit";
import PostList from "pages/PostList";

function App() {
    return (
        <Refine
            notificationProvider={notificationProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "users",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                },
            ]}
        />
    );
}

export default App;
