import { useContext, useEffect } from "react";

import { LiveContext } from "@contexts/live";
import { RefineContext } from "@contexts/refine";
import { useInvalidate } from "@hooks/invalidate";
import { useResource } from "@hooks/resource";

import {
  BaseKey,
  CrudFilter,
  CrudSort,
  MetaQuery,
  Pagination,
} from "../../../contexts/data/types";
import { LiveEvent, LiveModeProps } from "../../../contexts/live/types";
import { IRefineContext } from "../../../contexts/refine/types";

export type UseResourceSubscriptionProps = {
  channel: string;
  params?: {
    ids?: BaseKey[];
    id?: BaseKey;
    /**
     * @deprecated `params.meta` is depcerated. Use `meta` directly from the root level instead.
     */
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    pagination?: Pagination;
    /**
     * @deprecated `hasPagination` is deprecated, use `pagination.mode` instead.
     */
    hasPagination?: boolean;
    /**
     * @deprecated `sort` is deprecated. Use `sorters` instead.
     */
    sort?: CrudSort[];
    sorters?: CrudSort[];
    filters?: CrudFilter[];
    subscriptionType: "useList" | "useOne" | "useMany";
    [key: string]: any;
  };
  types: LiveEvent["type"][];
  resource?: string;
  enabled?: boolean;
  /**
   * @deprecated use `meta.dataProviderName` instead.
   */
  dataProviderName?: string;
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
  dataProviderName: dataProviderNameFromProps,
  meta,
}: UseResourceSubscriptionProps): void => {
  const { resource, identifier } = useResource(resourceFromProp);

  const { liveProvider } = useContext(LiveContext);
  const {
    liveMode: liveModeFromContext,
    onLiveEvent: onLiveEventContextCallback,
  } = useContext<IRefineContext>(RefineContext);

  const liveMode = liveModeFromProp ?? liveModeFromContext;

  const invalidate = useInvalidate();

  const dataProviderName =
    dataProviderNameFromProps ??
    meta?.dataProviderName ??
    resource?.meta?.dataProviderName;

  useEffect(() => {
    let subscription: any;

    const callback = (event: LiveEvent) => {
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

    if (liveMode && liveMode !== "off" && enabled) {
      subscription = liveProvider?.subscribe({
        channel,
        params: {
          resource: resource?.name,
          ...params,
        },
        types,
        callback,
        dataProviderName,
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
  }, [enabled]);
};
