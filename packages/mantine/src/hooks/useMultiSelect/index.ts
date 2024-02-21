import { MultiSelectProps } from "@mantine/core";
import { QueryObserverResult } from "@tanstack/react-query";

import {
    useSelect as useSelectCore,
    BaseRecord,
    GetManyResponse,
    GetListResponse,
    HttpError,
    UseSelectProps,
    BaseOption,
    Prettify,
} from "@refinedev/core";

export type UseMultiSelectReturnType<
    TData extends BaseRecord = BaseRecord,
    TOption extends BaseOption = BaseOption,
> = {
    selectProps: Prettify<
        Omit<MultiSelectProps, "data"> & {
            data: TOption[];
        }
    >;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
};

export const useMultiSelect = <
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TData extends BaseRecord = TQueryFnData,
    TOption extends BaseOption = BaseOption,
>(
    props: UseSelectProps<TQueryFnData, TError, TData>,
): UseMultiSelectReturnType<TData, TOption> => {
    const { queryResult, defaultValueQueryResult, onSearch, options } =
        useSelectCore<TQueryFnData, TError, TData, TOption>(props);

    return {
        selectProps: {
            data: options,
            onSearchChange: onSearch,
            searchable: true,
            //filterDataOnExactSearchMatch: true,
            clearable: true,
        },
        queryResult,
        defaultValueQueryResult,
    };
};

