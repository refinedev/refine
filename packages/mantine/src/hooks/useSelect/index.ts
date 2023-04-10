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

/**
 * `useSelect` hook is used to fetch data from the dataProvider and return the options for the select box.
 *
 * It uses `getList` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/mantine/hooks/useSelect} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useSelect = <
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TData extends BaseRecord = TQueryFnData,
>(
    props: UseSelectProps<TQueryFnData, TError, TData>,
): UseSelectReturnType<TData> => {
    const { queryResult, defaultValueQueryResult, onSearch, options } =
        useSelectCore<TQueryFnData, TError, TData>(props);

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
