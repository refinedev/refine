import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-graphql";
import { GraphQLClient } from "graphql-request";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.strapi.refine.dev/graphql";

const client = new GraphQLClient(API_URL);

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(client)}>
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
