import gql from "graphql-tag";

export const COMPANY_CONTACTS_TABLE_QUERY = gql`
    query CompanyContactsTable(
        $filter: ContactFilter!
        $sorting: [ContactSort!]
        $paging: OffsetPaging!
    ) {
        contacts(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
                jobTitle
                email
                phone
                status
            }
            totalCount
        }
    }
`;

export const COMPANY_CONTACTS_GET_COMPANY_QUERY = gql`
    query CompanyContactsGetCompany($id: ID!) {
        company(id: $id) {
            id
            name
            salesOwner {
                id
            }
        }
    }
`;

export const COMPANY_DEALS_TABLE_QUERY = gql`
    query CompanyDealsTable(
        $filter: DealFilter!
        $sorting: [DealSort!]
        $paging: OffsetPaging!
    ) {
        deals(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                title
                value
                stage {
                    id
                    title
                }
                dealOwner {
                    id
                    name
                    avatarUrl
                }
                dealContact {
                    id
                    name
                    avatarUrl
                }
            }
            totalCount
        }
    }
`;
