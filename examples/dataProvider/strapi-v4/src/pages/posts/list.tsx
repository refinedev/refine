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
    useMany,
    useOne,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, filters } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        // initialFilter: [
        //     { field: "id", operator: "eq", value: 1 },
        //     { field: "title", operator: "contains", value: "a" },
        // ],
        initialPageSize: 1,
        metaData: {
            // locale: "de",
            // fields: ["title", "content"],
            // populate: "*",
            populate: ["category"],
            // publicationState: "preview",
        },
    });

    console.log(tableProps);

    const { selectProps } = useSelect({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        // defaultValue: [
        //     getDefaultFilter("category.data.attributes.id", filters),
        // ],
    });

    // const { data } = useMany({ resource: "posts", ids: ["1", "3"] });
    const { data } = useOne({
        resource: "posts",
        id: "1",
        metaData: {
            locale: "de",
            populate: "category",
        },
    });

    console.log("client data :", data);

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
                    key="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    key="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />
                <Table.Column
                    key="category.data.attributes.id"
                    dataIndex={["category", "data", "attributes", "title"]}
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
                {/* <Table.Column
                    dataIndex="created_at"
                    key="created_at"
                    title="Created At"
                    render={(value) => <DateField value={value} format="LLL" />}
                    defaultSortOrder={getDefaultSortOrder("created_at", sorter)}
                    sorter={{ multiple: 1 }}
                /> */}
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
