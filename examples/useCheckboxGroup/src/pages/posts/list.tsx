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
    Tag,
} from "@pankod/refine";

import { IPost, ITag } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>();

    const tagIds = tableProps?.dataSource?.map((item) => item.tags) ?? [];
    const mergeTagIds = tagIds.reduce((a, b) => a.concat(b), []);
    const { data, isLoading } = useMany<ITag>("tags", mergeTagIds, {
        enabled: tagIds.length > 0,
    });

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
                                                (item) => item.id == tagId,
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
