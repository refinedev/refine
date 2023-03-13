import {
    GitHubBanner,
    Refine,
    LegacyAuthProvider as AuthProvider,
} from "@refinedev/core";
import {
    notificationProvider,
    LoginPage,
    Layout,
    ErrorComponent,
} from "@refinedev/antd";
import { DataProvider, AuthHelper } from "@refinedev/strapi";
import routerProvider from "@refinedev/react-router-v6/legacy";

import axios from "axios";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";

import { TOKEN_KEY, API_URL } from "./constants";

const App: React.FC = () => {
    const axiosInstance = axios.create();
    const strapiAuthHelper = AuthHelper(API_URL);

    const authProvider: AuthProvider = {
        login: async ({ username, password }) => {
            const { data, status } = await strapiAuthHelper.login(
                username,
                password,
            );
            if (status === 200) {
                localStorage.setItem(TOKEN_KEY, data.jwt);

                // set header axios instance
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${data.jwt}`;

                return Promise.resolve();
            }
            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem(TOKEN_KEY);
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                return Promise.resolve();
            }

            return Promise.reject();
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!token) {
                return Promise.reject();
            }

            const { data, status } = await strapiAuthHelper.me(token);
            if (status === 200) {
                const { id, username, email } = data;
                return Promise.resolve({
                    id,
                    username,
                    email,
                });
            }

            return Promise.reject();
        },
    };
    const dataProvider = DataProvider(API_URL, axiosInstance);

    return (
        <>
            <GitHubBanner />
            <Refine
                legacyAuthProvider={authProvider}
                dataProvider={dataProvider}
                legacyRouterProvider={routerProvider}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                    {
                        name: "categories",
                        list: CategoryList,
                        create: CategoryCreate,
                        edit: CategoryEdit,
                    },
                ]}
                notificationProvider={notificationProvider}
                LoginPage={LoginPage}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
        </>
    );
};

export default App;
