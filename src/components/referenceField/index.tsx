import React, { useContext } from "react";
import { useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import { GetOneResponse, IDataContext } from "@interfaces";

export interface ReferenceFieldProps {
    resource: string;
    optionText?: string;
    value: string | number;
    record?: any;
}

export const ReferenceField: React.FC<ReferenceFieldProps> = ({
    resource,
    optionText = "title",
    value,
}) => {
    const { getOne } = useContext<IDataContext>(DataContext);

    const { data, isFetching } = useQuery<GetOneResponse>(
        [`resource/one/${resource}/`, { id: value }],
        () => getOne(resource, value),
    );

    if (isFetching) {
        // TODO: Add loding ui.
        return <span>loading</span>;
    }

    return <span>{data?.data[optionText]}</span>;
};
