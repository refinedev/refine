import gql from "graphql-tag";

export const DASHBOARD_DEALS_CHART_QUERY = gql`
    query DashboardDealsChart(
        $filter: DealStageFilter!
        $sorting: [DealStageSort!]
        $paging: OffsetPaging!
    ) {
        dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                title
                dealsAggregate {
                    groupBy {
                        closeDateMonth
                        closeDateYear
                    }
                    sum {
                        value
                    }
                }
            }
        }
    }
`;

export const DASHBOARD_TASKS_CHART_QUERY = gql`
    query DashboardTasksChart(
        $filter: TaskStageFilter!
        $sorting: [TaskStageSort!]
        $paging: OffsetPaging!
    ) {
        taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                title
                tasksAggregate {
                    count {
                        id
                    }
                }
            }
        }
    }
`;
