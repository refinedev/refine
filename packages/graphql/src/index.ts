import { CrudSorting, DataProvider } from "@pankod/refine";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";

const genereteSort = (sort?: CrudSorting) => {
    const sortQuery = sort?.map((i) => {
        return `${i.field}:${i.order}`;
    });

    return sortQuery?.join();
};

const dataProvider = (client: GraphQLClient): DataProvider => {
    return {
        getList: async (resource, params) => {
            const { pagination, sort, filters, metaData } = params;

            const current = pagination?.current || 1;
            const pageSize = pagination?.pageSize || 10;

            const sortBy = genereteSort(sort);

            const { query, variables } = gql.query({
                operation: metaData?.operation ?? resource,
                variables: {
                    ...metaData?.variables,
                    sort: sortBy,
                },
                ...metaData,
            });

            const response = await client.request(query, variables);

            return {
                data: response[metaData?.operation ?? resource],
                total: 3,
            };
        },

        getMany: async (resource, ids) => {
            return {
                data: [],
            };
        },

        create: async (resource, params) => {
            return {
                data: { id: 1 } as any,
            };
        },

        createMany: async (resource, params) => {
            return {
                data: [],
            };
        },

        update: async (resource, id, params) => {
            return {
                data: { id: 1 } as any,
            };
        },

        updateMany: async (resource, ids, params) => {
            return {
                data: [],
            };
        },

        getOne: async (resource, id) => {
            return {
                data: { id: 1 } as any,
            };
        },

        deleteOne: async (resource, id) => {
            return {
                data: { id: 1 } as any,
            };
        },

        deleteMany: async (resource, ids) => {
            return {
                data: [],
            };
        },

        getApiUrl: () => {
            throw Error("Not implemented on refine-graphql data provider.");
        },

        custom: () => {
            throw Error("Not implemented on refine-graphql data provider.");
        },
    };
};

export default dataProvider;
