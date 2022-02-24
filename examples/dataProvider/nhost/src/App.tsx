import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-nhost";
import { NhostClient } from "@nhost/nhost-js";
import { NhostApolloProvider } from "@nhost/react-apollo";

import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

const nhost = new NhostClient({
    backendUrl: "https://oxhhlmqsjahbyedrmvll.nhost.run",
});

const App: React.FC = () => {
    return (
        <NhostApolloProvider nhost={nhost}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(nhost)}
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
        </NhostApolloProvider>
    );
};

export default App;
