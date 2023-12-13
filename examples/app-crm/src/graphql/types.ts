import type * as Types from "@/graphql/schema.types";

export type UpcomingEventsQueryVariables = Types.Exact<{
    filter: Types.EventFilter;
    sorting?: Types.InputMaybe<Array<Types.EventSort> | Types.EventSort>;
    paging: Types.OffsetPaging;
}>;

export type UpcomingEventsQuery = {
    events: Pick<Types.EventConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Event,
                "id" | "title" | "color" | "startDate" | "endDate"
            >
        >;
    };
};

export type NotificationsQueryVariables = Types.Exact<{
    paging: Types.OffsetPaging;
    filter: Types.AuditFilter;
    sorting?: Types.InputMaybe<Array<Types.AuditSort> | Types.AuditSort>;
}>;

export type NotificationsQuery = {
    audits: Pick<Types.AuditConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Audit,
                "id" | "action" | "targetEntity" | "targetId" | "createdAt"
            > & {
                user?: Types.Maybe<
                    Pick<Types.User, "id" | "name" | "avatarUrl">
                >;
            }
        >;
    };
};

export type NotificationsDealsQueryVariables = Types.Exact<{
    filter: Types.DealFilter;
}>;

export type NotificationsDealsQuery = {
    deals: {
        nodes: Array<
            Pick<Types.Deal, "id" | "title"> & {
                stage?: Types.Maybe<Pick<Types.DealStage, "id" | "title">>;
                company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
            }
        >;
    };
};

export type CompaniesSelectQueryVariables = Types.Exact<{
    [key: string]: never;
}>;

export type CompaniesSelectQuery = {
    companies: {
        nodes: Array<Pick<Types.Company, "id" | "name" | "avatarUrl">>;
    };
};

export type UsersSelectQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UsersSelectQuery = {
    users: { nodes: Array<Pick<Types.User, "id" | "name" | "avatarUrl">> };
};

export type RefreshTokenMutationVariables = Types.Exact<{
    refreshToken: Types.Scalars["String"]["input"];
}>;

export type RefreshTokenMutation = {
    refreshToken: Pick<Types.AuthResponse, "accessToken" | "refreshToken">;
};

export type CompanyTitleFormMutationVariables = Types.Exact<{
    input: Types.UpdateOneCompanyInput;
}>;

export type CompanyTitleFormMutation = {
    updateOneCompany: Pick<Types.Company, "id" | "name" | "avatarUrl"> & {
        salesOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
    };
};

export type CompanyTitleQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type CompanyTitleQuery = {
    company: Pick<Types.Company, "id" | "name" | "createdAt" | "avatarUrl"> & {
        salesOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
    };
};

export type CreateCompanyMutationVariables = Types.Exact<{
    input: Types.CreateOneCompanyInput;
}>;

export type CreateCompanyMutation = {
    createOneCompany: Pick<Types.Company, "id" | "name"> & {
        salesOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
    };
};

export type CompaniesTableQueryVariables = Types.Exact<{
    filter: Types.CompanyFilter;
    sorting: Array<Types.CompanySort> | Types.CompanySort;
    paging: Types.OffsetPaging;
}>;

export type CompaniesTableQuery = {
    companies: Pick<Types.CompanyConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.Company, "id" | "name" | "avatarUrl"> & {
                dealsAggregate: Array<{
                    sum?: Types.Maybe<
                        Pick<Types.CompanyDealsSumAggregate, "value">
                    >;
                }>;
                salesOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
                contacts: {
                    nodes: Array<
                        Pick<Types.Contact, "id" | "name" | "avatarUrl">
                    >;
                };
            }
        >;
    };
};

export type ContactShowQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type ContactShowQuery = {
    contact: Pick<
        Types.Contact,
        | "id"
        | "name"
        | "email"
        | "status"
        | "jobTitle"
        | "phone"
        | "timezone"
        | "avatarUrl"
        | "createdAt"
    > & {
        company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
        salesOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
    };
};

export type DashboardTotalCountsQueryVariables = Types.Exact<{
    [key: string]: never;
}>;

export type DashboardTotalCountsQuery = {
    companies: Pick<Types.CompanyConnection, "totalCount">;
    contacts: Pick<Types.ContactConnection, "totalCount">;
    deals: Pick<Types.DealConnection, "totalCount">;
};
