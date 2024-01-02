import gql from "graphql-tag";

export const CALENDAR_UPCOMING_EVENTS_QUERY = gql`
    query UpcomingEvents(
        $filter: EventFilter!
        $sorting: [EventSort!]
        $paging: OffsetPaging!
    ) {
        events(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                title
                color
                startDate
                endDate
            }
            totalCount
        }
    }
`;
