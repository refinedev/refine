import { useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import gql from "graphql-tag";

import { ContactsSelectQuery } from "@/graphql/types";

const CONTACTS_SELECT_QUERY = gql`
    query ContactsSelect(
        $filter: ContactFilter!
        $sorting: [ContactSort!]
        $paging: OffsetPaging!
    ) {
        contacts(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;

export const useContactsSelect = () => {
    return useSelect<GetFieldsFromList<ContactsSelectQuery>>({
        resource: "contacts",
        optionLabel: "name",
        meta: {
            gqlQuery: CONTACTS_SELECT_QUERY,
        },
    });
};
