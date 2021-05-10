import React from "react";
import uniqBy from "lodash/uniqBy";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { QueryObserverResult } from "react-query";

import { useList, useMany } from "@hooks";
import {
    Sort,
    Option,
    BaseRecord,
    GetListResponse,
    GetManyResponse,
} from "../../../interfaces";

export type useCheckboxGroupProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    filters?: Record<string, (string | number | boolean)[] | null>;
    defaultValue?: string | string[];
};

export type UseCheckboxGroupReturnType<
    RecordType extends BaseRecord = BaseRecord
> = {
    checkboxGroupProps: CheckboxGroupProps;
    queryResult: QueryObserverResult<GetListResponse<RecordType>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<RecordType>>;
};

export const useCheckboxGroup = <RecordType extends BaseRecord = BaseRecord>({
    resource,
    sort,
    filters,
    optionLabel = "title",
    optionValue = "id",
    ...rest
}: useCheckboxGroupProps): UseCheckboxGroupReturnType<RecordType> => {
    const [options, setOptions] = React.useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

    let { defaultValue = [] } = rest;

    if (!Array.isArray(defaultValue)) {
        defaultValue = [defaultValue];
    }

    const defaultValueQueryResult = useMany<RecordType>(
        resource,
        defaultValue,
        {
            enabled: defaultValue.length > 0,
            onSuccess: (data) => {
                setSelectedOptions(
                    data.data.map((item) => ({
                        label: item[optionLabel],
                        value: item[optionValue],
                    })),
                );
            },
        },
    );

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
            options: uniqBy([...options, ...selectedOptions], "value"),
        },
        queryResult,
        defaultValueQueryResult,
    };
};
