import { IResourceComponentsProps, useMany } from "@refinedev/core";

import {
    List,
    TextField,
    useTable,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds = tableProps?.dataSource?.flatMap((p) => p.category);
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds || [],
        queryOptions: {
            enabled: categoryIds !== undefined,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="status" title="Status" />
                <Table.Column<IPost>
                    dataIndex={"category"}
                    title="Category"
                    render={(_, record) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={data?.data
                                    .filter((item) =>
                                        record.category?.includes(item.id),
                                    )
                                    .map((p) => p.title)
                                    .join(", ")}
                            />
                        );
                    }}
                />
                <Table.Column<IPost>
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
                            <DeleteButton
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
