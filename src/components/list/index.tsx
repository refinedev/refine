import React from "react";
import { Table } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { useHistory } from "react-router-dom";

import { Record } from "@interfaces";
export interface ListProps {
    resourceName: string;
    dataSource?: Record[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
}

export const List: React.FC<ListProps> = ({
    resourceName,
    dataSource,
    loading,
    pagination,
    children,
}) => {
    const history = useHistory();
    return (
        <Table
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
        </Table>
    );
};
