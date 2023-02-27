import { AuthBindings } from "@pankod/refine-core";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
        return Promise.resolve({
            success: true,
        });
    },
    register: async ({ email, password }) => {
        try {
            await authProvider.login({ email, password });
            return Promise.resolve({
                success: true,
            });
        } catch (error) {
            return Promise.resolve({
                success: false,
                error: new Error("Invalid email or password"),
            });
        }
    },
    updatePassword: async () => {
        return Promise.resolve({
            success: true,
        });
    },
    forgotPassword: async () => {
        return Promise.resolve({
            success: true,
        });
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve({
            success: true,
        });
    },
    onError: () => Promise.resolve({}),
    check: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return Promise.resolve({
                authenticated: true,
            });
        }

        return Promise.resolve({
            authenticated: false,
            error: new Error("Invalid token"),
            logout: true,
            redirectTo: "/login",
        });
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.reject();
        }

        return Promise.resolve({
            id: 1,
            name: "James Sullivan",
            avatar: "https://i.pravatar.cc/150",
        });
    },
};
