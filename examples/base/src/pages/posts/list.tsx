import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    DateField,
    Space,
    EditButton,
    DeleteButton,
    ShowButton,
} from "@pankod/refine";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable({
        initialSorter: [
            {
                field: "id",
                order: "descend",
            },
        ],
    });

    return (
        <List {...props}>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
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
                    key="category.id"
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    key="created_at"
                    dataIndex="created_at"
                    title="Created At"
                    render={(value) => (
                        <DateField value={value} format="YYYY-MM-DD HH:mm:ss" />
                    )}
                />
                <Table.Column<{ id: number }>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <Space>
                            <EditButton size="small" recordItemId={record.id} />
                            <DeleteButton
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
