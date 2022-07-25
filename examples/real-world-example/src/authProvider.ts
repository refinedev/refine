import { AuthProvider } from "@pankod/refine-core";

import { TOKEN_KEY, API_URL } from "./constants";
import axios, { AxiosInstance } from "axios";

export const authProvider = (axiosInstance: AxiosInstance): AuthProvider => {
    return {
        login: async ({
            user,
        }: {
            user: { email: string; password: string };
        }) => {
            try {
                const { data } = await axios.post(`${API_URL}/users/login`, {
                    user,
                });

                localStorage.setItem(TOKEN_KEY, data.user.token);
            } catch (error) {
                return Promise.reject(error);
            }

            return Promise.resolve("/");
        },
        logout: (props) => {
            localStorage.removeItem(TOKEN_KEY);
            return Promise.resolve(props?.redirectPath);
        },
        checkError: (error) => {
            if (error?.response?.status === 401) {
                return Promise.reject("/register");
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

            const userInfo = await axiosInstance.get(`${API_URL}/user`);

            return Promise.resolve(userInfo.data.user);
        },
    };
};
