import { AuthProvider } from "@pankod/refine-core";

import { TOKEN_KEY, LOGIN_URL, CURRENT_USER } from "./constants";
import axios from "axios";

// export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
    login: async ({ user }) => {
        axios.post(LOGIN_URL, { user }).then((res: any) => {
            localStorage.setItem(TOKEN_KEY, res.data.user.token);
        });

        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.reject();
        }

        const userInfo = await axios.get(CURRENT_USER, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return Promise.resolve(userInfo.data.user);
    },
};
