import type * as Types from "./schema.types";

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
