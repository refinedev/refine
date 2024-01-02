import gql from "graphql-tag";

export const CONTACT_SHOW_QUERY = gql`
    query ContactShow($id: ID!) {
        contact(id: $id) {
            id
            name
            email
            company {
                id
                name
                avatarUrl
            }
            status
            jobTitle
            phone
            timezone
            avatarUrl
            salesOwner {
                id
                name
                avatarUrl
            }
            createdAt
        }
    }
`;
