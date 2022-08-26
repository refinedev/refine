import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider, {
    liveProvider,
    GraphQLClient,
    graphqlWS,
} from "@pankod/refine-hasura";
import "@pankod/refine-antd/dist/styles.min.css";

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
            routerProvider={routerProvider}
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
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
