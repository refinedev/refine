import { AuthProvider } from "@pankod/refine-core";

import { API_URL } from "./constants";
import Medusa from "@medusajs/medusa-js";
import { getCookieParser } from "next/dist/server/api-utils";

export const authProvider = (): AuthProvider => {
    const medusaClient = new Medusa({
        baseUrl: "",
        maxRetries: 0,
    });
    return {
        login: async ({
            user,
        }: {
            user: { email: string; password: string };
        }) => {
            try {
                const { customer, response } =
                    await medusaClient.auth.authenticate(user);

                console.log(`customer`, customer);

                response.headers["set-cookie"];
            } catch (error) {
                return Promise.reject(error);
            }

            return Promise.resolve("/");
        },
        logout: (props) => {
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
            const token = getCookieParser;
            if (!token) {
                return Promise.reject();
            }

            const userInfo = await medusaClient.auth.getSession;

            return Promise.resolve(userInfo);
        },
    };
};
