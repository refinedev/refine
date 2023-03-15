import { AppwriteException } from "@refinedev/appwrite";
import { AuthBindings } from "@refinedev/core";

import { account } from "utility";

export const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            await account.createEmailSession(email, password);
            return {
                success: true,
                redirectTo: "/",
            };
        } catch (e) {
            const { type, message, code } = e as AppwriteException;
            return {
                success: false,
                error: {
                    message,
                    name: `${code} - ${type}`,
                },
            };
        }
    },
    logout: async () => {
        try {
            await account.deleteSession("current");

            return {
                success: true,
                redirectTo: "/",
            };
        } catch (error) {
            return {
                success: true,
                redirectTo: "/",
            };
        }
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        try {
            const session = await account.getSession("current");

            if (session) {
                return {
                    authenticated: true,
                };
            }
        } catch (error: any) {
            return {
                authenticated: false,
                redirectTo: "/login",
                error,
            };
        }

        return {
            authenticated: false,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const user = await account.get();

        if (user) {
            return user;
        }

        return null;
    },
};
