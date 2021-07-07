import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useExport,
    ExportButton,
    useMany,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const { triggerExport, loading } = useExport<IPost>({
        mapData: (item) => {
            return {
                id: item.id,
                title: item.title,
                slug: item.slug,
                content: item.content,
                status: item.status,
                categoryId: item.category.id,
                userId: item.user?.id,
            };
        },
    });

    return (
        <List
            {...props}
            pageHeaderProps={{
                extra: (
                    <ExportButton onClick={triggerExport} loading={loading} />
                ),
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
