import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostCreate, PostEdit, PostList } from "pages/posts";
import "./styles.css";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            options={{ mutationMode: "pessimistic", disableTelemetry: true }}
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
