import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import "./styles.css";

import { PostList } from "pages/posts";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            legacyRouterProvider={routerProvider}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};

export default App;
