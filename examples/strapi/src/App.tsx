import { Admin, AuthProvider, Resource } from "@pankod/refine";
import StrapiAuthHelper from "@pankod/refine-strapi-auth";
import DataProvider from "@pankod/refine-strapi";
import axios from "axios";

import { PostList } from "./components/pages/posts";

const App = () => {
    const axiosInstance = axios.create();

    const apiUrl = "https://refine-strapi.pankod.com";
    const strapiAuthHelper = StrapiAuthHelper(apiUrl);

    const tokenKey = "strapi-jwt-token";
    const authProvider: AuthProvider = {
        login: async ({ username, password }) => {
            const { data, status } = await strapiAuthHelper.login(
                username,
                password,
            );
            if (status === 200) {
                localStorage.setItem(tokenKey, data.jwt);

                // set header axios instance
                axiosInstance.defaults.headers = {
                    Authorization: `Bearer ${data.jwt}`,
                };

                return Promise.resolve;
            }
            return Promise.reject;
        },
        logout: () => {
            localStorage.removeItem(tokenKey);
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () => {
            const token = localStorage.getItem(tokenKey);
            if (token) {
                axiosInstance.defaults.headers = {
                    Authorization: `Bearer ${token}`,
                };
                return Promise.resolve();
            }

            return Promise.reject();
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const token = localStorage.getItem(tokenKey);
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
    const dataProvider = DataProvider(apiUrl, axiosInstance);

    return (
        <Admin authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="posts" list={PostList} />
        </Admin>
    );
};

export default App;
