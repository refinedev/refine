import gql from "graphql-tag";

export const SALES_COMPANIES_SELECT_QUERY = gql`
    query SalesCompaniesSelect(
        $filter: CompanyFilter!
        $sorting: [CompanySort!]
        $paging: OffsetPaging!
    ) {
        companies(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
                contacts {
                    nodes {
                        name
                        id
                        avatarUrl
                    }
                }
            }
        }
    }
`;
