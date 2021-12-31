import React from "react";
import { QueryObserverResult, UseQueryOptions } from "react-query";

import { useList } from "@hooks";
import {
    CrudSorting,
    BaseRecord,
    Option,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
} from "../../../interfaces";

export type useRadioGroupProps<TData, TError> = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification &
    LiveModeProps;

export type UseRadioGroupReturnType<TData extends BaseRecord = BaseRecord> = {
    options: Option[];
    queryResult: QueryObserverResult<GetListResponse<TData>>;
};

export const useRadioGroup = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource,
    sort,
    filters,
    optionLabel = "title",
    optionValue = "id",
    successNotification,
    errorNotification,
    queryOptions,
    liveMode,
    onLiveEvent,
    liveParams,
    metaData,
}: useRadioGroupProps<TData, TError>): UseRadioGroupReturnType<TData> => {
    const [options, setOptions] = React.useState<Option[]>([]);

    const defaultQueryOnSuccess = (data: GetListResponse<TData>) => {
        setOptions(() =>
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
            filters,
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
        liveMode,
        onLiveEvent,
        liveParams,
        metaData,
    });

    return {
        options,
        queryResult,
    };
};
