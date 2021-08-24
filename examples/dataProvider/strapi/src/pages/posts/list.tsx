import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    getDefaultFilter,
    useSelect,
    DateField,
    Space,
    EditButton,
    DeleteButton,
} from "@pankod/refine";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, filters } = useTable({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const { selectProps } = useSelect({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        defaultValue: getDefaultFilter("category.id", filters),
    });

    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                }}
            >
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter
                />
                <Table.Column
                    key="category.id"
                    dataIndex={["category", "title"]}
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
                    defaultFilteredValue={getDefaultFilter(
                        "category.id",
                        filters,
                    )}
                />
                <Table.Column
                    dataIndex="created_at"
                    title="Created At"
                    render={(value) => (
                        <DateField value={value} format="YYYY-MM-DD HH:mm:ss" />
                    )}
                    sorter
                />
                <Table.Column<{ id: string }>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
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
