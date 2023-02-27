import { AuthBindings } from "@pankod/refine-core";

import { supabaseClient } from "utility";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return Promise.resolve({
                success: false,
                error: error || new Error("Session not found"),
            });
        }

        if (data?.user) {
            return Promise.resolve({
                success: true,
                redirectTo: "/",
            });
        }

        return Promise.resolve({
            success: false,
            error: error || new Error("Session not found"),
        });
    },
    logout: async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            return Promise.resolve({
                success: false,
                error,
            });
        }
        return Promise.resolve({
            success: true,
            redirectTo: "/",
        });
    },
    onError: () => Promise.resolve({}),
    check: async () => {
        const { data, error } = await supabaseClient.auth.getSession();
        const { session } = data;

        if (!session) {
            return Promise.resolve({
                authenticated: false,
                error: error || new Error("Session not found"),
            });
        }

        return Promise.resolve({
            authenticated: true,
        });
    },
    getPermissions: async () => {
        const user = await supabaseClient.auth.getUser();

        if (user) {
            return Promise.resolve(user.data.user?.role);
        }
    },
    getIdentity: async () => {
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
