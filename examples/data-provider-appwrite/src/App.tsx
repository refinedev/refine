import { Refine, AuthBindings } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import {
    AppwriteException,
    dataProvider,
    liveProvider,
} from "@refinedev/appwrite";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";

import { Login } from "pages/login";
import { appwriteClient, account } from "utility";

import { PostsCreate, PostsList, PostsEdit, PostsShow } from "pages/posts";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            await account.createEmailSession(email, password);
            return {
                success: true,
                redirectTo: "/",
            };
        } catch (e) {
            const { type, message, code } = e as AppwriteException;
            return {
                success: false,
                error: {
                    message,
                    name: `${code} - ${type}`,
                },
            };
        }
    },
    logout: async () => {
        try {
            await account.deleteSession("current");
        } catch (error: any) {
            return {
                success: false,
                error,
            };
        }

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async () => ({}),
    check: async () => {
        try {
            const session = await account.get();

            if (session) {
                return {
                    authenticated: true,
                };
            }
        } catch (error: any) {
            return {
                authenticated: false,
                error: error,
                logout: true,
                redirectTo: "/login",
            };
        }

        return {
            authenticated: false,
            error: new Error("Session not found"),
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const user = await account.get();

        if (user) {
            return user;
        }

        return null;
    },
};

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(appwriteClient, {
                databaseId: "default",
            })}
            liveProvider={liveProvider(appwriteClient, {
                databaseId: "default",
            })}
            options={{ liveMode: "auto" }}
            authProvider={authProvider}
            legacyRouterProvider={routerProvider}
            LoginPage={Login}
            resources={[
                {
                    name: "61c43ad33b857",
                    create: PostsCreate,
                    list: PostsList,
                    edit: PostsEdit,
                    show: PostsShow,
                    options: {
                        label: "Post",
                    },
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
