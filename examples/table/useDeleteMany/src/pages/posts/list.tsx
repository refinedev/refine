import * as React from "react";
import {
    IResourceComponentsProps,
    useMany,
    useDeleteMany,
    useOne,
} from "@pankod/refine-core";

import {
    List,
    Table,
    TextField,
    useTable,
    Space,
    EditButton,
    ShowButton,
    Button,
    useSelect,
    Select,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );

    const { data: postOne20 } = useOne<IPost>({
        resource: "posts",
        id: 20,
    });

    const { data: postOne } = useOne<IPost>({
        resource: "posts",
        id: 21,
    });

    const { data: postsMany } = useMany<IPost>({
        resource: "posts",
        ids: [20, 21, 22, 23, 24],
    });

    const { mutate, isLoading: deleteManyIsLoading } = useDeleteMany<IPost>();

    const deleteSelectedItems = () => {
        mutate(
            {
                resource: "posts",
                ids: selectedRowKeys.map(String),
            },
            {
                onSuccess: () => {
                    setSelectedRowKeys([]);
                },
            },
        );
    };

    const onSelectChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <List
            pageHeaderProps={{
                subTitle: (
                    <>
                        <Button
                            type="primary"
                            onClick={deleteSelectedItems}
                            disabled={!hasSelected}
                            loading={deleteManyIsLoading}
                        >
                            Delete Selected
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `Selected ${selectedRowKeys.length} items`
                                : ""}
                        </span>
                        <span>{postOne?.data.id}</span>
                        <span>{postOne?.data.title}</span>
                        <br />
                        <span>{postOne20?.data.id}</span>
                        <span>{postOne20?.data.title}</span>
                        <ul>
                            {postsMany?.data.map((p) => (
                                <li key={p.id}>{`${p.id}-${p.title}`}</li>
                            ))}
                        </ul>
                    </>
                ),
            }}
        >
            <Table {...tableProps} rowSelection={rowSelection} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="status" title="Status" />
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
