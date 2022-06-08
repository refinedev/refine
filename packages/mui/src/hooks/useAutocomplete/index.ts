import {
    useSelect as useSelectCore,
    HttpError,
    UseSelectProps,
    UseSelectReturnType,
} from "@pankod/refine-core";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import isEqual from "lodash/isEqual";
import unionWith from "lodash/unionWith";

export type UseAutocompleteProps<TData, TError> = Omit<
    UseSelectProps<TData, TError>,
    "optionLabel" | "optionValue"
>;

type AutocompletePropsType<TData> = Required<
    Pick<
        AutocompleteProps<TData, boolean, boolean, boolean>,
        "options" | "loading" | "onInputChange" | "filterOptions"
    >
>;

export type UseAutocompleteReturnType<TData> = Omit<
    UseSelectReturnType<TData>,
    "options"
> & {
    autocompleteProps: AutocompletePropsType<TData>;
};

export const useAutocomplete = <
    TData = any,
    TError extends HttpError = HttpError,
>(
    props: UseAutocompleteProps<TData, TError>,
): UseAutocompleteReturnType<TData> => {
    const { queryResult, defaultValueQueryResult, onSearch } =
        useSelectCore(props);

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
