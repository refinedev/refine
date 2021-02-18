import React from "react";
import { Table as AntdTable, Button, Space, Popconfirm } from "antd";
import {
    TablePaginationConfig,
    TableProps as AntdTableProps,
} from "antd/lib/table";
import { useHistory, useLocation } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import qs from "query-string";

import { Column } from "@components";
import { BaseRecord } from "@interfaces";
import { useDelete } from "@hooks";

export interface TableProps extends AntdTableProps<any> {
    resourceName?: string;
    dataSource?: BaseRecord[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
    canEdit?: boolean;
    canDelete?: boolean;
    onConfirmDelete?: (id: string | number) => void;
}

export const Table: React.FC<TableProps> = ({
    resourceName,
    dataSource,
    loading,
    pagination,
    canEdit,
    canDelete,
    children,
    ...rest
}) => {
    const history = useHistory();
    const { search } = useLocation();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mutate, isLoading } = useDelete(resourceName!);

    const renderDeleteButton = (id: number | string): React.ReactNode => {
        return (
            <Popconfirm
                key="delete"
                okText="Delete"
                okType="danger"
                title="Are you sure?"
                okButtonProps={{ disabled: isLoading }}
                onConfirm={(): void => {
                    mutate({ id });
                }}
            >
                <Button
                    type="default"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                >
                    Delete
                </Button>
            </Popconfirm>
        );
    };

    const renderActions = (): React.ReactNode => {
        if (canEdit || canDelete) {
            return (
                <Column
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(
                        _text: string | number,
                        record: {
                            id: string | number;
                        },
                    ): React.ReactNode => (
                        <Space>
                            {canEdit && (
                                <Button
                                    onClick={(): void => {
                                        history.push(
                                            `/resources/${resourceName}/edit/${record.id}`,
                                        );
                                    }}
                                    type="default"
                                    size="small"
                                    icon={<EditOutlined />}
                                >
                                    Edit
                                </Button>
                            )}
                            {canDelete && renderDeleteButton(record.id)}
                        </Space>
                    )}
                />
            );
        }

        return null;
    };

    return (
        <>
            <AntdTable
                style={{ width: "100%" }}
                dataSource={dataSource}
                loading={loading}
                pagination={pagination}
                onChange={(pagination): void => {
                    const parsedSearchQuery = qs.parse(search);

                    parsedSearchQuery.current = String(pagination.current);
                    parsedSearchQuery.pageSize = String(pagination.pageSize);

                    history.push(
                        `/resources/${resourceName}?${qs.stringify(
                            parsedSearchQuery,
                        )}`,
                    );
                }}
                {...rest}
            >
                {children}
                {renderActions()}
            </AntdTable>
        </>
    );
};
