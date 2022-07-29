import { AuthProvider, HttpError } from "@pankod/refine-core";
import axios from "axios";

export const authProvider = (API_URL: string): AuthProvider => {
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
        login: async ({ username, password }) => {
            try {
                const response = await axiosInstance.post(
                    "/auth",
                    { email: username, password: password },
                    {
                        withCredentials: true,
                    },
                );

                if (response) {
                    return Promise.resolve(response.data.customer);
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
