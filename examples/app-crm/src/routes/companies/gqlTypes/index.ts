import * as Types from "@/interfaces";

export type CreateCompanyMutationVariables = Types.Exact<{
    input: Types.CreateOneCompanyInput;
}>;

export type CreateCompanyMutation = {
    createOneCompany: {
        id: string;
        name: string;
        salesOwner: { id: string; name: string; avatarUrl?: string | null };
    };
};

export type CompaniesTableQueryVariables = Types.Exact<{
    filter: Types.CompanyFilter;
    sorting: Array<Types.CompanySort> | Types.CompanySort;
    paging: Types.OffsetPaging;
}>;

export type CompaniesTableQuery = {
    companies: {
        totalCount: number;
        nodes: Array<{
            id: string;
            name: string;
            avatarUrl?: string | null;
            dealsAggregate: Array<{ sum?: { value?: number | null } | null }>;
            salesOwner: { id: string; name: string; avatarUrl?: string | null };
            contacts: {
                nodes: Array<{
                    id: string;
                    name: string;
                    avatarUrl?: string | null;
                }>;
            };
        }>;
    };
};
