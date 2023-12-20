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
