import gql from "graphql-tag";

export const QUOTE_ONE_QUERY = gql`
    query QuoteOneQuery($id: ID!) {
        quote(id: $id) {
            id
            title
            total
            subTotal
            items {
                totalPrice
            }
        }
    }
`;

export const QUOTE_USE_FORM_QUERY = gql`
    query QuoteUseFormQuery($id: ID!) {
        quote(id: $id) {
            id
            items {
                title
                unitPrice
                quantity
                discount
            }
        }
    }
`;

export const QUOTE_USE_FORM_MUTATION = gql`
    mutation QuoteUseFormMutation($input: UpdateOneQuoteInput!) {
        updateOneQuote(input: $input) {
            id
            items {
                title
                unitPrice
                quantity
                discount
            }
        }
    }
`;
