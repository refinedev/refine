import { DataProvider } from "@pankod/refine";
import { CrudOperators } from "@pankod/refine/dist/interfaces";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const mapOperator = (operator: CrudOperators) => {
    switch (operator) {
        case "ne":
            return "neq";
        case "in":
            return "in"; // Bu çalışıyor mu denemek lazım.
        case "nin":
            return "nin"; // Bu yok bunun için else yapıp  .not('fields', 'in', 'value') yapılabilir.
        case "contains":
            return "contains";
        case "ncontains":
            return "ncontains"; // Bu yok bunun için else yapıp  .not('fields', 'contains', 'value') yapılabilir.
        case "containss":
            return "containss"; // like operatörüyle birlikte kullanılılabilir.
        case "ncontainss":
            return "ncontainss"; // if ise not ve like ile birlikte olabilir mi?
        case "null":
            return "is";
    }

    return operator;
};

const SupabaseDataProvider = (supabaseClient: SupabaseClient): DataProvider => {
    return {
        getList: async (resource, params) => {
            const current = params.pagination?.current || 1;
            const pageSize = params.pagination?.pageSize || 10;

            const query = supabaseClient
                .from(resource)
                .select("*", { count: "exact" })
                .range(current - 1 * pageSize, current * pageSize);

            params.sort?.map((item) => {
                query.order(item.field, { ascending: item.order === "asc" });
            });

            const generateFilter = params.filters?.map((item) => ({
                field: item.field,
                operator: mapOperator(item.operator),
                value: item.value,
            }));

            // generateFilter?.map((item) => {
            //     query.filter(item.field, item.operator, item.value);
            // });

            const { data, count } = await query;

            return {
                data: data || [],
                total: count || 0,
            };
        },

        getMany: async (resource, ids) => {
            return {
                data: [],
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
