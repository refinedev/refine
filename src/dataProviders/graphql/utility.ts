import { IntrospectionField } from "graphql";
import * as gqlBuilder from "gql-query-builder";
import { singular } from "pluralize";
import IQueryBuilderOptions from "gql-query-builder/build/IQueryBuilderOptions";
import { GraphQLClient } from "graphql-request";
import VariableOptions from "gql-query-builder/build/VariableOptions";

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
        case "deleteOne":
            return `remove${singular(resourceName)}`;
    }
    return singular(resourceName);
};

const mapVariables = (
    queries: IntrospectionField[],
    operation: string,
    params: { [k: string]: any },
): VariableOptions => {
    const query = queries.find((item) => item.name === operation);

    const variables: VariableOptions = {};
    if (query && query.args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query.args.map((arg: any) => {
            if (arg && arg.name) {
                variables[arg.name] = {
                    value: params[arg.name] || undefined,
                    required: arg.type.kind === "NON_NULL",
                    type: arg.type.name,
                };
            }
        });
    }

    return variables;
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

export { createOperationName, mapVariables, query, mutation };
