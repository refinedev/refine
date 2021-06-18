import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import { PostList, PostEdit, PostCreate, PostShow } from "./pages";
import "@pankod/refine/dist/styles.min.css";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                show={PostShow}
            />
        </Refine>
    );
};
