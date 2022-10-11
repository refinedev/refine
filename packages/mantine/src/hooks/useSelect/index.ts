import { SelectProps } from "@mantine/core";
import { QueryObserverResult } from "@tanstack/react-query";

import {
    useSelect as useSelectCore,
    BaseRecord,
    GetManyResponse,
    GetListResponse,
    HttpError,
    UseSelectProps,
} from "@pankod/refine-core";

export type UseSelectReturnType<TData extends BaseRecord = BaseRecord> = {
    selectProps: SelectProps;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
};

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
