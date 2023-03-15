import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

const username = "James Sullivan";
const password = "1234";

localStorage.setItem(TOKEN_KEY, `${username}-${password}`);

export const authProvider: AuthBindings = {
    login: async ({ username, password }) => {
        localStorage.setItem(TOKEN_KEY, `${username}-${password}`);
        return {
            success: true,
        };
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return null;
        }

        return Promise.resolve({
            id: 1,
            name: "James Sullivan",
            avatar: "https://i.pravatar.cc/150",
        });
    },
};
