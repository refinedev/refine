import { AuthProvider } from "@pankod/refine-core";

import { supabaseClient } from "utility";

export const authProvider: AuthProvider = {
    login: async ({ email, password, providerName }) => {
        // sign in with oauth
        if (providerName) {
            const { data, error } = await supabaseClient.auth.signInWithOAuth({
                provider: providerName,
            });

            if (error) {
                return Promise.reject(error);
            }

            if (data?.url) {
                return Promise.resolve();
            }
        }

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return Promise.reject(error);
        }

        const role = data.user?.app_metadata?.role;

        if (role === "editor" || role === "admin") {
            return Promise.resolve();
        }

        await supabaseClient.auth.signOut();
        return Promise.reject(new Error("User not authorized."));
    },
    register: async ({ email, password }) => {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
        });

        if (error) {
            return Promise.reject(error);
        }

        const { user } = data;
        if (user) {
            return Promise.resolve();
        }
    },
    forgotPassword: async ({ email }) => {
        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/update-password`,
            },
        );

        if (error) {
            return Promise.reject(error);
        }

        if (data) {
            return Promise.resolve();
        }
    },
    updatePassword: async ({ password }) => {
        const { data, error } = await supabaseClient.auth.updateUser({
            password,
        });

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
        const { data } = await supabaseClient.auth.getSession();
        const { session } = data;

        if (session) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: async () => {
        const { error } = await supabaseClient.auth.getUser();

        if (error) {
            return Promise.reject();
        }

        const { data } = await supabaseClient.rpc("get_my_claim", {
            claim: "role",
        });
        return Promise.resolve(data);
    },
    getUserIdentity: async () => {
        const { data } = await supabaseClient.auth.getUser();
        const { user } = data;

        if (user) {
            return Promise.resolve({
                ...user,
                name: user?.email,
            });
        }
    },
};
