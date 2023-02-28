import { Refine, AuthBindings } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const { isLoading, user, logout, getIdTokenClaims } = useAuth0();

    if (isLoading) {
        return <span>loading...</span>;
    }

    const authProvider: AuthBindings = {
        login: () => {
            return Promise.resolve({
                success: true,
            });
        },
        logout: () => {
            logout({ returnTo: window.location.origin });
            return Promise.resolve({
                success: true,
            });
        },
        onError: () => Promise.resolve({}),
        check: async () => {
            try {
                const token = await getIdTokenClaims();
                if (token) {
                    axios.defaults.headers.common = {
                        Authorization: `Bearer ${token.__raw}`,
                    };
                    return Promise.resolve({
                        authenticated: true,
                    });
                } else {
                    return Promise.resolve({
                        authenticated: false,
                        error: new Error("Token not found"),
                        redirectTo: "/login",
                        logout: true,
                    });
                }
            } catch (error: any) {
                return Promise.resolve({
                    authenticated: false,
                    error: new Error(error),
                    redirectTo: "/login",
                    logout: true,
                });
            }
        },
        getPermissions: () => Promise.resolve(),
        getIdentity: async () => {
            if (user) {
                return Promise.resolve({
                    ...user,
                    avatar: user.picture,
                });
            }
            return Promise.reject();
        },
    };

    return (
        <Refine
            LoginPage={Login}
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL, axios)}
            legacyRouterProvider={routerProvider}
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
