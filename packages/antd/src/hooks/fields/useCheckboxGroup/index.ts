import { QueryObserverResult } from "@tanstack/react-query";

import { CheckboxGroupProps } from "antd/lib/checkbox";
import {
    BaseRecord,
    GetListResponse,
    HttpError,
    UseSelectProps,
    useSelect,
    BaseKey,
} from "@pankod/refine-core";

export type UseCheckboxGroupReturnType<TData extends BaseRecord = BaseRecord> =
    {
        checkboxGroupProps: CheckboxGroupProps;
        queryResult: QueryObserverResult<GetListResponse<TData>>;
    };

/**
 * `useCheckboxGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/checkbox/#components-checkbox-demo-group Checkbox.Group} component when records in a resource needs to be used as checkbox options.
 *
 * @see {@link https://refine.dev/docs/ui-framewors/antd/hooks/field/useCheckboxGroup} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 *
 */

type UseCheckboxGroupProps<TData, TError> = Omit<
    UseSelectProps<TData, TError>,
    "defaultValue"
> & { defaultValue?: BaseKey[] };

export const useCheckboxGroup = <
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
}: UseCheckboxGroupProps<TData, TError>): UseCheckboxGroupReturnType<TData> => {
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
        checkboxGroupProps: {
            options,
            defaultValue,
        },
        queryResult,
    };
};
