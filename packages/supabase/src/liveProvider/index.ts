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
            if (params.ids.map(String).includes(payload.new.id.toString())) {
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

      const mapFilter = (
        filters?: CrudFilters,
        meta?: any
      ): string | undefined => {
        // Use custom override if provided
        if (meta?.realtimeFilter) {
          return meta.realtimeFilter;
        }

        if (!filters || filters.length === 0) return;

        if (filters.length > 1) {
          console.warn(
            "[liveProvider] Supabase Realtime does not support multiple filters. Using the first filter only."
          );
        }

        const firstFilter = filters.find((f) => "field" in f);
        if (!firstFilter) return;

        return `${firstFilter.field}=${mapOperator(firstFilter.operator)}.${firstFilter.value}`;
      };

      const events = types
        .map((x) => supabaseTypes[x])
        .sort((a, b) => a.localeCompare(b));
      const filter = mapFilter(params?.filters, meta);
      const ch = `${channel}:${events.join("|")}${filter ? `:${filter}` : ""}`;

      let client = supabaseClient.channel(ch);
      for (let i = 0; i < events.length; i++) {
        client = client.on(
          "postgres_changes",
          {
            event: events[i] as any,
            schema:
              meta?.schema ||
              // @ts-expect-error TS2445 Property rest is protected and only accessible within class SupabaseClient and its subclasses.
              supabaseClient?.rest?.schemaName ||
              "public",
            table: resource,
            filter: filter,
          },
          listener,
        );
      }

      return client.subscribe();
    },

    unsubscribe: async (channel: RealtimeChannel) => {
      supabaseClient.removeChannel(channel);
    },
  };
};
