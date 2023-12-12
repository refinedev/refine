import gql from "graphql-tag";

export const COMPANIES_SELECT_QUERY = gql`
    query CompaniesSelect {
        companies {
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;

export const USERS_SELECT_QUERY = gql`
    query UsersSelect {
        users {
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;
