import { RadioGroupProps } from "antd/lib/radio";
import { QueryObserverResult, UseQueryOptions } from "react-query";

import {
    CrudSorting,
    BaseRecord,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
    useList,
    Option,
} from "@pankod/refine-core";
import { useState } from "react";

export type useRadioGroupProps<TData, TError> = RadioGroupProps & {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

export type UseRadioGroupReturnType<TData extends BaseRecord = BaseRecord> = {
    radioGroupProps: RadioGroupProps;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
};

/**
 * `useRadioGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/radio/#components-radio-demo-radiogroup-with-name Radio.Group} component when records in a resource needs to be used as radio options.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/field/useRadioGroup} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 *
 */

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
    dataProviderName,
}: useRadioGroupProps<TData, TError>): UseRadioGroupReturnType<TData> => {
    const [options, setOptions] = useState<Option[]>([]);

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
        dataProviderName,
    });

    return {
        radioGroupProps: {
            options,
        },
        queryResult,
    };
};
