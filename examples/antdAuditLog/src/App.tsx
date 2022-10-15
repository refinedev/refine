import { AuthProvider, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
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
import { DashboardPage } from "pages/dashboard";
import { ILoginDto } from "interfaces";

import refineSDK from "utils/refine-sdk";

const API_URL = "https://api.fake-rest.refine.dev";

const authProvider: AuthProvider = {
    login: async (payload: ILoginDto) => {
        const { email, password, providerName } = payload;

        await refineSDK.auth.login({
            email,
            password,
            provider: providerName,
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
            LoginPage={AuthPage}
            DashboardPage={DashboardPage}
            auditLogProvider={{
                create: async ({ ...params }) => {
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
        />
    );
};

export default App;
