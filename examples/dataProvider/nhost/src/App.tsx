import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-hasura";
import { GraphQLClient } from "graphql-request";
import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";

const client = new GraphQLClient(API_URL, {
    headers: {
        "x-hasura-role": "public",
    },
});

const gqlDataProvider = dataProvider(client);

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={gqlDataProvider}
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
                    list: CategoriesList,
                    create: CategoriesCreate,
                    edit: CategoriesEdit,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
