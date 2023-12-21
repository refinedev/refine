import gql from "graphql-tag";

export const COMPANIES_LIST_QUERY = gql`
    query CompaniesList(
        $filter: CompanyFilter!
        $sorting: [CompanySort!]
        $paging: OffsetPaging!
    ) {
        companies(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                name
                avatarUrl
                dealsAggregate {
                    sum {
                        value
                    }
                }
            }
        }
    }
`;
