import React from "react";
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
} from "../../../interfaces";

export type UseSelectProps<TData, TError> = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
    defaultValue?: string | string[];
    debounce?: number;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    defaultValueQueryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    metaData?: MetaDataQuery;
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
    const [search, setSearch] = React.useState<CrudFilters>([]);
    const [options, setOptions] = React.useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

    let { defaultValue = [] } = props;

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
        liveMode,
        onLiveEvent,
        liveParams,
        metaData,
    } = props;

    if (!Array.isArray(defaultValue)) {
        defaultValue = [defaultValue];
    }

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
        ids: defaultValue,
        queryOptions: {
            enabled: defaultValue.length > 0,
            ...defaultValueQueryOptions,
            onSuccess: (data) => {
                defaultValueQueryOnSuccess(data);
                defaultValueQueryOptions?.onSuccess?.(data);
            },
        },
        metaData,
        liveMode: "off",
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
    });

    // const { refetch: refetchList } = queryResult;

    // React.useEffect(() => {
    //     if (search) {
    //         refetchList();
    //     }
    // }, [search]);

    const onSearch = (value: string | undefined) => {
        if (!value) {
            setSearch([]);
            return;
        }

        setSearch([
            {
                field: optionLabel,
                operator: "contains",
                value,
            },
        ]);
    };

    return {
        queryResult,
        defaultValueQueryResult,
        options: uniqBy([...options, ...selectedOptions], "value"),
        onSearch: debounce(onSearch, debounceValue),
    };
};
