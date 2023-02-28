import { Refine, AuthBindings } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import {
    AppwriteException,
    dataProvider,
    liveProvider,
} from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import "@pankod/refine-antd/dist/reset.css";

import { Login } from "pages/login";
import { appwriteClient, account } from "utility";

import { PostsCreate, PostsList, PostsEdit, PostsShow } from "pages/posts";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            await account.createEmailSession(email, password);
            return Promise.resolve({
                success: true,
                redirectTo: "/",
            });
        } catch (e) {
            const { type, message, code } = e as AppwriteException;
            return Promise.resolve({
                success: false,
                error: {
                    message,
                    name: `${code} - ${type}`,
                },
            });
        }
    },
    logout: async () => {
        await account.deleteSession("current");

        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
    onError: () => Promise.resolve({}),
    check: async () => {
        const session = await account.get();

        if (session) {
            return Promise.resolve({
                authenticated: true,
            });
        }

        return Promise.resolve({
            authenticated: false,
            error: new Error("Session not found"),
            logout: true,
            redirectTo: "/login",
        });
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: async () => {
        const user = await account.get();

        if (user) {
            return user;
        }
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
            routerProvider={routerProvider}
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
