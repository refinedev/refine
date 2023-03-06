import { Refine, AuthBindings } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const { isLoading, user, logout, getIdTokenClaims } = useAuth0();

    if (isLoading) {
        return <span>loading...</span>;
    }

    const authProvider: AuthBindings = {
        login: async () => {
            return {
                success: true,
            };
        },
        logout: async () => {
            logout({ returnTo: window.location.origin });
            return {
                success: true,
            };
        },
        onError: async () => {
            return {};
        },
        check: async () => {
            try {
                const token = await getIdTokenClaims();
                if (token) {
                    axios.defaults.headers.common = {
                        Authorization: `Bearer ${token.__raw}`,
                    };
                    return {
                        authenticated: true,
                    };
                } else {
                    return {
                        authenticated: false,
                        error: new Error("Token not found"),
                        redirectTo: "/login",
                        logout: true,
                    };
                }
            } catch (error: any) {
                return {
                    authenticated: false,
                    error: new Error(error),
                    redirectTo: "/login",
                    logout: true,
                };
            }
        },
        getPermissions: async () => null,
        getIdentity: async () => {
            if (user) {
                return {
                    ...user,
                    avatar: user.picture,
                };
            }
            return null;
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
