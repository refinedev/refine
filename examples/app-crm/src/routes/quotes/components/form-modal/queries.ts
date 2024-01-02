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
