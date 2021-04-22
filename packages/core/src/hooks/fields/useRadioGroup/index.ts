import React from "react";

import { useList } from "@hooks";
import { Sort, Option } from "../../../interfaces";

export type useRadioGroupProps = {
    resource: string;
    label?: string;
    value?: string;
    sort?: Sort;
    defaultValue?: string | string[];
};

export const useRadioGroup = ({
    resource,
    sort,
    label = "title",
    value = "id",
    defaultValue,
}: useRadioGroupProps) => {
    const [options, setOptions] = React.useState<Option[]>([]);

    const queryResult = useList(
        resource,
        {
            sort,
        },
        {
            onSuccess: (data) => {
                setOptions(() =>
                    data.data.map((item) => ({
                        label: item[label],
                        value: item[value],
                    })),
                );
            },
        },
    );

    const radioProps = {
        options,
        defaultValue,
    };

    return {
        radioProps,
        queryResult,
    };
};
