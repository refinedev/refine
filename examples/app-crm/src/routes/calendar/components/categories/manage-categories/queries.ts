import gql from "graphql-tag";

export const CALENDAR_CREATE_EVENT_CATEGORIES_MUTATION = gql`
    mutation CreateEventCategories($input: CreateManyEventCategoriesInput!) {
        createManyEventCategories(input: $input) {
            id
            title
        }
    }
`;
