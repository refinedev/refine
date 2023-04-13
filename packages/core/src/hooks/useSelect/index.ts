import { useCallback, useMemo, useState } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import uniqBy from "lodash/uniqBy";
import debounce from "lodash/debounce";
import get from "lodash/get";

import { useList, useMany, useMeta } from "@hooks";
import {
    CrudSorting,
    Option,
    BaseRecord,
    GetManyResponse,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    LiveModeProps,
    BaseKey,
    Pagination,
    MetaQuery,
    Prettify,
} from "../../interfaces";
import { pickNotDeprecated } from "@definitions/helpers";
import { pickResource } from "@definitions/helpers/pick-resource";
import { useResource } from "../resource/useResource/index";
import { BaseListProps } from "../data/useList";

export type UseSelectProps<TQueryFnData, TError, TData> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Set the option's value
     * @default `"title"`
     */
    optionLabel?: keyof TQueryFnData extends string
        ? keyof TQueryFnData
        : never;
    /**
     * Set the option's label value
     * @default `"id"`
     */
    optionValue?: keyof TQueryFnData extends string
        ? keyof TQueryFnData
        : never;
    /**
     * Allow us to sort the options
     * @deprecated Use `sorters` instead
     */
    sort?: CrudSorting;
    /**
     * Allow us to sort the options
     */
    sorters?: CrudSorting;
    /**
     * Resource name for API data interactions
     */
    filters?: CrudFilters;
    /**
     * Adds extra `options`
     */
    defaultValue?: BaseKey | BaseKey[];
    /**
     * The number of milliseconds to delay
     * @default `300`
     */
    debounce?: number;
    /**
     * react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options
     */
    queryOptions?: UseQueryOptions<
        GetListResponse<TQueryFnData>,
        TError,
        GetListResponse<TData>
    >;
    /**
     * Pagination option from [`useList()`](/docs/api-reference/core/hooks/data/useList/)
     * @type {  current?: number; pageSize?: number;}
     * @default `undefined`
     */
    pagination?: Prettify<
        Omit<Pagination, "mode"> & {
            /**
             * Whether to use server side pagination or not.
             * @default "off"
             */
            mode?: Pagination["mode"];
        }
    >;
    /**
     * Disabling pagination option from [`useList()`](/docs/api-reference/core/hooks/data/useList/)
     * @type boolean
     * @default `false`
     * @deprecated `hasPagination` is deprecated, use `pagination.mode` instead.
     */
    hasPagination?: boolean;
    /**
     * react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options
     */
    defaultValueQueryOptions?: UseQueryOptions<
        GetManyResponse<TQueryFnData>,
        TError
    >;
    /**
     * If defined, this callback allows us to override all filters for every search request.
     * @default `undefined`
     */
    onSearch?: (value: string) => CrudFilters;
    /**
     * Additional meta data to pass to the `useMany` from the data provider
     */
    meta?: MetaQuery;
    /**
     * Additional meta data to pass to the `useMany` from the data provider
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     * @default `default`
     */
    dataProviderName?: string;
    /**
     * Amount of records to fetch in select box list.
     * @deprecated use [`pagination`](https://refine.dev/docs/api-reference/core/interfaceReferences/#pagination) instead
     * @default `undefined`
     */
    fetchSize?: number;
} & SuccessErrorNotification<
    GetListResponse<TData>,
    TError,
    Prettify<BaseListProps>
> &
    LiveModeProps;

export type UseSelectReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
    onSearch: (value: string) => void;
    options: Option[];
};

/**
 * `useSelect` hook is used to fetch data from the dataProvider and return the options for the select box.
 *
 * It uses `getList` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-reference/core/components/refine-config/ `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/core/hooks/useSelect} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useSelect = <
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TData extends BaseRecord = TQueryFnData,
>(
    props: UseSelectProps<TQueryFnData, TError, TData>,
): UseSelectReturnType<TData> => {
    const [search, setSearch] = useState<CrudFilters>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const {
        resource: resourceFromProps,
        sort,
        sorters,
        filters = [],
        optionLabel = "title",
        optionValue = "id",
        debounce: debounceValue = 300,
        successNotification,
        errorNotification,
        defaultValueQueryOptions: defaultValueQueryOptionsFromProps,
        queryOptions,
        fetchSize,
        pagination,
        hasPagination = false,
        liveMode,
        defaultValue = [],
        onLiveEvent,
        onSearch: onSearchFromProp,
        liveParams,
        meta,
        metaData,
        dataProviderName,
    } = props;

    const { resources } = useResource();
    const getMeta = useMeta();

    /**
     * Since `identifier` is an optional but prioritized way to match resources, users can provide identifier instead of resource name.
     */
    const pickedResource = pickResource(resourceFromProps, resources);

    const resource = pickedResource?.name ?? resourceFromProps;

    const combinedMeta = getMeta({
        resource: pickedResource,
        meta: pickNotDeprecated(meta, metaData),
    });

    const defaultValues = Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue];

    const defaultValueQueryOnSuccess = useCallback(
        (data: GetManyResponse<TData>) => {
            setSelectedOptions(
                data.data.map((item) => ({
                    label: get(item, optionLabel) as string,
                    value: get(item, optionValue) as string,
                })),
            );
        },
        [optionLabel, optionValue],
    );

    const defaultValueQueryOptions =
        defaultValueQueryOptionsFromProps ?? (queryOptions as any);

    const defaultValueQueryResult = useMany<TQueryFnData, TError, TData>({
        resource,
        ids: defaultValues,
        queryOptions: {
            ...defaultValueQueryOptions,
            enabled:
                defaultValues.length > 0 &&
                (defaultValueQueryOptionsFromProps?.enabled ?? true),
            onSuccess: (data) => {
                defaultValueQueryOnSuccess(data);
                defaultValueQueryOptions?.onSuccess?.(data);
            },
        },
        meta: combinedMeta,
        metaData: combinedMeta,
        liveMode: "off",
        dataProviderName,
    });

    const defaultQueryOnSuccess = useCallback(
        (data: GetListResponse<TData>) => {
            {
                setOptions(
                    data.data.map((item) => ({
                        label: get(item, optionLabel) as string,
                        value: get(item, optionValue) as string,
                    })),
                );
            }
        },
        [optionLabel, optionValue],
    );

    const queryResult = useList<TQueryFnData, TError, TData>({
        resource,
        sorters: pickNotDeprecated(sorters, sort),
        filters: filters.concat(search),
        pagination: {
            current: pagination?.current,
            pageSize: pagination?.pageSize ?? fetchSize,
            mode: pagination?.mode,
        },
        hasPagination,
        queryOptions: {
            ...queryOptions,
            onSuccess: (data) => {
                defaultQueryOnSuccess(data);
                queryOptions?.onSuccess?.(data);
            },
        },
        successNotification,
        errorNotification,
        meta: combinedMeta,
        metaData: combinedMeta,
        liveMode,
        liveParams,
        onLiveEvent,
        dataProviderName,
    });

    const onSearch = (value: string) => {
        if (onSearchFromProp) {
            setSearch(onSearchFromProp(value));
            return;
        }

        if (!value) {
            setSearch([]);
            return;
        } else {
            setSearch([
                {
                    field: optionLabel,
                    operator: "contains",
                    value,
                },
            ]);
        }
    };

    return {
        queryResult,
        defaultValueQueryResult,
        options: useMemo(
            () => uniqBy([...options, ...selectedOptions], "value"),
            [options, selectedOptions],
        ),
        onSearch: debounce(onSearch, debounceValue),
    };
};
