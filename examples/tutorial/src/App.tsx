import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import { PostList, PostCreate } from "./components/pages/posts";

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://readmin-fake-rest.pankod.com")}
        >
            <Resource name="posts" list={PostList} create={PostCreate} />
        </Admin>
    );
}

export default App;
