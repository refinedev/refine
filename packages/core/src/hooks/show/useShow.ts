import React, { useState } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import warnOnce from "warn-once";

import { useOne, useResourceWithRoute, useRouterContext } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
    SuccessErrorNotification,
    MetaQuery,
    LiveModeProps,
    BaseKey,
    HttpError,
    IResourceItem,
    Prettify,
} from "../../interfaces";
import { useRouterType } from "@contexts/router-picker";
import { useParsed } from "@hooks/router/use-parsed";
import { pickResource } from "@definitions/helpers/pick-resource";
import { useResource } from "../resource/useResource";
import { pickNotDeprecated } from "@definitions/helpers";

export type useShowReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    showId?: BaseKey;
    setShowId: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
};

export type useShowProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = {
    /**
     * Resource name for API data interactions
     * @default Reads `:resource` from the URL
     */
    resource?: string;
    /**
     * Data item ID for API data interactions
     * @default Reads `:id` from the URL
     */
    id?: BaseKey;
    /**
     * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
     */
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, TError>;
    /**
     * Additional meta data to pass to the data provider's `getOne`
     */
    meta?: MetaQuery;
    /**
     * Additional meta data to pass to the data provider's `getOne`
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * Target data provider name for API call to be made
     * @default `"default"`
     */
    dataProviderName?: string;
} & LiveModeProps &
    SuccessErrorNotification<
        GetOneResponse<TData>,
        TError,
        Prettify<{ id?: BaseKey } & MetaQuery>
    >;

/**
 * `useShow` hook allows you to fetch the desired record.
 * It uses `getOne` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/core/hooks/show/useShow} for more details.
 */
export const useShow = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource: resourceFromProp,
    id,
    successNotification,
    errorNotification,
    meta,
    metaData,
    liveMode,
    onLiveEvent,
    dataProviderName,
    queryOptions,
}: useShowProps<TData, TError> = {}): useShowReturnType<TData> => {
    const routerType = useRouterType();
    const { resources } = useResource();
    const { useParams } = useRouterContext();
    const { resource: resourceFromRouter, id: idFromRouter } = useParsed();

    const { resource: legacyResourceFromRoute, id: legacyIdFromParams } =
        useParams<ResourceRouterParams>();

    const newResourceNameFromRouter = resourceFromRouter?.name;

    /** We only accept `id` from URL params if `resource` is not explicitly passed. */
    /** This is done to avoid sending wrong requests for custom `resource` and an async `id` */
    const defaultId =
        !resourceFromProp ||
        resourceFromProp ===
            (routerType === "legacy"
                ? legacyResourceFromRoute
                : newResourceNameFromRouter)
            ? id ??
              (routerType === "legacy" ? legacyIdFromParams : idFromRouter)
            : id;

    const [showId, setShowId] = useState<BaseKey | undefined>(defaultId);

    React.useEffect(() => {
        setShowId(defaultId);
    }, [defaultId]);

    /** `resourceName` fallback value depends on the router type */
    const resourceName =
        resourceFromProp ??
        (routerType === "legacy"
            ? legacyResourceFromRoute
            : newResourceNameFromRouter);

    let resource: IResourceItem | undefined;

    const resourceWithRoute = useResourceWithRoute();

    if (routerType === "legacy") {
        if (resourceName) {
            resource = resourceWithRoute(resourceName);
        }
    } else {
        /** If `resource` is provided by the user, then try to pick the resource of create a dummy one */
        if (resourceFromProp) {
            const picked = pickResource(resourceFromProp, resources);
            if (picked) {
                resource = picked;
            } else {
                resource = {
                    name: resourceFromProp,
                    route: resourceFromProp,
                };
            }
        } else {
            /** If `resource` is not provided, check the resource from the router params */
            if (typeof resourceFromRouter === "string") {
                const picked = pickResource(resourceFromRouter, resources);
                if (picked) {
                    resource = picked;
                } else {
                    resource = {
                        name: resourceFromRouter,
                        route: resourceFromRouter,
                    };
                }
            } else {
                /** If `resource` is passed as an IResourceItem, use it or `resource` is undefined and cannot be inferred. */
                resource = resourceFromRouter;
            }
        }
    }

    warnOnce(
        Boolean(resourceFromProp) && !Boolean(id),
        `[useShow]: resource: "${resourceName}", id: ${id} \n\n` +
            `If you don't use the \`setShowId\` method to set the \`showId\`, you should pass the \`id\` prop to \`useShow\`. Otherwise, \`useShow\` will not be able to infer the \`id\` from the current URL. \n\n` +
            `See https://refine.dev/docs/api-reference/core/hooks/show/useShow/#resource`,
    );

    const queryResult = useOne<TData, TError>({
        resource: resource?.name,
        id: showId ?? "",
        queryOptions: {
            enabled: showId !== undefined,
            ...queryOptions,
        },
        successNotification,
        errorNotification,
        meta: pickNotDeprecated(meta, metaData),
        metaData: pickNotDeprecated(meta, metaData),
        liveMode,
        onLiveEvent,
        dataProviderName,
    });

    return {
        queryResult,
        showId,
        setShowId,
    };
};
