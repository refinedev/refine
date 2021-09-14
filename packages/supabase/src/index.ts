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
            throw Error("Not implemented on refine-supabase data provider.");
        case "contains":
            return query.like(filter.field, `%${filter.value}%`);
        case "ncontains":
            throw Error("Not implemented on refine-supabase data provider.");
        case "containss":
            return query.ilike(filter.field, `%${filter.value}%`);
        case "ncontainss":
            throw Error("Not implemented on refine-supabase data provider.");
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
                .range((current - 1) * pageSize, current * pageSize - 1);

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

        getMany: async (resource, params) => {
            const { ids } = params;

            const { data } = await supabaseClient
                .from(resource)
                .select("*")
                .in("id", ids);

            return {
                data: data || [],
            };
        },

        create: async (resource, params) => {
            const { variables } = params;

            const { data } = await supabaseClient
                .from(resource)
                .insert(variables);

            return {
                data: (data || [])[0] as any,
            };
        },

        createMany: async (resource, params) => {
            const { variables } = params;

            const { data } = await supabaseClient
                .from(resource)
                .insert(variables);

            return {
                data: data as any,
            };
        },

        update: async (resource, params) => {
            const { id, variables } = params;

            const { data } = await supabaseClient
                .from(resource)
                .update(variables)
                .match({ id });

            return {
                data: (data || [])[0] as any,
            };
        },

        updateMany: async (resource, params) => {
            const { ids, variables } = params;

            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await supabaseClient
                        .from(resource)
                        .update(variables)
                        .match({ id });
                    return (data || [])[0];
                }),
            );

            return {
                data: response,
            };
        },

        getOne: async (resource, params) => {
            const { id } = params;

            const { data } = await supabaseClient
                .from(resource)
                .select("*")
                .match({ id });

            return {
                data: (data || [])[0] as any,
            };
        },

        deleteOne: async (resource, params) => {
            const { id } = params;

            const { data } = await supabaseClient
                .from(resource)
                .delete()
                .match({ id });

            return {
                data: (data || [])[0] as any,
            };
        },

        deleteMany: async (resource, params) => {
            const { ids } = params;

            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await supabaseClient
                        .from(resource)
                        .delete()
                        .match({ id });
                    return (data || [])[0];
                }),
            );

            return {
                data: response,
            };
        },

        getApiUrl: () => {
            throw Error("Not implemented on refine-supabase data provider.");
        },

        custom: () => {
            throw Error("Not implemented on refine-supabase data provider.");
        },
    };
};

export { dataProvider, createClient };
