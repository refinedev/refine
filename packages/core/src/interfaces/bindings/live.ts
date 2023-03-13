/**
 * @author aliemir
 *
 * There's a small change in the `LiveBindings` interface, we've defined the `params` property of `subscribe` function
 * as a combination of `LiveCommonParams` and `LiveListParams & LiveOneParams & LiveManyParams`.
 * which creates a bit of a confusion because in `list` type we don't need `id` or `ids` and in `one` type we don't need `ids`.
 * There should be an update like below to make it more clear in usage.
 *
 * A small but kinda important change for the consistency of the codebase.
 */

import {
    BaseKey,
    CrudFilters,
    CrudSorting,
    LiveEvent,
    MetaQuery,
    Pagination,
} from "src";

export type LiveListParams = {
    resource?: string;
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    filters?: CrudFilters;
    meta?: MetaQuery;
    metaData?: MetaQuery;
};

export type LiveOneParams = {
    resource?: string;
    id?: BaseKey;
};

export type LiveManyParams = {
    resource?: string;
    ids?: BaseKey[];
};

export type LiveCommonParams = {
    subscriptionType: "useList" | "useOne" | "useMany";
    [key: string]: unknown;
};

export type LiveBindings = {
    publish?: (event: LiveEvent) => void;
    subscribe: (options: {
        channel: string;
        types: Array<LiveEvent["type"]>;
        callback: (event: LiveEvent) => void;
        params?: LiveCommonParams &
            (LiveListParams | LiveOneParams | LiveManyParams);
    }) => unknown;
    unsubscribe: (subscription: unknown) => void;
};
