import * as Types from "@/interfaces";

export type CompaniesSelectQueryVariables = Types.Exact<{
    [key: string]: never;
}>;

export type CompaniesSelectQuery = {
    companies: {
        nodes: Array<{ id: string; name: string; avatarUrl?: string | null }>;
    };
};

export type UsersSelectQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UsersSelectQuery = {
    users: {
        nodes: Array<{ id: string; name: string; avatarUrl?: string | null }>;
    };
};
