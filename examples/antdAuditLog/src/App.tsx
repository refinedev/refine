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
import { DashboardPage } from "pages/dashboard";
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
            .then(() => {
                return Promise.resolve();
            })
            .catch(() => Promise.reject());
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        return refineSDK.auth
            .session()
            .then((response) => Promise.resolve(response))
            .catch(() => Promise.reject());
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
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            Header={() => null}
            LoginPage={LoginPage}
            DashboardPage={DashboardPage}
            auditLogProvider={{
                create: async ({ author, ...params }) => {
                    await refineSDK.log.create(params);
                },
                get: async ({ resource, action, meta, author }) => {
                    return await refineSDK.log.get({
                        resource,
                        action,
                        meta,
                        author,
                    });
                },
                update: async ({ id, name }) => {
                    return await refineSDK.log.update(id, {
                        name,
                    });
                },
            }}
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
