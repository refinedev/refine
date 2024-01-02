import type { DocumentNode } from "graphql";

export type GraphQLQueryOptions = {
    gqlQuery?: DocumentNode;
    gqlMutation?: DocumentNode;
};
