import { MetaDataQuery } from "@pankod/refine-core";
import axios from "axios";
import { stringify } from "qs";

interface ILoginResponse {
    jwt: string;
    user: IUser;
}

interface IRole {
    id: number | string;
    name: string;
    description: string;
    type: string;
}

interface IUser {
    id: number | string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: IRole;
    created_at: string;
    updated_at: string;
}

export type MeOptions = {
    metaData?: MetaDataQuery;
};

export const AuthHelper = (apiUrl: string) => ({
    login: async (identifier: string, password: string) => {
        const url = `${apiUrl}/auth/local`;

        return await axios.post<ILoginResponse>(url, {
            identifier,
            password,
        });
    },
    me: async (token: string, options?: MeOptions) => {
        const { metaData } = options ?? {};
        const locale = metaData?.locale;
        const fields = metaData?.fields;
        const populate = metaData?.populate;

        const query = {
            locale,
            fields,
            populate,
        };

        return await axios.get<IUser>(
            `${apiUrl}/users/me?${stringify(query, {
                encodeValuesOnly: true,
            })}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    },
});
