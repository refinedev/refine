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
    getDefaultSortOrder,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostsList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "$id",
                order: "asc",
            },
        ],
    });

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.categoryId) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "6180e6efb14df",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="$id">
                <Table.Column
                    dataIndex="$id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column dataIndex="title" title="Title" sorter />
                <Table.Column
                    dataIndex="categoryId"
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find(
                                        (item) => item.$id === value,
                                    )?.title
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
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.$id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.$id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
