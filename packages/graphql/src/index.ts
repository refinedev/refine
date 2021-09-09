import { DataProvider } from "@pankod/refine";

const dataProvider = (): DataProvider => {
    return {
        getList: async (resource, params) => {
            const current = params.pagination?.current || 1;
            const pageSize = params.pagination?.pageSize || 10;

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
