import * as Types from "@/interfaces";

export type DashboardTotalCountsQueryVariables = Types.Exact<{
    [key: string]: never;
}>;

export type DashboardTotalCountsQuery = {
    companies: { totalCount: number };
    contacts: { totalCount: number };
    deals: { totalCount: number };
};
