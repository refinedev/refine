import { SelectProps } from "antd/lib/select";
import { QueryObserverResult, UseQueryOptions } from "react-query";

import {
    useSelect as useSelectCore,
    CrudSorting,
    BaseRecord,
    GetManyResponse,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
} from "@pankod/refine-core";

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
    selectProps: SelectProps<{ value: string; label: string }>;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
};

/**
 * `useSelect` hook allows you to manage an Ant Design {@link https://ant.design/components/select/ Select} component when records in a resource needs to be used as select options.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/field/useSelect} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 *
 */
export const useSelect = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props: UseSelectProps<TData, TError>,
): UseSelectReturnType<TData> => {
    const { queryResult, defaultValueQueryResult, onSearch, options } =
        useSelectCore(props);

    return {
        selectProps: {
            options,
            onSearch,
            loading: defaultValueQueryResult.isFetching,
            showSearch: true,
            filterOption: false,
        },
        queryResult,
        defaultValueQueryResult,
    };
};
