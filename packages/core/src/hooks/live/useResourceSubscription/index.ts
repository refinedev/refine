import { useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
import { useKeys } from "@hooks/useKeys";

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
    const queryClient = useQueryClient();

    const { resource, identifier } = useResource(resourceFromProp);
    const { keys, preferLegacyKeys } = useKeys();

    const liveDataContext = useContext<ILiveContext>(LiveContext);
    const {
        liveMode: liveModeFromContext,
        onLiveEvent: onLiveEventContextCallback,
    } = useContext<IRefineContext>(RefineContext);

    const liveMode = liveModeFromProp ?? liveModeFromContext;

    useEffect(() => {
        let subscription: any;

        if (liveMode && liveMode !== "off" && enabled) {
            subscription = liveDataContext?.subscribe({
                channel,
                params: {
                    resource: resource?.name,
                    ...params,
                },
                types,
                callback: (event) => {
                    if (liveMode === "auto") {
                        queryClient.invalidateQueries(
                            keys()
                                .data(resource?.meta?.dataProviderName)
                                .resource(identifier)
                                .get(preferLegacyKeys),
                        );
                    }

                    onLiveEvent?.(event);
                    onLiveEventContextCallback?.(event);
                },
            });
        }

        return () => {
            if (subscription) {
                liveDataContext?.unsubscribe(subscription);
            }
        };
    }, [enabled]);
};
