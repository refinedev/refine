import { Refine, AuthProvider } from "@pankod/refine-core";
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
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

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
