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
import { LoginPage } from "pages/login";
import { ILoginDto } from "interfaces";

import refineSDK from "utils/refine-sdk";

const API_URL = "https://api.fake-rest.refine.dev";

const authProvider: AuthProvider = {
    login: async (payload: ILoginDto) => {
        const { email, password, provider } = payload;

        await refineSDK.auth.login({
            email,
            password,
            provider,
        });

        return Promise.resolve();
    },
    logout: async () => refineSDK.auth.logout(),
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        // for social login
        refineSDK.auth.getSessionFromUrl();

        return refineSDK.auth
            .session()
            .then(() => Promise.resolve())
            .catch(() => Promise.reject());
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const { user } = await refineSDK.auth.session();
        return user;
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
                        auditLog: {
                            permissions: ["create", "delete", "update"],
                            autoFetch: ["*"],
                        },
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
                        auditLog: {
                            permissions: ["create", "delete", "update"],
                            autoFetch: ["*"],
                        },
                    },
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            Header={() => null}
            LoginPage={LoginPage}
            auditLogProvider={{
                log: (params) => {
                    console.log(
                        `-- log create params: ${JSON.stringify(params)}`,
                    );
                    dataProvider(API_URL).create({
                        resource: "logs",
                        variables: params,
                    });
                },
                list: async ({ resource, params }) => {
                    console.log(
                        `-- log list resource: ${resource} params: ${JSON.stringify(
                            params,
                        )}`,
                    );
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
                    console.log(`-- log rename id: ${id} name: ${name}`);
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
