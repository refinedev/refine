import { AuthProvider } from "@pankod/refine-core";

import { API_URL } from "./constants";

import { getMedusaClient, resetMedusaClient } from "./medusaClient";

export const authProvider = (): AuthProvider => {
    const medusaClient = getMedusaClient(API_URL);
    return {
        login: async (user: { username: string; password: string }) => {
            try {
                const { customer } = await medusaClient.auth.authenticate({
                    email: user.username,
                    password: user.password,
                });

                if (customer) {
                    localStorage.setItem("user", JSON.stringify(customer));
                    return Promise.resolve();
                }
            } catch (error) {
                return Promise.reject(error);
            }

            return Promise.resolve("/");
        },
        logout: (props) => {
            localStorage.removeItem("user");
            resetMedusaClient();

            return Promise.resolve(props?.redirectPath);
        },
        checkError: (error) => {
            if (error?.response?.status === 401) {
                return Promise.reject("/register");
            }
            return Promise.resolve();
        },
        checkAuth: async () => {
            const session = await medusaClient.auth.getSession();
            if (session?.customer) {
                return Promise.resolve();
            }
            return Promise.reject();
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const { customer } = await medusaClient.auth.getSession();

            return Promise.resolve(customer);
        },
    };
};
