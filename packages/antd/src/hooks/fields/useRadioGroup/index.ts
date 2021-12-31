import { RadioGroupProps } from "antd/lib/radio";
import { QueryObserverResult, UseQueryOptions } from "react-query";

import {
    useRadioGroup as useRadioGroupCore,
    CrudSorting,
    BaseRecord,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
} from "@pankod/refine-core";

export type useRadioGroupProps<TData, TError> = RadioGroupProps & {
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
    radioGroupProps: RadioGroupProps;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
};

/**
 * `useRadioGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/radio/#components-radio-demo-radiogroup-with-name Radio.Group} component when records in a resource needs to be used as radio options.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/field/useRadioGroup} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 *
 */

export const useRadioGroup = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props: useRadioGroupProps<TData, TError>,
): UseRadioGroupReturnType<TData> => {
    const { queryResult, options } = useRadioGroupCore(props);

    return {
        radioGroupProps: {
            options,
        },
        queryResult,
    };
};
