import { AuthProvider } from "@pankod/refine-core";

import { appwriteClient } from "utility";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            await appwriteClient.account.createSession(email, password);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject();
        }
    },
    logout: async () => {
        await appwriteClient.account.deleteSession("current");

        return "/";
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        const session = await appwriteClient.account.getSession("current");

        if (session) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const user = await appwriteClient.account.get();

        if (user) {
            return user;
        }
    },
};
