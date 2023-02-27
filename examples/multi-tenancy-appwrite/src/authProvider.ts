import { AppwriteException } from "@pankod/refine-appwrite";
import { AuthBindings } from "@pankod/refine-core";

import { account } from "utility";

export const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            await account.createEmailSession(email, password);
            return Promise.resolve({
                success: true,
                redirectTo: "/",
            });
        } catch (e) {
            const { type, message, code } = e as AppwriteException;
            return Promise.resolve({
                success: false,
                error: {
                    message,
                    name: `${code} - ${type}`,
                },
            });
        }
    },
    logout: async () => {
        await account.deleteSession("current");

        return Promise.resolve({
            success: true,
            redirectTo: "/",
        });
    },
    onError: () => Promise.resolve({}),
    check: async () => {
        const session = await account.getSession("current");

        if (session) {
            return Promise.resolve({
                authenticated: true,
            });
        }

        return Promise.resolve({
            authenticated: false,
            redirectTo: "/login",
        });
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: async () => {
        const user = await account.get();

        if (user) {
            return Promise.resolve(user);
        }

        return Promise.resolve();
    },
};
