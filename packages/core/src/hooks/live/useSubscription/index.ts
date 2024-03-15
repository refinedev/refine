import { useContext, useEffect } from "react";

import { LiveContext } from "@contexts/live";

import {
  BaseKey,
  CrudFilter,
  CrudSort,
  MetaQuery,
  Pagination,
} from "../../../contexts/data/types";
import { LiveEvent } from "../../../contexts/live/types";

export type UseSubscriptionProps = {
  /**
   * Channel name to subscribe.
   */
  channel: string;
  /**
   * Callback that is run when new events from subscription arrive.
   */
  onLiveEvent: (event: LiveEvent) => void;
  /**
   * Type of events to subscribe. `"*"` means all events.
   * @type Array<"deleted" | "updated" | "created" | "*" | string>
   */
  types?: LiveEvent["type"][];
  /**
   * Determines subscription should subscribe or not.
   * @type Array<"deleted" | "updated" | "created" | "*" | string>
   */
  enabled?: boolean;
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
     * @deprecated `sort` is deprecated, use `sorters` instead.
     */
    sort?: CrudSort[];
    sorters?: CrudSort[];
    filters?: CrudFilter[];
    subscriptionType?: "useList" | "useOne" | "useMany";
    resource?: string;
    [key: string]: any;
  };
  /**
   * @deprecated use `meta.dataProviderName` instead.
   */
  dataProviderName?: string;
  meta?: MetaQuery & { dataProviderName?: string };
};

export const useSubscription = ({
  params,
  channel,
  types = ["*"],
  enabled = true,
  onLiveEvent,
  dataProviderName = "default",
  meta,
}: UseSubscriptionProps): void => {
  const { liveProvider } = useContext(LiveContext);

  useEffect(() => {
    let subscription: any;

    if (enabled) {
      subscription = liveProvider?.subscribe({
        channel,
        params,
        types,
        callback: onLiveEvent,
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
