import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";
import { UserList, UserShow } from "pages/users";

const API_URL = "https://refine-fake-rest.pankod.com";

const App: React.FC = () => {
    return (
        <Admin dataProvider={dataProvider(API_URL)}>
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
            <Resource
                name="categories"
                list={CategoryList}
                show={CategoryShow}
            />
            <Resource name="users" list={UserList} show={UserShow} />
        </Admin>
    );
};

export default App;
