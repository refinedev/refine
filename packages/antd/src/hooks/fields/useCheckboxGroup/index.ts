import { CheckboxGroupProps } from "antd/lib/checkbox";
import { QueryObserverResult, UseQueryOptions } from "react-query";

import {
    useCheckboxGroup as useCheckboxGroupCore,
    CrudSorting,
    BaseRecord,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
} from "@pankod/refine-core";

export type useCheckboxGroupProps<TData, TError> = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification &
    LiveModeProps;

export type UseCheckboxGroupReturnType<TData extends BaseRecord = BaseRecord> =
    {
        checkboxGroupProps: CheckboxGroupProps;
        queryResult: QueryObserverResult<GetListResponse<TData>>;
    };

/**
 * `useCheckboxGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/checkbox/#components-checkbox-demo-group Checkbox.Group} component when records in a resource needs to be used as checkbox options.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/field/useCheckboxGroup} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 *
 */
export const useCheckboxGroup = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props: useCheckboxGroupProps<TData, TError>,
): UseCheckboxGroupReturnType<TData> => {
    const { options, queryResult } = useCheckboxGroupCore(props);

    return {
        checkboxGroupProps: {
            options,
        },
        queryResult,
    };
};
