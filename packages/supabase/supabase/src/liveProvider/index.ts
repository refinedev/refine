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

      const mapFilter = (filters?: CrudFilters): string | undefined => {
        if (!filters || filters?.length === 0) {
          return;
        }

        return filters
          .map((filter: CrudFilter): string | undefined => {
            if ("field" in filter) {
              return `${filter.field}=${mapOperator(filter.operator)}.${
                filter.value
              }`;
            }
            return;
          })
          .filter(Boolean)
          .join(",");
      };

      const events = types
        .map((x) => supabaseTypes[x])
        .sort((a, b) => a.localeCompare(b));
      const filter = mapFilter(params?.filters);
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
