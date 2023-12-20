import type * as Types from "./schema.types";

export type UpdateUserMutationVariables = Types.Exact<{
    input: Types.UpdateOneUserInput;
}>;

export type UpdateUserMutation = {
    updateOneUser: Pick<
        Types.User,
        "id" | "name" | "avatarUrl" | "email" | "phone" | "jobTitle"
    >;
};

export type UsersSelectQueryVariables = Types.Exact<{
    filter: Types.UserFilter;
    sorting?: Types.InputMaybe<Array<Types.UserSort> | Types.UserSort>;
    paging: Types.OffsetPaging;
}>;

export type UsersSelectQuery = {
    users: Pick<Types.UserConnection, "totalCount"> & {
        nodes: Array<Pick<Types.User, "id" | "name" | "avatarUrl">>;
    };
};

export type CompanyContactsTableQueryVariables = Types.Exact<{
    filter: Types.ContactFilter;
    sorting?: Types.InputMaybe<Array<Types.ContactSort> | Types.ContactSort>;
    paging: Types.OffsetPaging;
}>;

export type CompanyContactsTableQuery = {
    contacts: Pick<Types.ContactConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Contact,
                | "id"
                | "name"
                | "avatarUrl"
                | "jobTitle"
                | "email"
                | "phone"
                | "status"
            >
        >;
    };
};

export type CreateCompanyMutationVariables = Types.Exact<{
    input: Types.CreateOneCompanyInput;
}>;

export type CreateCompanyMutation = {
    createOneCompany: Pick<Types.Company, "id"> & {
        salesOwner: Pick<Types.User, "id">;
    };
};

export type UpdateCompanyMutationVariables = Types.Exact<{
    input: Types.UpdateOneCompanyInput;
}>;

export type UpdateCompanyMutation = {
    updateOneCompany: Pick<
        Types.Company,
        | "id"
        | "name"
        | "totalRevenue"
        | "industry"
        | "companySize"
        | "businessType"
        | "country"
        | "website"
        | "avatarUrl"
    > & { salesOwner: Pick<Types.User, "id" | "name" | "avatarUrl"> };
};

export type CompaniesListQueryVariables = Types.Exact<{
    filter: Types.CompanyFilter;
    sorting?: Types.InputMaybe<Array<Types.CompanySort> | Types.CompanySort>;
    paging: Types.OffsetPaging;
}>;

export type CompaniesListQuery = {
    companies: Pick<Types.CompanyConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.Company, "id" | "name" | "avatarUrl"> & {
                dealsAggregate: Array<{
                    sum?: Types.Maybe<
                        Pick<Types.CompanyDealsSumAggregate, "value">
                    >;
                }>;
            }
        >;
    };
};

export type DashboardDealsChartQueryVariables = Types.Exact<{
    filter: Types.DealStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.DealStageSort> | Types.DealStageSort
    >;
    paging?: Types.InputMaybe<Types.OffsetPaging>;
}>;

export type DashboardDealsChartQuery = {
    dealStages: Pick<Types.DealStageConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.DealStage, "id" | "title"> & {
                dealsAggregate: Array<{
                    groupBy?: Types.Maybe<
                        Pick<
                            Types.DealStageDealsAggregateGroupBy,
                            "closeDateMonth" | "closeDateYear"
                        >
                    >;
                    sum?: Types.Maybe<
                        Pick<Types.DealStageDealsSumAggregate, "value">
                    >;
                }>;
            }
        >;
    };
};

export type DashboardLatestActivitiesDealsQueryVariables = Types.Exact<{
    filter: Types.DealFilter;
    sorting?: Types.InputMaybe<Array<Types.DealSort> | Types.DealSort>;
    paging?: Types.InputMaybe<Types.OffsetPaging>;
}>;

export type DashboardLatestActivitiesDealsQuery = {
    deals: Pick<Types.DealConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.Deal, "id" | "title" | "createdAt"> & {
                stage?: Types.Maybe<Pick<Types.DealStage, "id" | "title">>;
                company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
            }
        >;
    };
};

export type DashboardLatestActivitiesAuditsQueryVariables = Types.Exact<{
    filter: Types.AuditFilter;
    sorting?: Types.InputMaybe<Array<Types.AuditSort> | Types.AuditSort>;
    paging?: Types.InputMaybe<Types.OffsetPaging>;
}>;

export type DashboardLatestActivitiesAuditsQuery = {
    audits: Pick<Types.AuditConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Audit,
                "id" | "action" | "targetEntity" | "targetId" | "createdAt"
            > & {
                changes: Array<
                    Pick<Types.AuditChange, "field" | "from" | "to">
                >;
                user?: Types.Maybe<
                    Pick<Types.User, "id" | "name" | "avatarUrl">
                >;
            }
        >;
    };
};

export type DashboardCalendarUpcomingEventsQueryVariables = Types.Exact<{
    filter: Types.EventFilter;
    sorting?: Types.InputMaybe<Array<Types.EventSort> | Types.EventSort>;
    paging: Types.OffsetPaging;
}>;

export type DashboardCalendarUpcomingEventsQuery = {
    events: Pick<Types.EventConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Event,
                "id" | "title" | "color" | "startDate" | "endDate"
            >
        >;
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
