import {
    List,
    Table,
    TextField,
    useTable,
    useMany,
    useImport,
    Space,
    EditButton,
    ShowButton,
    ImportButton,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost, ICategory, IPostFile } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const importProps = useImport<IPostFile>({
        mapData: (item) => {
            return {
                title: item.title,
                content: item.content,
                status: item.status,
                category: {
                    id: item.categoryId,
                },
                user: {
                    id: item.userId,
                },
            };
        },
    });

    return (
        <List
            pageHeaderProps={{
                extra: <ImportButton {...importProps} />,
            }}
        >
            <Table {...tableProps} rowKey="id">
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
