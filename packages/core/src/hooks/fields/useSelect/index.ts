import React from "react";
import { merge } from "lodash";

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

export const useSelect = (props: UseSelectProps) => {
    const [search, setSearch] = React.useState<string | undefined>();
    const [options, setOptions] = React.useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

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
            setSelectedOptions(() => [
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
            search: {
                field: optionLabel,
                value: search,
            },
            sort,
            filters,
        },
        {
            onSuccess: (data) => {
                setOptions(() => [
                    ...data.data.map((item) => ({
                        label: item[optionLabel],
                        value: item[optionValue],
                    })),
                ]);
            },
        },
    );
    const { refetch } = queryResult;

    React.useEffect(() => {
        if (search) {
            refetch();
        }
    }, [search]);

    const onSearch = (value: string) => {
        setSearch(value);
    };

    const selectProps = {
        options: merge(options, selectedOptions),
        onSearch,
    };

    return {
        selectProps,
        queryResult,
    };
};
