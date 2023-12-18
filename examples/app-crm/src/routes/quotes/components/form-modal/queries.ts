import gql from "graphql-tag";

export const QUOTE_CREATE_MUTATION = gql`
    mutation QuoteCreate($input: CreateOneQuoteInput!) {
        createOneQuote(input: $input) {
            id
            title
            salesOwner {
                id
                name
            }
            company {
                id
                name
            }
            contact {
                id
                name
            }
        }
    }
`;

export const QUOTE_UPDATE_MUTATION = gql`
    mutation QuoteUpdate($input: UpdateOneQuoteInput!) {
        updateOneQuote(input: $input) {
            id
            title
            salesOwner {
                id
                name
            }
            company {
                id
                name
            }
            contact {
                id
                name
            }
        }
    }
`;

export const QUOTE_COMPANY_SELECT_QUERY = gql`
    query QuoteCompanySelect(
        $filter: CompanyFilter!
        $sorting: [CompanySort!]
        $paging: OffsetPaging!
    ) {
        companies(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
            }
        }
    }
`;

export const QUOTE_CONTACT_SELECT_QUERY = gql`
    query QuoteContactSelect(
        $filter: ContactFilter!
        $sorting: [ContactSort!]
        $paging: OffsetPaging!
    ) {
        contacts(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
            }
        }
    }
`;

export const QUOTE_SALES_OWNER_SELECT_QUERY = gql`
    query QuoteSalesOwnerSelect(
        $filter: UserFilter!
        $sorting: [UserSort!]
        $paging: OffsetPaging!
    ) {
        users(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
            }
        }
    }
`;
