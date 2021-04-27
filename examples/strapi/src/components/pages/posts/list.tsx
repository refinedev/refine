import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
} from "@pankod/refine";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps, sorter } = useTable({
        initialSorter: [
            {
                field: "title",
                order: "ascend",
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
                    key="title"
                    dataIndex="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter
                />
            </Table>
        </List>
    );
};
