import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";
import { CustomMenu } from "./CustomMenu";

const API_URL = "https://refine-fake-rest.pankod.com";

const App = () => {
    return (
        <Admin dataProvider={dataProvider(API_URL)} Sider={CustomMenu}>
            <Resource name="posts" list={PostList} />
        </Admin>
    );
};

export default App;
