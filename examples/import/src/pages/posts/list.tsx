import {
    List,
    Table,
    TextField,
    useTable,
    useMany,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    ImportButton,
} from "@pankod/refine";

import { IPost, ICategory, IPostFile } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const Actions = () => (
        <Space direction="horizontal">
            <ImportButton
                mapData={(item: IPostFile) => {
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
                }}
                batchSize={1}
            />
        </Space>
    );

    return (
        <List
            {...props}
            pageHeaderProps={{
                extra: <Actions />,
            }}
        >
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    key="category.id"
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
