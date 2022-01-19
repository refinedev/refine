import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine-antd/dist/styles.min.css";

import { Login } from "pages/login";
import { appwriteClient } from "utility";

import { PostsCreate, PostsList, PostsEdit, PostsShow } from "pages/posts";

const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        return appwriteClient.account.createSession(email, password);
    },
    logout: async () => {
        await appwriteClient.account.deleteSession("current");

        return "/";
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        const session = await appwriteClient.account.getSession("current");

        if (session) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const user = await appwriteClient.account.get();

        if (user) {
            return user;
        }
    },
};

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(appwriteClient)}
            liveProvider={liveProvider(appwriteClient)}
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
            liveMode="auto"
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
