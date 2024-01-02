import gql from "graphql-tag";

export const CALENDAR_EVENTS_QUERY = gql`
    query CalendarEvents(
        $filter: EventFilter!
        $sorting: [EventSort!]
        $paging: OffsetPaging!
    ) {
        events(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                title
                description
                startDate
                endDate
                color
                createdAt
                createdBy {
                    id
                    name
                }
                category {
                    id
                    title
                }
            }
        }
    }
`;
