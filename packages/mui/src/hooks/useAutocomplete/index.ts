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

export type UseAutocompleteProps<TData, TError, TSelectData> = Pick<
    UseSelectProps<TData, TError, TSelectData>,
    "resource"
> &
    Omit<
        UseSelectProps<TData, TError, TSelectData>,
        "optionLabel" | "optionValue"
    >;

type AutocompletePropsType<TData> = Required<
    Pick<
        AutocompleteProps<TData, boolean, boolean, boolean>,
        "options" | "loading" | "onInputChange" | "filterOptions"
    >
>;

export type UseAutocompleteReturnType<TData extends BaseRecord> = Omit<
    UseSelectReturnType<TData>,
    "options"
> & {
    autocompleteProps: AutocompletePropsType<TData>;
};

export const useAutocomplete = <
    TData extends BaseRecord = any,
    TError extends HttpError = HttpError,
    TSelectData extends BaseRecord = TData,
>(
    props: UseAutocompleteProps<TData, TError, TSelectData>,
): UseAutocompleteReturnType<TSelectData> => {
    const { queryResult, defaultValueQueryResult, onSearch } = useSelectCore<
        TData,
        TError,
        TSelectData
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
                }
            },
            filterOptions: (x) => x,
        },
        onSearch,
        queryResult,
        defaultValueQueryResult,
    };
};
