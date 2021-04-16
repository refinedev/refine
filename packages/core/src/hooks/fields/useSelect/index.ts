import React from "react";
import { SelectProps } from "antd/lib/select";

import { useList, useMany } from "@hooks";
import { Sort, Option } from "../../../interfaces";

export type UseSelectProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: Sort;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters?: Record<string, (string | number | boolean)[] | null>;
    defaultValue?: string | string[];
};

export const useSelect = (props: UseSelectProps): SelectProps<"multiple"> => {
    const [search, setSearch] = React.useState<string | undefined>();
    const [options, setOptions] = React.useState<Option[]>([]);

    let { defaultValue = [] } = props;

    const {
        resource,
        sort,
        filters,
        optionLabel = "title",
        optionValue = "id",
    } = props;

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

    const { isLoading, refetch } = useList(
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
            enabled: false,
            onSuccess: (data) => {
                const options: Option[] = data.data.map((item) => ({
                    label: item[optionLabel],
                    value: item[optionValue],
                }));

                setOptions(options);
            },
        },
    );

    React.useEffect(() => {
        if (search) {
            refetch();
        }
    }, [search]);

    const onSearch = (value: string) => {
        setSearch(value);
    };

    return {
        options,
        onSearch,
        loading: isLoading,
    };
};
