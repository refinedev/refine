import { useState, useEffect } from "react";
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
} from "@pankod/refine";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable({});

    const [categoryIds, setCategoryIds] = useState<string[]>([]);

    useEffect(() => {
        if (tableProps.dataSource) {
            setCategoryIds(
                tableProps.dataSource.map((item) => item.category.id),
            );
        }
    }, [tableProps.dataSource]);

    const { data, isLoading, refetch } = useMany("categories", categoryIds, {
        enabled: false,
    });

    useEffect(() => {
        if (categoryIds.length > 0) {
            refetch();
        }
    }, [categoryIds]);

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    key="category"
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
                <Table.Column<{ id: number }>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
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
