import React from "react";
import { RadioGroupProps } from "antd";

import { useList } from "@hooks";
import { Sort, BaseRecord, Option } from "../../../interfaces";

export type useRadioGroupProps = RadioGroupProps & {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters?: Record<string, (string | number | boolean)[] | null>;
};

export const useRadioGroup = <RecordType extends BaseRecord = BaseRecord>({
    resource,
    sort,
    filters,
    optionLabel = "title",
    optionValue = "id",
    ...rest
}: useRadioGroupProps) => {
    const [options, setOptions] = React.useState<Option[]>([]);

    const queryResult = useList<RecordType>(
        resource,
        {
            sort,
            filters,
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
        ...rest,
    };

    return {
        radioGroupProps,
        queryResult,
    };
};
