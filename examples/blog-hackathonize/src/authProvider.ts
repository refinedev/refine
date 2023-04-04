import { AuthBindings } from "@refinedev/core";

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
                return {
                    success: false,
                    error: error,
                };
            }

            if (data?.user) {
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error: error,
            };
        }

        return {
            success: false,
            error: new Error("Login failed"),
        };
    },
    logout: async () => {
        try {
            const { error } = await supabaseClient.auth.signOut();

            if (error) {
                return {
                    success: false,
                    error: error,
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error: error,
            };
        }

        return {
            success: true,
            redirectTo: "/",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        try {
            const { data, error } = await supabaseClient.auth.getSession();
            const { session } = data;

            if (!session) {
                return {
                    authenticated: false,
                    error: error || {
                        message: "Check failed",
                        name: "Session not found",
                    },
                    redirectTo: "/login",
                };
            }
        } catch (error: any) {
            return {
                authenticated: false,
                error: error || {
                    message: "Check failed",
                    name: "Session not found",
                },
                redirectTo: "/login",
            };
        }

        return {
            authenticated: true,
        };
    },
    getPermissions: async () => {
        const { data } = await supabaseClient.auth.getUser();
        const { user } = data;

        if (user) {
            return user.role;
        }
    },
    getIdentity: async () => {
        const { data } = await supabaseClient.auth.getUser();
        const { user } = data;

        if (user) {
            return {
                ...user,
                name: user.email,
            };
        }
    },
};

export default authProvider;
