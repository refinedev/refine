import {
    DataProvider,
    LiveProvider,
    CrudFilter,
    LiveEvent,
    HttpError,
    CrudOperators,
    CrudFilters,
    pickNotDeprecated,
} from "@pankod/refine-core";
import {
    createClient,
    PostgrestError,
    RealtimeChannel,
    RealtimePostgresChangesPayload,
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
    SupabaseClient,
} from "@supabase/supabase-js";
import {} from "@supabase/supabase-js/dist/main/lib/types";

const liveTypes: Record<
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
    LiveEvent["type"]
> = {
    INSERT: "created",
    UPDATE: "updated",
    DELETE: "deleted",
    "*": "*",
};

const supabaseTypes: Record<
    LiveEvent["type"],
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT
> = {
    created: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT,
    updated: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE,
    deleted: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.DELETE,
    "*": REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL,
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
                        return `${item.field}.${mapOperator(item.operator)}.${
                            item.value
                        }`;
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
            sorters,
            meta: _meta,
            metaData,
        }) => {
            const { current = 1, pageSize = 10, mode } = pagination ?? {};

            const meta = pickNotDeprecated(_meta, metaData);

            const query = supabaseClient
                .from(resource)
                .select(meta?.select ?? "*", {
                    count: "exact",
                });

            //`hasPagination` is deprecated with refine@4, refine will pass `pagination.mode` instead, however, we still support `hasPagination` for backward compatibility
            const hasPaginationString = hasPagination ? "server" : "off";
            const isServerPaginationEnabled =
                pickNotDeprecated(mode, hasPaginationString) === "server";

            if (isServerPaginationEnabled) {
                query.range((current - 1) * pageSize, current * pageSize - 1);
            }

            //`sort` is deprecated with refine@4, refine will pass `sorters` instead, however, we still support `sort` for backward compatibility
            pickNotDeprecated(sorters, sort)?.map((item) => {
                const [foreignTable, field] = item.field.split(/\.(.*)/);

                if (foreignTable && field) {
                    query
                        .select(meta?.select ?? `*, ${foreignTable}(${field})`)
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
            } as any;
        },

        getMany: async ({ resource, ids, meta: _meta, metaData }) => {
            const meta = pickNotDeprecated(_meta, metaData);
            const { data, error } = await supabaseClient
                .from(resource)
                .select(meta?.select ?? "*")
                .in(meta?.id ?? "id", ids);

            if (error) {
                return handleError(error);
            }

            return {
                data: data || [],
            } as any;
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

        update: async ({ resource, id, variables, meta: _meta, metaData }) => {
            const meta = pickNotDeprecated(_meta, metaData);
            const query = supabaseClient.from(resource).update(variables);

            if (meta?.id) {
                query.eq(meta?.id, id);
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

        updateMany: async ({
            resource,
            ids,
            variables,
            meta: _meta,
            metaData,
        }) => {
            const meta = pickNotDeprecated(_meta, metaData);

            const response = await Promise.all(
                ids.map(async (id) => {
                    const query = supabaseClient
                        .from(resource)
                        .update(variables);

                    if (meta?.id) {
                        query.eq(meta?.id, id);
                    } else {
                        query.match({ id });
                    }

                    const { data, error } = await query;
                    if (error) {
                        return handleError(error);
                    }

                    return (data || [])[0] as any;
                }),
            );

            return {
                data: response,
            };
        },

        getOne: async ({ resource, id, meta: _meta, metaData }) => {
            const meta = pickNotDeprecated(_meta, metaData);

            const query = supabaseClient
                .from(resource)
                .select(meta?.select ?? "*");

            if (meta?.id) {
                query.eq(meta?.id, id);
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

        deleteOne: async ({ resource, id, meta: _meta, metaData }) => {
            const meta = pickNotDeprecated(_meta, metaData);
            const query = supabaseClient.from(resource).delete();

            if (meta?.id) {
                query.eq(meta?.id, id);
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

        deleteMany: async ({ resource, ids, meta: _meta, metaData }) => {
            const meta = pickNotDeprecated(_meta, metaData);

            const response = await Promise.all(
                ids.map(async (id) => {
                    const query = supabaseClient.from(resource).delete();

                    if (meta?.id) {
                        query.eq(meta?.id, id);
                    } else {
                        query.match({ id });
                    }

                    const { data, error } = await query;
                    if (error) {
                        return handleError(error);
                    }

                    return (data || [])[0] as any;
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
        subscribe: ({ channel, types, params, callback }): RealtimeChannel => {
            const resource = channel.replace("resources/", "");

            const listener = (payload: RealtimePostgresChangesPayload<any>) => {
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

            const mapFilter = (filters?: CrudFilters): string | undefined => {
                if (!filters || filters?.length === 0) {
                    return;
                }

                return filters
                    .map((filter: CrudFilter): string | undefined => {
                        if ("field" in filter) {
                            return `${filter.field}=${mapOperator(
                                filter.operator,
                            )}.${filter.value}`;
                        }
                        return;
                    })
                    .filter(Boolean)
                    .join(",");
            };

            const client = supabaseClient.channel("any").on(
                "postgres_changes",
                {
                    event: supabaseTypes[types[0]] as any,
                    schema: "public",
                    table: resource,
                    filter: mapFilter(params?.filters),
                },
                listener,
            );

            return client.subscribe();
        },

        unsubscribe: async (channel: RealtimeChannel) => {
            supabaseClient.removeChannel(channel);
        },
    };
};

export { dataProvider, liveProvider, createClient };
