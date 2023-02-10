import { AuthProvider } from "@pankod/refine-core";

import { supabaseClient } from "utility";

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return Promise.reject(error);
        }

        if (data?.user) {
            return Promise.resolve();
        }

        // for third-party login
        return Promise.resolve(false);
    },
    logout: async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            return Promise.reject(error);
        }

        return Promise.resolve("/");
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        await supabaseClient.auth.getSession();
        return Promise.resolve();
    },
    getPermissions: async () => {
        const user = await supabaseClient.auth.getUser();

        if (user) {
            return Promise.resolve(user.data.user?.role);
        }
    },
    getUserIdentity: async () => {
        const { data } = await supabaseClient.auth.getUser();

        if (data?.user) {
            return Promise.resolve({
                ...data.user,
                name: data.user.email,
            });
        }
    },
};

export default authProvider;
