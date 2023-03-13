import { GitHubBanner, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/nestjsx-crud";
import routerProvider from "@refinedev/react-router-v6/legacy";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";

const API_URL = "https://api.nestjsx-crud.refine.dev";

const App: React.FC = () => {
    return (
        <>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider(API_URL)}
                legacyRouterProvider={routerProvider}
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
                        list: CategoryList,
                        create: CategoryCreate,
                        edit: CategoryEdit,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
        </>
    );
};

export default App;
