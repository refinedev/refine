import * as Types from "@/interfaces";

export type UserFragmentFragment = {
    id: string;
    name: string;
    avatarUrl?: string | null;
};

export type CompanyTitleFormMutationVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
    name?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
    salesOwnerId?: Types.InputMaybe<Types.Scalars["ID"]["input"]>;
}>;

export type CompanyTitleFormMutation = {
    updateOneCompany: {
        id: string;
        name: string;
        avatarUrl?: string | null;
        salesOwner: { id: string; name: string; avatarUrl?: string | null };
    };
};
