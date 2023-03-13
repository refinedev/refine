import {
    GitHubBanner,
    Refine,
    LegacyAuthProvider as AuthProvider,
} from "@refinedev/core";
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

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            await account.createEmailSession(email, password);
            return Promise.resolve();
        } catch (e) {
            const { type, message, code } = e as AppwriteException;
            return Promise.reject({
                message,
                name: `${code} - ${type}`,
            });
        }
    },
    logout: async () => {
        await account.deleteSession("current");

        return "/";
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        console.log("checkAuth");
        const session = await account.get();

        if (session) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const user = await account.get();

        if (user) {
            return user;
        }
    },
};

const App: React.FC = () => {
    return (
        <>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider(appwriteClient, {
                    databaseId: "default",
                })}
                liveProvider={liveProvider(appwriteClient, {
                    databaseId: "default",
                })}
                options={{ liveMode: "auto" }}
                legacyAuthProvider={authProvider}
                legacyRouterProvider={routerProvider}
                LoginPage={Login}
                resources={[
                    {
                        name: "61c43ad33b857",
                        create: PostsCreate,
                        list: PostsList,
                        edit: PostsEdit,
                        show: PostsShow,
                        meta: {
                            label: "Post",
                        },
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
        </>
    );
};

export default App;
