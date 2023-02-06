import { AuthProvider } from "@pankod/refine-core";

import { supabaseClient } from "utility";

const authProvider: AuthProvider = {
    login: async ({ mobileNo, otp }) => {
        const { data, error } = await supabaseClient.auth.verifyOtp({
            phone: mobileNo,
            token: otp,
            type: "sms",
        });

        if (error) {
            return Promise.reject(error);
        }

        if (data) {
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
    checkAuth: async () => {
        const { data } = await supabaseClient.auth.getSession();

        if (data) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: async () => {
        const { data } = await supabaseClient.auth.getUser();

        if (data) {
            return Promise.resolve(data.user?.role);
        }
    },
    getUserIdentity: async () => {
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
