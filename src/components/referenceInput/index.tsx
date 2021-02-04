import React, { useContext } from "react";
import { useQuery } from "react-query";
import { SelectProps } from "antd/lib/select";

import { SelectInput } from "@components";
import { DataContext } from "@contexts/data";
import { GetListResponse, IDataContext, Sort } from "@interfaces";

export interface ReferenceInputProps extends SelectProps<any> {
    reference: string;
    optionText?: string;
    optionValue?: string;
    pageSize?: number;
    sort?: Sort;
}

interface Option {
    label: string;
    value: any;
    key: any;
}

export const ReferenceInput: React.FC<ReferenceInputProps> = ({
    reference,
    optionText = "name",
    optionValue = "id",
    showSearch,
    pageSize = 25,
    sort,
    ...rest
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
            }),
        {
            onSuccess: (data) => {
                const options: Option[] = data.data.map((item) => ({
                    label: item[optionText],
                    value: item[optionValue],
                    key: item[optionValue],
                }));

                setOptions(options);
            },
        },
    );

    const onSearch = (value: string) => {
        setSearch(value);
        refetch();
    };

    return (
        <SelectInput
            optionFilterProp="label"
            showSearch={showSearch}
            onSearch={onSearch}
            loading={isLoading}
            options={options}
            {...rest}
        />
    );
};
