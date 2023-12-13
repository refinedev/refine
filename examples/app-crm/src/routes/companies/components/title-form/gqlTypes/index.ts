import * as Types from "@/interfaces";

export type CompanyTitleFormMutationVariables = Types.Exact<{
    input: Types.UpdateOneCompanyInput;
}>;

export type CompanyTitleFormMutation = {
    updateOneCompany: {
        id: string;
        name: string;
        avatarUrl?: string | null;
        salesOwner: { id: string; name: string; avatarUrl?: string | null };
    };
};
