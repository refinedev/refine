import React, { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Table as AntdTable, Button, Space, Popconfirm } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Column } from "@components";
import { DataContext } from "@contexts/data";
import { Record, IDataContext } from "@interfaces";

export interface TableProps {
    resourceName?: string;
    dataSource?: Record[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
    isEdit?: boolean;
    canDelete?: boolean;
    onConfirmDelete?: (id: any) => void;
}

export const Table: React.FC<TableProps> = ({
    resourceName,
    dataSource,
    loading,
    pagination,
    isEdit,
    canDelete,
    children,
}) => {
    const history = useHistory();
    const { deleteOne } = useContext<IDataContext>(DataContext);

    if (!resourceName) {
        // TODO: render resource error page
        return <span>params error</span>;
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(
        ({ resourceName, id }: { resourceName: string; id: string | number }) =>
            deleteOne(resourceName, id),
        {
            onSuccess: () => {
                // invalidate resource list query
                queryClient.invalidateQueries(`resource/list/${resourceName}`);
            },
        },
    );

    const renderDeleteButton = (id: any) => {
        const [visibleDeleteConfirm, setVisibleDeleteConfirm] = React.useState(
            false,
        );
        return (
            <Popconfirm
                key="delete"
                visible={visibleDeleteConfirm}
                okText="Delete"
                okType="danger"
                title="Are you sure?"
                onCancel={() => setVisibleDeleteConfirm(false)}
                okButtonProps={{ disabled: mutation.isLoading }}
                onConfirm={() => {
                    mutation.mutate({ resourceName, id });

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
        if (isEdit || canDelete) {
            return (
                <Column
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_text: any, record: any) => (
                        <Space>
                            {isEdit && (
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
