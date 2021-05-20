import React from "react";
import uniqBy from "lodash/uniqBy";
import { SelectProps } from "antd/lib/select";
import { QueryObserverResult } from "react-query";

import { useList, useMany } from "@hooks";
import {
    Sort,
    Option,
    BaseRecord,
    GetManyResponse,
    GetListResponse,
    CrudFilters,
} from "../../../interfaces";

export type UseSelectProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    filters?: CrudFilters;
    defaultValue?: string | string[];
};

export type UseSelectReturnType<TData extends BaseRecord = BaseRecord> = {
    selectProps: SelectProps<{ value: string; label: string }>;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
};

export const useSelect = <TData extends BaseRecord = BaseRecord>(
    props: UseSelectProps,
): UseSelectReturnType<TData> => {
    const [search, setSearch] = React.useState<string | undefined>();
    const [options, setOptions] = React.useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

    let { defaultValue = [] } = props;

    const {
        resource,
        sort,
        filters,
        optionLabel = "title",
        optionValue = "id",
    } = props;

    if (!Array.isArray(defaultValue)) {
        defaultValue = [defaultValue];
    }

    const defaultValueQueryResult = useMany<TData>(resource, defaultValue, {
        enabled: defaultValue.length > 0,
        onSuccess: (data) => {
            setSelectedOptions(
                data.data.map((item) => ({
                    label: item[optionLabel],
                    value: item[optionValue],
                })),
            );
        },
    });

    const queryResult = useList<TData>(
        resource,
        {
            search: {
                field: optionLabel,
                value: search,
            },
            sort,
            filters,
        },
        {
            enabled: false,
            onSuccess: (data) => {
                setOptions(
                    data.data.map((item) => ({
                        label: item[optionLabel],
                        value: item[optionValue],
                    })),
                );
            },
        },
    );
    const { refetch: refetchList } = queryResult;

    React.useEffect(() => {
        refetchList();
    }, [search]);

    const onSearch = (value: string) => {
        setSearch(value);
    };

    return {
        selectProps: {
            options: uniqBy([...options, ...selectedOptions], "value"),
            onSearch,
            loading: defaultValueQueryResult.isFetching,
            showSearch: true,
            filterOption: false,
        },
        queryResult,
        defaultValueQueryResult,
    };
};
