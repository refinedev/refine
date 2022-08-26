import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    Icons,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

import { OffLayoutArea } from "./components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <RefineKbarProvider>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                        icon: <Icons.StarOutlined />,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: CategoriesList,
                        create: CategoriesCreate,
                        edit: CategoriesEdit,
                        canDelete: true,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                OffLayoutArea={OffLayoutArea}
                catchAll={<ErrorComponent />}
                options={{ disableTelemetry: true }}
            />
        </RefineKbarProvider>
    );
};

export default App;
