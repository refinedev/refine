import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-hasura";
import { GraphQLClient } from "graphql-request";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "HASURA_URL";

const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);

const App: React.FC = () => {
    return (
        <Refine dataProvider={gqlDataProvider}>
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
