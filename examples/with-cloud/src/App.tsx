import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import { withCloud } from "@refinedev/cloud";
import "@refinedev/antd";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    ProductList,
    ProductCreate,
    ProductEdit,
    ProductShow,
} from "pages/products";
import {
    CategoryList,
    CategoryShow,
    CategoryCreate,
    CategoryEdit,
} from "pages/categories";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

// temporary set for refine-cluod-dev-tools
window.localStorage.setItem(
    "refine-cloud-token",
    process.env.REACT_APP_REFINE_CLOUD_TOKEN as string,
);

const RefineWithCloud = withCloud(Refine, {
    baseUrl: process.env.REACT_APP_REFINE_BASE_URL as string,
    clientId: process.env.REACT_APP_REFINE_CLIENT_ID as string,
    resourcesName: "development",
});

const App: React.FC = () => {
    return (
        <RefineWithCloud
            LoginPage={Login}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
                {
                    name: "products",
                    list: ProductList,
                    create: ProductCreate,
                    edit: ProductEdit,
                    show: ProductShow,
                },
                {
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    show: CategoryShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
