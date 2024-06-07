import { useSelect } from "@refinedev/antd";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import gql from "graphql-tag";

import type { UsersSelectQuery } from "@/graphql/types";

const USERS_SELECT_QUERY = gql`
    query UsersSelect(
        $filter: UserFilter!
        $sorting: [UserSort!]
        $paging: OffsetPaging!
    ) {
        users(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;

export const useUsersSelect = () => {
  return useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });
};
