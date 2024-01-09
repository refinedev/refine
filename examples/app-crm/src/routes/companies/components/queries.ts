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

export const COMPANY_TOTAL_DEALS_AMOUNT_QUERY = gql`
    query CompanyTotalDealsAmount($id: ID!) {
        company(id: $id) {
            dealsAggregate {
                sum {
                    value
                }
            }
        }
    }
`;

export const COMPANY_INFO_QUERY = gql`
    query CompanyInfo($id: ID!) {
        company(id: $id) {
            id
            totalRevenue
            industry
            companySize
            businessType
            country
            website
        }
    }
`;

export const COMPANY_CREATE_COMPANY_NOTE_MUTATION = gql`
    mutation CompanyCreateCompanyNote($input: CreateOneCompanyNoteInput!) {
        createOneCompanyNote(input: $input) {
            id
            note
        }
    }
`;

export const COMPANY_COMPANY_NOTES_QUERY = gql`
    query CompanyCompanyNotes(
        $filter: CompanyNoteFilter!
        $sorting: [CompanyNoteSort!]
        $paging: OffsetPaging!
    ) {
        companyNotes(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                note
                createdAt
                createdBy {
                    id
                    name
                    updatedAt
                    avatarUrl
                }
            }
            totalCount
        }
    }
`;

export const COMPANY_UPDATE_COMPANY_NOTE_MUTATION = gql`
    mutation CompanyUpdateCompanyNote($input: UpdateOneCompanyNoteInput!) {
        updateOneCompanyNote(input: $input) {
            id
            note
        }
    }
`;

export const COMPANY_QUOTES_TABLE_QUERY = gql`
    query CompanyQuotesTable(
        $filter: QuoteFilter!
        $sorting: [QuoteSort!]
        $paging: OffsetPaging!
    ) {
        quotes(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                title
                status
                total
                company {
                    id
                    name
                }
                contact {
                    id
                    name
                    avatarUrl
                }
                salesOwner {
                    id
                    name
                    avatarUrl
                }
            }
        }
    }
`;
