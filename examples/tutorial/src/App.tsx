import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import { PostList, PostCreate, PostEdit } from "./components/pages/posts";

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
        >
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
            />
        </Admin>
    );
}

export default App;
