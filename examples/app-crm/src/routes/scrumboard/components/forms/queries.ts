import gql from "graphql-tag";

export const TASK_STAGES_SELECT_QUERY = gql`
    query TaskStagesSelect(
        $filter: TaskStageFilter!
        $sorting: [TaskStageSort!]
        $paging: OffsetPaging!
    ) {
        taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                title
            }
        }
    }
`;
