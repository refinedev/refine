import gql from "graphql-tag";

export const COMPANY_CONTACTS_TABLE_QUERY = gql`
    query CompanyContactsTable(
        $filter: ContactFilter!
        $sorting: [ContactSort!]
        $paging: OffsetPaging!
    ) {
        contacts(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                name
                avatarUrl
                jobTitle
                email
                phone
                status
            }
        }
    }
`;
