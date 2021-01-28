import React, { useContext } from "react";
import { useQuery } from "react-query";

import { DataContext, IDataContext } from "@contexts/data";

export interface BaseListProps {
    resourceName: string;
}

export const BaseList: React.FC<BaseListProps> = ({
    resourceName,
    children,
}) => {
    const { getList } = useContext<IDataContext>(DataContext);

    const { data, isLoading } = useQuery(`resourceList-${resourceName}`, () =>
        getList(resourceName, {
            pagination: {
                page: 1,
                perPage: 10,
            },
            sort: {
                field: "id",
                order: "desc",
            },
        }),
    );

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                data,
                isLoading,
            });
        }
        return child;
    });

    return <div>{childrenWithProps}</div>;
};
