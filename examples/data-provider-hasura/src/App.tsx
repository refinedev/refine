import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider, { GraphQLClient } from "@refinedev/hasura";
import "@refinedev/antd";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";
/* 
## Refine supports GraphQL subscriptions as out-of-the-box. For more detailed information, please visit here, https://refine.dev/docs/core/providers/live-provider/

const WS_URL = "ws://flowing-mammal-24.hasura.app/v1/graphql";

const gqlWebSocketClient = graphqlWS.createClient({
    url: WS_URL,
});
 */
const client = new GraphQLClient(API_URL, {
    headers: {
        "x-hasura-role": "public",
    },
});

const gqlDataProvider = dataProvider(client);

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={gqlDataProvider}
            // ## Refine supports GraphQL subscriptions as out-of-the-box. For more detailed information, please visit here, https://refine.dev/docs/core/providers/live-provider/
            //liveProvider={liveProvider(gqlWebSocketClient)}
            //options={{ liveMode: "auto" }}
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
