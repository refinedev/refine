import gql from "graphql-tag";

export const KANBAN_CREATE_STAGE_MUTATION = gql`
    mutation KanbanCreateStage($input: CreateOneTaskStageInput!) {
        createOneTaskStage(input: $input) {
            id
            title
            createdAt
        }
    }
`;

export const KANBAN_CREATE_TASK_MUTATION = gql`
    mutation KanbanCreateTask($input: CreateOneTaskInput!) {
        createOneTask(input: $input) {
            id
        }
    }
`;

export const KANBAN_UPDATE_STAGE_MUTATION = gql`
    mutation KanbanUpdateStage($input: UpdateOneTaskStageInput!) {
        updateOneTaskStage(input: $input) {
            id
            title
        }
    }
`;

export const KANBAN_GET_TASK_QUERY = gql`
    query KanbanGetTask($id: ID!) {
        task(id: $id) {
            id
            title
            completed
            description
            dueDate
            stage {
                id
                title
            }
            users {
                id
                name
                avatarUrl
            }
            checklist {
                title
                checked
            }
        }
    }
`;

export const KANBAN_UPDATE_TASK_MUTATION = gql`
    mutation KanbanUpdateTask($input: UpdateOneTaskInput!) {
        updateOneTask(input: $input) {
            id
            title
            completed
            description
            dueDate
            stage {
                id
                title
            }
            users {
                id
                name
                avatarUrl
            }
            checklist {
                title
                checked
            }
        }
    }
`;
