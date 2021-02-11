import React from "react";

import { Sort } from "@interfaces";
import { useList } from "@hooks";

export interface ReferenceInputProps {
    reference: string;
    onChange?: (value: string | number) => void;
    value?: string | number;
    optionText?: string;
    optionValue?: string;
    pageSize?: number;
    sort?: Sort;
    filter?: { [k: string]: any };
}

interface Option {
    label: string;
    value: any;
}

export const ReferenceInput: React.FC<ReferenceInputProps> = ({
    reference,
    onChange,
    value,
    optionText = "name",
    optionValue = "id",
    pageSize = 999,
    sort,
    filter,
    children,
}) => {
    const [search, setSearch] = React.useState<string | undefined>();
    const [options, setOptions] = React.useState<Option[]>();

    const { isLoading, refetch } = useList(
        reference,
        {
            search,
            sort,
            filter,
            pagination: {
                pageSize,
            },
        },
        {
            onSuccess: data => {
                const options: Option[] = data.data.map(item => ({
                    label: item[optionText],
                    value: item[optionValue],
                }));

                setOptions(options);
            },
        },
    );

    const onSearch = (value: string) => {
        setSearch(value);
        refetch();
    };

    const childrenWithProps = React.Children.map(children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onChange,
                onSearch,
                value,
                options,
                loading: isLoading,
            });
        }
        return child;
    });

    return <React.Fragment>{childrenWithProps}</React.Fragment>;
};
