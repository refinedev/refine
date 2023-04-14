import { LiveProvider, CrudFilter, CrudFilters } from "@refinedev/core";
import {
    RealtimeChannel,
    RealtimePostgresChangesPayload,
    SupabaseClient,
} from "@supabase/supabase-js";
import { liveTypes, supabaseTypes } from "../types";
import { mapOperator } from "../utils";

export const liveProvider = (supabaseClient: SupabaseClient): LiveProvider => {
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
