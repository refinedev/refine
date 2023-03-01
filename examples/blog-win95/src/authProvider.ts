import { AuthBindings } from "@pankod/refine-core";

import { supabaseClient } from "utility";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email,
                    password,
                });

            if (error) {
                return Promise.resolve({
                    success: false,
                    error: error || new Error("Invalid email or password"),
                });
            }

            if (data?.user) {
                return Promise.resolve({
                    success: true,
                    redirectTo: "/",
                });
            }
        } catch (error: any) {
            return Promise.resolve({
                success: false,
                error,
            });
        }

        return Promise.resolve({
            success: false,
            error: new Error("Invalid email or password"),
        });
    },
    logout: async () => {
        try {
            const { error } = await supabaseClient.auth.signOut();

            if (error) {
                return Promise.resolve({
                    success: false,
                    error: error || new Error("Invalid email or password"),
                });
            }
        } catch (error: any) {
            return Promise.resolve({
                success: false,
                error: error || new Error("Invalid email or password"),
            });
        }

        return Promise.resolve({
            success: true,
            redirectTo: "/",
        });
    },
    onError: () => Promise.resolve({}),
    check: async () => {
        try {
            const { data, error } = await supabaseClient.auth.getSession();
            const { session } = data;

            if (!session) {
                return Promise.resolve({
                    authenticated: false,
                    error: error || new Error("Session not found"),
                });
            }
        } catch (error: any) {
            return Promise.resolve({
                authenticated: false,
                error,
            });
        }

        return Promise.resolve({
            authenticated: true,
        });
    },
    getPermissions: async () => {
        const { data } = await supabaseClient.auth.getUser();
        const { user } = data;

        if (user) {
            return Promise.resolve(user.role);
        }
    },
    getIdentity: async () => {
        const { data } = await supabaseClient.auth.getUser();
        const { user } = data;

        if (user) {
            return Promise.resolve({
                ...user,
                name: user.email,
            });
        }
    },
};

export default authProvider;
