import { AuthProvider } from "@pankod/refine-core";

import { supabaseClient } from "utility";

const authProvider: AuthProvider = {
    login: async ({ email, password, providerName }) => {
        const { user, error } = await supabaseClient.auth.signIn({
            email,
            password,
            provider: providerName,
        });

        if (error) {
            return Promise.reject(error);
        }

        if (user) {
            return Promise.resolve();
        }

        // for third-party login
        return Promise.resolve(false);
    },
    register: async ({ email, password }) => {
        const { user, error } = await supabaseClient.auth.signUp({
            email,
            password,
        });

        if (error) {
            return Promise.reject(error);
        }

        if (user) {
            return Promise.resolve();
        }
    },
    forgotPassword: async ({ email }) => {
        const { data, error } =
            await supabaseClient.auth.api.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            });

        if (error) {
            return Promise.reject(error);
        }

        if (data) {
            return Promise.resolve();
        }
    },
    updatePassword: async ({ password }) => {
        const { data, error } = await supabaseClient.auth.update({ password });

        if (error) {
            return Promise.reject(error);
        }

        if (data) {
            return Promise.resolve("/");
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
    checkAuth: async () => {
        await supabaseClient.auth.getSessionFromUrl();
        return Promise.resolve();
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

        return Promise.reject();
    },
};

export default authProvider;
