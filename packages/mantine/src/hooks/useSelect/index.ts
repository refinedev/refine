import { SelectProps } from "@mantine/core";
import { QueryObserverResult } from "@tanstack/react-query";

import {
    useSelect as useSelectCore,
    BaseRecord,
    GetManyResponse,
    GetListResponse,
    HttpError,
    UseSelectProps,
} from "@refinedev/core";

export type UseSelectReturnType<TData extends BaseRecord = BaseRecord> = {
    selectProps: SelectProps;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
};

export const useSelect = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSelectData extends BaseRecord = TData,
>(
    props: UseSelectProps<TData, TError, TSelectData>,
): UseSelectReturnType<TSelectData> => {
    const { queryResult, defaultValueQueryResult, onSearch, options } =
        useSelectCore<TData, TError, TSelectData>(props);

    return {
        selectProps: {
            data: options,
            onSearchChange: onSearch,
            searchable: true,
            filterDataOnExactSearchMatch: true,
            clearable: true,
        },
        queryResult,
        defaultValueQueryResult,
    };
};
