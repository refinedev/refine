import { AuthBindings, Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";

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

        try {
            await refineSDK.auth.login({
                email,
                password,
                provider: providerName,
            });

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: new Error("Invalid email or password"),
            };
        }
    },
    logout: async () => {
        try {
            await refineSDK.auth.logout();

            return {
                success: true,
                redirectTo: "/login",
            };
        } catch (error: any) {
            return {
                success: false,
                error: new Error(error),
            };
        }
    },
    onError: async () => ({}),
    check: async () => {
        try {
            await refineSDK.auth.getSessionFromUrl();
            const user = await refineSDK.auth.session();

            if (!user) {
                return {
                    authenticated: false,
                    redirectTo: "/login",
                    logout: true,
                };
            }

            return {
                authenticated: true,
            };
        } catch (error: any) {
            return {
                authenticated: false,
                redirectTo: "/login",
                logout: true,
                error,
            };
        }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        try {
            const response = await refineSDK.auth.session();
            return response;
        } catch (error) {
            return null;
        }
    },
};

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
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
