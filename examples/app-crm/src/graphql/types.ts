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

export type AccountSettingsGetUserQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type AccountSettingsGetUserQuery = {
    user: Pick<
        Types.User,
        | "id"
        | "name"
        | "email"
        | "avatarUrl"
        | "jobTitle"
        | "phone"
        | "timezone"
    >;
};

export type AccountSettingsUpdateUserMutationVariables = Types.Exact<{
    input: Types.UpdateOneUserInput;
}>;

export type AccountSettingsUpdateUserMutation = {
    updateOneUser: Pick<
        Types.User,
        | "id"
        | "name"
        | "email"
        | "avatarUrl"
        | "jobTitle"
        | "phone"
        | "timezone"
    >;
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

export type EventCategoriesQueryVariables = Types.Exact<{
    filter: Types.EventCategoryFilter;
    sorting?: Types.InputMaybe<
        Array<Types.EventCategorySort> | Types.EventCategorySort
    >;
}>;

export type EventCategoriesQuery = {
    eventCategories: Pick<Types.EventCategoryConnection, "totalCount"> & {
        nodes: Array<Pick<Types.EventCategory, "id" | "title">>;
    };
};

export type CompaniesSelectQueryVariables = Types.Exact<{
    filter: Types.CompanyFilter;
    sorting?: Types.InputMaybe<Array<Types.CompanySort> | Types.CompanySort>;
    paging: Types.OffsetPaging;
}>;

export type CompaniesSelectQuery = {
    companies: {
        nodes: Array<Pick<Types.Company, "id" | "name" | "avatarUrl">>;
    };
};

export type ContactsSelectQueryVariables = Types.Exact<{
    filter: Types.ContactFilter;
    sorting?: Types.InputMaybe<Array<Types.ContactSort> | Types.ContactSort>;
    paging: Types.OffsetPaging;
}>;

export type ContactsSelectQuery = {
    contacts: {
        nodes: Array<Pick<Types.Contact, "id" | "name" | "avatarUrl">>;
    };
};

export type DealStagesSelectQueryVariables = Types.Exact<{
    filter: Types.DealStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.DealStageSort> | Types.DealStageSort
    >;
    paging: Types.OffsetPaging;
}>;

export type DealStagesSelectQuery = {
    dealStages: { nodes: Array<Pick<Types.DealStage, "id" | "title">> };
};

export type UsersSelectQueryVariables = Types.Exact<{
    filter: Types.UserFilter;
    sorting?: Types.InputMaybe<Array<Types.UserSort> | Types.UserSort>;
    paging: Types.OffsetPaging;
}>;

export type UsersSelectQuery = {
    users: { nodes: Array<Pick<Types.User, "id" | "name" | "avatarUrl">> };
};

export type RefreshTokenMutationVariables = Types.Exact<{
    refreshToken: Types.Scalars["String"]["input"];
}>;

export type RefreshTokenMutation = {
    refreshToken: Pick<Types.AuthResponse, "accessToken" | "refreshToken">;
};

export type AdministrationUsersQueryVariables = Types.Exact<{
    filter: Types.UserFilter;
    sorting?: Types.InputMaybe<Array<Types.UserSort> | Types.UserSort>;
    paging: Types.OffsetPaging;
}>;

export type AdministrationUsersQuery = {
    users: Pick<Types.UserConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.User, "id" | "name" | "jobTitle" | "role" | "avatarUrl">
        >;
    };
};

export type AdministrationAuditLogsQueryVariables = Types.Exact<{
    filter: Types.AuditFilter;
    sorting?: Types.InputMaybe<Array<Types.AuditSort> | Types.AuditSort>;
    paging: Types.OffsetPaging;
}>;

export type AdministrationAuditLogsQuery = {
    audits: Pick<Types.AuditConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Audit,
                "id" | "action" | "targetEntity" | "targetId" | "createdAt"
            > & {
                user?: Types.Maybe<
                    Pick<Types.User, "id" | "name" | "avatarUrl">
                >;
                changes: Array<
                    Pick<Types.AuditChange, "field" | "from" | "to">
                >;
            }
        >;
    };
};

export type CalendarEventsQueryVariables = Types.Exact<{
    filter: Types.EventFilter;
    sorting?: Types.InputMaybe<Array<Types.EventSort> | Types.EventSort>;
    paging: Types.OffsetPaging;
}>;

export type CalendarEventsQuery = {
    events: Pick<Types.EventConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Event,
                | "id"
                | "title"
                | "description"
                | "startDate"
                | "endDate"
                | "color"
                | "createdAt"
            > & {
                createdBy: Pick<Types.User, "id" | "name">;
                category: Pick<Types.EventCategory, "id" | "title">;
            }
        >;
    };
};

export type CreateEventCategoriesMutationVariables = Types.Exact<{
    input: Types.CreateManyEventCategoriesInput;
}>;

export type CreateEventCategoriesMutation = {
    createManyEventCategories: Array<Pick<Types.EventCategory, "id" | "title">>;
};

export type EventFragmentFragment = Pick<
    Types.Event,
    | "id"
    | "title"
    | "description"
    | "startDate"
    | "endDate"
    | "color"
    | "createdAt"
> & {
    createdBy: Pick<Types.User, "id" | "name">;
    category: Pick<Types.EventCategory, "id" | "title">;
    participants: Array<Pick<Types.User, "id" | "name">>;
};

export type UpdateEventMutationVariables = Types.Exact<{
    input: Types.UpdateOneEventInput;
}>;

export type UpdateEventMutation = {
    updateOneEvent: Pick<
        Types.Event,
        | "id"
        | "title"
        | "description"
        | "startDate"
        | "endDate"
        | "color"
        | "createdAt"
    > & {
        createdBy: Pick<Types.User, "id" | "name">;
        category: Pick<Types.EventCategory, "id" | "title">;
        participants: Array<Pick<Types.User, "id" | "name">>;
    };
};

export type GetEventQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type GetEventQuery = {
    event: Pick<
        Types.Event,
        | "id"
        | "title"
        | "description"
        | "startDate"
        | "endDate"
        | "color"
        | "createdAt"
    > & {
        createdBy: Pick<Types.User, "id" | "name">;
        category: Pick<Types.EventCategory, "id" | "title">;
        participants: Array<Pick<Types.User, "id" | "name">>;
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

export type CompanyContactsGetCompanyQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type CompanyContactsGetCompanyQuery = {
    company: Pick<Types.Company, "id" | "name"> & {
        salesOwner: Pick<Types.User, "id">;
    };
};

export type CompanyDealsTableQueryVariables = Types.Exact<{
    filter: Types.DealFilter;
    sorting?: Types.InputMaybe<Array<Types.DealSort> | Types.DealSort>;
    paging: Types.OffsetPaging;
}>;

export type CompanyDealsTableQuery = {
    deals: Pick<Types.DealConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.Deal, "id" | "title" | "value"> & {
                stage?: Types.Maybe<Pick<Types.DealStage, "id" | "title">>;
                dealOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
                dealContact: Pick<Types.Contact, "id" | "name" | "avatarUrl">;
            }
        >;
    };
};

export type CompanyTotalDealsAmountQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type CompanyTotalDealsAmountQuery = {
    company: {
        dealsAggregate: Array<{
            sum?: Types.Maybe<Pick<Types.CompanyDealsSumAggregate, "value">>;
        }>;
    };
};

export type CompanyInfoQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type CompanyInfoQuery = {
    company: Pick<
        Types.Company,
        | "id"
        | "totalRevenue"
        | "industry"
        | "companySize"
        | "businessType"
        | "country"
        | "website"
    >;
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

export type LatestActivitiesDealsQueryVariables = Types.Exact<{
    filter: Types.DealFilter;
    sorting: Array<Types.DealSort> | Types.DealSort;
    paging: Types.OffsetPaging;
}>;

export type LatestActivitiesDealsQuery = {
    deals: {
        nodes: Array<
            Pick<Types.Deal, "id" | "title"> & {
                stage?: Types.Maybe<Pick<Types.DealStage, "id" | "title">>;
                company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
            }
        >;
    };
};

export type LatestActivitiesAuditsQueryVariables = Types.Exact<{
    filter: Types.AuditFilter;
    sorting: Array<Types.AuditSort> | Types.AuditSort;
    paging: Types.OffsetPaging;
}>;

export type LatestActivitiesAuditsQuery = {
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

export type ProductsServicesQuoteFormMutationVariables = Types.Exact<{
    input: Types.UpdateOneQuoteInput;
}>;

export type ProductsServicesQuoteFormMutation = {
    updateOneQuote: Pick<Types.Quote, "id" | "title" | "total" | "subTotal"> & {
        items: Array<
            Pick<
                Types.QuoteItem,
                "totalPrice" | "title" | "unitPrice" | "quantity" | "discount"
            >
        >;
    };
};

export type QuotesTableQueryVariables = Types.Exact<{
    filter: Types.QuoteFilter;
    sorting: Array<Types.QuoteSort> | Types.QuoteSort;
    paging: Types.OffsetPaging;
}>;

export type QuotesTableQuery = {
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

export type TaskStagesSelectQueryVariables = Types.Exact<{
    filter: Types.TaskStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.TaskStageSort> | Types.TaskStageSort
    >;
    paging: Types.OffsetPaging;
}>;

export type TaskStagesSelectQuery = {
    taskStages: { nodes: Array<Pick<Types.TaskStage, "id" | "title">> };
};

export type SalesCompaniesSelectQueryVariables = Types.Exact<{
    filter: Types.CompanyFilter;
    sorting?: Types.InputMaybe<Array<Types.CompanySort> | Types.CompanySort>;
    paging: Types.OffsetPaging;
}>;

export type SalesCompaniesSelectQuery = {
    companies: {
        nodes: Array<
            Pick<Types.Company, "id" | "name" | "avatarUrl"> & {
                contacts: {
                    nodes: Array<
                        Pick<Types.Contact, "name" | "id" | "avatarUrl">
                    >;
                };
            }
        >;
    };
};
