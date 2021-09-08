import { Refine, Resource } from "@pankod/refine";
import { dataProvider } from "@pankod/refine-supabase";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { supabaseClient } from "utility";

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(supabaseClient)}>
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Refine>
    );
};

export default App;
