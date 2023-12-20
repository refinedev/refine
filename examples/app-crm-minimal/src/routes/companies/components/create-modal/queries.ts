import gql from "graphql-tag";

export const CREATE_COMPANY_MUTATION = gql`
    mutation CreateCompany($input: CreateOneCompanyInput!) {
        createOneCompany(input: $input) {
            id
            salesOwner {
                id
            }
        }
    }
`;
