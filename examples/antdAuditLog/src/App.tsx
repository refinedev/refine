import { AuthProvider, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoryList,
    CategoryCreate,
    CategoryEdit,
    CategoryShow,
} from "pages/categories";

const API_URL = "https://api.fake-rest.refine.dev";

const authProvider: AuthProvider = {
    login: (params: any) => {
        if (params.username === "admin") {
            localStorage.setItem("username", params.username);
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: async () => {
        return Promise.resolve({
            id: 1,
            name: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        });
    },
};

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                    options: {
                        auditLogPermissions: ["create", "delete", "update"],
                    },
                },
                {
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    show: CategoryShow,
                    canDelete: true,
                    options: {
                        auditLogPermissions: ["create", "delete", "update"],
                    },
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            Header={() => null}
            auditLogProvider={{
                logEvent: (params) => {
                    dataProvider(API_URL).create({
                        resource: "logs",
                        variables: params,
                    });
                },
                list: async ({ resource, params }) => {
                    const { data } = await dataProvider(API_URL).getList({
                        resource: "logs",
                        filters: [
                            {
                                field: "resource",
                                operator: "eq",
                                value: resource,
                            },
                            {
                                field: "data.id",
                                operator: "eq",
                                value: params?.id,
                            },
                        ],
                    });
                    return data;
                },
                rename: async ({ id, name }) => {
                    const { data } = await dataProvider(API_URL).update({
                        resource: "logs",
                        id,
                        variables: { name },
                    });
                    return data;
                },
            }}
        />
    );
};

export default App;
