import { useMemo, useState } from "react";
import uniqBy from "lodash/uniqBy";
import { QueryObserverResult, UseQueryOptions } from "react-query";
import debounce from "lodash/debounce";

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
} from "../../interfaces";

export type UseSelectProps<TData, TError> = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
    defaultValue?: string | string[] | number | number[];
    debounce?: number;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    fetchSize?: number;
    defaultValueQueryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    onSearch?: (value: string) => CrudFilters;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

export type UseSelectReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
    onSearch: (value: string | undefined) => void;
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
        defaultValueQueryOptions,
        queryOptions,
        fetchSize,
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

    const defaultValueQueryOnSuccess = (data: GetManyResponse<TData>) => {
        setSelectedOptions(
            data.data.map((item) => ({
                label: item[optionLabel],
                value: item[optionValue],
            })),
        );
    };

    const defaultValueQueryResult = useMany<TData, TError>({
        resource,
        ids: defaultValues,
        queryOptions: {
            enabled: defaultValues.length > 0,
            ...defaultValueQueryOptions,
            onSuccess: (data) => {
                defaultValueQueryOnSuccess(data);
                defaultValueQueryOptions?.onSuccess?.(data);
            },
        },
        metaData,
        liveMode: "off",
        dataProviderName,
    });

    const defaultQueryOnSuccess = (data: GetListResponse<TData>) => {
        setOptions(
            data.data.map((item) => ({
                label: item[optionLabel],
                value: item[optionValue],
            })),
        );
    };

    const queryResult = useList<TData, TError>({
        resource,
        config: {
            sort,
            filters: filters.concat(search),
            pagination: fetchSize
                ? {
                      pageSize: fetchSize,
                  }
                : undefined,
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

    const onSearch = (value: string | undefined) => {
        if (!value) {
            setSearch([]);
            return;
        }

        if (onSearchFromProp) {
            setSearch(onSearchFromProp(value));
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
