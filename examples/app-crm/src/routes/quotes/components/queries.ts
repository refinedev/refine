import gql from "graphql-tag";

export const QUOTE_PDF_EXPORT_QUERY = gql`
    query QuotePDFExport($id: ID!) {
        quote(id: $id) {
            id
            title
            description
            subTotal
            total
            tax
            items {
                title
                unitPrice
                quantity
                discount
                totalPrice
            }
            company {
                id
                name
                country
                website
                avatarUrl
            }
            salesOwner {
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
