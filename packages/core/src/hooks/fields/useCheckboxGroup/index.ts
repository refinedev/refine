import React from "react";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { QueryObserverResult } from "react-query";

import { useList } from "@hooks";
import {
    Sort,
    Option,
    BaseRecord,
    GetListResponse,
    CrudFilters,
} from "../../../interfaces";

export type useCheckboxGroupProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    filters?: CrudFilters;
};

export type UseCheckboxGroupReturnType<
    RecordType extends BaseRecord = BaseRecord
> = {
    checkboxGroupProps: CheckboxGroupProps;
    queryResult: QueryObserverResult<GetListResponse<RecordType>>;
};

export const useCheckboxGroup = <RecordType extends BaseRecord = BaseRecord>({
    resource,
    sort,
    filters,
    optionLabel = "title",
    optionValue = "id",
}: useCheckboxGroupProps): UseCheckboxGroupReturnType<RecordType> => {
    const [options, setOptions] = React.useState<Option[]>([]);

    const queryResult = useList<RecordType>(
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
