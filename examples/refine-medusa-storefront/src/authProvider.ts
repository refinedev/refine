import { AuthProvider, HttpError } from "@pankod/refine-core";
import axios from "axios";

import { API_URL } from "./constants";

export const authProvider = (): AuthProvider => {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const customError: HttpError = {
                ...error,
                message: error.response?.data?.message,
                statusCode: error.response?.status,
            };

            return Promise.reject(customError);
        },
    );
    axiosInstance.defaults.baseURL = `${API_URL}/store`;

    return {
        login: async (user: { username: string; password: string }) => {
            try {
                const response = await axiosInstance.post("/auth", user, {
                    withCredentials: true,
                });

                if (response) {
                    localStorage.setItem("user", JSON.stringify(response));
                    return Promise.resolve();
                }
            } catch (error) {
                return Promise.reject(error);
            }

            return Promise.resolve("/");
        },
        logout: (props) => {
            axiosInstance
                .delete("/auth")
                .then(() => localStorage.removeItem("user"));

            return Promise.resolve(props?.redirectPath);
        },
        checkError: (error) => {
            if (error?.response?.status === 401) {
                return Promise.reject("/register");
            }
            return Promise.resolve();
        },
        checkAuth: async () => {
            const { data: session } = await axiosInstance.get("/auth");
            if (session) {
                return Promise.resolve();
            }
            return Promise.reject();
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const { data: session } = await axiosInstance.get("/auth");

            return Promise.resolve(session?.customer);
        },
    };
};
