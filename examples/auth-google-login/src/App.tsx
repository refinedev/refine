import { Refine, AuthBindings } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import axios, { AxiosRequestConfig } from "axios";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";
import { parseJwt } from "utils/parse-jwt";

const axiosInstance = axios.create();

const API_URL = "https://api.fake-rest.refine.dev";

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (request.headers) {
        request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: async ({ credential }: CredentialResponse) => {
            const profileObj = credential ? parseJwt(credential) : null;

            if (profileObj) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        ...profileObj,
                        avatar: profileObj.picture,
                    }),
                );

                localStorage.setItem("token", `${credential}`);

                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
            };
        },
        logout: async () => {
            const token = localStorage.getItem("token");

            if (token && typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                axios.defaults.headers.common = {};
                window.google?.accounts.id.revoke(token, () => {
                    return {};
                });
            }

            return {
                success: true,
                redirectTo: "/login",
            };
        },
        onError: async () => ({}),
        check: async () => {
            const token = localStorage.getItem("token");

            if (token) {
                return {
                    authenticated: true,
                };
            }

            return {
                authenticated: false,
                error: new Error("Not authenticated"),
                logout: true,
                redirectTo: "/login",
            };
        },
        getPermissions: async () => null,
        getIdentity: async () => {
            const user = localStorage.getItem("user");
            if (user) {
                return JSON.parse(user);
            }

            return null;
        },
    };

    return (
        <Refine
            dataProvider={dataProvider(API_URL, axiosInstance)}
            authProvider={authProvider}
            legacyRouterProvider={routerProvider}
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
