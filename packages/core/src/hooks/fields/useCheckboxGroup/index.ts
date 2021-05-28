import React from "react";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { QueryObserverResult } from "react-query";

import { useList } from "@hooks";
import {
    CrudSorting,
    Option,
    BaseRecord,
    GetListResponse,
    CrudFilters,
} from "../../../interfaces";

export type useCheckboxGroupProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
};

export type UseCheckboxGroupReturnType<
    TData extends BaseRecord = BaseRecord
> = {
    checkboxGroupProps: CheckboxGroupProps;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
};

export const useCheckboxGroup = <TData extends BaseRecord = BaseRecord>({
    resource,
    sort,
    filters,
    optionLabel = "title",
    optionValue = "id",
}: useCheckboxGroupProps): UseCheckboxGroupReturnType<TData> => {
    const [options, setOptions] = React.useState<Option[]>([]);

    const queryResult = useList<TData>(
        resource,
        {
            sort,
            filters,
        },
        {
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
    return {
        checkboxGroupProps: {
            options,
        },
        queryResult,
    };
};
