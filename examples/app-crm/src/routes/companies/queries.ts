import gql from "graphql-tag";

export const COMPANY_CREATE_MUTATION = gql`
    mutation CreateCompany($input: CreateOneCompanyInput!) {
        createOneCompany(input: $input) {
            id
            name
            salesOwner {
                id
                name
                avatarUrl
            }
        }
    }
`;

export const COMPANIES_TABLE_QUERY = gql`
    query CompaniesTable(
        $filter: CompanyFilter!
        $sorting: [CompanySort!]!
        $paging: OffsetPaging!
    ) {
        companies(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
                dealsAggregate {
                    sum {
                        value
                    }
                }
                salesOwner {
                    id
                    name
                    avatarUrl
                }
                contacts {
                    nodes {
                        id
                        name
                        avatarUrl
                    }
                }
            }
            totalCount
        }
    }
`;
