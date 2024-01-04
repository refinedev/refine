import {
    IResourceComponentsProps,
    getDefaultFilter,
    useCreateMany,
    useDeleteMany,
    useUpdateMany,
} from "@refinedev/core";

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

import { Table, Space, Select, Input } from "antd";

import { useState } from "react";
import {
    POST_CATEGORIES_SELECT_QUERY,
    POSTS_QUERY,
    POST_DELETE_MUTATION,
} from "./queries";
import { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, filters, sorters } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        filters: {
            initial: [
                {
                    field: "title",
                    operator: "contains",
                    value: "",
                },
            ],
        },
        metaData: {
            gqlQuery: POSTS_QUERY,
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        metaData: {
            gqlQuery: POST_CATEGORIES_SELECT_QUERY,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorters)}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 1 }}
                    defaultFilteredValue={getDefaultFilter(
                        "title",
                        filters,
                        "contains",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    dataIndex="category_id"
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
                    render={(_, record) => record?.category?.title}
                    defaultFilteredValue={getDefaultFilter(
                        "category_id",
                        filters,
                        "in",
                    )}
                />
                <Table.Column
                    dataIndex="created_at"
                    title="Created At"
                    render={(value) => <DateField value={value} format="LLL" />}
                    defaultSortOrder={getDefaultSortOrder(
                        "created_at",
                        sorters,
                    )}
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
                                recordItemId={record?.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record?.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record?.id}
                                meta={{
                                    gqlMutation: POST_DELETE_MUTATION,
                                }}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

