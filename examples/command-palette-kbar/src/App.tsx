import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";

// It is recommended to use explicit import as seen below to reduce bundle size.
// import { IconName } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";

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
            <GitHubBanner />
            <Refine
                legacyRouterProvider={routerProvider}
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
            />
        </RefineKbarProvider>
    );
};

export default App;
