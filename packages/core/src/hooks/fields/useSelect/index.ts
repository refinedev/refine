import React from "react";
import { SelectProps } from "antd/lib/select";

import { useList } from "@hooks";
import { Sort, Option } from "../../../interfaces";

export type UseSelectProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters?: Record<string, (string | number | boolean)[] | null>;
};

export const useSelect = (props: UseSelectProps): SelectProps<"multiple"> => {
    const [search, setSearch] = React.useState<string | undefined>();
    const [options, setOptions] = React.useState<Option[]>([]);

    const {
        resource,
        sort,
        filters,
        optionLabel = "title",
        optionValue = "id",
    } = props;
    const { isLoading } = useList(
        resource,
        {
            search: {
                field: optionLabel,
                value: search,
            },
            sort,
            filters,
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

    const onSearch = (value: string) => {
        setSearch(value);
    };

    return {
        options,
        onSearch,
        loading: isLoading,
    };
};
