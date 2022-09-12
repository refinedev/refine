import { AuthProvider } from "@pankod/refine-core";
import { notification } from "@pankod/refine-antd";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        if (email && password) {
            localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
            return Promise.resolve();
        }
        return Promise.reject("Invalid email or password");
    },
    register: async ({ email, password }) => {
        if (email && password) {
            localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
            return Promise.resolve("orders");
        }
        return Promise.reject();
    },
    updatePassword: async ({ password }) => {
        if (password) {
            notification.success({
                message: "Updated Password",
                description: "Password updated successfully",
            });
            return Promise.resolve();
        }
        return Promise.reject();
    },
    resetPassword: async ({ email }) => {
        notification.success({
            message: "Reset Password",
            description: `Reset password link sent to "${email}"`,
        });
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

        return Promise.resolve({
            id: 1,
            name: "James Sullivan",
            avatar: "https://i.pravatar.cc/150",
        });
    },
};
