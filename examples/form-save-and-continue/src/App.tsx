import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { PostCreate, PostEdit, PostList } from "pages/posts";
import "./styles.css";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            legacyRouterProvider={routerProvider}
            options={{ mutationMode: "pessimistic" }}
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: PostList,
                    edit: PostEdit,
                },
            ]}
        />
    );
};

export default App;
