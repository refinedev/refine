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

export type CompanyCreateCompanyNoteMutationVariables = Types.Exact<{
    input: Types.CreateOneCompanyNoteInput;
}>;

export type CompanyCreateCompanyNoteMutation = {
    createOneCompanyNote: Pick<Types.CompanyNote, "id" | "note">;
};

export type CompanyCompanyNotesQueryVariables = Types.Exact<{
    filter: Types.CompanyNoteFilter;
    sorting?: Types.InputMaybe<
        Array<Types.CompanyNoteSort> | Types.CompanyNoteSort
    >;
    paging: Types.OffsetPaging;
}>;

export type CompanyCompanyNotesQuery = {
    companyNotes: Pick<Types.CompanyNoteConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.CompanyNote, "id" | "note" | "createdAt"> & {
                createdBy: Pick<
                    Types.User,
                    "id" | "name" | "updatedAt" | "avatarUrl"
                >;
            }
        >;
    };
};

export type CompanyUpdateCompanyNoteMutationVariables = Types.Exact<{
    input: Types.UpdateOneCompanyNoteInput;
}>;

export type CompanyUpdateCompanyNoteMutation = {
    updateOneCompanyNote: Pick<Types.CompanyNote, "id" | "note">;
};

export type CompanyQuotesTableQueryVariables = Types.Exact<{
    filter: Types.QuoteFilter;
    sorting?: Types.InputMaybe<Array<Types.QuoteSort> | Types.QuoteSort>;
    paging: Types.OffsetPaging;
}>;

export type CompanyQuotesTableQuery = {
    quotes: Pick<Types.QuoteConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.Quote, "id" | "title" | "status" | "total"> & {
                company: Pick<Types.Company, "id" | "name">;
                contact: Pick<Types.Contact, "id" | "name" | "avatarUrl">;
                salesOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
            }
        >;
    };
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

export type ContactsCreateContactNoteMutationVariables = Types.Exact<{
    input: Types.CreateOneContactNoteInput;
}>;

export type ContactsCreateContactNoteMutation = {
    createOneContactNote: Pick<Types.ContactNote, "id" | "note">;
};

export type ContactsUpdateContactNoteMutationVariables = Types.Exact<{
    input: Types.UpdateOneContactNoteInput;
}>;

export type ContactsUpdateContactNoteMutation = {
    updateOneContactNote: Pick<Types.ContactNote, "id" | "note">;
};

export type ContactsContactNotesListQueryVariables = Types.Exact<{
    filter: Types.ContactNoteFilter;
    sorting?: Types.InputMaybe<
        Array<Types.ContactNoteSort> | Types.ContactNoteSort
    >;
    paging: Types.OffsetPaging;
}>;

export type ContactsContactNotesListQuery = {
    contactNotes: Pick<Types.ContactNoteConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.ContactNote, "id" | "note" | "createdAt"> & {
                createdBy: Pick<Types.User, "id" | "name" | "avatarUrl">;
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

export type DashboardDealsChartQueryVariables = Types.Exact<{
    filter: Types.DealStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.DealStageSort> | Types.DealStageSort
    >;
    paging: Types.OffsetPaging;
}>;

export type DashboardDealsChartQuery = {
    dealStages: {
        nodes: Array<
            Pick<Types.DealStage, "title"> & {
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

export type DashboardTasksChartQueryVariables = Types.Exact<{
    filter: Types.TaskStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.TaskStageSort> | Types.TaskStageSort
    >;
    paging: Types.OffsetPaging;
}>;

export type DashboardTasksChartQuery = {
    taskStages: {
        nodes: Array<
            Pick<Types.TaskStage, "title"> & {
                tasksAggregate: Array<{
                    count?: Types.Maybe<
                        Pick<Types.TaskStageTasksCountAggregate, "id">
                    >;
                }>;
            }
        >;
    };
};

export type DashboardTotalRevenueQueryVariables = Types.Exact<{
    filter: Types.DealStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.DealStageSort> | Types.DealStageSort
    >;
    paging: Types.OffsetPaging;
}>;

export type DashboardTotalRevenueQuery = {
    dealStages: {
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

export type QuoteFieldsFragment = Pick<
    Types.Quote,
    | "id"
    | "title"
    | "status"
    | "description"
    | "subTotal"
    | "total"
    | "tax"
    | "createdAt"
> & {
    items: Array<
        Pick<
            Types.QuoteItem,
            "title" | "unitPrice" | "quantity" | "discount" | "totalPrice"
        >
    >;
    company: Pick<
        Types.Company,
        "id" | "name" | "country" | "website" | "avatarUrl"
    >;
    salesOwner: Pick<Types.User, "id" | "name">;
    contact: Pick<Types.Contact, "id" | "name">;
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
                | "id"
                | "title"
                | "status"
                | "description"
                | "subTotal"
                | "total"
                | "tax"
                | "createdAt"
            > & {
                items: Array<
                    Pick<
                        Types.QuoteItem,
                        | "title"
                        | "unitPrice"
                        | "quantity"
                        | "discount"
                        | "totalPrice"
                    >
                >;
                company: Pick<
                    Types.Company,
                    "id" | "name" | "country" | "website" | "avatarUrl"
                >;
                salesOwner: Pick<Types.User, "id" | "name">;
                contact: Pick<Types.Contact, "id" | "name">;
            }
        >;
    };
};

export type QuotesGetQuoteQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type QuotesGetQuoteQuery = {
    quote: Pick<
        Types.Quote,
        | "id"
        | "title"
        | "status"
        | "description"
        | "subTotal"
        | "total"
        | "tax"
        | "createdAt"
    > & {
        items: Array<
            Pick<
                Types.QuoteItem,
                "title" | "unitPrice" | "quantity" | "discount" | "totalPrice"
            >
        >;
        company: Pick<
            Types.Company,
            "id" | "name" | "country" | "website" | "avatarUrl"
        >;
        salesOwner: Pick<Types.User, "id" | "name">;
        contact: Pick<Types.Contact, "id" | "name">;
    };
};

export type QuotesCreateQuoteMutationVariables = Types.Exact<{
    input: Types.CreateOneQuoteInput;
}>;

export type QuotesCreateQuoteMutation = {
    createOneQuote: Pick<
        Types.Quote,
        | "id"
        | "title"
        | "status"
        | "description"
        | "subTotal"
        | "total"
        | "tax"
        | "createdAt"
    > & {
        items: Array<
            Pick<
                Types.QuoteItem,
                "title" | "unitPrice" | "quantity" | "discount" | "totalPrice"
            >
        >;
        company: Pick<
            Types.Company,
            "id" | "name" | "country" | "website" | "avatarUrl"
        >;
        salesOwner: Pick<Types.User, "id" | "name">;
        contact: Pick<Types.Contact, "id" | "name">;
    };
};

export type QuotesUpdateQuoteMutationVariables = Types.Exact<{
    input: Types.UpdateOneQuoteInput;
}>;

export type QuotesUpdateQuoteMutation = {
    updateOneQuote: Pick<
        Types.Quote,
        | "id"
        | "title"
        | "status"
        | "description"
        | "subTotal"
        | "total"
        | "tax"
        | "createdAt"
    > & {
        items: Array<
            Pick<
                Types.QuoteItem,
                "title" | "unitPrice" | "quantity" | "discount" | "totalPrice"
            >
        >;
        company: Pick<
            Types.Company,
            "id" | "name" | "country" | "website" | "avatarUrl"
        >;
        salesOwner: Pick<Types.User, "id" | "name">;
        contact: Pick<Types.Contact, "id" | "name">;
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

export type KanbanCreateStageMutationVariables = Types.Exact<{
    input: Types.CreateOneTaskStageInput;
}>;

export type KanbanCreateStageMutation = {
    createOneTaskStage: Pick<Types.TaskStage, "id" | "title" | "createdAt">;
};

export type KanbanCreateTaskMutationVariables = Types.Exact<{
    input: Types.CreateOneTaskInput;
}>;

export type KanbanCreateTaskMutation = {
    createOneTask: Pick<Types.Task, "id">;
};

export type KanbanUpdateStageMutationVariables = Types.Exact<{
    input: Types.UpdateOneTaskStageInput;
}>;

export type KanbanUpdateStageMutation = {
    updateOneTaskStage: Pick<Types.TaskStage, "id" | "title">;
};

export type KanbanGetTaskQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type KanbanGetTaskQuery = {
    task: Pick<
        Types.Task,
        "id" | "title" | "completed" | "description" | "dueDate"
    > & {
        stage?: Types.Maybe<Pick<Types.TaskStage, "id" | "title">>;
        users: Array<Pick<Types.User, "id" | "name" | "avatarUrl">>;
        checklist: Array<Pick<Types.CheckListItem, "title" | "checked">>;
    };
};

export type KanbanUpdateTaskMutationVariables = Types.Exact<{
    input: Types.UpdateOneTaskInput;
}>;

export type KanbanUpdateTaskMutation = {
    updateOneTask: Pick<
        Types.Task,
        "id" | "title" | "completed" | "description" | "dueDate"
    > & {
        stage?: Types.Maybe<Pick<Types.TaskStage, "id" | "title">>;
        users: Array<Pick<Types.User, "id" | "name" | "avatarUrl">>;
        checklist: Array<Pick<Types.CheckListItem, "title" | "checked">>;
    };
};

export type KanbanTaskCommentsQueryVariables = Types.Exact<{
    filter: Types.TaskCommentFilter;
    sorting?: Types.InputMaybe<
        Array<Types.TaskCommentSort> | Types.TaskCommentSort
    >;
    paging: Types.OffsetPaging;
}>;

export type KanbanTaskCommentsQuery = {
    taskComments: Pick<Types.TaskCommentConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.TaskComment, "id" | "comment" | "createdAt"> & {
                createdBy: Pick<Types.User, "id" | "name" | "avatarUrl">;
            }
        >;
    };
};

export type KanbanTaskStagesQueryVariables = Types.Exact<{
    filter: Types.TaskStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.TaskStageSort> | Types.TaskStageSort
    >;
    paging: Types.OffsetPaging;
}>;

export type KanbanTaskStagesQuery = {
    taskStages: Pick<Types.TaskStageConnection, "totalCount"> & {
        nodes: Array<Pick<Types.TaskStage, "id" | "title">>;
    };
};

export type KanbanTasksQueryVariables = Types.Exact<{
    filter: Types.TaskFilter;
    sorting?: Types.InputMaybe<Array<Types.TaskSort> | Types.TaskSort>;
    paging: Types.OffsetPaging;
}>;

export type KanbanTasksQuery = {
    tasks: Pick<Types.TaskConnection, "totalCount"> & {
        nodes: Array<
            Pick<
                Types.Task,
                | "id"
                | "title"
                | "description"
                | "dueDate"
                | "completed"
                | "stageId"
            > & {
                checklist: Array<
                    Pick<Types.CheckListItem, "title" | "checked">
                >;
                users: Array<Pick<Types.User, "id" | "name" | "avatarUrl">>;
                comments: Pick<Types.TaskCommentsConnection, "totalCount">;
            }
        >;
    };
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

export type SalesCreateDealStageMutationVariables = Types.Exact<{
    input: Types.CreateOneDealStageInput;
}>;

export type SalesCreateDealStageMutation = {
    createOneDealStage: Pick<Types.DealStage, "id">;
};

export type SalesCreateContactMutationVariables = Types.Exact<{
    input: Types.CreateOneContactInput;
}>;

export type SalesCreateContactMutation = {
    createOneContact: Pick<Types.Contact, "id">;
};

export type SalesUpdateDealStageMutationVariables = Types.Exact<{
    input: Types.UpdateOneDealStageInput;
}>;

export type SalesUpdateDealStageMutation = {
    updateOneDealStage: Pick<Types.DealStage, "id" | "title">;
};

export type SalesUpdateDealMutationVariables = Types.Exact<{
    input: Types.UpdateOneDealInput;
}>;

export type SalesUpdateDealMutation = {
    updateOneDeal: Pick<
        Types.Deal,
        "id" | "title" | "stageId" | "value" | "dealOwnerId"
    > & {
        company: Pick<Types.Company, "id"> & {
            contacts: {
                nodes: Array<Pick<Types.Contact, "id" | "name" | "avatarUrl">>;
            };
        };
        dealContact: Pick<Types.Contact, "id">;
    };
};

export type SalesFinalizeDealMutationVariables = Types.Exact<{
    input: Types.UpdateOneDealInput;
}>;

export type SalesFinalizeDealMutation = {
    updateOneDeal: Pick<
        Types.Deal,
        "id" | "notes" | "closeDateYear" | "closeDateMonth" | "closeDateDay"
    >;
};

export type SalesDealStagesQueryVariables = Types.Exact<{
    filter: Types.DealStageFilter;
    sorting?: Types.InputMaybe<
        Array<Types.DealStageSort> | Types.DealStageSort
    >;
    paging?: Types.InputMaybe<Types.OffsetPaging>;
}>;

export type SalesDealStagesQuery = {
    dealStages: Pick<Types.DealStageConnection, "totalCount"> & {
        nodes: Array<
            Pick<Types.DealStage, "id" | "title"> & {
                dealsAggregate: Array<{
                    sum?: Types.Maybe<
                        Pick<Types.DealStageDealsSumAggregate, "value">
                    >;
                }>;
            }
        >;
    };
};

export type SalesDealsQueryVariables = Types.Exact<{
    filter: Types.DealFilter;
    sorting?: Types.InputMaybe<Array<Types.DealSort> | Types.DealSort>;
    paging: Types.OffsetPaging;
}>;

export type SalesDealsQuery = {
    deals: {
        nodes: Array<
            Pick<
                Types.Deal,
                "id" | "title" | "value" | "createdAt" | "stageId"
            > & {
                company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
                dealOwner: Pick<Types.User, "id" | "name" | "avatarUrl">;
            }
        >;
    };
};
