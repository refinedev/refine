import gql from "graphql-tag";

export const QUOTES_TABLE_QUERY = gql`
    query QuotesTable(
        $filter: QuoteFilter!
        $sorting: [QuoteSort!]!
        $paging: OffsetPaging!
    ) {
        quotes(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                title
                status
                total
                createdAt
                company {
                    id
                    name
                    avatarUrl
                }
                contact {
                    id
                    name
                    avatarUrl
                }
                salesOwner {
                    id
                    name
                    avatarUrl
                }
            }
            totalCount
        }
    }
`;
