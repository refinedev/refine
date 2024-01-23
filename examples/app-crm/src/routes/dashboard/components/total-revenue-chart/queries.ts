import gql from "graphql-tag";

export const DASHBOARD_TOTAL_REVENUE_QUERY = gql`
    query DashboardTotalRevenue(
        $filter: DealStageFilter!
        $sorting: [DealStageSort!]
        $paging: OffsetPaging!
    ) {
        dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                title
                dealsAggregate {
                    sum {
                        value
                    }
                }
            }
        }
    }
`;
