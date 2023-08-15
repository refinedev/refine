import { IResourceComponentsProps, getDefaultFilter } from "@refinedev/core";

import {
    List,
    useTable,
    EditButton,
    ShowButton,
    DeleteButton,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
    DateField,
} from "@refinedev/antd";

import { Table, Space, Select } from "antd";

import { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, filters, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        metaData: {
            fields: [
                "id",
                "title",
                {
                    category: ["title"],
                },
                "content",
                "createdAt",
            ],
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        pagination: {
            pageSize: 100,
            mode: "server",
            current: 1,
        },
        metaData: {
            fields: ["id", "title"],
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column<IPost>
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
                    render={(_, record) => record.category.title}
                    defaultFilteredValue={getDefaultFilter(
                        "categoryId",
                        filters,
                        "in",
                    )}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="Created At"
                    render={(value) => <DateField value={value} format="LLL" />}
                    defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
                    sorter
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
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                                metaData={{
                                    fields: ["id", "content", "categoryId"],
                                }}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
