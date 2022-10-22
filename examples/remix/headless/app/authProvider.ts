import { AuthProvider } from "@pankod/refine-core";
import Cookies from "js-cookie";
import * as cookie from "cookie";

const mockUsers = [
    {
        email: "admin@refine.dev",
        roles: ["admin"],
    },
    {
        email: "editor@refine.dev",
        roles: ["editor"],
    },
];

const COOKIE_NAME = "user";

export const authProvider: AuthProvider = {
    login: () => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers[0];

        if (user) {
            Cookies.set(COOKIE_NAME, JSON.stringify(user));
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        Cookies.remove(COOKIE_NAME);

        return Promise.resolve();
    },
    checkError: (error) => {
        if (error && error.statusCode === 401) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    checkAuth: async (context) => {
        let user = undefined;
        if (context) {
            const { request } = context;
            const parsedCookie = cookie.parse(request.headers.get("Cookie"));
            user = parsedCookie[COOKIE_NAME];
        } else {
            const parsedCookie = Cookies.get(COOKIE_NAME);
            user = parsedCookie ? JSON.parse(parsedCookie) : undefined;
        }

        if (!user) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: async () => {
        return Promise.resolve();
    },
    getUserIdentity: async () => {
        return Promise.resolve();
    },
};
