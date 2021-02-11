import React from "react";
import { Table as AntdTable, Button, Space, Popconfirm } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Column } from "@components";
import { Record } from "@interfaces";
import { useDelete } from "@hooks";
import { useSearchParams } from "@hooks/util";

export interface TableProps {
    resourceName?: string;
    dataSource?: Record[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
    canEdit?: boolean;
    canDelete?: boolean;
    onConfirmDelete?: (id: any) => void;
}

export const Table: React.FC<TableProps> = ({
    resourceName,
    dataSource,
    loading,
    pagination,
    canEdit,
    canDelete,
    children,
}) => {
    const history = useHistory();
    const queryParams = useSearchParams();

    if (!resourceName) {
        // TODO: render resource error page
        throw new Error("`resourceName` is required for <Table/> Component.");
    }

    const { mutate, isLoading } = useDelete(resourceName);

    const renderDeleteButton = (id: any) => {
        return (
            <Popconfirm
                key="delete"
                okText="Delete"
                okType="danger"
                title="Are you sure?"
                okButtonProps={{ disabled: isLoading }}
                onConfirm={() => {
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

    const renderActions = () => {
        if (canEdit || canDelete) {
            return (
                <Column
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_text: any, record: any) => (
                        <Space>
                            {canEdit && (
                                <Button
                                    onClick={() => {
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
        <React.Fragment>
            <AntdTable
                style={{ width: "100%" }}
                dataSource={dataSource}
                loading={loading}
                pagination={pagination}
                onChange={(pagination) => {
                    const q = queryParams.get("q");
                    history.push(
                        `/resources/${resourceName}?current=${pagination.current}&pageSize=${pagination.pageSize}&q=${q}`,
                    );
                }}
            >
                {children}
                {renderActions()}
            </AntdTable>
        </React.Fragment>
    );
};
