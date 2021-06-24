import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-airtable";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";

const App: React.FC = () => {
    const API_TOKEN = "keywoytODSr6xAqfg";
    const BASE_ID = "appKYl1H4k9g73sBT";

    return (
        <Refine dataProvider={dataProvider(API_TOKEN, BASE_ID)}>
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
