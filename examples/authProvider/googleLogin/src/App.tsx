import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import { useGoogleLogout, GoogleLoginResponse } from "react-google-login";
import axios from "axios";

import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";
const clientId =
    "149954872426-ga5qkfj6v6fjr98p4lbakvf8u6mgtnp6.apps.googleusercontent.com";

const App: React.FC = () => {
    const { signOut } = useGoogleLogout({
        clientId,
        cookiePolicy: "single_host_origin",
    });

    const authProvider: AuthProvider = {
        login: ({ tokenId, profileObj, tokenObj }: GoogleLoginResponse) => {
            axios.defaults.headers.common = {
                Authorization: `Bearer ${tokenId}`,
            };

            localStorage.setItem(
                "user",
                JSON.stringify({ ...profileObj, avatar: profileObj.imageUrl }),
            );
            localStorage.setItem("expiresAt", tokenObj.expires_at.toString());

            return Promise.resolve();
        },
        logout: () => {
            signOut();
            localStorage.removeItem("user");
            localStorage.removeItem("expiresAt");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: async () => {
            const expiresAt = localStorage.getItem("expiresAt");

            if (expiresAt) {
                return new Date().getTime() / 1000 < +expiresAt
                    ? Promise.resolve()
                    : Promise.reject();
            }
            return Promise.reject();
        },

        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const user = localStorage.getItem("user");
            if (user) {
                return Promise.resolve(JSON.parse(user));
            }
        },
    };

    return (
        <Refine
            dataProvider={dataProvider(API_URL, axios)}
            routerProvider={routerProvider}
            authProvider={authProvider}
            LoginPage={Login}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
