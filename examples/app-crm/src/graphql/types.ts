import type * as Types from "./schema.types";

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

export type ContactsListQueryVariables = Types.Exact<{
    filter: Types.ContactFilter;
    sorting?: Types.InputMaybe<Array<Types.ContactSort> | Types.ContactSort>;
    paging: Types.OffsetPaging;
}>;

export type ContactsListQuery = {
    contacts: Pick<Types.ContactConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Contact,
                "id" | "name" | "email" | "jobTitle" | "status" | "avatarUrl"
            > & { company: Pick<Types.Company, "id" | "name" | "avatarUrl"> }
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

export type DealsListQueryQueryVariables = Types.Exact<{
    filter: Types.DealFilter;
    sorting: Array<Types.DealSort> | Types.DealSort;
    paging: Types.OffsetPaging;
}>;

export type DealsListQueryQuery = {
    deals: {
        nodes: Array<
            Pick<Types.Deal, "id" | "title"> & {
                stage?: Types.Maybe<Pick<Types.DealStage, "id" | "title">>;
                company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
            }
        >;
    };
};

export type AuditsListQueryQueryVariables = Types.Exact<{
    filter: Types.AuditFilter;
    sorting: Array<Types.AuditSort> | Types.AuditSort;
    paging: Types.OffsetPaging;
}>;

export type AuditsListQueryQuery = {
    audits: {
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

export type TotalRevenueChartQueryVariables = Types.Exact<{
    filter: Types.DealStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.DealStageSort> | Types.DealStageSort
    >;
    paging: Types.OffsetPaging;
}>;

export type TotalRevenueChartQuery = {
    dealStages: Pick<Types.DealStageConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.DealStage, "title"> & {
                dealsAggregate: Array<{
                    sum?: Types.Maybe<
                        Pick<Types.DealStageDealsSumAggregate, "value">
                    >;
                }>;
            }
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

export type QuoteCreateMutationVariables = Types.Exact<{
    input: Types.CreateOneQuoteInput;
}>;

export type QuoteCreateMutation = {
    createOneQuote: Pick<Types.Quote, "id" | "title"> & {
        salesOwner: Pick<Types.User, "id" | "name">;
        company: Pick<Types.Company, "id" | "name">;
        contact: Pick<Types.Contact, "id" | "name">;
    };
};

export type QuoteUpdateMutationVariables = Types.Exact<{
    input: Types.UpdateOneQuoteInput;
}>;

export type QuoteUpdateMutation = {
    updateOneQuote: Pick<Types.Quote, "id" | "title"> & {
        salesOwner: Pick<Types.User, "id" | "name">;
        company: Pick<Types.Company, "id" | "name">;
        contact: Pick<Types.Contact, "id" | "name">;
    };
};

export type QuoteCompanySelectQueryVariables = Types.Exact<{
    filter: Types.CompanyFilter;
    sorting?: Types.InputMaybe<Array<Types.CompanySort> | Types.CompanySort>;
    paging: Types.OffsetPaging;
}>;

export type QuoteCompanySelectQuery = {
    companies: { nodes: Array<Pick<Types.Company, "id" | "name">> };
};

export type QuoteContactSelectQueryVariables = Types.Exact<{
    filter: Types.ContactFilter;
    sorting?: Types.InputMaybe<Array<Types.ContactSort> | Types.ContactSort>;
    paging: Types.OffsetPaging;
}>;

export type QuoteContactSelectQuery = {
    contacts: { nodes: Array<Pick<Types.Contact, "id" | "name">> };
};

export type QuoteSalesOwnerSelectQueryVariables = Types.Exact<{
    filter: Types.UserFilter;
    sorting?: Types.InputMaybe<Array<Types.UserSort> | Types.UserSort>;
    paging: Types.OffsetPaging;
}>;

export type QuoteSalesOwnerSelectQuery = {
    users: { nodes: Array<Pick<Types.User, "id" | "name">> };
};

export type QuoteOneQueryQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type QuoteOneQueryQuery = {
    quote: Pick<Types.Quote, "id" | "title" | "total" | "subTotal"> & {
        items: Array<Pick<Types.QuoteItem, "totalPrice">>;
    };
};

export type QuoteUseFormQueryQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type QuoteUseFormQueryQuery = {
    quote: Pick<Types.Quote, "id"> & {
        items: Array<
            Pick<
                Types.QuoteItem,
                "title" | "unitPrice" | "quantity" | "discount"
            >
        >;
    };
};

export type QuoteUseFormMutationMutationVariables = Types.Exact<{
    input: Types.UpdateOneQuoteInput;
}>;

export type QuoteUseFormMutationMutation = {
    updateOneQuote: Pick<Types.Quote, "id"> & {
        items: Array<
            Pick<
                Types.QuoteItem,
                "title" | "unitPrice" | "quantity" | "discount"
            >
        >;
    };
};

export type QuotesTableQueryQueryVariables = Types.Exact<{
    filter: Types.QuoteFilter;
    sorting: Array<Types.QuoteSort> | Types.QuoteSort;
    paging: Types.OffsetPaging;
}>;

export type QuotesTableQueryQuery = {
    quotes: Pick<Types.QuoteConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Quote,
                "id" | "title" | "status" | "total" | "createdAt"
            > & {
                company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
                contact: Pick<Types.Contact, "id" | "name" | "avatarUrl">;
                salesOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
            }
        >;
    };
};
