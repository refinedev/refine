import React from "react";
import { Table as AntdTable, Button } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { Link, useHistory } from "react-router-dom";

import { Column } from "@components";
import { Record } from "@interfaces";

export interface TableProps {
    resourceName?: string;
    dataSource?: Record[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
    isEdit?: boolean;
}

export const Table: React.FC<TableProps> = ({
    resourceName,
    dataSource,
    loading,
    pagination,
    isEdit,
    children,
}) => {
    const history = useHistory();
    return (
        <AntdTable
            style={{ width: "100%" }}
            dataSource={dataSource}
            loading={loading}
            pagination={pagination}
            onChange={(pagination) => {
                history.push(
                    `/resources/${resourceName}?current=${pagination.current}&pageSize=${pagination.pageSize}`,
                );
            }}
        >
            {children}
            {isEdit && (
                <Column
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(text: any = "Edit", record: any) => (
                        <Link
                            to={`/resources/${resourceName}/edit/${record.id}`}
                        >
                            <Button type="link">{text}</Button>
                        </Link>
                    )}
                />
            )}
        </AntdTable>
    );
};
