import gql from "graphql-tag";

export const USERS_SELECT_QUERY = gql`
    query UsersSelect(
        $filter: UserFilter!
        $sorting: [UserSort!]
        $paging: OffsetPaging!
    ) {
        users(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;
