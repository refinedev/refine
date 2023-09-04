import { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
    login: async (params) => {
        console.log("login", params);

        // TODO: send request to the API to login

        return {
            success: true,
            redirectTo: "/",
        };
    },

    register: async (params) => {
        console.log("register", params);

        // TODO: send request to the API to login

        return {
            success: true,
            redirectTo: "/",
        };
    },

    check: async (params) => {
        console.log("check", params);

        // TODO: control if the user is logged in

        return {
            authenticated: true,
        };
    },

    logout: async (params) => {
        console.log("logout", params);

        // TODO: send request to the API to logout

        return {
            success: true,
            redirectTo: "/login",
        };
    },

    forgotPassword: async (params) => {
        console.log("forgotPassword", params);

        // TODO: send request to the API to forgot password

        return {
            success: true,
            redirectTo: "/update-password",
        };
    },

    updatePassword: async (params) => {
        console.log("updatePassword", params);

        // TODO: send request to the API to update password

        return {
            success: true,
            redirectTo: "/login",
        };
    },

    getPermissions: async (params) => {
        console.log("getPermissions", params);

        // TODO: send request to the API to get permissions

        return {
            permissions: [],
        };
    },

    getIdentity: async (params) => {
        console.log("getIdentity", params);

        // TODO: send request to the API to get identity

        return {};
    },

    onError: async (params) => {
        console.log("onError", params);

        // TODO: do something with the error

        return { logout: true, redirectTo: "/login" };
    },
};
