import gql from "graphql-tag";

export const CALENDAR_EVENT_CATEGORIES_QUERY = gql`
    query CalendarEventCategories(
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
