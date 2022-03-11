import { QueryObserverResult } from "react-query";

import { RadioGroupProps } from "antd/lib/radio";
import {
    BaseKey,
    BaseRecord,
    GetListResponse,
    HttpError,
    useSelect,
    UseSelectProps,
} from "@pankod/refine-core";

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

type UseRadioGroupProps<TData, TError> = Omit<
    UseSelectProps<TData, TError>,
    "defaultValue"
> & { defaultValue?: BaseKey };

export const useRadioGroup = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource,
    sort,
    filters,
    optionLabel,
    optionValue,
    queryOptions,
    fetchSize,
    liveMode,
    defaultValue,
    onLiveEvent,
    liveParams,
    metaData,
    dataProviderName,
}: UseRadioGroupProps<TData, TError>): UseRadioGroupReturnType<TData> => {
    const { queryResult, options } = useSelect({
        resource,
        sort,
        filters,
        optionLabel,
        optionValue,
        queryOptions,
        fetchSize,
        liveMode,
        defaultValue,
        onLiveEvent,
        liveParams,
        metaData,
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
