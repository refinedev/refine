import { useEffect } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { List, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Space } from "antd";
import { useTable } from "@refinedev/antd";

import { useConnectMutation } from "@refinedev/connect";

import { ICategory } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const { mutate, data, isLoading } = useConnectMutation<ICategory[]>();

    useEffect(() => {
        mutate({
            key: "default-restapi-categories",
        });
    }, []);

    const { tableProps } = useTable<ICategory>({
        syncWithLocation: true,
        hasPagination: false,
        queryOptions: {
            enabled: false,
        },
    });

    // override tableProps
    tableProps.dataSource = data;
    tableProps.loading = isLoading;

    return (
        <List>
            <Table
                {...tableProps}
                pagination={{
                    pageSize: 10,
                }}
                rowKey="id"
            >
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<ICategory>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
