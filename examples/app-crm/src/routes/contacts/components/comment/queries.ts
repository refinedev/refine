import gql from "graphql-tag";

export const CONTACTS_CONTACT_NOTES_LIST_QUERY = gql`
    query ContactsContactNotesList(
        $filter: ContactNoteFilter!
        $sorting: [ContactNoteSort!]
        $paging: OffsetPaging!
    ) {
        contactNotes(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                note
                createdAt
                createdBy {
                    id
                    name
                    avatarUrl
                }
            }
        }
    }
`;
