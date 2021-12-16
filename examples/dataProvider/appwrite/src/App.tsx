import { Refine, AuthProvider } from "@pankod/refine";
import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine/dist/styles.min.css";

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
                    name: "6180e4315f3e7",
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
        />
    );
};

export default App;
