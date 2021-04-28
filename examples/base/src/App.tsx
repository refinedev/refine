import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

const App = () => {
    const apiUrl =
        process.env.REACT_APP_API_URL || "https://refine-fake-rest.pankod.com";

    return (
        <Admin dataProvider={dataProvider(apiUrl)}>
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Admin>
    );
};

export default App;
