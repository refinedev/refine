import { useContext, useEffect, useRef } from "react";

import { LiveContext } from "@contexts/live";
import { RefineContext } from "@contexts/refine";
import { useInvalidate } from "@hooks/invalidate";
import { useResourceParams } from "@hooks";

import type {
  BaseKey,
  CrudFilter,
  CrudSort,
  MetaQuery,
  Pagination,
} from "../../../contexts/data/types";
import type { LiveEvent, LiveModeProps } from "../../../contexts/live/types";
import type { IRefineContext } from "../../../contexts/refine/types";

export type UseResourceSubscriptionProps = {
  channel: string;
  params?: {
    ids?: BaseKey[];
    id?: BaseKey;
    sorters?: CrudSort[];
    filters?: CrudFilter[];
    subscriptionType: "useList" | "useOne" | "useMany";
    [key: string]: any;
  };
  types: LiveEvent["type"][];
  resource?: string;
  enabled?: boolean;
  meta?: MetaQuery & { dataProviderName?: string };
} & LiveModeProps;

export type PublishType = (event: LiveEvent) => void;

export const useResourceSubscription = ({
  resource: resourceFromProp,
  params,
  channel,
  types,
  enabled = true,
  liveMode: liveModeFromProp,
  onLiveEvent,
  meta,
}: UseResourceSubscriptionProps): void => {
  const { resource, identifier } = useResourceParams({
    resource: resourceFromProp,
  });

  const { liveProvider } = useContext(LiveContext);
  const {
    liveMode: liveModeFromContext,
    onLiveEvent: onLiveEventContextCallback,
  } = useContext<IRefineContext>(RefineContext);

  const liveMode = liveModeFromProp ?? liveModeFromContext;

  const invalidate = useInvalidate();

  const dataProviderName =
    meta?.dataProviderName ?? resource?.meta?.dataProviderName;

  // Keep the latest event handler in a ref so an inline `onLiveEvent`
  // doesn't force a resubscription on every render. Updating the ref inside
  // an effect keeps it compatible with concurrent rendering and React 19's
  // useEffectEvent semantics.
  const eventHandlerRef = useRef<(event: LiveEvent) => void>(() => {});
  useEffect(() => {
    eventHandlerRef.current = (event: LiveEvent) => {
      if (liveMode === "auto") {
        invalidate({
          resource: identifier,
          dataProviderName,
          invalidates: ["resourceAll"],
          invalidationFilters: {
            type: "active",
            refetchType: "active",
          },
          invalidationOptions: { cancelRefetch: false },
        });
      }

      onLiveEvent?.(event);
      onLiveEventContextCallback?.(event);
    };
  });

  useEffect(() => {
    let subscription: any;

    if (liveMode && liveMode !== "off" && enabled) {
      subscription = liveProvider?.subscribe({
        channel,
        params: {
          resource: resource?.name,
          ...params,
        },
        types,
        callback: (event: LiveEvent) => eventHandlerRef.current(event),
        meta: {
          ...meta,
          dataProviderName,
        },
      });
    }

    return () => {
      if (subscription) {
        liveProvider?.unsubscribe(subscription);
      }
    };
    // Serialize the object/array inputs so meaningful value changes trigger
    // a resubscribe without firing on every render when a caller passes a new
    // literal with the same contents. `types` is normalized by sorting so a
    // reorder does not force a resubscribe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enabled,
    liveMode,
    liveProvider,
    channel,
    resource?.name,
    identifier,
    dataProviderName,
    JSON.stringify(params),
    JSON.stringify([...(types ?? [])].sort()),
    JSON.stringify(meta),
  ]);
};
