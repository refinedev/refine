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
    DeleteButton,
    ImageField,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<IPost>();

    const categoryIds = tableProps?.dataSource?.flatMap((p) => p.category);
    const { data, isLoading } = useMany<ICategory>(
        "categories",
        categoryIds || [],
        {
            enabled: categoryIds !== undefined,
        },
    );

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column key="status" dataIndex="status" title="Status" />
                <Table.Column<IPost>
                    dataIndex={"category"}
                    key="category"
                    title="Category"
                    render={(_, record) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={data?.data
                                    .filter((item) =>
                                        record.category.includes(item.id),
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
                    key="actions"
                    render={(_value, record) => (
                        <Space>
                            <EditButton size="small" recordItemId={record.id} />
                            <ShowButton size="small" recordItemId={record.id} />
                            <DeleteButton
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
