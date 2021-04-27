import axios from "axios";

import { ILoginResponse, IUser } from "./strapi";

const StrapiAuthHelper = (apiUrl: string) => ({
    login: async (identifier: string, password: string) => {
        const url = `${apiUrl}/auth/local`;

        return await axios.post<ILoginResponse>(url, {
            identifier,
            password,
        });
    },
    me: async (token: string) => {
        return await axios.get<IUser>(`${apiUrl}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
});

export default StrapiAuthHelper;
