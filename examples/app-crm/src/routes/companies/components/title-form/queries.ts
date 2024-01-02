import gql from "graphql-tag";

export const COMPANY_TITLE_FORM_MUTATION = gql`
    mutation CompanyTitleForm($input: UpdateOneCompanyInput!) {
        updateOneCompany(input: $input) {
            id
            name
            avatarUrl
            salesOwner {
                id
                name
                avatarUrl
            }
        }
    }
`;

export const COMPANY_TITLE_QUERY = gql`
    query CompanyTitle($id: ID!) {
        company(id: $id) {
            id
            name
            createdAt
            avatarUrl
            salesOwner {
                id
                name
                avatarUrl
            }
        }
    }
`;
