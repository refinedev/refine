import {
    IResourceComponentsProps,
    useMany,
    getDefaultFilter,
} from "@refinedev/core";

import {
    List,
    FilterDropdown,
    TagField,
    useTable,
    getDefaultSortOrder,
    useSelect,
} from "@refinedev/antd";

import { FilterDropdownProps } from "antd/lib/table/interface";
import { Table, Radio, Select, Input } from "antd";

import { ICategory, IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, filters } = useTable<IPost>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
            {
                field: "category.id",
                operator: "in",
                value: [1, 2],
            },
        ],
        syncWithLocation: true,
    });

    const categoryIds =
        tableProps.dataSource?.map((p) => p.category.id.toString()) || [];
    const { data, isFetching } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        defaultValue: getDefaultFilter("category.id", filters, "in"),
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    filterDropdown={(props: FilterDropdownProps) => (
                        <FilterDropdown {...props}>
                            <Input />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="content"
                    title="Content"
                    sorter={{ multiple: 1 }}
                    defaultSortOrder={getDefaultSortOrder("content", sorter)}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isFetching) return "loading...";

                        return data?.data.find((p) => p.id === value)?.title;
                    }}
                    filterDropdown={(props: FilterDropdownProps) => (
                        <FilterDropdown
                            {...props}
                            mapValue={(selectedKeys) =>
                                selectedKeys.map((i) => parseInt(i.toString()))
                            }
                        >
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "category.id",
                        filters,
                        "in",
                    )}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value: string) => <TagField value={value} />}
                    filterDropdown={(props: FilterDropdownProps) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter("status", filters)}
                />
            </Table>
        </List>
    );
};
