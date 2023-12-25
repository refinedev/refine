import gql from "graphql-tag";

export const CONTACTS_LIST_QUERY = gql`
    query ContactsList(
        $filter: ContactFilter!
        $sorting: [ContactSort!]
        $paging: OffsetPaging!
    ) {
        contacts(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                email
                company {
                    id
                    name
                    avatarUrl
                }
                jobTitle
                status
                avatarUrl
            }
            totalCount
        }
    }
`;
