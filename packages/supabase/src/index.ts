import {
    DataProvider,
    LiveProvider,
    CrudFilter,
    LiveEvent,
    HttpError,
    CrudOperators,
} from "@pankod/refine-core";
import {
    createClient,
    PostgrestError,
    RealtimeSubscription,
    SupabaseClient,
} from "@supabase/supabase-js";
import {
    SupabaseEventTypes,
    SupabaseRealtimePayload,
} from "@supabase/supabase-js/dist/main/lib/types";

const liveTypes: Record<SupabaseEventTypes, LiveEvent["type"]> = {
    INSERT: "created",
    UPDATE: "updated",
    DELETE: "deleted",
    "*": "*",
};

const supabaseTypes: Record<LiveEvent["type"], SupabaseEventTypes> = {
    created: "INSERT",
    updated: "UPDATE",
    deleted: "DELETE",
    "*": "*",
};

const mapOperator = (operator: CrudOperators) => {
    switch (operator) {
        case "ne":
            return "neq";
        case "nin":
            return "not.in";
        case "contains":
            return "ilike";
        case "ncontains":
            return "not.ilike";
        case "containss":
            return "like";
        case "ncontainss":
            return "not.like";
        case "null":
            return "is";
        case "nnull":
            return "not.is";
        case "between":
        case "nbetween":
            throw Error(`Operator ${operator} is not supported`);
        default:
            return operator;
    }
};

const generateFilter = (filter: CrudFilter, query: any) => {
    switch (filter.operator) {
        case "eq":
            return query.eq(filter.field, filter.value);
        case "ne":
            return query.neq(filter.field, filter.value);
        case "in":
            return query.in(filter.field, filter.value);
        case "gt":
            return query.gt(filter.field, filter.value);
        case "gte":
            return query.gte(filter.field, filter.value);
        case "lt":
            return query.lt(filter.field, filter.value);
        case "lte":
            return query.lte(filter.field, filter.value);
        case "contains":
            return query.ilike(filter.field, `%${filter.value}%`);
        case "containss":
            return query.like(filter.field, `%${filter.value}%`);
        case "null":
            return query.is(filter.field, null);
        case "startswith":
            return query.ilike(filter.field, `${filter.value}%`);
        case "endswith":
            return query.ilike(filter.field, `%${filter.value}`);
        case "or":
            const orSyntax = filter.value
                .map((item) => {
                    if (
                        item.operator !== "or" &&
                        item.operator !== "and" &&
                        "field" in item
                    ) {
                        return `${item.field}.${item.operator}.${item.value}`;
                    }
                    return;
                })
                .join(",");
            return query.or(orSyntax);

        case "and":
            throw Error("Operator 'and' is not supported");
        default:
            return query.filter(
                filter.field,
                mapOperator(filter.operator),
                filter.value,
            );
    }
};

const handleError = (error: PostgrestError) => {
    const customError: HttpError = {
        ...error,
        message: error.message,
        statusCode: parseInt(error.code),
    };
    return Promise.reject(customError);
};

const dataProvider = (
    supabaseClient: SupabaseClient,
): Required<DataProvider> => {
    return {
        getList: async ({
            resource,
            hasPagination = true,
            pagination = { current: 1, pageSize: 10 },
            filters,
            sort,
            metaData,
        }) => {
            const { current = 1, pageSize = 10 } = pagination ?? {};

            const query = supabaseClient
                .from(resource)
                .select(metaData?.select ?? "*", {
                    count: "exact",
                });

            if (hasPagination) {
                query.range((current - 1) * pageSize, current * pageSize - 1);
            }

            sort?.map((item) => {
                const [foreignTable, field] = item.field.split(/\.(.*)/);

                if (foreignTable && field) {
                    query
                        .select(
                            metaData?.select ?? `*, ${foreignTable}(${field})`,
                        )
                        .order(field, {
                            ascending: item.order === "asc",
                            foreignTable: foreignTable,
                        });
                } else {
                    query.order(item.field, {
                        ascending: item.order === "asc",
                    });
                }
            });

            filters?.map((item) => {
                generateFilter(item, query);
            });

            const { data, count, error } = await query;

            if (error) {
                return handleError(error);
            }

            return {
                data: data || [],
                total: count || 0,
            };
        },

        getMany: async ({ resource, ids, metaData }) => {
            const { data, error } = await supabaseClient
                .from(resource)
                .select(metaData?.select ?? "*")
                .in(metaData?.id ?? "id", ids);

            if (error) {
                return handleError(error);
            }

            return {
                data: data || [],
            };
        },

        create: async ({ resource, variables }) => {
            const { data, error } = await supabaseClient
                .from(resource)
                .insert(variables);

            if (error) {
                return handleError(error);
            }

            return {
                data: (data || [])[0] as any,
            };
        },

        createMany: async ({ resource, variables }) => {
            const { data, error } = await supabaseClient
                .from(resource)
                .insert(variables);

            if (error) {
                return handleError(error);
            }

            return {
                data: data as any,
            };
        },

        update: async ({ resource, id, variables, metaData }) => {
            const query = supabaseClient.from(resource).update(variables);

            if (metaData?.id) {
                query.eq(metaData?.id, id);
            } else {
                query.match({ id });
            }

            const { data, error } = await query;
            if (error) {
                return handleError(error);
            }

            return {
                data: (data || [])[0] as any,
            };
        },

        updateMany: async ({ resource, ids, variables, metaData }) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const query = supabaseClient
                        .from(resource)
                        .update(variables);

                    if (metaData?.id) {
                        query.eq(metaData?.id, id);
                    } else {
                        query.match({ id });
                    }

                    const { data, error } = await query;
                    if (error) {
                        return handleError(error);
                    }

                    return (data || [])[0];
                }),
            );

            return {
                data: response,
            };
        },

        getOne: async ({ resource, id, metaData }) => {
            const query = supabaseClient
                .from(resource)
                .select(metaData?.select ?? "*");

            if (metaData?.id) {
                query.eq(metaData?.id, id);
            } else {
                query.match({ id });
            }

            const { data, error } = await query;
            if (error) {
                return handleError(error);
            }

            return {
                data: (data || [])[0] as any,
            };
        },

        deleteOne: async ({ resource, id, metaData }) => {
            const query = supabaseClient.from(resource).delete();

            if (metaData?.id) {
                query.eq(metaData?.id, id);
            } else {
                query.match({ id });
            }

            const { data, error } = await query;
            if (error) {
                return handleError(error);
            }

            return {
                data: (data || [])[0] as any,
            };
        },

        deleteMany: async ({ resource, ids, metaData }) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const query = supabaseClient.from(resource).delete();

                    if (metaData?.id) {
                        query.eq(metaData?.id, id);
                    } else {
                        query.match({ id });
                    }

                    const { data, error } = await query;
                    if (error) {
                        return handleError(error);
                    }

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

const liveProvider = (supabaseClient: SupabaseClient): LiveProvider => {
    return {
        subscribe: ({
            channel,
            types,
            params,
            callback,
        }): RealtimeSubscription => {
            const resource = channel.replace("resources/", "");

            const listener = (payload: SupabaseRealtimePayload<any>) => {
                if (
                    types.includes("*") ||
                    types.includes(liveTypes[payload.eventType])
                ) {
                    if (
                        liveTypes[payload.eventType] !== "created" &&
                        params?.ids !== undefined &&
                        payload.new?.id !== undefined
                    ) {
                        if (
                            params.ids
                                .map(String)
                                .includes(payload.new.id.toString())
                        ) {
                            callback({
                                channel,
                                type: liveTypes[payload.eventType],
                                date: new Date(payload.commit_timestamp),
                                payload: payload.new,
                            });
                        }
                    } else {
                        callback({
                            channel,
                            type: liveTypes[payload.eventType],
                            date: new Date(payload.commit_timestamp),
                            payload: payload.new,
                        });
                    }
                }
            };

            const client = supabaseClient
                .from(resource)
                .on(supabaseTypes[types[0]], listener);

            types
                .slice(1)
                .map((item) => client.on(supabaseTypes[item], listener));

            return client.subscribe();
        },

        unsubscribe: async (subscription: RealtimeSubscription) => {
            supabaseClient.removeSubscription(subscription);
        },
    };
};

export { dataProvider, liveProvider, createClient };
