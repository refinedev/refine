import gql from "graphql-tag";

export const COMPANIES_SELECT_QUERY = gql`
    query CompaniesSelect(
        $filter: CompanyFilter!
        $sorting: [CompanySort!]
        $paging: OffsetPaging!
    ) {
        companies(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;

export const USERS_SELECT_QUERY = gql`
    query UsersSelect(
        $filter: UserFilter!
        $sorting: [UserSort!]
        $paging: OffsetPaging!
    ) {
        users(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;

export const CONTACTS_SELECT_QUERY = gql`
    query ContactsSelect(
        $filter: ContactFilter!
        $sorting: [ContactSort!]
        $paging: OffsetPaging!
    ) {
        contacts(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;
