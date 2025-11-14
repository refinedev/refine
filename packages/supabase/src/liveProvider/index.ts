import type { LiveProvider, CrudFilter, CrudFilters } from "@refinedev/core";
import type {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
  SupabaseClient,
} from "@supabase/supabase-js";
import { liveTypes, supabaseTypes } from "../types";
import { mapOperator } from "../utils";

export const liveProvider = (
  supabaseClient: SupabaseClient<any, any, any>,
): LiveProvider => {
  return {
    subscribe: ({
      channel,
      types,
      params,
      callback,
      meta,
    }): RealtimeChannel => {
      const resource = channel.replace("resources/", "");

"packageManager": "pnpm@9.4.0+..."
"packageManager": "pnpm@9.4.0+..."
      const idsSet = params?.ids ? new Set(params.ids.map(String)) : undefined;

      const listener = (payload: RealtimePostgresChangesPayload<any>) => {
        if (
          types.includes("*") ||
          types.includes(liveTypes[payload.eventType])
        ) {
          if (
            liveTypes[payload.eventType] !== "created" &&
            params?.ids !== undefined &&
            idsSet &&
            payload.new?.id !== undefined &&
            !idsSet.has(payload.new.id.toString())
          ) {
            return;
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
        const supabaseFilters: string[] = [];

        const convert = (filters: CrudFilters) => {
            filters.map((filter: CrudFilter) => {
                if (
                    filter.operator !== "or" &&
                    filter.operator !== "and" &&
                    "field" in filter
                ) {
                    supabaseFilters.push(
                        `${filter.field}=${mapOperator(filter.operator)}.${
                            filter.value
                        }`,
                    );
                }

                if (filter.operator === "or" || filter.operator === "and") {
                    throw new Error(
                        `Operator "${filter.operator}" is not supported for Supabase real-time queries.`,
                    );
                }
            });
        };

        if (filters) {
            convert(filters);
        }

        return supabaseFilters.length > 0
            ? supabaseFilters.join(",")
            : undefined;
      };

      const filter = mapFilter(params?.filters);

      return supabaseClient
        .channel(channel)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: resource, filter },
          listener,
        )
        .subscribe();
    },

    unsubscribe: async (channel: RealtimeChannel) => {
      await supabaseClient.removeChannel(channel);
    },
  };
};
