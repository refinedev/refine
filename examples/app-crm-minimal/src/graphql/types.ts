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
