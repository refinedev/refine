import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-hasura";
import { GraphQLClient } from "graphql-request";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoriesList } from "pages/categories";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";

const client = new GraphQLClient(API_URL, {
    headers: {
        "x-hasura-role": "public",
    },
});

const gqlDataProvider = dataProvider(client);

const App: React.FC = () => {
    return (
        <Refine dataProvider={gqlDataProvider as any}>
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
            <Resource name="categories" list={CategoriesList} />
        </Refine>
    );
};

export default App;
