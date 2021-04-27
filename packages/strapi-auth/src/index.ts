import { AuthProvider } from "@pankod/refine";
import axios from "axios";

import { ILoginResponse } from "./strapi";

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
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            fullName: "Jane Doe",
            avatar:
                "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
});

export default StrapiAuthProvider;
