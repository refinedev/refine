import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostEdit, PostCreate, PostShow } from "./pages";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Admin dataProvider={dataProvider(API_URL)}>
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                show={PostShow}
            />
        </Admin>
    );
};

export default App;
