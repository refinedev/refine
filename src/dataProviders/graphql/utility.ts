import * as gqlBuilder from "gql-query-builder";
import { singular } from "pluralize";
import IQueryBuilderOptions from "gql-query-builder/build/IQueryBuilderOptions";
import { GraphQLClient } from "graphql-request";

type Actions =
    | "getList"
    | "getMany"
    | "getOne"
    | "create"
    | "update"
    | "updateMany"
    | "deleteOne"
    | "deleteMany"
    | "metaData";

const createOperationName = (resourceName: string, action: Actions): string => {
    switch (action) {
        case "create":
        case "update":
            return `${action}${singular(resourceName)}`;
        case "getList":
            return `all${resourceName}`;
        case "metaData":
            return `_all${resourceName}Meta`;
    }
    return "";
};

const query = async (
    client: GraphQLClient,
    options: IQueryBuilderOptions | IQueryBuilderOptions[],
) => {
    const qb = gqlBuilder.query(options);

    return client.request(qb.query, qb.variables);
};

const mutation = async (
    client: GraphQLClient,
    options: IQueryBuilderOptions | IQueryBuilderOptions[],
) => {
    const qb = gqlBuilder.mutation(options);

    return client.request(qb.query, qb.variables);
};

export { createOperationName, query, mutation };
