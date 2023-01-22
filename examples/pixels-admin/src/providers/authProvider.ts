import { AuthProvider } from "@pankod/refine-core";

import { supabaseClient } from "utility";

export const authProvider: AuthProvider = {
    login: async ({ email, password, providerName }) => {
        const { user, error } = await supabaseClient.auth.signIn({
            email,
            password,
            provider: providerName,
        });

        if (error) {
            return Promise.reject(error);
        }

        const role = await authProvider.getPermissions();

        if (role === "editor" || role === "admin") {
            return Promise.resolve();
        }

        if (role != "editor" || role != "admin") {
            await supabaseClient.auth.signOut();
            return Promise.reject(new Error("User not authorized."));
        }
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
        const session = supabaseClient.auth.session();
        const sessionFromURL = await supabaseClient.auth.getSessionFromUrl();

        if (session || sessionFromURL?.data?.user) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: async () => {
        const user = supabaseClient.auth.user();

        if (!user) {
            return Promise.reject();
        }

        const { data } = await supabaseClient.rpc("get_my_claim", {
            claim: "role",
        });
        return Promise.resolve(data);
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
