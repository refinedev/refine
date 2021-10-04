import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-airtable";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";

const App: React.FC = () => {
    const API_TOKEN = "keyI18pnBeEMfPAIb";
    const BASE_ID = "appkLVJ25X9ZP1P2l";

    return (
        <Refine
            dataProvider={dataProvider(API_TOKEN, BASE_ID)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
                {
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    canDelete: true,
                },
            ]}
        />
    );
};

export default App;
