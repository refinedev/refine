import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    Icons,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

const { AimOutlined, TagOutlined } = Icons;

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";
import { UserCreate, UserEdit, UserList, UserShow } from "pages/users";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            DashboardPage={() => <div>Dashboard</div>}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    options: { route: "custom-route" },
                    show: PostShow,
                    canDelete: true,
                    icon: <AimOutlined />,
                },
                {
                    name: "cms",
                },
                {
                    name: "users",
                    parentName: "cms",
                    list: UserList,
                    create: UserCreate,
                    edit: UserEdit,
                    show: UserShow,
                },
                {
                    name: "tags",
                    options: { label: "Cms Tags", route: "Custom" },
                    parentName: "users",
                    icon: <TagOutlined />,
                    list: UserList,
                    create: UserCreate,
                    edit: UserEdit,
                    show: UserShow,
                },
                {
                    name: "categories",
                    parentName: "cms",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    canDelete: true,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
