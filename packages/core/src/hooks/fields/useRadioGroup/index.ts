import React from "react";
import { RadioGroupProps } from "antd/lib/radio";
import { QueryObserverResult } from "react-query";

import { useList } from "@hooks";
import {
    Sort,
    BaseRecord,
    Option,
    GetListResponse,
    CrudFilters,
} from "../../../interfaces";

export type useRadioGroupProps = RadioGroupProps & {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    filters?: CrudFilters;
};

export type UseRadioGroupReturnType<
    RecordType extends BaseRecord = BaseRecord
> = {
    radioGroupProps: RadioGroupProps;
    queryResult: QueryObserverResult<GetListResponse<RecordType>>;
};

export const useRadioGroup = <RecordType extends BaseRecord = BaseRecord>({
    resource,
    sort,
    filters,
    optionLabel = "title",
    optionValue = "id",
    ...rest
}: useRadioGroupProps): UseRadioGroupReturnType => {
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

    return {
        radioGroupProps: {
            options,
        },
        queryResult,
    };
};
