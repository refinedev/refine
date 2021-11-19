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
    FilterDropdown,
    Select,
    useSelect,
    Button,
    useCreateMany,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        liveMode: "immediate",
    });

    const createMany = useCreateMany();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.categoryId) ?? [];

    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
        liveMode: "immediate",
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    const handleAdd2 = () => {
        createMany.mutate({
            resource: "posts",
            values: [
                {
                    content: "test",
                    createdAt: new Date().toISOString(),
                    title: "adfasdfasdf",
                    categoryId: "2",
                },
                {
                    content: "lkjefwlkeflwkef",
                    createdAt: new Date().toISOString(),
                    title: "2123123123",
                    categoryId: "2",
                },
            ],
        });
    };

    return (
        <List
            pageHeaderProps={{
                extra: <Button onClick={handleAdd2}>Add 2</Button>,
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter
                />
                <Table.Column
                    dataIndex="categoryId"
                    title="Category"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
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
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
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
