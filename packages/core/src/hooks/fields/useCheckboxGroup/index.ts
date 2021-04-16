import React from "react";
import { CheckboxGroupProps } from "antd/lib/checkbox";

import { useList, useMany } from "@hooks";
import { Sort, Option } from "../../../interfaces";

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
}: useCheckboxGroupProps): CheckboxGroupProps => {
    const [options, setOptions] = React.useState<Option[]>([]);

    let { defaultValue = [] } = rest;

    if (!Array.isArray(defaultValue)) {
        defaultValue = [defaultValue];
    }

    useMany(resource, defaultValue, {
        enabled: defaultValue.length > 0,
        onSuccess: (data) => {
            setOptions((current) => [
                ...current,
                ...data.data.map((item) => ({
                    label: item[optionLabel],
                    value: item[optionValue],
                })),
            ]);
        },
    });

    useList(
        resource,
        {
            sort,
        },
        {
            onSuccess: (data) => {
                const options: Option[] = data.data.map((item) => ({
                    label: item[optionLabel],
                    value: item[optionValue],
                }));

                setOptions(options);
            },
        },
    );

    return {
        options,
    };
};
