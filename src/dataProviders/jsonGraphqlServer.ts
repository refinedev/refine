import axios from "axios";
import { stringify } from "query-string";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import IQueryBuilderOptions from "gql-query-builder/build/IQueryBuilderOptions";

import { BaseRecord, IDataContext } from "@interfaces";
import { generateFieldsArray } from "@definitions/graphql";

const JsonGraphqlServer = (apiUrl: string): IDataContext => {
    const client = new GraphQLClient("http://localhost:3000");

    const query = async (
        options: IQueryBuilderOptions | IQueryBuilderOptions[],
    ) => {
        const qb = gql.query(options);

        return client.request(qb.query, qb.variables);
    };

    const mutation = async (
        options: IQueryBuilderOptions | IQueryBuilderOptions[],
    ) => {
        const qb = gql.mutation(options);

        return client.request(qb.query, qb.variables);
    };

    return {
        getList: async (resource, params) => {
            const operation = `all${resource}`;

            // search
            // const q = params.search;

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

            const responseData = await query({
                operation,
                fields,
                variables: {
                    sortField,
                    sortOrder,
                    page: page - 1, // start page: 0
                    perPage,
                },
            });
            data = responseData["allPosts"];

            const responseMetaData = await query({
                operation: `_${operation}Meta`,
                fields: ["count"],
            });
            total = responseMetaData["_allPostsMeta"].count;

            return {
                data,
                total,
            };
        },

        getMany: async (resource, ids) => {
            const { data } = await axios.get(
                `${apiUrl}/${resource}?${stringify({ id: ids })}`,
            );
            return {
                data,
            };
        },

        create: async (resource, params) => {
            await mutation({
                operation: "createPost",
                // eslint-disable-next-line @typescript-eslint/camelcase
                variables: { id: 0, views: 99, user_id: 1, ...params },
            });

            const url = `${apiUrl}/${resource}`;

            const { data } = await axios.post(url, params);

            return {
                data,
            };
        },

        update: async (resource, id, params) => {
            const url = `${apiUrl}/${resource}/${id}`;

            const { data } = await axios.put(url, params);

            return {
                data,
            };
        },

        updateMany: async (resource, ids, params) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await axios.put(
                        `${apiUrl}/${resource}/${id}`,
                        params,
                    );
                    return data;
                }),
            );
            return { data: response };
        },

        getOne: async (resource, id, fields) => {
            const responseData = await query({
                operation: "Post",
                variables: {
                    id: {
                        value: 1,
                        required: true,
                        type: "ID",
                    },
                },
                fields,
            });
            console.log(responseData);

            const url = `${apiUrl}/${resource}/${id}`;

            const { data } = await axios.get(url);

            return {
                data,
            };
        },

        deleteOne: async (resource, id) => {
            const url = `${apiUrl}/${resource}/${id}`;

            const { data } = await axios.delete(url);

            return {
                data,
            };
        },

        deleteMany: async (resource, ids) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await axios.delete(
                        `${apiUrl}/${resource}/${id}`,
                    );
                    return data;
                }),
            );
            return { data: response };
        },

        getApiUrl: () => {
            return apiUrl;
        },
    };
};

export default JsonGraphqlServer;
