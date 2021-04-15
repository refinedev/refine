import React from "react";
import { CheckboxGroupProps } from "antd/lib/checkbox";

import { useList } from "@hooks";
import { Sort, Option } from "../../../interfaces";

export type useCheckboxGroupProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
};

export const useCheckboxGroup = ({
    resource,
    sort,
    optionLabel = "title",
    optionValue = "id",
}: useCheckboxGroupProps): CheckboxGroupProps => {
    const [options, setOptions] = React.useState<Option[]>([]);

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
