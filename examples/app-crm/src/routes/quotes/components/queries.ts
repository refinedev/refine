import gql from "graphql-tag";

export const QUOTE_USE_FORM_MUTATION = gql`
    mutation ProductsServicesQuoteForm($input: UpdateOneQuoteInput!) {
        updateOneQuote(input: $input) {
            id
            title
            total
            subTotal
            items {
                totalPrice
                title
                unitPrice
                quantity
                discount
            }
        }
    }
`;
