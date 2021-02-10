import React from "react";
import { Table as AntdTable, Button, Space, Popconfirm } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Column } from "@components";
import { Record } from "@interfaces";
import { useDelete } from "@hooks";

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
    children
}) => {
    const history = useHistory();

    if (!resourceName) {
        // TODO: render resource error page
        return <span>params error</span>;
    }

    const { mutate, isLoading } = useDelete(resourceName);

    const renderDeleteButton = (id: any) => {
        const [visibleDeleteConfirm, setVisibleDeleteConfirm] = React.useState(
            false
        );
        return (
            <Popconfirm
                key="delete"
                visible={visibleDeleteConfirm}
                okText="Delete"
                okType="danger"
                title="Are you sure?"
                onCancel={() => setVisibleDeleteConfirm(false)}
                okButtonProps={{ disabled: isLoading }}
                onConfirm={() => {
                    mutate({ id });

                    setVisibleDeleteConfirm(false);
                }}
            >
                <Button
                    onClick={() => {
                        setVisibleDeleteConfirm(true);
                    }}
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
                                            `/resources/${resourceName}/edit/${record.id}`
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
                onChange={pagination => {
                    history.push(
                        `/resources/${resourceName}?current=${pagination.current}&pageSize=${pagination.pageSize}`
                    );
                }}
            >
                {children}
                {renderActions()}
            </AntdTable>
        </React.Fragment>
    );
};
