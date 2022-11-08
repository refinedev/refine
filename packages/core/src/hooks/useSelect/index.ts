import { useCallback, useMemo, useState } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import uniqBy from "lodash/uniqBy";
import debounce from "lodash/debounce";
import get from "lodash/get";

import { useList, useMany } from "@hooks";
import {
    CrudSorting,
    Option,
    BaseRecord,
    GetManyResponse,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
    BaseKey,
    Pagination,
} from "../../interfaces";

export type UseSelectProps<TData, TError> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Set the option's value
     * @default `"title"`
     */
    optionLabel?: string;
    /**
     * Set the option's label value
     * @default `"id"`
     */
    optionValue?: string;
    /**
     * Allow us to sort the options
     */
    sort?: CrudSorting;
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
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    /**
     * Pagination option from [`useList()`](/docs/api-reference/core/hooks/data/useList/)
     * @type {  current?: number; pageSize?: number;}
     * @default `undefined`
     */
    pagination?: Pagination;
    /**
     * Disabling pagination option from [`useList()`](/docs/api-reference/core/hooks/data/useList/)
     * @type boolean
     * @default `undefined`
     */
    hasPagination?: boolean;
    /**
     * react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options
     */
    defaultValueQueryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    /**
     * If defined, this callback allows us to override all filters for every search request.
     * @default `undefined`
     */
    onSearch?: (value: string) => CrudFilters;
    /**
     * Metadata query for `dataProvider`
     * @default `{}`
     */
    metaData?: MetaDataQuery;
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
} & SuccessErrorNotification &
    LiveModeProps;

export type UseSelectReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
    onSearch: (value: string) => void;
    options: Option[];
};

export const useSelect = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props: UseSelectProps<TData, TError>,
): UseSelectReturnType<TData> => {
    const [search, setSearch] = useState<CrudFilters>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const {
        resource,
        sort,
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
        hasPagination,
        liveMode,
        defaultValue = [],
        onLiveEvent,
        onSearch: onSearchFromProp,
        liveParams,
        metaData,
        dataProviderName,
    } = props;

    const defaultValues = Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue];

    const defaultValueQueryOnSuccess = useCallback(
        (data: GetManyResponse<TData>) => {
            setSelectedOptions(
                data.data.map((item) => ({
                    label: get(item, optionLabel),
                    value: get(item, optionValue),
                })),
            );
        },
        [optionLabel, optionValue],
    );

    const defaultValueQueryOptions =
        defaultValueQueryOptionsFromProps ?? (queryOptions as any);

    const defaultValueQueryResult = useMany<TData, TError>({
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
        metaData,
        liveMode: "off",
        dataProviderName,
    });

    const defaultQueryOnSuccess = useCallback(
        (data: GetListResponse<TData>) => {
            {
                setOptions(
                    data.data.map((item) => ({
                        label: get(item, optionLabel),
                        value: get(item, optionValue),
                    })),
                );
            }
        },
        [optionLabel, optionValue],
    );

    const queryResult = useList<TData, TError>({
        resource,
        config: {
            sort,
            filters: filters.concat(search),
            pagination: {
                current: pagination?.current,
                pageSize: pagination?.pageSize ?? fetchSize,
            },
            hasPagination,
        },
        queryOptions: {
            ...queryOptions,
            onSuccess: (data) => {
                defaultQueryOnSuccess(data);
                queryOptions?.onSuccess?.(data);
            },
        },
        successNotification,
        errorNotification,
        metaData,
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
