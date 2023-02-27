import { AuthBindings, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/reset.css";

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

const authProvider: AuthBindings = {
    login: async (payload: ILoginDto) => {
        const { email, password, providerName } = payload;

        console.log("worked");

        try {
            await refineSDK.auth.login({
                email,
                password,
                provider: providerName,
            });

            return Promise.resolve({
                success: true,
            });
        } catch (error) {
            return Promise.resolve({
                success: false,
                error: new Error("Invalid email or password"),
            });
        }
    },
    logout: async () => {
        await refineSDK.auth.logout();

        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
    onError: () => Promise.resolve({}),
    check: async () => {
        try {
            // for social login
            await refineSDK.auth.getSessionFromUrl();
            await refineSDK.auth.session();
            return Promise.resolve({
                authenticated: true,
            });
        } catch (error: any) {
            return Promise.resolve({
                authenticated: false,
                error: new Error(error),
            });
        }
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: async () => {
        return refineSDK.auth
            .session()
            .then((response) => Promise.resolve(response))
            .catch(() => Promise.resolve());
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
