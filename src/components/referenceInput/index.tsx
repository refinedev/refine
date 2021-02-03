import React, { useContext } from "react";
import { useQuery } from "react-query";
import { SelectProps } from "antd/lib/select";

import { SelectInput } from "@components";
import { DataContext } from "@contexts/data";
import { GetListResponse, IDataContext } from "@interfaces";

export interface ReferenceInputProps extends SelectProps<any> {
    reference: string;
    renderLabelColumn: string; //TODO: We need better :)
    pageSize?: number;
}

interface Option {
    label: string;
    value: any;
    key: any;
}

export const ReferenceInput: React.FC<ReferenceInputProps> = ({
    reference,
    renderLabelColumn,
    showSearch,
    pageSize,
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
                    current: 1,
                    pageSize: pageSize || 25,
                },
                search,
            }),
        {
            onSuccess: (data) => {
                const options: Option[] = data.data.map((item) => ({
                    label: item[renderLabelColumn],
                    value: item.id,
                    key: item[renderLabelColumn],
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
