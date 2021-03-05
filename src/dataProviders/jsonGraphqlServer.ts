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

        getMany: async (resource, ids) => {
            const { data } = await axios.get(`xx`);
            return {
                data,
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

        updateMany: async (resource, ids, params) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await axios.put(`xx`, params);
                    return data;
                }),
            );
            return { data: response };
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
            const url = `**`;

            const { data } = await axios.delete(url);

            return {
                data,
            };
        },

        deleteMany: async (resource, ids) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await axios.delete(`**`);
                    return data;
                }),
            );
            return { data: response };
        },
    };
};

export default JsonGraphqlServer;
