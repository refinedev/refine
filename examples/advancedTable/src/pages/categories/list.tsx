import React, { useState } from "react";
import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    BooleanField,
} from "@pankod/refine";

import { ICategory, IPost } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<ICategory>();
    const [selectedRowId, setSelectedRowId] = useState<string>();

    const { tableProps: postTableProps } = useTable<IPost>({
        resource: "posts",
        permanentFilter: [
            {
                field: "category.id",
                operator: "eq",
                value: selectedRowId,
            },
        ],
    });

    const expandedRowRender = () => {
        return (
            <Table {...postTableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    align="center"
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                size="small"
                                resourceName="posts"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                size="small"
                                resourceName="posts"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        );
    };

    return (
        <List>
            <Table
                expandable={{
                    expandedRowRender,
                    expandedRowKeys: [selectedRowId as string],
                    onExpand: (expandable, record) =>
                        setSelectedRowId(expandable ? record.id : ""),
                }}
                {...tableProps}
                rowKey="id"
                scroll={{ x: 400 }}
            >
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex="active"
                    title="Active"
                    align="center"
                    render={(value) => {
                        return <BooleanField value={value} />;
                    }}
                />
                <Table.Column<ICategory>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton size="small" recordItemId={record.id} />
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
