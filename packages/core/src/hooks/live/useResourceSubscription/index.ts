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

  const onLiveEventRef = useRef(onLiveEvent);
  onLiveEventRef.current = onLiveEvent;

  const onLiveEventContextCallbackRef = useRef(onLiveEventContextCallback);
  onLiveEventContextCallbackRef.current = onLiveEventContextCallback;

  const liveModeRef = useRef(liveMode);
  liveModeRef.current = liveMode;

  const identifierRef = useRef(identifier);
  identifierRef.current = identifier;

  const dataProviderNameRef = useRef(dataProviderName);
  dataProviderNameRef.current = dataProviderName;

  useEffect(() => {
    let subscription: any;

    const callback = (event: LiveEvent) => {
      if (liveModeRef.current === "auto") {
        invalidate({
          resource: identifierRef.current,
          dataProviderName: dataProviderNameRef.current,
          invalidates: ["resourceAll"],
          invalidationFilters: {
            type: "active",
            refetchType: "active",
          },
          invalidationOptions: { cancelRefetch: false },
        });
      }

      onLiveEventRef.current?.(event);
      onLiveEventContextCallbackRef.current?.(event);
    };

    if (liveMode && liveMode !== "off" && enabled) {
      subscription = liveProvider?.subscribe({
        channel,
        params: {
          resource: resource?.name,
          ...params,
        },
        types,
        callback,
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
  }, [
    enabled,
    liveMode,
    channel,
    liveProvider,
    resource?.name,
    dataProviderName,
    JSON.stringify(params),
    JSON.stringify(types),
    JSON.stringify(meta),
  ]);
};
