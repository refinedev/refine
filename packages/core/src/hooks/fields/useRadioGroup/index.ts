import React from "react";
import { CheckboxOptionType } from "antd";
import { useList } from "@hooks";
import { Sort } from "../../../interfaces";

export type useRadioGroupProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    defaultValue?: string | number | boolean;
};

export const useRadioGroup = ({
    resource,
    sort,
    optionLabel = "title",
    optionValue = "id",
    defaultValue,
}: useRadioGroupProps) => {
    const [options, setOptions] = React.useState<CheckboxOptionType[]>([]);

    const queryResult = useList(
        resource,
        {
            sort,
        },
        {
            onSuccess: (data) => {
                setOptions(() =>
                    data.data.map((item) => ({
                        label: item[optionLabel],
                        value: item[optionValue],
                    })),
                );
            },
        },
    );

    const radioGroupProps = {
        options,
        defaultValue,
    };

    return {
        radioGroupProps,
        queryResult,
    };
};
