import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { TablePaginationConfig } from "antd/lib/table";

import { DataContext, IDataContext } from "@contexts/data";
import { TableProps } from "@components/table";
import { GetListResponse } from "@interfaces";

export interface ListProps {
    resourceName: string;
}

export const List: React.FC<ListProps> = ({ resourceName, children }) => {
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

    const { data, isFetching } = useQuery<GetListResponse>(
        [`resource/list/${resourceName}`, current],
        () =>
            getList(resourceName, {
                pagination: {
                    current,
                    pageSize,
                },
            }),
        {
            keepPreviousData: true,
        },
    );

    const pagination: TablePaginationConfig = {
        total: data?.total,
        current,
        pageSize,
        defaultCurrent: 1,
        defaultPageSize: 10,
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement<TableProps>(child, {
                resourceName,
                dataSource: data?.data,
                loading: isFetching,
                pagination,
            });
        }
        return child;
    });

    return <div>{childrenWithProps}</div>;
};
