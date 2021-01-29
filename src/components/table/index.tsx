import React from "react";
import { Table as AntdTable } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { useHistory } from "react-router-dom";

import { Record } from "@interfaces";

export interface TableProps {
    resourceName: string;
    dataSource?: Record[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
}

export const Table: React.FC<TableProps> = ({
    resourceName,
    dataSource,
    loading,
    pagination,
    children,
}) => {
    const history = useHistory();
    return (
        <AntdTable
            dataSource={dataSource}
            loading={loading}
            pagination={pagination}
            onChange={(pagination) => {
                console.log("onChangePagination", pagination);
                history.push(
                    `/resources/${resourceName}?current=${pagination.current}&pageSize=${pagination.pageSize}`,
                );
            }}
        >
            {children}
        </AntdTable>
    );
};
