import { AuthProvider } from "@pankod/refine-core";

import { TOKEN_KEY, LOGIN_URL, CURRENT_USER } from "./constants";
import axios, { AxiosInstance } from "axios";

export const authProvider = (axiosInstance: AxiosInstance): AuthProvider => {
    return {
        login: async ({
            user,
        }: {
            user: { email: string; password: string };
        }) => {
            try {
                const { data } = await axios.post(LOGIN_URL, { user });

                localStorage.setItem(TOKEN_KEY, data.user.token);
            } catch (error) {
                return Promise.reject(error);
            }

            return Promise.resolve("/");
        },
        logout: () => {
            localStorage.removeItem(TOKEN_KEY);
            return Promise.resolve();
        },
        checkError: (error) => {
            console.log(error.response);
            if (error?.response?.status === 401) {
                return Promise.reject();
            }
            return Promise.resolve();
        },
        checkAuth: () => Promise.resolve(),
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!token) {
                return Promise.reject();
            }

            const userInfo = await axiosInstance.get(CURRENT_USER);

            return Promise.resolve(userInfo.data.user);
        },
    };
};
