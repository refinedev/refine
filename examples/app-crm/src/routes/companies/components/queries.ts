import gql from "graphql-tag";

export const COMPANY_CONTACTS_QUERY = gql`
    query CompanyContacts(
        $filter: ContactFilter!
        $sorting: [ContactSort!]
        $paging: OffsetPaging!
    ) {
        contacts(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
                jobTitle
                email
                phone
                status
            }
            totalCount
        }
    }
`;
