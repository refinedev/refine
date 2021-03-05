import axios from "axios";
import { GraphQLClient } from "graphql-request";

import { BaseRecord, IDataContext } from "@interfaces";
import { generateFieldsArray } from "@definitions/graphql";

import {
    createOperationName,
    query,
    mutation,
    mapVariables,
} from "./graphql/utility";

const JsonGraphqlServer = (
    client: GraphQLClient,
    introspection: any,
): IDataContext => {
    console.log("introspection", introspection);
    return {
        getList: async (resource, params) => {
            // pagination
            const page = params.pagination?.current || 1;
            const perPage = params.pagination?.pageSize || 10;

            // sort
            const { sort } = params;
            let sortField = "id"; // default sorting field
            let sortOrder = "desc"; // default sorting

            // multiple sorting not support marmelab/json-graphql-server
            if (!Array.isArray(sort) && sort && sort.field && sort.order) {
                sortField = String(sort.field);
                sortOrder = sort.order.replace("end", ""); // replace -> [ascend, descend] -> [asc,desc];
            }

            // fields
            const fields = generateFieldsArray(params.fields || []);

            let data: BaseRecord[] = [];
            let total = 0;

            const dataOperationName = createOperationName(resource, "getList");
            const responseData = await query(client, {
                operation: dataOperationName,
                fields,
                variables: {
                    sortField,
                    sortOrder,
                    page: page - 1, // start page: 0
                    perPage,
                },
            });
            data = responseData[dataOperationName];

            const metaOperationName = createOperationName(resource, "metaData");
            const responseMetaData = await query(client, {
                operation: metaOperationName,
                fields: ["count"],
            });
            total = responseMetaData[metaOperationName].count;

            return {
                data,
                total,
            };
        },

        // Not support
        getMany: async (resource, ids) => {
            return {
                data: [
                    {
                        id: 1,
                    },
                ],
            };
        },

        create: async (resource, params) => {
            const operation = createOperationName(resource, "create");

            const { queries } = introspection;
            const variables = mapVariables(queries, operation, params);

            const response = await mutation(client, {
                operation,
                variables,
                fields: Object.keys(variables),
            });

            const data = response[operation];

            return {
                data,
            };
        },

        update: async (resource, id, params) => {
            const operation = createOperationName(resource, "update");

            const { queries } = introspection;
            const variables = mapVariables(queries, operation, params);

            const response = await mutation(client, {
                operation,
                variables: {
                    ...variables,
                    id: {
                        required: true,
                        value: Number(id),
                        type: "ID",
                    },
                },
                fields: Object.keys(variables),
            });

            const data = response[operation];

            return {
                data,
            };
        },

        // Not support
        updateMany: async (resource, ids, params) => {
            return {
                data: [
                    {
                        id: 1,
                    },
                ],
            };
        },

        getOne: async (resource, id, fields) => {
            const operation = createOperationName(resource, "getOne");

            const response = await query(client, {
                operation,
                fields,
                // TODO: fix variables types
                variables: {
                    id: {
                        required: true,
                        value: Number(id),
                        type: "ID",
                    },
                },
            });

            const data = response[operation];

            return {
                data,
            };
        },

        deleteOne: async (resource, id) => {
            const operation = createOperationName(resource, "deleteOne");

            await mutation(client, {
                operation,
                variables: {
                    id: {
                        required: true,
                        value: Number(id),
                        type: "ID",
                    },
                },
            });

            // return boolean
            return {
                data: {
                    id: 1,
                },
            };
        },

        // Not support
        deleteMany: async (resource, ids) => {
            return {
                data: [
                    {
                        id: 1,
                    },
                ],
            };
        },
    };
};

export default JsonGraphqlServer;
