import gql from "graphql-tag";

export const TOTAL_REVENUE_CHART_QUERY = gql`
    query TotalRevenueChart(
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
            totalCount
        }
    }
`;
