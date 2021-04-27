import { AuthProvider } from "@pankod/refine";
import axios from "axios";

import { ILoginResponse, IUser } from "./strapi";

const StrapiAuthProvider = (apiUrl: string): AuthProvider => ({
    login: async (params) => {
        const url = `${apiUrl}/auth/local`;
        const { username, password } = params;

        const { data, status } = await axios.post<ILoginResponse>(url, {
            identifier: username,
            password,
        });

        if (status === 200) {
            localStorage.setItem("token", data.jwt);
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("token");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: async () => {
        const token = localStorage.getItem("token");

        const { data, status } = await axios.get<IUser>(`${apiUrl}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (status === 200) {
            return data;
        }

        return data;
    },
});

export default StrapiAuthProvider;
