import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["category", "title"]}
                    key="category.id"
                    title="Category"
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
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
