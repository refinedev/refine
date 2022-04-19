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
            axios.post(LOGIN_URL, { user }).then((res: any) => {
                localStorage.setItem(TOKEN_KEY, res.data.user.token);
            });

            return Promise.resolve();
        },
        logout: () => {
            localStorage.removeItem(TOKEN_KEY);
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                axiosInstance.defaults.headers.common = {
                    Authorization: `Bearer ${token}`,
                };
            }

            return Promise.resolve();
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!token) {
                return Promise.reject();
            }

            axiosInstance.defaults.headers.common = {
                Authorization: `Bearer ${token}`,
            };

            const userInfo = await axiosInstance.get(CURRENT_USER);

            return Promise.resolve(userInfo.data.user);
        },
    };
};
