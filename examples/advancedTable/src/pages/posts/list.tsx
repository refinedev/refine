import React, { useState } from "react";
import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useMany,
    MarkdownField,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

const expandedRowRender = (value: IPost) => {
    return <MarkdownField value={value.content} />;
};

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    return (
        <List>
            <Table<IPost>
                expandable={{
                    expandedRowRender,
                }}
                {...tableProps}
                rowKey="id"
            >
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                />
                <Table.Column<IPost>
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
