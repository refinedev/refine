import React from "react";
import { Table as AntdTable, Button, Space, Popconfirm } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Column } from "@components";
import { Record } from "@interfaces";
import { useDelete, useTranslation } from "@hooks";

export interface TableProps {
    resourceName: string;
    dataSource?: Record[];
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
}) => {
    const history = useHistory();

    const { mutate, isLoading } = useDelete(resourceName);

    const { common, actions } = useTranslation();

    const renderDeleteButton = (id: number | string): React.ReactNode => {
        return (
            <Popconfirm
                key="delete"
                okText={common.delete}
                cancelText={common.cancel}
                okType="danger"
                title={common.confirm}
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
                    {actions.delete()}
                </Button>
            </Popconfirm>
        );
    };

    const renderActions = (): React.ReactNode => {
        if (canEdit || canDelete) {
            return (
                <Column
                    title={actions.title()}
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
                                    {actions.edit()}
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
                onChange={(pagination): void => {
                    history.push(
                        `/resources/${resourceName}?current=${pagination.current}&pageSize=${pagination.pageSize}`,
                    );
                }}
            >
                {children}
                {renderActions()}
            </AntdTable>
        </React.Fragment>
    );
};
