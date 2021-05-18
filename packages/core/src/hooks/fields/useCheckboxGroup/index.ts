import React from "react";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { QueryObserverResult } from "react-query";
import uniqBy from "lodash/uniqBy";

import { useList, useMany } from "@hooks";
import { Sort, Option, BaseRecord, GetListResponse } from "../../../interfaces";

export type useCheckboxGroupProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    defaultValue?: string | string[];
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
    optionLabel = "title",
    optionValue = "id",
    ...rest
}: useCheckboxGroupProps): UseCheckboxGroupReturnType<TData> => {
    const [options, setOptions] = React.useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

    let { defaultValue = [] } = rest;

    if (!Array.isArray(defaultValue)) {
        defaultValue = [defaultValue];
    }

    useMany(resource, defaultValue, {
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
            sort,
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

    const checkboxGroupProps = {
        options: uniqBy([...options, ...selectedOptions], "value"),
    };

    return {
        checkboxGroupProps,
        queryResult,
    };
};
