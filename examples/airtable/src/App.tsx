import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-airtable";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";
const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(
                "keywoytODSr6xAqfg",
                "appKYl1H4k9g73sBT",
            )}
        >
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
                create={CategoryCreate}
                edit={CategoryEdit}
                canDelete
            />
        </Refine>
    );
};

export default App;
