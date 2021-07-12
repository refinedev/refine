import React from "react";
import uniqBy from "lodash/uniqBy";
import { SelectProps } from "antd/lib/select";
import { QueryObserverResult } from "react-query";

import { useList, useMany } from "@hooks";
import {
    CrudSorting,
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
    sort?: CrudSorting;
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
    const [search, setSearch] = React.useState<CrudFilters>([]);
    const [options, setOptions] = React.useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

    let { defaultValue = [] } = props;

    const {
        resource,
        sort,
        filters = [],
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
                    value: item[optionValue].toString(),
                })),
            );
        },
    });

    const queryResult = useList<TData>(
        resource,
        {
            sort,
            filters: filters.concat(search),
        },
        {
            enabled: false,
            onSuccess: (data) => {
                setOptions(
                    data.data.map((item) => ({
                        label: item[optionLabel],
                        value: item[optionValue].toString(),
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
        setSearch([
            {
                field: optionLabel,
                operator: "contains",
                value,
            },
        ]);
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
