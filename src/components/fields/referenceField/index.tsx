import React, { useContext } from "react";
import { useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import { GetOneResponse, IDataContext } from "@interfaces";

export interface ReferenceFieldProps {
    resource: string;
    value: string | number;
}

export const ReferenceField: React.FC<ReferenceFieldProps> = ({
    resource,
    value,
    children
}) => {
    const { getOne } = useContext<IDataContext>(DataContext);

    const { data, isFetching } = useQuery<GetOneResponse>(
        [`resource/one/${resource}/`, { id: value }],
        () => getOne(resource, value)
    );

    if (isFetching) {
        // TODO: Add loding ui.
        return <span>loading</span>;
    }

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                record: data?.data
            });
        }
        return child;
    });

    return <React.Fragment>{childrenWithProps}</React.Fragment>;
};
