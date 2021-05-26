import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useList,
    Tag,
} from "@pankod/refine";

import { IPost, ITag } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps>  = (props) => {
    const { tableProps } = useTable<IPost>();

    const { data, isLoading } = useList<ITag>("tags");

    return (
        <List {...props}>
            <Table {...tableProps} key="id">
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
                    dataIndex={["tags"]}
                    key="tags"
                    title="Tags"
                    render={(value: Array<string>) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <>
                                {value?.map((tagId) => (
                                    <Tag key={tagId}>
                                        {
                                            data?.data.find(
                                                (item) => item.id === tagId,
                                            )?.title
                                        }
                                    </Tag>
                                ))}
                            </>
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
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
