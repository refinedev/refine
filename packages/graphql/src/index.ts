import { DataProvider } from "@pankod/refine";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";

const dataProvider = (client: GraphQLClient): DataProvider => {
    return {
        getList: async (resource, params) => {
            const current = params.pagination?.current || 1;
            const pageSize = params.pagination?.pageSize || 10;
            const metaData = params.metaData;

            console.log("metaData :", metaData);

            const { query } = gql.query({
                operation: metaData?.operation ?? resource,
                ...metaData,
            });

            console.log("query :", query);

            const response = await client.request(query);

            console.log("response :", response);

            return {
                data: [],
                total: 0,
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
