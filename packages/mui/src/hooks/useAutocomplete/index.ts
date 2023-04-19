import {
    useSelect as useSelectCore,
    HttpError,
    UseSelectProps,
    UseSelectReturnType,
    BaseRecord,
} from "@refinedev/core";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import isEqual from "lodash/isEqual";
import unionWith from "lodash/unionWith";

export type UseAutocompleteProps<TQueryFnData, TError, TData> = Pick<
    UseSelectProps<TQueryFnData, TError, TData>,
    "resource"
> &
    Omit<
        UseSelectProps<TQueryFnData, TError, TData>,
        "optionLabel" | "optionValue"
    >;

type AutocompletePropsType<TQueryFnData> = Required<
    Pick<
        AutocompleteProps<TQueryFnData, boolean, boolean, boolean>,
        "options" | "loading" | "onInputChange" | "filterOptions"
    >
>;

export type UseAutocompleteReturnType<TData extends BaseRecord> = Omit<
    UseSelectReturnType<TData>,
    "options"
> & {
    autocompleteProps: AutocompletePropsType<TData>;
};

/**
 * `useAutocomplete` hook is used to fetch data from the dataProvider and return the options for the select box.
 *
 * It uses `getList` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/hooks/useAutocomplete/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useAutocomplete = <
    TQueryFnData extends BaseRecord = any,
    TError extends HttpError = HttpError,
    TData extends BaseRecord = TQueryFnData,
>(
    props: UseAutocompleteProps<TQueryFnData, TError, TData>,
): UseAutocompleteReturnType<TData> => {
    const { queryResult, defaultValueQueryResult, onSearch } = useSelectCore<
        TQueryFnData,
        TError,
        TData
    >(props);

    return {
        autocompleteProps: {
            options: unionWith(
                queryResult.data?.data || [],
                defaultValueQueryResult.data?.data || [],
                isEqual,
            ),
            loading:
                queryResult.isFetching || defaultValueQueryResult.isFetching,
            onInputChange: (event, value) => {
                if (event?.type === "change") {
                    onSearch(value);
                } else if (event?.type === "click") {
                    onSearch("");
                }
            },
            filterOptions: (x) => x,
        },
        onSearch,
        queryResult,
        defaultValueQueryResult,
    };
};
