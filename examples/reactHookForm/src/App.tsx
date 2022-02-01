import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

import { PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            resources={[{ name: "posts", create: PostCreate, edit: PostEdit }]}
        />
    );
};

export default App;
