import { DataProvider } from "@pankod/refine";
import { CrudFilter } from "@pankod/refine/dist/interfaces";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const generateFilter = (filter: CrudFilter, query: any) => {
    switch (filter.operator) {
        case "ne":
            return query.filter(filter.field, "neq", filter.value);
        case "in":
            return query.in(filter.field, filter.value);
        case "nin":
            return query.not(filter.field, "in", filter.value);
        case "contains":
            return query.like(filter.field, `%${filter.value}%`);
        case "ncontains":
            return "ncontains";
        case "containss":
            return query.ilike(filter.field, `%${filter.value}%`);
        case "ncontainss":
            return "ncontainss";
        case "null":
            return query.is(filter.field, null);
    }

    return query.filter(filter.field, filter.operator, filter.value);
};

const dataProvider = (supabaseClient: SupabaseClient): DataProvider => {
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

            params.filters?.map((item) => {
                generateFilter(item, query);
            });

            const { data, count } = await query;

            return {
                data: data || [],
                total: count || 0,
            };
        },

        getMany: async (resource, ids) => {
            const { data } = await supabaseClient
                .from(resource)
                .select("*")
                .in("id", ids);

            return {
                data: data || [],
            };
        },

        create: async (resource, params) => {
            const { data } = await supabaseClient.from(resource).insert(params);

            return {
                data: (data || [])[0] as any,
            };
        },

        createMany: async (resource, params) => {
            const { data } = await supabaseClient.from(resource).insert(params);

            return {
                data: data as any,
            };
        },

        update: async (resource, id, params) => {
            const { data } = await supabaseClient
                .from(resource)
                .update(params)
                .match({ id });

            return {
                data: (data || [])[0] as any,
            };
        },

        updateMany: async (resource, ids, params) => {
            // const { data } = await supabaseClient.from(resource).update();
            // .match({ id });

            return {
                data: [],
            };
        },

        getOne: async (resource, id) => {
            const { data } = await supabaseClient
                .from(resource)
                .select("*")
                .match({ id });

            return {
                data: (data || [])[0] as any,
            };
        },

        deleteOne: async (resource, id) => {
            const { data } = await supabaseClient
                .from(resource)
                .delete()
                .match({ id });

            return {
                data: {
                    ...data,
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

export { dataProvider, createClient };
