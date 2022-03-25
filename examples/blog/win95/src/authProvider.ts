import { AuthProvider } from "@pankod/refine-core";

import { supabaseClient } from "utility";

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const { user, error } = await supabaseClient.auth.signIn({
            email: username,
            password,
        });

        if (error) {
            return Promise.reject(error);
        }

        if (user) {
            return Promise.resolve();
        }
    },
    logout: async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            return Promise.reject(error);
        }

        return Promise.resolve("/");
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const session = supabaseClient.auth.session();

        if (session) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: async () => {
        const user = supabaseClient.auth.user();

        if (user) {
            return Promise.resolve(user.role);
        }
    },
    getUserIdentity: async () => {
        const user = supabaseClient.auth.user();

        if (user) {
            return Promise.resolve({
                ...user,
                name: user.email,
            });
        }
    },
};

export default authProvider;
