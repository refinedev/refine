import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { TablePaginationConfig } from "antd/lib/table";

import { DataContext, IDataContext } from "@contexts/data";
import { ListProps } from "@components/list";
import { GetListResponse } from "@interfaces";

export interface BaseListProps {
    resourceName: string;
}

export const BaseList: React.FC<BaseListProps> = ({
    resourceName,
    children,
}) => {
    const { getList } = useContext<IDataContext>(DataContext);
    const queryParams = new URLSearchParams(useLocation().search);

    let current = 1;
    const queryParamCurrent = queryParams.get("current");
    if (queryParamCurrent) {
        current = +queryParamCurrent;
    }

    let pageSize = 10;
    const queryParamPageSize = queryParams.get("pageSize");
    if (queryParamPageSize) {
        pageSize = +queryParamPageSize;
    }

    const { data, isLoading } = useQuery<GetListResponse>(
        [`resource/list/${resourceName}`, current],
        () =>
            getList(resourceName, {
                pagination: {
                    current,
                    pageSize,
                },
            }),
    );

    if (data) {
        const { data: dataSource, total } = data;

        const pagination: TablePaginationConfig = {
            total,
            current,
            pageSize,
            defaultCurrent: 1,
            defaultPageSize: 10,
        };

        const childrenWithProps = React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement<ListProps>(child, {
                    resourceName,
                    dataSource,
                    loading: isLoading,
                    pagination,
                });
            }
            return child;
        });

        return <div>{childrenWithProps}</div>;
    }

    return <div>no data</div>;
};
