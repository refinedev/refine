import { DataProvider } from "@pankod/refine";
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SupabaseDataProvider = (
    supabaseClient: SupabaseClient,
): DataProvider => {
    return {
        getList: async (resource, params) => {
            const current = params.pagination?.current || 1;
            const pageSize = params.pagination?.pageSize || 10;

            const { data, error } = await supabaseClient
                .from(resource)
                .select('*')


            return {
                data: data || [],
                total: 1,
            };
        },

        getMany: async (resource, ids) => {
            return {
                data: []
            };
        },

        create: async (resource, params) => {

            return {
                data: {
                    id: 1,
                } as any,
            };
        },

        createMany: async (resource, params) => {

            return {
                data: {
                    id: 1,
                } as any,
            };
        },

        update: async (resource, id, params) => {
            return {
                data: {
                    id: 1,
                } as any,
            };
        },

        updateMany: async (resource, ids, params) => {
            return {
                data: [],
            };
        },

        getOne: async (resource, id) => {

            return {
                data: {
                    id: 1,
                } as any,
            };
        },

        deleteOne: async (resource, id) => {
            return {
                data: {
                    id: 1,
                } as any,
            };
        },

        deleteMany: async (resource, ids) => {
            return {
                data: [],
            };
        },

        getApiUrl: () => {
            throw Error("Not implemented on refine-airtable data provider.");
        },

        custom: async () => {
            throw Error("Not implemented on refine-airtable data provider.");
        },
    };
};

export { SupabaseDataProvider, createClient };
