import { useSelect } from "@refinedev/antd";
import type { CrudFilters } from "@refinedev/core";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import gql from "graphql-tag";

import type { ContactsSelectQuery } from "@/graphql/types";

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

export const useContactsSelect = (params?: { filters?: CrudFilters }) => {
  const { filters } = params || {};
  return useSelect<GetFieldsFromList<ContactsSelectQuery>>({
    resource: "contacts",
    optionLabel: "name",
    filters,
    meta: {
      gqlQuery: CONTACTS_SELECT_QUERY,
    },
  });
};
