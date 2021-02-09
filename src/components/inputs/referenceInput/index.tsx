import React, { useContext } from "react";
import { useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import { GetListResponse, IDataContext, Sort } from "@interfaces";

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
    const { getList } = useContext<IDataContext>(DataContext);

    const { isLoading, refetch } = useQuery<GetListResponse>(
        [`resource/list/${reference}`, { search }],
        () =>
            getList(reference, {
                pagination: {
                    pageSize,
                },
                search,
                sort,
                filter,
            }),
        {
            onSuccess: (data) => {
                const options: Option[] = data.data.map((item) => ({
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

    const childrenWithProps = React.Children.map(children, (child) => {
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
