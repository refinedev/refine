import React from "react";

import { useList, useMany } from "@hooks";
import { Sort, Option } from "../../../interfaces";
import { merge } from "lodash";

export type useCheckboxGroupProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    defaultValue?: string | string[];
};

export const useCheckboxGroup = ({
    resource,
    sort,
    optionLabel = "title",
    optionValue = "id",
    ...rest
}: useCheckboxGroupProps) => {
    const [options, setOptions] = React.useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

    let { defaultValue = [] } = rest;

    if (!Array.isArray(defaultValue)) {
        defaultValue = [defaultValue];
    }

    useMany(resource, defaultValue, {
        enabled: defaultValue.length > 0,
        onSuccess: (data) => {
            setSelectedOptions((current) => [
                ...current,
                ...data.data.map((item) => ({
                    label: item[optionLabel],
                    value: item[optionValue],
                })),
            ]);
        },
    });

    const queryResult = useList(
        resource,
        {
            sort,
        },
        {
            onSuccess: (data) => {
                setOptions((current) => [
                    ...current,
                    ...data.data.map((item) => ({
                        label: item[optionLabel],
                        value: item[optionValue],
                    })),
                ]);
            },
        },
    );

    return {
        options: merge(options, selectedOptions),
        queryResult,
    };
};
