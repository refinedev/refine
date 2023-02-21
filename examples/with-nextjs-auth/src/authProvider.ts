import { AuthProvider } from "@pankod/refine-core";
import nookies from "nookies";

/**
 * Here's a dummy auth provider for demo purposes.
 *
 * We've just used nookies to store the auth data
 * and let any email pass as a valid login.
 */

export const authProvider: AuthProvider = {
    login: ({ email }) => {
        if (email) {
            const dummyUser = {
                email,
                roles: ["admin"],
            };

            nookies.set(null, "auth", JSON.stringify(dummyUser), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });

            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        nookies.destroy(null, "auth");
        return Promise.resolve();
    },
    checkError: (error) => {
        if (error && error.statusCode === 401) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    checkAuth: (ctx) => {
        const cookies = nookies.get(ctx);
        return cookies["auth"] ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const auth = nookies.get()["auth"];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.roles);
        }
        return Promise.reject();
    },
    getUserIdentity: () => {
        const auth = nookies.get()["auth"];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.username);
        }
        return Promise.reject();
    },
    register: (params) => {
        if (params.email && params.password) {
            return Promise.resolve();
        }
        return Promise.reject();
    },
    updatePassword: (params) => {
        if (params.confirmPassword) {
            return Promise.resolve();
        }
        return Promise.reject();
    },
    forgotPassword: (params) => {
        if (params.email) {
            return Promise.resolve();
        }
        return Promise.reject();
    },
};
