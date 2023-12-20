import gql from "graphql-tag";

export const UPDATE_COMPANY_MUTATION = gql`
    mutation UpdateCompany($input: UpdateOneCompanyInput!) {
        updateOneCompany(input: $input) {
            id
            name
            totalRevenue
            industry
            companySize
            businessType
            country
            website
            avatarUrl
            salesOwner {
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
            totalCount
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;
