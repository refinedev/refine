import { QueryObserverResult } from "@tanstack/react-query";

import { RadioGroupProps } from "antd/lib/radio";
import {
    BaseKey,
    BaseRecord,
    GetListResponse,
    HttpError,
    pickNotDeprecated,
    useSelect,
    UseSelectProps,
} from "@refinedev/core";

export type UseRadioGroupReturnType<TData extends BaseRecord = BaseRecord> = {
    radioGroupProps: RadioGroupProps;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
};

type UseRadioGroupProps<TQueryFnData, TError, TData> = Omit<
    UseSelectProps<TQueryFnData, TError, TData>,
    "defaultValue"
> & {
    /**
     * Sets the default value
     */
    defaultValue?: BaseKey;
};

/**
 * `useRadioGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/radio/#components-radio-demo-radiogroup-with-name Radio.Group} component when records in a resource needs to be used as radio options.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/field/useRadioGroup/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useRadioGroup = <
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TData extends BaseRecord = TQueryFnData,
>({
    resource,
    sort,
    sorters,
    filters,
    optionLabel,
    optionValue,
    queryOptions,
    fetchSize,
    pagination,
    liveMode,
    defaultValue,
    onLiveEvent,
    liveParams,
    meta,
    metaData,
    dataProviderName,
}: UseRadioGroupProps<
    TQueryFnData,
    TError,
    TData
>): UseRadioGroupReturnType<TData> => {
    const { queryResult, options } = useSelect({
        resource,
        sort,
        sorters,
        filters,
        optionLabel,
        optionValue,
        queryOptions,
        fetchSize,
        pagination,
        liveMode,
        defaultValue,
        onLiveEvent,
        liveParams,
        meta: pickNotDeprecated(meta, metaData),
        metaData: pickNotDeprecated(meta, metaData),
        dataProviderName,
    });

    return {
        radioGroupProps: {
            options,
            defaultValue,
        },
        queryResult,
    };
};
