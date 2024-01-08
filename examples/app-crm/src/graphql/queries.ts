import gql from "graphql-tag";

export const EVENT_CATEGORIES_QUERY = gql`
    query EventCategories(
        $filter: EventCategoryFilter!
        $sorting: [EventCategorySort!]
    ) {
        eventCategories(filter: $filter, sorting: $sorting) {
            totalCount
            nodes {
                id
                title
            }
        }
    }
`;
