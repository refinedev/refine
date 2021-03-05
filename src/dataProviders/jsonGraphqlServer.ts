import axios from "axios";
import { GraphQLClient } from "graphql-request";

import { BaseRecord, IDataContext } from "@interfaces";
import { generateFieldsArray } from "@definitions/graphql";

import { createOperationName, query, mutation } from "./graphql/utility";

const JsonGraphqlServer = (
    client: GraphQLClient,
    introspection: any,
): IDataContext => {
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
            // const operation = `create${singular(resource)}`;

            // const vars = introspection.queries.find(
            //     (item: any) => item.name === operation,
            // );

            // const variables: any = {};
            // vars.args.map((arg: any) => {
            //     variables[arg.name] = {
            //         value: params[arg.name],
            //         required: arg.type.kind === "NON_NULL",
            //         type: arg.type.ofType.name,
            //     };
            // });

            // await mutation({
            //     operation,
            //     variables,
            //     fields: Object.keys(variables),
            // });

            // const url = `xx`;

            // const { data } = await axios.post("**");

            return {
                data: {
                    id: 1,
                },
            };
        },

        update: async (resource, id, params) => {
            const url = `xx`;

            const { data } = await axios.put(url, params);

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
            // const responseData = await query({
            //     operation: "Post",
            //     variables: {
            //         id: {
            //             value: 1,
            //             required: true,
            //             type: "ID",
            //         },
            //     },
            //     fields,
            // });
            // console.log(responseData);

            // const url = `**`;

            // const { data } = await axios.get(url);

            // return {
            //     data,
            // };
            return {
                data: {
                    id: 1,
                },
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
