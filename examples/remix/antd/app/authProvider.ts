import { AuthProvider } from "@pankod/refine-core";
import Cookies from "js-cookie";
import * as cookie from "cookie";

const mockUsers = [
    {
        username: "admin",
        roles: ["admin"],
    },
    {
        username: "editor",
        roles: ["editor"],
    },
];

const COOKIE_NAME = "user";

export const authProvider: AuthProvider = {
    login: ({ username, password, remember }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.username === username);

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
