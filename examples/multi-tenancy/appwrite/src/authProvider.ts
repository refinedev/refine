import { AuthProvider } from "@pankod/refine-core";

import { appwriteClient } from "utility";

export const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        return appwriteClient.account.createSession(email, password);
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
