import { useContext, useEffect } from "react";
import {
    BaseKey,
    CrudFilters,
    CrudSorting,
    ILiveContext,
    IRefineContext,
    LiveEvent,
    LiveModeProps,
    MetaQuery,
    Pagination,
} from "../../../interfaces";
import { LiveContext } from "@contexts/live";
import { RefineContext } from "@contexts/refine";
import { useResource } from "@hooks/resource";
import { useInvalidate } from "@hooks/invalidate";

export type UseResourceSubscriptionProps = {
    channel: string;
    params?: {
        ids?: BaseKey[];
        id?: BaseKey;
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
        sort?: CrudSorting;
        sorters?: CrudSorting;
        filters?: CrudFilters;
        subscriptionType: "useList" | "useOne" | "useMany";
        [key: string]: any;
    };
    types: LiveEvent["type"][];
    resource?: string;
    enabled?: boolean;
} & LiveModeProps;

export type PublishType = {
    (event: LiveEvent): void;
};

export const useResourceSubscription = ({
    resource: resourceFromProp,
    params,
    channel,
    types,
    enabled = true,
    liveMode: liveModeFromProp,
    onLiveEvent,
}: UseResourceSubscriptionProps): void => {
    const { resource, identifier } = useResource(resourceFromProp);

    const liveDataContext = useContext<ILiveContext>(LiveContext);
    const {
        liveMode: liveModeFromContext,
        onLiveEvent: onLiveEventContextCallback,
    } = useContext<IRefineContext>(RefineContext);

    const liveMode = liveModeFromProp ?? liveModeFromContext;

    const invalidate = useInvalidate();

    useEffect(() => {
        let subscription: any;

        const callback = (event: LiveEvent) => {
            if (liveMode === "auto") {
                invalidate({
                    resource: identifier,
                    dataProviderName: resource?.meta?.dataProviderName,
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
            subscription = liveDataContext?.subscribe({
                channel,
                params: {
                    resource: resource?.name,
                    ...params,
                },
                types,
                callback,
            });
        }

        return () => {
            if (subscription) {
                liveDataContext?.unsubscribe(subscription);
            }
        };
    }, [enabled]);
};
